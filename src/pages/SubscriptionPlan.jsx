import { useSubscriptionPlans } from "../UseContexts/GeneralUseContext/SubscriptionPlansContext/SubscriptionPlanContext.jsx";
import SubscriptionPlanLoader from "../Loader/Loader.jsx";
import SubscriptionModal from "../editpages/SubscriptionModal.jsx";
import SubscriptionAddModal from "../editpages/SubscriptionAddModal.jsx";
import { IoIosPeople } from "react-icons/io";
import { BiSolidEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbCoinRupeeFilled } from "react-icons/tb";
import { useDashboardMetrics } from "../UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext.jsx";
import "./SubscriptionPlan.css";
import { useState } from "react";
import SubScriptionLimit from "./SubScriptionLimit.jsx";

export default function SubscriptionPlan() {
  // ⬅️ FIXED: Now extracting CRUD functions also
  const {
    subscriptions,
    loading,
    error,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  } = useSubscriptionPlans();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  if (loading) return <SubscriptionPlanLoader />;
  if (error) return <p>Error loading subscriptions: {error}</p>;

  const handleEdit = (sub) => {
    setSelectedSub(sub);
    setIsModalOpen(true);
  };

  const { metrics, loadingMetrics, errorMetrics } = useDashboardMetrics();

  return (
    <>
      <div className="subscription-container">
        {/* Top Cards */}
        <div className="subscription-top-row">
          <div className="subscription-small-cards">
            <div className="subscription-cards-container">
              {/* Card 1 */}
              <div className="subscription-card">
                <div className="subscription-card-body">
                  <div className="subscription-card-left">
                    <div className="subscription-card-icon">
                      <IoIosPeople />
                    </div>
                    <h4>Subscribed Users</h4>
                  </div>
                  <p className="subscription-amount">
                    {metrics?.subscribed_recruiters ?? 0}
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="subscription-card">
                <div className="subscription-card-body">
                  <div className="subscription-card-left">
                    <div className="subscription-card-icon">
                      <TbCoinRupeeFilled />
                    </div>
                    <h4>Total Revenue</h4>
                  </div>
                  <p className="subscription-amount">
                    {metrics?.total_revenue ?? "0.00"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

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
              <h2>Subscription List</h2>
              <button
                className="subscription-add-btn"
                onClick={() => setIsAddModalOpen(true)}
              >
                Add Subscription
              </button>
            </div>

            <div className="subscription-table-container">
              <table className="subscription-table">
                <thead>
                  <tr>
                    <th>Plan Name</th>
                    <th>Price</th>
                    <th>Duration Months</th>
                    <th>Posted On</th>
                    <th>Updated On</th>
                    <th>Content</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {subscriptions.map((sub) => (
                    <tr key={sub.id}>
                      <td>{sub.name}</td>
                      <td>{sub.price}</td>
                      <td>{sub.duration_months} Month</td>
                      <td>{sub.created_at}</td>
                      <td>{sub.updated_at}</td>
                      <td>
                        <ul className="subscription-content-list">
                          {sub.content.map((item, i) => (
                            <li key={i}>{item}</li>
                          ))}
                        </ul>
                      </td>
                      <td className="subscription-actions">
                        <button
                          className="subscription-btn edit-btn"
                          onClick={() => handleEdit(sub)}
                        >
                          <BiSolidEdit />
                        </button>
                        {sub.id !== 2 && (
                          <button
                            className="subscription-btn delete-btn"
                            onClick={() => deleteSubscription(sub.id)}
                          >
                            <AiOutlineDelete />
                          </button>
                        )}
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
          <SubscriptionModal
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

        {/* Subscriptioin Limit Components  */}

        <SubScriptionLimit />
      </div>
    </>
  );
}
