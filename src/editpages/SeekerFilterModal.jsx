import React, { useState, useEffect } from "react";
import "./SeekerFilterModal.css";
import axios from "axios";
import CustomSelect from "../components/CustomSelect.jsx";

export default function SeekerFilterModal({
  filters = {},
  setFilters,
  onClose,
}) {
  const [specializations, setSpecializations] = useState([]);
  const [pincodes, setPincodes] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [taluks, setTaluks] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Title Case every word (e.g. "data entry operator" -> "Data Entry Operator")
  const capitalizeFirst = (value) =>
    value
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");

  // 🔹 Dedup values that only differ by case/whitespace (e.g. "Receptionist" vs "receptionist")
  const dedupeCaseInsensitive = (values) => {
    const seen = new Map();
    values.forEach((value) => {
      const trimmed = capitalizeFirst(value.trim());
      const key = trimmed.toLowerCase();
      if (!seen.has(key)) seen.set(key, trimmed);
    });
    return [...seen.values()];
  };

  // 🔹 Local state for modal selections
  const [localFilters, setLocalFilters] = useState({
    specialization: filters.specialization || "",
    pincode: filters.pincode || "",
    status: filters.status || "",
    school_name: filters.school_name || "",
    phone: filters.phone || "",
    district: filters.district || "",
    taluk: filters.taluk || "",
  });

  // 🔹 Fetch unique filter values
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin-user-details`
        );
        const users = response.data?.users || [];

        const specs = dedupeCaseInsensitive(
          users.map((u) => u.course?.specialization).filter(Boolean)
        );
        const pins = [
          ...new Set(users.map((u) => u.address?.pincode).filter(Boolean)),
        ];
        const stats = [
          ...new Set(users.flatMap((u) => u.status || []).filter(Boolean)),
        ];
        const dists = dedupeCaseInsensitive(
          users.map((u) => u.address?.area).filter(Boolean)
        );
        const tlks = dedupeCaseInsensitive(
          users.map((u) => u.address?.city).filter(Boolean)
        );

        setSpecializations(specs);
        setPincodes(pins);
        setStatuses(stats);
        setDistricts(dists);
        setTaluks(tlks);
      } catch (err) {
        console.error("Error fetching users:", err);
        setSpecializations([]);
        setPincodes([]);
        setStatuses([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // 🔹 Apply selections to parent state
  const handleApply = () => {
    setFilters(localFilters);
    onClose();
  };

  // 🔹 Clear selections
  const handleClear = () => {
    const emptyFilters = {
      specialization: "",
      pincode: "",
      status: "",
      name: "",
      phone: "",
      district: "",
      taluk: "",
    };
    setLocalFilters(emptyFilters);
    setFilters(emptyFilters);
  };

  return (
    <div className="seeker-filter-modal-overlay">
      <div className="seeker-filter-modal-content">
        <div className="seeker-filter-modal-header">
          <button
            className="seeker-filter-header-clear-btn"
            onClick={handleClear}
          >
            Clear
          </button>
          <h2>Advanced Search Filters</h2>
          <button className="seeker-filter-close-btn" onClick={onClose}>
            ✖
          </button>
        </div>

        {/* Specialization */}
        <label>
          Specialization:
          <CustomSelect
            value={localFilters.specialization}
            onChange={(value) =>
              setLocalFilters({
                ...localFilters,
                specialization: value,
              })
            }
            options={[
              { value: "", label: "All" },
              ...specializations
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map((spec) => ({
                  value: spec,
                  label: spec,
                })),
            ]}
            placeholder="Select specialization"
          />
        </label>

        {/* Pincode */}
        <label>
          Pincode:
          <CustomSelect
            value={localFilters.pincode}
            onChange={(value) =>
              setLocalFilters({ ...localFilters, pincode: value })
            }
            options={[
              { value: "", label: "All" },
              ...pincodes.map((pin) => ({
                value: pin,
                label: pin,
              })),
            ]}
            placeholder="Select pincode"
          />
        </label>

        {/* Status */}
        <label>
          Status:
          <CustomSelect
            value={localFilters.status}
            onChange={(value) =>
              setLocalFilters({ ...localFilters, status: value })
            }
            options={[
              { value: "", label: "All" },
              ...statuses.map((st) => ({
                value: st,
                label: st,
              })),
            ]}
            placeholder="Select status"
          />
        </label>

        {/* District */}
        <label>
          District:
          <CustomSelect
            value={localFilters.district}
            onChange={(value) =>
              setLocalFilters({ ...localFilters, district: value })
            }
            options={[
              { value: "", label: "All" },
              ...districts
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map((dist) => ({
                  value: dist,
                  label: dist,
                })),
            ]}
            placeholder="Select district"
          />
        </label>

        {/* Taluk */}
        <label>
          Taluk:
          <CustomSelect
            value={localFilters.taluk}
            onChange={(value) =>
              setLocalFilters({ ...localFilters, taluk: value })
            }
            options={[
              { value: "", label: "All" },
              ...taluks
                .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                .map((tlk) => ({
                  value: tlk,
                  label: tlk,
                })),
            ]}
            placeholder="Select taluk"
          />
        </label>

        <div className="recruiter-search-field-group">
          <label className="recruiter-search-label">Seeker Name</label>
          <input
            type="text"
            className="recruiter-search-input"
            placeholder="Search Name"
            value={localFilters.name}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                name: e.target.value,
              })
            }
          />
        </div>
        <div className="recruiter-search-field-group">
          <label className="recruiter-search-label">Phone Number</label>
          <input
            type="text"
            className="recruiter-search-input"
            placeholder="Phone Number"
            value={localFilters.phone}
            onChange={(e) =>
              setLocalFilters({
                ...localFilters,
                phone: e.target.value,
              })
            }
          />
        </div>

        {/* Actions */}
        <div className="seeker-filter-modal-actions">
          <button className="seeker-filter-clear-btn" onClick={handleClear}>
            Clear
          </button>
          <button className="seeker-filter-apply-btn" onClick={handleApply}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
