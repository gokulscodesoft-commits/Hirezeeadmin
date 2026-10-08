import React, { useState, useEffect } from "react";
import "./SubscriptionModal.css";

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSave,
  subscription,
}) {
  if (!isOpen) return null;

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [contentText, setContentText] = useState("");
  const [durationMonths, setDurationMonths] = useState("");

  useEffect(() => {
    if (subscription) {
      setName(subscription.name || "");
      setPrice(subscription.price || "");
      setDurationMonths(subscription.duration_months || ""); // default
      setContentText(subscription.content.join("\n"));
    }
  }, [subscription]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: name.trim(),
      price: Number(price),
      duration_months: Number(durationMonths),
      content: contentText
        .split("\n")
        .map((i) => i.trim())
        .filter(Boolean),
    };

    await onSave(subscription.id, updatedData);
    onClose();
  };

  return (
    <div className="subscriptionmodal-overlay">
      <div className="subscriptionmodal-content">
        <h3>Edit Subscription Price</h3>

        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Price</label>
          <input value={price} onChange={(e) => setPrice(e.target.value)} />

          <label>Duration (Months)</label>
          <input
            // type="text"
            value={durationMonths}
            onChange={(e) => setDurationMonths(e.target.value)}
          />

          <label>Content (each point on a new line)</label>
          <textarea
            value={contentText}
            onChange={(e) => setContentText(e.target.value)}
            rows={8}
          ></textarea>

          <div className="subscriptionmodal-actions">
            <button
              type="button"
              onClick={onClose}
              className="subscriptionmodal-cancel-btn"
            >
              Cancel
            </button>
            <button type="submit" className="subscriptionmodal-save-btn">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
