import React, { useContext, useState } from "react";
import { BannerLoader } from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { BiSolidEdit } from "react-icons/bi";
import "./HomeBannerRecruiter.css";
import { HomeBannerRecruiterContext } from "../UseContexts/SeekerUseContext/HomeBannerRecruiterProvider";

const HomeBannerRecruiter = () => {
  const { banners, loading, error, deleteBanner } = useContext(
    HomeBannerRecruiterContext
  );

  const [viewedRows, setViewedRows] = useState([]);
  const navigate = useNavigate();

  const bannerList = Array.isArray(banners) ? banners : banners?.data || [];

  const handleDelete = async (id) => {
    try {
      await deleteBanner(id);
      setViewedRows((prev) => prev.filter((hid) => hid !== id)); // remove if hidden
    } catch (err) {
      console.error("Error deleting banner:", err);
    }
  };

  // ✅ Context-driven shimmer effect
  if (loading) return <BannerLoader />;
  if (error) return <p className="error-msg">Error: {error}</p>;

  return (
    <>
      <div className="homebanner-container">
        {/* --- Top Preview Section --- */}
        <div className="homebanner-top-row recruiter-banner-top-row">
          {bannerList.length > 0 ? (
            bannerList.slice(0, 6).map((banner, index) => (
              <div className="homebanner-card" key={banner.id}>
                <img src={banner.banner_image} alt="Banner" />
                <p>Banner {index + 1}</p>
              </div>
            ))
          ) : (
            <p className="no-banner-msg">No banners yet</p>
          )}
        </div>

        {/* --- Banner Table Section --- */}
        <div className="homebanner-rec-seek">
          <div className="homebanner-section">
            <div className="banner-button">
              <h2 className="seeker-text">Recruiter Banner List</h2>
              <button
                className="homebanner-add-btn"
                onClick={() => navigate("/dashboard/home-banner/recruiter-add")}
              >
                Add Banner
              </button>
            </div>

            <div className="homebanner-table-container">
              <table className="homebanner-table">
                <thead>
                  <tr>
                    <th>Banner</th>
                    <th>Posted on</th>
                    <th>Created by</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bannerList.length > 0 ? (
                    bannerList.map((banner) => (
                      <tr
                        key={banner.id}
                        className={
                          viewedRows.includes(banner.id) ? "viewed-row" : ""
                        }
                      >
                        <td>
                          <img
                            src={banner.banner_image}
                            alt="banner"
                            className="homebanner-img"
                          />
                        </td>
                        <td>{banner.postedOn || "—"}</td>
                        <td>{banner.createdBy || "—"}</td>
                        <td className="homebanner-actions">
                          {/* <button
                          className="homebanner-btn view-btn"
                          onClick={() => handleView(banner.id)}
                        >
                          {viewedRows.includes(banner.id) ? (
                            <FaRegEyeSlash />
                          ) : (
                            <FaRegEye />
                          )}
                        </button> */}
                          <button
                            className="homebanner-btn edit-btn"
                            onClick={() =>
                              navigate(
                                `/dashboard/home-banner/edit-recruiter/${banner.id}`
                              )
                            }
                          >
                            <BiSolidEdit />
                          </button>
                          <button
                            className="homebanner-btn delete-btn"
                            onClick={() => handleDelete(banner.id)}
                          >
                            <AiOutlineDelete />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: "center" }}>
                        No banners available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBannerRecruiter;
