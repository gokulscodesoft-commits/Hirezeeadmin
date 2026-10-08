import React, { useContext, useState } from "react";
import "./SeekerPrivacyPolicy.css";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

import { SeekerPrivacyContext } from "../UseContexts/SeekerTerms&ConditionContext/SeekerPrivacyPolicyContext";
import SeekerPrivacyAdd from "./../Seekertermscondition/SeekerPrivacyAdd";

const SeekerPrivacyPolicy = () => {
  const { privacy, loading, deletePrivacy } = useContext(SeekerPrivacyContext);

  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (term) => {
    setEditItem(term);
    setModal(true);
  };

  if (loading) return <p>Loading Privacy & Policy...</p>;

  const handleDelete = async (id) => {
    await deletePrivacy(id);
  };

  return (
    <>
      <div className="privacy-container">
        <div className="privacy-button">
          <h2>Privacy & Policy</h2>
          <button
            className="add-btn"
            onClick={() => {
              setEditItem(null);
              setModal(true);
            }}
          >
            Add
          </button>
        </div>

        <div className="privacy-condition-details">
          {privacy.map((privacy, index) => (
            <div key={privacy.id} className="privacy-section">
              <div className="privacy-header">
                <h3>
                  {index + 1}. {privacy.title}
                </h3>

                <div className="privacy-actions">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(privacy)}
                  >
                    <BiSolidEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(privacy.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>

              {privacy.description && (
                <p className="privacy-description">{privacy.description}</p>
              )}

              {Array.isArray(privacy.points) &&
                privacy.points.filter(Boolean).length > 0 && (
                  <ul className="privacy-points">
                    {privacy.points.filter(Boolean).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

              {privacy.content && (
                <p className="privacy-content">{privacy.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <SeekerPrivacyAdd
          editData={editItem}
          onClose={() => {
            setModal(false);
            setEditItem(null);
          }}
        />
      )}
    </>
  );
};

export default SeekerPrivacyPolicy;
