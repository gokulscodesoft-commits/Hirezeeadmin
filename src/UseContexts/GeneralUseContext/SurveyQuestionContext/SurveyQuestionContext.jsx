import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const SurveyQuestionContext = createContext();

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/api/admin/survey/questions`;

const SurveyQuestionProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch survey questions (GET)
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setQuestions(res.data?.data || []);
    } catch (err) {
      setError(err.message || "Failed to fetch survey questions");
      toast.error("Failed to fetch survey questions");
    } finally {
      setLoading(false);
    }
  };

  // Add new survey question (POST)
  const addQuestion = async (newQuestion) => {
    try {
      await axios.post(API_URL, newQuestion);
      await fetchQuestions();
      toast.success("Survey question added successfully");
    } catch (err) {
      console.error(
        "Failed to add survey question:",
        err.response?.data || err.message
      );
      toast.error("Failed to add survey question");
      throw err;
    }
  };

  // Update survey question (PUT)
  const updateQuestion = async (id, updatedData) => {
    try {
      await axios.put(`${API_URL}/${id}`, updatedData);
      await fetchQuestions();
      toast.success("Survey question updated successfully");
    } catch (err) {
      console.error(
        "Failed to update survey question:",
        err.response?.data || err.message
      );
      toast.error("Failed to update survey question");
      throw err;
    }
  };

  // Delete survey question (DELETE)
  const deleteQuestion = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchQuestions();
      toast.success("Survey question deleted successfully");
    } catch (err) {
      console.error(
        "Failed to delete survey question:",
        err.response?.data || err.message
      );
      toast.error("Failed to delete survey question");
      throw err;
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <SurveyQuestionContext.Provider
      value={{
        questions,
        loading,
        error,
        fetchQuestions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
      }}
    >
      {children}
    </SurveyQuestionContext.Provider>
  );
};

export default SurveyQuestionProvider;
