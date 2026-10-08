import { SeekerTermsContext } from "../UseContexts/SeekerTerms&ConditionContext/SeekerTermsConditionContext";
import "./SeekerTermsAdd.css";
import React, { useContext, useState, useEffect } from "react";

const SeekerTermsAdd = ({ onClose, editData = null }) => {
  const { addTerms, updateTerms } = useContext(SeekerTermsContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [pointsText, setPointsText] = useState("");
  const [content, setContent] = useState("");

  const [saving, setSaving] = useState(false);

  // 🔥 PREFILL DATA FOR EDIT
  useEffect(() => {
    if (editData) {
      setTitle(editData.title || "");
      setDescription(editData.description || "");
      setPointsText((editData.points || []).join("\n"));
      setContent(editData.content || "");
    }
  }, [editData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title: title.trim(),
      description: description.trim(),

      // 🔥 Convert multiline text → array
      points: pointsText
        .split("\n")
        .map((p) => p.trim())
        .filter(Boolean),

      content: content.trim(),
    };

    setSaving(true);

    // const success = await addTerms(payload);

    const success = editData
      ? await updateTerms(editData.id, payload) // 🔥 EDIT
      : await addTerms(payload);

    setSaving(false);

    // 🔥 Call API here later

    if (success) {
      onClose();
    }
  };

  return (
    <>
      <div className="terms-modal-overlay">
        <div className="terms-modal">
          <h3>
            {editData ? "Edit Terms & Condition" : "Add Terms & Condition"}
          </h3>

          <form onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              required
            />

            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              rows={4}
            />

            {/* 🔥 POINTS */}
            <label>Points (one per line)</label>
            <textarea
              value={pointsText}
              onChange={(e) => setPointsText(e.target.value)}
              placeholder={`Upload fake documents\nImpersonate another user\nHarass recruiters`}
              rows={5}
            />

            {/* 🔥 CONTENT */}
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Violation may result in account suspension..."
              rows={3}
            />

            <div className="terms-modal-actions">
              <button type="button" className="cancel-btn" onClick={onClose}>
                Cancel
              </button>
              <button type="submit" className="save-btn" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SeekerTermsAdd;
