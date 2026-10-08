import React, { useState } from "react";
import "./SubscriptionAddModal.css";

export default function SubscriptionAddModal({ isOpen, onClose, onSave }) {
  if (!isOpen) return null;

  const emptyForm = {
    name: "",
    price: "",
    duration_months: "",

    content: [""],

    ai_limit: "",
    applicant_views: "",
    job_posts_per_month: "",
    show_contact_details: "",
    views_type: "",
  };

  const [form, setForm] = useState(emptyForm);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleContentChange = (index, value) => {
  //   const updated = [...form.content];
  //   updated[index] = value;
  //   setForm({ ...form, content: updated });
  // };

  // const handleAddLine = () => {
  //   setForm({ ...form, content: [...form.content, ""] });
  // };

  // const handleRemoveLine = (index) => {
  //   const updated = form.content.filter((_, i) => i !== index);
  //   setForm({ ...form, content: updated.length ? updated : [""] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      name: form.name,
      price: Number(form.price),
      duration_months: Number(form.duration_months),

      content: form.content.filter((c) => c.trim() !== ""),

      limits: {
        ai_limit: form.ai_limit ? Number(form.ai_limit) : null,
        applicant_views: form.applicant_views
          ? Number(form.applicant_views)
          : null,
        job_posts_per_month: form.job_posts_per_month
          ? Number(form.job_posts_per_month)
          : null,

        show_contact_details:
          form.show_contact_details === "true"
            ? true
            : form.show_contact_details === "false"
            ? false
            : null,

        // ✅ VERY IMPORTANT
        views_type: form.views_type || "per_job",
      },
    };

    await onSave(payload);
    setForm(emptyForm);
    onClose();
  };

  return (
    <div className="subscriptionaddmodal-overlay">
      <div className="subscriptionaddmodal-content">
        <div className="button-headline">
          <h3>Add Subscription Plans</h3>

          <button type="button" className="cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>Plan Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter plan name"
            required
          />

          <label>Price</label>
          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="e.g. 999.00"
            required
          />

          <label htmlFor="duration_months">Duration (Months)</label>
          <input
            id="duration_months"
            name="duration_months"
            value={form.duration_months}
            onChange={handleChange}
            placeholder="e.g. 6"
          />

          <label htmlFor="subscription_features">
            Subscription Features (one per line)
          </label>
          <textarea
            id="subscription_features"
            name="content"
            value={form.content.join("\n")}
            className="subscription-features-textarea"
            placeholder={
              "Unlimited job posts\nPriority support\nAdvanced analytics\nCustom branding"
            }
            onChange={(e) =>
              setForm({
                ...form,
                content: e.target.value.split("\n"),
              })
            }
            rows={6}
          />

          <div className="subscription-limits-section">
            <h4 className="subscription-limits-title">Limits</h4>

            <div className="subscription-limits-grid">
              <div className="subscription-limits-field">
                <label htmlFor="ai_limit">AI Limit</label>
                <input
                  id="ai_limit"
                  name="ai_limit"
                  value={form.ai_limit}
                  onChange={handleChange}
                  placeholder="Enter AI limit"
                />
              </div>

              <div className="subscription-limits-field">
                <label htmlFor="applicant_views">Applicant Views</label>
                <input
                  id="applicant_views"
                  name="applicant_views"
                  value={form.applicant_views}
                  onChange={handleChange}
                  placeholder="Enter applicant views"
                />
              </div>

              <div className="subscription-limits-field">
                <label htmlFor="job_posts_per_month">Total Job Posts</label>
                <input
                  id="job_posts_per_month"
                  name="job_posts_per_month"
                  value={form.job_posts_per_month}
                  onChange={handleChange}
                  placeholder="Enter job posts total"
                />
              </div>
              <div className="subscription-limits-field">
                <label htmlFor="show_contact_details">
                  Show Contact Details (true or false)
                </label>
                <input
                  id="show_contact_details"
                  name="show_contact_details"
                  value={form.show_contact_details}
                  onChange={handleChange}
                  placeholder="true or false"
                />
              </div>

              <div className="subscription-limits-field">
                <label>Views Type (Enter this per_job)</label>
                <input
                  id="views_type"
                  name="views_type"
                  value={form.views_type}
                  onChange={handleChange}
                  placeholder="per_job"
                />
              </div>
            </div>
          </div>

          <div className="subscriptionaddmodal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              Cancel
            </button>

            <button type="submit" className="save-btn">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
