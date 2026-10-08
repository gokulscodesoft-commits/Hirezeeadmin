import React, { useContext } from "react";
import "./SubScriptionLimit.css";
import {
  SubscriptionPlanContext,
  useSubscriptionPlans,
} from "../UseContexts/GeneralUseContext/SubscriptionPlansContext/SubscriptionPlanContext.jsx";

import SubscriptionPlanLoader from "../Loader/Loader.jsx";
import SubscriptionModal from "../editpages/SubscriptionModal.jsx";
import SubscriptionAddModal from "../editpages/SubscriptionAddModal.jsx";
import { IoIosPeople } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { useDashboardMetrics } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext.jsx";
import { useState } from "react";
import SubScriptionLimitModel from "../editpages/SubScriptionLimitModel.jsx";

const SubScriptionLimit = () => {
  const {
    subscriptions,
    loading,
    error,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  } = useContext(SubscriptionPlanContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (loading) return <SubscriptionPlanLoader />;
  if (error) return <p>Error loading subscriptions: {error}</p>;

  const handleEdit = (sub) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="subscription-container">
        {/* Top Cards */}

        {/* Subscription Table */}
        <div className="subscription-rec-seek">
          <div className="subscription-section">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <h2>Subscription Limit List</h2>
              {/* <button className="subscription-add-btn" onClick={() => setIsAddModalOpen(true)}>
                   Add Subscription
                 </button> */}
            </div>

            <div className="subscription-table-container">
              <table className="subscription-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>AI Limits</th>
                    <th>Applicant views</th>
                    <th>Total Job post</th>
                    <th>Contact Details</th>
                    <th>View Type</th>
                    <th>Trial Days</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.name}</td>
                      <td>
                        {sub.limits.ai_limit === null
                          ? "null"
                          : sub.limits.ai_limit}
                      </td>
                      <td>
                        {sub.limits.applicant_views === null
                          ? "null"
                          : sub.limits.applicant_views}
                      </td>
                      <td>
                        {sub.limits.job_posts_per_month === null
                          ? "null"
                          : sub.limits.job_posts_per_month}
                      </td>
                      <td>
                        {sub.limits.show_contact_details === null
                          ? "null"
                          : String(sub.limits.show_contact_details)}
                      </td>

                      <td>{sub.limits?.views_type || "null"}</td>

                      <td>
                        {sub.limits.trial_days || "null"}
                      </td>

                      <td className="subscription-actions">
                        <button
                          className="subscription-btn edit-btn"
                          onClick={() => handleEdit(sub)}
                        >
                          <BiSolidEdit />
                        </button>
                        {/* <button
                             className="subscription-btn delete-btn"
                             onClick={() => deleteSubscription(sub.id)}
                           >
                             <AiOutlineDelete />
                           </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* --- EDIT MODAL --- */}
        {isModalOpen && (
          <SubScriptionLimitModel
            subscription={selectedSub}
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={(id, updatedData) => {
              updateSubscription(id, updatedData); // ⬅️ FIXED
              setIsModalOpen(false);
            }}
          />
        )}

        {/* --- ADD MODAL --- */}
        {isAddModalOpen && (
          <SubscriptionAddModal
            isOpen={isAddModalOpen}
            onClose={() => setIsAddModalOpen(false)}
            onSave={(payload) => {
              addSubscription(payload); // ⬅️ FIXED
              setIsAddModalOpen(false);
            }}
          />
        )}
      </div>
    </>
  );
};

export default SubScriptionLimit;
