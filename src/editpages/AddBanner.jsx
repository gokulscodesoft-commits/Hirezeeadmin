import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./AddBanner.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { HomeBannerContext } from "../UseContexts/SeekerUseContext/HomeBannerContext";

export default function AddBanner() {
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { addBanner } = useContext(HomeBannerContext);
  const navigate = useNavigate();

  // Handle file change
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setErrorMsg(""); // clear error when new file is selected
    }
  };

  // Save banner
  const handleSave = async () => {
    if (!file) {
      setErrorMsg("Please select an image before saving.");
      return;
    }

    if (loading) return; // avoid multiple clicks

    setLoading(true);
    setErrorMsg("");

    const formData = new FormData();
    formData.append("banner_image", file); // ✅ backend expects this key

    try {
      for (let [key, value] of formData.entries()) {
  console.log(key, value);
}

      await addBanner(formData);

      // Reset state after success
      setFile(null);
      setPreview(null);

      navigate("/dashboard/home-banner");
    } catch (err) {
      console.error("Add banner failed:", err.response?.data || err.message);
      setErrorMsg(
        err.response?.data?.message ||
          "Failed to upload banner. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addbanner-container">
      <div className="addbanner-card">
        <h2 className="addbanner-title">Add Thumbnail Photo</h2>

        {/* Upload Section */}
        <div className="addbanner-upload">
          {preview ? (
            <img src={preview} alt="Preview" className="addbanner-preview" />
          ) : (
            <label htmlFor="banner-upload" className="addbanner-dropzone">
              <AiOutlineCloudUpload className="upload-icon" />
              <span>
                Drop your image here or{" "}
                <span className="browse-text">click to browse</span>
              </span>
              <p>1600 x 1200 (4:3) recommended. PNG, JPG, GIF allowed</p>
            </label>
          )}

          <input
            id="banner-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="addbanner-input"
          />
        </div>

        {/* Error Message */}
        {errorMsg && <p className="error-text">{errorMsg}</p>}

        {/* Actions */}
        <div className="addbanner-actions">
          <button
            type="button"
            className="addbanner-cancel"
            onClick={() => navigate("/dashboard/home-banner")}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="addbanner-save"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
