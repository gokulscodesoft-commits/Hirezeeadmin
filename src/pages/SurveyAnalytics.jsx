import React, { useContext, useState } from "react";
import { SurveyAnalyticsContext } from "../UseContexts/GeneralUseContext/SurveyAnalyticsContext/SurveyAnalyticsContext.jsx";
import { MdEmail, MdPhone, MdDownload } from "react-icons/md";
import { FaChartBar, FaUsers } from "react-icons/fa";
import "./SurveyAnalytics.css";

export default function SurveyAnalytics() {
  const { analytics, loading, error } = useContext(SurveyAnalyticsContext);
  const [selectedSet, setSelectedSet] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Initialize with first set on load
  React.useEffect(() => {
    if (
      analytics &&
      analytics.by_set &&
      analytics.by_set.length > 0 &&
      selectedSet === null
    ) {
      const firstSetNumber = analytics.by_set[0].set_number;
      setSelectedSet(firstSetNumber);
      // Set first question as default
      const firstQuestion = analytics.by_set[0].questions[0];
      if (firstQuestion) {
        setSelectedQuestion(firstQuestion.question_id);
      }
    }
  }, [analytics, selectedSet]);

  // Reset pagination when search or question changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedQuestion]);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getUserTypeColor = (userType) => {
    return userType === "seeker" ? "seeker" : "recruiter";
  };

  const getUserTypeLabel = (userType) => {
    return userType === "seeker" ? "Seeker" : "Recruiter";
  };

  // Get filtered responses based on search
  const getFilteredResponses = () => {
    if (!selectedSet || !selectedQuestion) return [];

    const set = analytics.by_set.find((s) => s.set_number === selectedSet);
    if (!set) return [];

    const question = set.questions.find(
      (q) => q.question_id === selectedQuestion
    );
    if (!question) return [];

    return question.responses.filter(
      (response) =>
        response.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        response.phone_number?.includes(searchTerm.toLowerCase()) ||
        response.answer?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const calculateStats = () => {
    if (!analytics) return { seekers: 0, recruiters: 0 };

    const allResponses = analytics.by_set.flatMap((set) =>
      set.questions.flatMap((q) => q.responses || [])
    );

    return {
      seekers: allResponses.filter((r) => r.user_type === "seeker").length,
      recruiters: allResponses.filter((r) => r.user_type === "recruiter")
        .length,
    };
  };

  const stats = calculateStats();
  const filteredResponses = getFilteredResponses();
  const currentQuestion =
    selectedSet && selectedQuestion
      ? analytics.by_set
          .find((s) => s.set_number === selectedSet)
          ?.questions.find((q) => q.question_id === selectedQuestion)
      : null;

  // Pagination calculations
  const totalResponses = filteredResponses.length;
  const totalPages = Math.ceil(totalResponses / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const paginatedResponses = filteredResponses.slice(indexOfFirst, indexOfLast);

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (loading) {
    return <div className="survey-analytics-loading">Loading analytics...</div>;
  }

  if (error) {
    return <div className="survey-analytics-error">Error: {error}</div>;
  }

  if (!analytics || !analytics.by_set || analytics.by_set.length === 0) {
    return (
      <div className="survey-analytics-empty">
        <FaChartBar size={48} />
        <p>No survey responses yet</p>
        <small>Responses will appear here once users submit surveys</small>
      </div>
    );
  }

  return (
    <div className="survey-analytics-container">
      {/* Header */}
      <div className="survey-analytics-header">
        <div>
          <h1>Survey Analytics</h1>
          <p className="subtitle">
            View detailed survey responses from seekers and recruiters
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="survey-stats-grid">
        <div className="stat-card">
          <div className="stat-icon total">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <p className="stat-label">Total Responses</p>
            <h3>{analytics.total_responses || 0}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon seekers">
            <FaUsers />
          </div>
          <div className="stat-content">
            <p className="stat-label">Seeker Responses</p>
            <h3>{stats.seekers}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon recruiters">
            <FaUsers />
          </div>
          <div className="stat-content">
            <p className="stat-label">Recruiter Responses</p>
            <h3>{stats.recruiters}</h3>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon sets">
            <FaChartBar />
          </div>
          <div className="stat-content">
            <p className="stat-label">Survey Sets</p>
            <h3>{analytics.by_set?.length || 0}</h3>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="survey-analytics-main">
        {/* Sidebar - Sets */}
        <div className="survey-sidebar">
          <h3>Survey Sets</h3>
          <div className="survey-sets-list">
            {analytics.by_set.map((set) => (
              <button
                key={set.set_number}
                className={`set-button ${
                  selectedSet === set.set_number ? "active" : ""
                }`}
                onClick={() => {
                  setSelectedSet(set.set_number);
                  setSelectedQuestion(null);
                  setSearchTerm("");
                }}
              >
                <span className="set-name">Set {set.set_number}</span>
                <span className="set-count">{set.total_responses}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="survey-content">
          {selectedSet ? (
            <>
              {/* Questions List */}
              <div className="survey-questions-section">
                <h3>Questions in Set {selectedSet}</h3>
                <div className="questions-grid">
                  {analytics.by_set
                    .find((s) => s.set_number === selectedSet)
                    ?.questions.map((question) => (
                      <button
                        key={question.question_id}
                        className={`question-card ${
                          selectedQuestion === question.question_id
                            ? "active"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedQuestion(question.question_id);
                          setSearchTerm("");
                        }}
                      >
                        <div className="question-title">
                          {question.question}
                        </div>
                        <div className="question-meta">
                          <span className="question-type">
                            {question.question_type}
                          </span>
                          <span className="response-badge">
                            {question.responses?.length || 0}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Responses Table */}
              {selectedQuestion && (
                <div className="survey-responses-section">
                  <div className="responses-header">
                    <div>
                      <h3>{currentQuestion?.question}</h3>
                      <p className="response-count">
                        {filteredResponses.length} of{" "}
                        {currentQuestion?.responses?.length || 0} responses
                      </p>
                    </div>
                    <div className="responses-header-right">
                      {/* Pagination */}
                      <div className="pagination-controls-top">
                        <span className="pagination-info">
                          {totalResponses > 0
                            ? `${indexOfFirst + 1}-${Math.min(
                                indexOfLast,
                                totalResponses
                              )} of ${totalResponses}`
                            : "0 of 0"}
                        </span>
                        <div className="pagination-buttons">
                          <button
                            className="pagination-btn"
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                          >
                            ‹
                          </button>
                          <button
                            className="pagination-btn"
                            onClick={handleNextPage}
                            disabled={
                              currentPage === totalPages || totalPages === 0
                            }
                          >
                            ›
                          </button>
                        </div>
                      </div>
                      <input
                        type="text"
                        className="search-input"
                        placeholder="Search by name, email, phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  {filteredResponses.length > 0 ? (
                    <>
                      <div className="responses-table-container">
                        <table className="responses-table">
                          <thead>
                            <tr>
                              <th>User</th>
                              <th>Type</th>
                              <th>Contact</th>
                              <th>Answer</th>
                              <th>Submitted</th>
                            </tr>
                          </thead>
                          <tbody>
                            {paginatedResponses.map((response, idx) => (
                              <tr key={idx}>
                                <td>
                                  <div className="user-cell">
                                    <div className="avatar">
                                      {response.name?.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="user-text">
                                      <p className="user-name">
                                        {response.name}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <span
                                    className={`type-badge ${getUserTypeColor(
                                      response.user_type
                                    )}`}
                                  >
                                    {getUserTypeLabel(response.user_type)}
                                  </span>
                                </td>
                                <td>
                                  <div className="contact-cell">
                                    {response.email && (
                                      <a
                                        href={`mailto:${response.email}`}
                                        title={response.email}
                                      >
                                        <MdEmail size={16} />
                                      </a>
                                    )}
                                    {response.phone_number && (
                                      <a
                                        href={`tel:${response.phone_number}`}
                                        title={response.phone_number}
                                      >
                                        <MdPhone size={16} />
                                      </a>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div className="answer-cell">
                                    {response.answer}
                                  </div>
                                </td>
                                <td>
                                  <span className="date-cell">
                                    {formatDate(response.submitted_at)}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </>
                  ) : (
                    <div className="no-results">
                      <p>No responses found matching your search</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="no-selection">
              <FaChartBar size={48} />
              <p>Select a survey set to view responses</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
