import React, { useContext, useState } from "react";
import "./RazorPayInvoiceDetails.css";
import { RecruiterInvoiceContext } from "../UseContexts/RazorpayInvoiceDetailsContext/RazorpayInvoiceDetailsContext";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const RazorPayInvoiceDetails = () => {
  const { data, loading } = useContext(RecruiterInvoiceContext);
  const [statusFilter, setStatusFilter] = useState("active");

  const [showModal, setShowModal] = useState(false);
  const [tempName, setTempName] = useState("");
  const [tempPhone, setTempPhone] = useState("");

  const [searchName, setSearchName] = useState("");
  const [searchPhone, setSearchPhone] = useState("");

  const companyDetails = [
    {
      company_name: "SUBASHREE ENTERPRISES",
      owner_name: "Rangabashyam Surendran R",
      street: "5/67, New Street, Vandavasi Taluk,",
      city: "Vandavasi",
      district: "Tiruvannamalai",
      state: "Tamil Nadu",
      pincode: "604408",
      email: "support@hireezee.co.in",
      phone: "+91 9790029577",
    },
  ];

  // Filter based on status
  //   const filteredData = data.filter(
  //     (item) => item.subscription_status === statusFilter
  //   );

  const filteredData = data.filter((item) => {
    const matchStatus = item.subscription_status === statusFilter;

    const matchName = item.school_name
      ?.toLowerCase()
      .includes(searchName.toLowerCase());

    const matchPhone = item.phone_number
      ?.toLowerCase()
      .includes(searchPhone.toLowerCase());

    return matchStatus && matchName && matchPhone;
  });

  const formatDate = (date) => {
    if (!date) return "-";
    const d = new Date(date);
    return d.toLocaleDateString("en-GB"); // DD-MM-YYYY
  };
  const downloadInvoice = (item) => {
    const company = companyDetails[0];
    const doc = new jsPDF();

    // ===== COMPANY HEADER =====
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(company.company_name, 14, 20);

    doc.setFontSize(11);
    doc.text(`Owner: ${company.owner_name}`, 14, 27);
    doc.text(`${company.street}, ${company.city}, ${company.district}`, 14, 34);
    doc.text(`${company.state} - ${company.pincode}`, 14, 41);
    doc.text(`Email: ${company.email}`, 14, 48);
    doc.text(`Phone: ${company.phone}`, 14, 55);

    // ===== INVOICE TITLE =====

    // ===== INVOICE TITLE =====
    const pageWidth = doc.internal.pageSize.getWidth();
    const rightX = pageWidth - 14; // Right margin spacing

    doc.setFontSize(16);
    doc.text("INVOICE", rightX, 20, { align: "right" });

    doc.setFontSize(11);
    doc.text(`Invoice Date: ${formatDate(new Date())}`, rightX, 30, {
      align: "right",
    });
    doc.text(`Payment ID: ${item.payment_id}`, rightX, 37, { align: "right" });

    // doc.setFontSize(16);
    // doc.text("INVOICE", 160, 20);

    // doc.setFontSize(11);
    // doc.text(`Invoice Date: ${formatDate(new Date())}`, 150, 30);
    // doc.text(`Payment ID: ${item.payment_id}`, 150, 37);

    // ===== CUSTOMER DETAILS =====
    doc.setFontSize(13);
    doc.text("Bill To:", 14, 70);

    doc.setFontSize(11);
    doc.text(`School Name: ${item.school_name}`, 14, 78);
    doc.text(`Phone: ${item.phone_number}`, 14, 85);
    doc.text(`Email: ${item.school_email}`, 14, 92);

    // ===== TABLE =====
    autoTable(doc, {
      startY: 105,
      head: [
        [
          "Plan",
          "Duration (Months)",
          "Start Date",
          "End Date",
          "Price",
          "Amount Paid",
        ],
      ],
      body: [
        [
          item.plan_name,
          item.duration_months,
          formatDate(item.start_date),
          formatDate(item.end_date),
          `₹ ${item.price}`,
          `₹ ${item.amount}`,
        ],
      ],
    });

    // ===== FOOTER =====
    const finalY = doc.lastAutoTable.finalY + 20;

    doc.setFontSize(11);
    doc.text(`Subscription Status: ${item.subscription_status}`, 14, finalY);
    doc.text(`Payment Status: ${item.payment_status}`, 14, finalY + 7);
    doc.text(`Gateway: ${item.gateway_name}`, 14, finalY + 14);

    doc.setFontSize(12);
    doc.text("Thank you for your business!", 14, finalY + 28);

    doc.save(`Invoice_${item.school_name}.pdf`);
  };

  if (loading) return <p>Loading....</p>;

  return (
    <>
      {/* Company Details  */}
      {/* ================= COMPANY DETAILS ================= */}

      <div className="company-section">
        {companyDetails.map((company, index) => (
          <div key={index} className="company-card">
            <div className="company-left">
              <h2 className="company-name">{company.company_name}</h2>
              <p>{company.owner_name}</p>
              <p>{company.street}</p>
              <p>
                {company.city}, {company.district}
              </p>
              <p>
                {company.state} - {company.pincode}
              </p>
            </div>

            <div className="company-right">
              <p>
                <strong>Email:</strong> {company.email}
              </p>
              <p>
                <strong>Phone:</strong> {company.phone}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Razor Pay Invoice Details  */}
      <div className="invoice-container">
        <div className="top-bar">
          <button className="advanced-btn" onClick={() => setShowModal(true)}>
            Advanced Search
          </button>
        </div>

        <h2 className="page-title">Recruiter Invoice Details</h2>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button
            className={statusFilter === "active" ? "active-btn" : ""}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>

          <button
            className={statusFilter === "expired" ? "active-btn" : ""}
            onClick={() => setStatusFilter("expired")}
          >
            Expired
          </button>
        </div>

        {/* Table */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="table-wrapper">
            <table className="invoice-table">
              <thead>
                <tr>
                  <th>School Name</th>
                  <th>School Phone</th>
                  <th>School Email</th>
                  <th>Plan</th>
                  <th>Price</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Duration Months</th>
                  <th>Amount</th>
                  <th>Subscription Status</th>
                  <th>Payment Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.school_name}</td>
                      <td>{item.phone_number}</td>
                      <td>{item.school_email}</td>
                      <td>{item.plan_name}</td>
                      <td>₹ {item.price}</td>
                      <td>{formatDate(item.start_date)}</td>
                      <td>{formatDate(item.end_date)}</td>
                      <td>{item.duration_months}</td>

                      <td>₹ {item.amount}</td>
                      <td>
                        <span
                          className={
                            item.subscription_status === "active"
                              ? "status-active"
                              : "status-expired"
                          }
                        >
                          {item.subscription_status}
                        </span>
                      </td>

                      <td>
                        <span
                          className={`payment-badge ${item.payment_status}`}
                        >
                          {item.payment_status}
                        </span>
                      </td>

                      <td>
                        <button
                          className="download-btn"
                          onClick={() => downloadInvoice(item)}
                        >
                          Download PDF
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Search  */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Advanced Search</h3>

            <input
              type="text"
              placeholder="School Name"
              value={tempName}
              onChange={(e) => setTempName(e.target.value)}
            />

            <input
              type="text"
              placeholder="School Phone"
              value={tempPhone}
              onChange={(e) => setTempPhone(e.target.value)}
            />

            <div className="modal-buttons">
              <button
                className="search-btn"
                onClick={() => {
                  setSearchName(tempName);
                  setSearchPhone(tempPhone);
                  setShowModal(false);
                }}
              >
                Search
              </button>

              <button
                className="cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setTempName("");
                  setTempPhone("");
                  setSearchName("");
                  setSearchPhone("");
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RazorPayInvoiceDetails;
