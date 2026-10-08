import React, { useState, useEffect, useContext } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import "./ProvidePartner.css";
import { FaBriefcase, FaEdit, FaTrash, FaCopy, FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { PartnerContext } from "../UseContexts/PartnerUseContext/PartnerContext";

const INDIAN_STATES = [
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

// Convert states to react-select format
const stateOptions = INDIAN_STATES.map((state) => ({
  value: state,
  label: state,
}));

// Custom styles for react-select
const customSelectStyles = {
  control: (base, state) => ({
    ...base,
    padding: "6px 8px",
    border: state.isFocused ? "2px solid #ef6b37" : "1px solid #e9ecef",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: state.isFocused ? "0 0 0 3px rgba(239, 107, 55, 0.1)" : "0 2px 4px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    transition: "all 0.2s ease",
    backgroundColor: "#fff",
    "&:hover": {
      borderColor: "#ef6b37",
    },
  }),
  option: (base, state) => ({
    ...base,
    padding: "10px 12px",
    backgroundColor: state.isSelected
      ? "#ef6b37"
      : state.isFocused
      ? "#f8f9fa"
      : "#fff",
    color: state.isSelected ? "#fff" : "#495057",
    fontWeight: state.isSelected ? 600 : 500,
    cursor: "pointer",
    transition: "all 0.15s ease",
    "&:active": {
      backgroundColor: "#ef6b37",
    },
  }),
  menuList: (base) => ({
    ...base,
    maxHeight: "250px",
    borderRadius: "6px",
  }),
  singleValue: (base) => ({
    ...base,
    color: "#495057",
    fontWeight: 500,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#adb5bd",
  }),
};

const ProvidePartner = () => {
  const {
    partners,
    loading,
    pagination,
    filters,
    fetchPartners,
    addPartner,
    updatePartner,
    deletePartner,
    updateFiltersAndFetch,
    changePage,
  } = useContext(PartnerContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [errors, setErrors] = useState({});
  const [copiedCode, setCopiedCode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteModalId, setDeleteModalId] = useState(null);

  // Fetch partners on component mount
  useEffect(() => {
    fetchPartners(1);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Name: Capitalize first letter
    if (name === "name") {
      processedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    // Convert email to lowercase
    if (name === "email") {
      processedValue = value.toLowerCase();
    }

    // Phone: Allow only digits, max 10
    if (name === "phone") {
      processedValue = value.replace(/\D/g, "").slice(0, 10);
    }

    // Pincode: Allow only digits, max 6
    if (name === "pincode") {
      processedValue = value.replace(/\D/g, "").slice(0, 6);
    }

    // City: Capitalize first letter
    if (name === "city") {
      processedValue = value.charAt(0).toUpperCase() + value.slice(1);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Real-time validation for email
    if (name === "email") {
      if (!processedValue.trim()) {
        setErrors((prev) => ({
          ...prev,
          email: "Email is required",
        }));
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(processedValue)) {
        setErrors((prev) => ({
          ...prev,
          email: "Invalid email format (e.g., user@gmail.com)",
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          email: "",
        }));
      }
    }
    // Real-time validation for phone
    else if (name === "phone") {
      if (!processedValue.trim()) {
        setErrors((prev) => ({
          ...prev,
          phone: "Phone is required",
        }));
      } else if (processedValue.length !== 10) {
        setErrors((prev) => ({
          ...prev,
          phone: `Phone must be 10 digits (${processedValue.length}/10)`,
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          phone: "",
        }));
      }
    } else {
      // Clear error for other fields when user starts typing
      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, "")))
      newErrors.phone = "Phone must be 10 digits";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Pincode must be 6 digits";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddPartner = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const partnerData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      state: formData.state,
      pincode: formData.pincode,
    };

    if (editingId) {
      // Update existing partner
      const result = await updatePartner(editingId, partnerData);
      if (result?.error) {
        // Handle duplicate email/phone errors
        const errorMsg = result.error.toLowerCase();
        if (errorMsg.includes("email")) {
          setErrors((prev) => ({
            ...prev,
            email: "Email already exists",
          }));
        } else if (errorMsg.includes("phone")) {
          setErrors((prev) => ({
            ...prev,
            phone: "Phone already exists",
          }));
        }
      } else if (result) {
        setEditingId(null);
        resetForm();
        scrollToTop();
      }
    } else {
      // Add new partner
      const result = await addPartner(partnerData);
      if (result?.error) {
        // Handle duplicate email/phone errors
        const errorMsg = result.error.toLowerCase();
        if (errorMsg.includes("email")) {
          setErrors((prev) => ({
            ...prev,
            email: "Email already exists",
          }));
        } else if (errorMsg.includes("phone")) {
          setErrors((prev) => ({
            ...prev,
            phone: "Phone already exists",
          }));
        }
      } else if (result) {
        resetForm();
        scrollToTop();
      }
    }
  };

  const scrollToTop = () => {
    setTimeout(() => {
      const container = document.querySelector(".provide-partner-container");
      if (container) {
        container.scrollTop = 0;
      }
    }, 100);
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      pincode: "",
    });
    setErrors({});
    setEditingId(null);
  };

  const handleEditPartner = (partner) => {
    setFormData({
      name: partner.name,
      email: partner.email,
      phone: partner.phone,
      address: partner.address,
      city: partner.city,
      state: partner.state,
      pincode: partner.pincode,
    });
    setEditingId(partner.id);

    // Scroll to form section
    setTimeout(() => {
      const formSection = document.querySelector(".partner-form-section");
      if (formSection) {
        formSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 0);
  };

  const handleDeletePartner = (id) => {
    setDeleteModalId(id);
  };

  const confirmDelete = async () => {
    if (deleteModalId) {
      await deletePartner(deleteModalId);
      setDeleteModalId(null);
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Referral code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleSearch = (e) => {
    const search = e.target.value;
    setSearchTerm(search);
    updateFiltersAndFetch({ search });
  };

  const handlePreviousPage = () => {
    if (pagination.current_page > 1) {
      changePage(pagination.current_page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.current_page < pagination.pages) {
      changePage(pagination.current_page + 1);
    }
  };

  return (
    <div className="provide-partner-container">
      {/* Header */}
      <div className="partner-header">
        <h1>
          <FaBriefcase className="header-icon" />
          Partner Program
        </h1>
        <p className="subtitle">Manage partner/distributor accounts</p>
      </div>

      {/* Form Section */}
      <div className="partner-form-section">
        <h2>{editingId ? "Edit Partner" : "Add New Partner Program"}</h2>
        <form onSubmit={handleAddPartner} className="partner-form">
          <div className="form-row">
            <div className="form-group">
              <label>
                Name <span>*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Partner name"
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && (
                <span className="error-message">{errors.name}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Email <span>*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Phone <span>*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className={errors.phone ? "input-error" : ""}
              />
              {errors.phone && (
                <span className="error-message">{errors.phone}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group full-width">
              <label>
                Address <span>*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Street address"
                className={errors.address ? "input-error" : ""}
              />
              {errors.address && (
                <span className="error-message">{errors.address}</span>
              )}
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                State <span>*</span>
              </label>
              <Select
                name="state"
                options={stateOptions}
                value={
                  formData.state
                    ? { value: formData.state, label: formData.state }
                    : null
                }
                onChange={(option) => {
                  if (option) {
                    setFormData((prev) => ({
                      ...prev,
                      state: option.value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      state: "",
                    }));
                  }
                }}
                placeholder="-- Select State --"
                isClearable={false}
                isSearchable
                styles={customSelectStyles}
                className={errors.state ? "react-select-error" : ""}
              />
              {errors.state && (
                <span className="error-message">{errors.state}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                City <span>*</span>
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City name"
                className={errors.city ? "input-error" : ""}
              />
              {errors.city && (
                <span className="error-message">{errors.city}</span>
              )}
            </div>
            <div className="form-group">
              <label>
                Pincode <span>*</span>
              </label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className={errors.pincode ? "input-error" : ""}
              />
              {errors.pincode && (
                <span className="error-message">{errors.pincode}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn-submit" disabled={loading}>
              {loading
                ? "Processing..."
                : editingId
                ? "Update Partner"
                : "Add Partner"}
            </button>
            {editingId && (
              <button type="button" className="btn-cancel" onClick={resetForm}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Partners Table Section */}
      <div className="partner-table-section">
        <div className="table-header">
          <h2>All Partners ({pagination.total})</h2>
          <div className="filter-controls">
            <input
              type="text"
              placeholder="Search by name, email, phone..."
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <Select
              options={[
                { value: "", label: "All States" },
                ...stateOptions,
              ]}
              value={
                filters.state
                  ? { value: filters.state, label: filters.state }
                  : { value: "", label: "All States" }
              }
              onChange={(option) => {
                updateFiltersAndFetch({ state: option.value });
              }}
              placeholder="All States"
              isClearable={false}
              isSearchable
              styles={customSelectStyles}
              className="filter-select-container"
            />
          </div>
        </div>

        {/* Pagination */}
        {partners.length > 0 && (
          <div className="pagination-controls">
            <span className="pagination-info">
              {(pagination.current_page - 1) * pagination.limit + 1}-
              {Math.min(
                pagination.current_page * pagination.limit,
                pagination.total
              )}{" "}
              of {pagination.total}
            </span>
            <div className="pagination-buttons">
              <button
                onClick={handlePreviousPage}
                disabled={pagination.current_page === 1 || loading}
                className="pagination-btn"
              >
                ❮
              </button>
              <button
                onClick={handleNextPage}
                disabled={
                  pagination.current_page >= pagination.pages || loading
                }
                className="pagination-btn"
              >
                ❯
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <p className="loading-state">Loading partners...</p>
        ) : partners.length === 0 ? (
          <p className="empty-state">No partners found</p>
        ) : (
          <div className="partner-table-wrapper">
            <table className="partner-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Referral Code</th>
                  <th>Created Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {partners.map((partner, index) => (
                  <tr key={partner.id}>
                    <td className="number-cell">
                      {(pagination.current_page - 1) * pagination.limit +
                        index +
                        1}
                    </td>
                    <td className="name-cell">{partner.name}</td>
                    <td className="email-cell">{partner.email}</td>
                    <td className="phone-cell">{partner.phone}</td>
                    <td className="city-cell">{partner.city}</td>
                    <td className="state-cell">{partner.state}</td>
                    <td className="code-cell">
                      <div className="code-container">
                        <code className="code-badge">
                          {partner.referral_code}
                        </code>
                        <button
                          className={`copy-btn ${
                            copiedCode === partner.referral_code ? "copied" : ""
                          }`}
                          onClick={() => handleCopyCode(partner.referral_code)}
                          title="Copy referral code"
                        >
                          {copiedCode === partner.referral_code ? (
                            <FaCheck />
                          ) : (
                            <FaCopy />
                          )}
                        </button>
                      </div>
                    </td>
                    <td className="date-cell">
                      {new Date(partner.created_at).toLocaleDateString()}
                    </td>
                    <td className="actions-cell">
                      <button
                        className="action-btn edit-btn"
                        onClick={() => handleEditPartner(partner)}
                        title="Edit partner"
                        disabled={loading}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="action-btn delete-btn"
                        onClick={() => handleDeletePartner(partner.id)}
                        title="Delete partner"
                        disabled={loading}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModalId && (
        <div className="modal-overlay">
          <div className="delete-modal-content">
            <div className="delete-modal-header">
              <FaExclamationTriangle className="warning-icon" />
              <h3>Delete Partner</h3>
            </div>
            <p className="delete-modal-message">
              Are you sure you want to delete this partner?
            </p>
            <div className="delete-modal-warning">
              <p>
                <span className="warning-label">Note:</span> If you delete this partner,
                the referral code will be deactivated and seekers cannot use it anymore.
              </p>
            </div>
            <div className="modal-actions">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setDeleteModalId(null)}
              >
                Cancel
              </button>
              <button
                className="modal-btn delete-btn"
                onClick={confirmDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProvidePartner;
