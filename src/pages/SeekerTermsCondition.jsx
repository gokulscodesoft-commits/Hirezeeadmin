import React, { useContext, useState } from "react";
import "./SeekerTermsCondition.css";
import { SeekerTermsContext } from "../UseContexts/SeekerTerms&ConditionContext/SeekerTermsConditionContext";
import SeekerTermsAdd from "../Seekertermscondition/SeekerTermsAdd";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

const SeekerTermsCondition = () => {
  const { terms, loading, deleteTerms } = useContext(SeekerTermsContext);
  const [modal, setModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const handleClick = () => {
    setModal(true);
  };

  const handleEdit = (term) => {
    setEditItem(term);
    setModal(true);
  };

  if (loading) return <p>Loading terms...</p>;

  const handleDelete = async (id) => {
    await deleteTerms(id);
  };

  return (
    <>
      <div className="terms-container">
        <div className="terms-button">
          <h2>Terms and Condition</h2>
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

        <div className="terms-condition-details">
          {terms.map((term, index) => (
            <div key={term.id} className="terms-section">
              {/* <h3>
                {index + 1}. {term.title}{" "}
              </h3> */}

              <div className="terms-header">
                <h3>
                  {index + 1}. {term.title}
                </h3>

                <div className="terms-actions">
                  <button className="edit-btn" onClick={() => handleEdit(term)}>
                    <BiSolidEdit />
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(term.id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </div>
              </div>

              {term.description && (
                <p className="terms-description">{term.description}</p>
              )}

              {Array.isArray(term.points) &&
                term.points.filter(Boolean).length > 0 && (
                  <ul className="terms-points">
                    {term.points.filter(Boolean).map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}

              {term.content && <p className="term-content">{term.content}</p>}
            </div>
          ))}
        </div>
      </div>

      {modal && (
        <SeekerTermsAdd
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

export default SeekerTermsCondition;
