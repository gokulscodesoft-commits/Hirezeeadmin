import React, { useState, useContext } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoChevronBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./Languages.css";
import LanguageAddModal from "./LanguagesAddModal.jsx";
import ProficiencyAddModal from "./ProficiencyAddModal.jsx";
import { LanguageContext } from "../UseContexts/SeekerUseContext/LanguageContext.jsx";
import { ProficiencyContext } from "../UseContexts/SeekerUseContext/ProficiencyContext.jsx";

export default function LanguageAndProficiency() {
    const navigate = useNavigate();

    // ✅ Language Context
    const { languages, loading: langLoading, error: langError, addLanguage, deleteLanguage } =
        useContext(LanguageContext);

    // ✅ Proficiency Context
    const { proficiencies, loading: profLoading, error: profError, addProficiency, deleteProficiency } =
        useContext(ProficiencyContext);

    // State
    const [hiddenLangRows, setHiddenLangRows] = useState([]);  // ✅ for Languages only
    const [hiddenProfRows, setHiddenProfRows] = useState([]);  // (unused, but separate if needed)
    const [isLangModalOpen, setIsLangModalOpen] = useState(false);
    const [isProfModalOpen, setIsProfModalOpen] = useState(false);

    // ✅ Save Handlers
    const handleSaveLanguage = async (newItem) => {
        await addLanguage(newItem);
        setIsLangModalOpen(false);
    };

    const handleSaveProficiency = async (newItem) => {
        await addProficiency(newItem);
        setIsProfModalOpen(false);
    };

    // ✅ Delete Handlers
    const handleDeleteLanguage = async (id) => {
        try {
            await deleteLanguage(id);
            setHiddenRows((prev) => prev.filter((hid) => hid !== id));
        } catch (err) {
            console.error("Error deleting language:", err);
        }
    };

    const handleDeleteProficiency = async (id) => {
        try {
            await deleteProficiency(id);
            setHiddenRows((prev) => prev.filter((hid) => hid !== id));
        } catch (err) {
            console.error("Error deleting proficiency:", err);
        }
    };

    // ✅ Pagination Logic
    const [currentPageLang, setCurrentPageLang] = useState(1);
    const [currentPageProf, setCurrentPageProf] = useState(1);
    const itemsPerPage = 9;

    const paginate = (data, currentPage) => {
        const totalPages = Math.ceil((data?.length || 0) / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        return { totalPages, paginated: data?.slice(startIndex, startIndex + itemsPerPage) || [] };
    };

    const { totalPages: totalLangPages, paginated: paginatedLangs } = paginate(languages, currentPageLang);
    const { totalPages: totalProfPages, paginated: paginatedProfs } = paginate(proficiencies, currentPageProf);

    // ✅ Hide/Unhide row for Languages
    const toggleHideLangRow = (id) => {
        setHiddenLangRows((prev) =>
            prev.includes(id) ? prev.filter((hid) => hid !== id) : [...prev, id]
        );
    };


    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    return (
        <div className="languagefilter-container">
            <div className="languagefilter-rec">
                {/* ---------- Languages Section ---------- */}
                <div className="languagefilter-section">
                    <div className="languagefilter-title-button">
                        <h2
                            className="languagefilter-title"
                            onClick={() => navigate("/dashboard/seeker-search-filter")}
                        >
                            <IoChevronBackOutline /> Language List
                        </h2>
                        <button
                            className="languagefilter-add-btn"
                            onClick={() => setIsLangModalOpen(true)}
                        >
                            Add Language
                        </button>
                    </div>

                    {langLoading && <p>Loading languages...</p>}
                    {langError && <p className="error">⚠️ {langError}</p>}

                    <div className="languagefilter-table-container">
                        <table className="languagefilter-table">
                            <thead>
                                <tr>
                                    <th>Language</th>
                                    <th>Posted on</th>
                                    <th>Updated on</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedLangs.map((language) => (
                                    <tr
                                        key={language.id}
                                        className={hiddenLangRows.includes(language.id) ? "hidden-row" : ""}
                                    >
                                        <td>{language.admin_languages}</td>
                                        <td>{formatDate(language.created_at)}</td>
                                        <td>{formatDate(language.updated_at)}</td>
                                        <td className="languagefilter-actions">
                                            {/* <button
                                                className="languagefilter-btn view-btn"
                                                onClick={() => toggleHideLangRow(language.id)}
                                            >
                                                {hiddenLangRows.includes(language.id) ? <FaRegEyeSlash /> : <FaRegEye />}
                                            </button> */}
                                            <button
                                                className="languagefilter-btn delete-btn"
                                                onClick={() => handleDeleteLanguage(language.id)}
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>

                        {!langLoading && languages?.length === 0 && <p className="empty">No languages found.</p>}

                        {languages?.length > itemsPerPage && (
                            <div className="pagination">
                                <button disabled={currentPageLang === 1} onClick={() => setCurrentPageLang(currentPageLang - 1)}>Prev</button>
                                {[...Array(totalLangPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={currentPageLang === index + 1 ? "active" : ""}
                                        onClick={() => setCurrentPageLang(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button disabled={currentPageLang === totalLangPages} onClick={() => setCurrentPageLang(currentPageLang + 1)}>Next</button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ---------- Proficiency Section ---------- */}
                <div className="languagefilter-section" style={{ marginTop: "40px" }}>
                    <div className="languagefilter-title-button">
                        <h2
                            className="languagefilter-title"
                            onClick={() => navigate("/dashboard/seeker-search-filter")}
                        >
                            <IoChevronBackOutline /> Proficiency List
                        </h2>
                        <button
                            className="languagefilter-add-btn"
                            onClick={() => setIsProfModalOpen(true)}
                        >
                            Add Proficiency
                        </button>
                    </div>

                    {profLoading && <p>Loading proficiencies...</p>}
                    {profError && <p className="error">⚠️ {profError}</p>}

                    <div className="languagefilter-table-container">
                        <table className="languagefilter-table">
                            <thead>
                                <tr>
                                    <th>Proficiency</th>
                                    <th>Posted on</th>
                                    <th>Updated on</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProfs.map((prof) => (
                                    <tr
                                        key={prof.id}
                                        className={hiddenProfRows.includes(prof.id) ? "hidden-row" : ""}
                                    >
                                        <td>{prof.admin_proficiency}</td>
                                        <td>{formatDate(prof.created_at)}</td>
                                        <td>{formatDate(prof.updated_at)}</td>
                                        <td className="languagefilter-actions">
                                            {/* 👁️ optional toggle (kept disabled for now) */}

                                            {/* <button
                                                className="languagefilter-btn view-btn"
                                                onClick={() =>
                                                    setHiddenProfRows((prev) =>
                                                        prev.includes(prof.id)
                                                            ? prev.filter((hid) => hid !== prof.id)
                                                            : [...prev, prof.id]
                                                    )
                                                }
                                            >
                                                {hiddenProfRows.includes(prof.id) ? (
                                                    <FaRegEyeSlash />
                                                ) : (
                                                    <FaRegEye />
                                                )}
                                            </button> */}

                                            <button
                                                className="languagefilter-btn delete-btn"
                                                onClick={() => handleDeleteProficiency(prof.id)}
                                            >
                                                <AiOutlineDelete />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        {!profLoading && proficiencies?.length === 0 && (
                            <p className="empty">No proficiencies found.</p>
                        )}

                        {proficiencies?.length > itemsPerPage && (
                            <div className="pagination">
                                <button
                                    disabled={currentPageProf === 1}
                                    onClick={() => setCurrentPageProf(currentPageProf - 1)}
                                >
                                    Prev
                                </button>
                                {[...Array(totalProfPages)].map((_, index) => (
                                    <button
                                        key={index + 1}
                                        className={currentPageProf === index + 1 ? "active" : ""}
                                        onClick={() => setCurrentPageProf(index + 1)}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                                <button
                                    disabled={currentPageProf === totalProfPages}
                                    onClick={() => setCurrentPageProf(currentPageProf + 1)}
                                >
                                    Next
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>

            {/* Modals */}
            {isLangModalOpen && (
                <LanguageAddModal
                    isOpen={isLangModalOpen}
                    onClose={() => setIsLangModalOpen(false)}
                    onSave={handleSaveLanguage}
                />
            )}

            {isProfModalOpen && (
                <ProficiencyAddModal
                    isOpen={isProfModalOpen}
                    onClose={() => setIsProfModalOpen(false)}
                    onSave={handleSaveProficiency}
                />
            )}
        </div>
    );
}
