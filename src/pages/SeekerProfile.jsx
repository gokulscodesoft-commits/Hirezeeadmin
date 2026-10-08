import { useContext, useEffect, useRef, useState } from "react";
import { SeekerProfileContext } from "../UseContexts/SeekerUseContext/SeekerProfileContent.jsx";
import { useNavigate, useLocation } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { FaUserClock, FaUserCheck, FaDeleteLeft } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import SeekerFilterModal from "../editpages/SeekerFilterModal.jsx";
import { SeekerProfileLoader } from "../Loader/Loader.jsx";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { toast } from "react-toastify";
import axios from "axios";
import "./SeekerProfile.css";

export default function SeekerProfile() {
  const { seekers, loading, softdelete } = useContext(SeekerProfileContext);

  const [currentPage, setCurrentPage] = useState(1);
  const pagesToShow = 7;
  const seekersPerPage = 50;
  const [selectedSeekers, setSelectedSeekers] = useState([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [activeCardFilter, setActiveCardFilter] = useState("all"); // "all" | "active" | "inactive"
  const [filters, setFilters] = useState({
    specialization: "",
    pincode: "",
    status: "",
    name: "",
    phone: "",
    district: "",
    taluk: "",
    education: "",
  });
  const tableScrollRef = useRef(null);
  const topScrollRef = useRef(null);
  // Suppresses the top<->table scroll-sync while a button-triggered smooth
  // scroll is animating — see scrollTable() for why this is needed.
  const autoScrollingRef = useRef(false);
  const autoScrollTimerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [tableInView, setTableInView] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const [userCounts, setUserCounts] = useState({
    total_users: 0,
    active_users_total: 0,
    inactive_users_total: 0,
  });

  // ✅ Fetch live user counts from API
  useEffect(() => {
    const fetchUserCounts = async () => {
      try {
        const token =
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJwaG9uZSI6IjYzODQ1ODIwNjAiLCJpYXQiOjE3NTQ1NjYwNDgsImV4cCI6MTc4NjEwMjA0OH0.3iSWyeNJxfoYxU9QsQIuBIjd9xbO0OaE-CoWhbtPM4s";
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/admin-users-count-list`,
          { headers: { Authorization: token } }
        );

        if (response.data?.status === "Success" && response.data?.data) {
          setUserCounts(response.data.data);
        } else {
          console.warn("Unexpected response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching user counts:", error);
        toast.error("Failed to fetch user count data");
      }
    };

    fetchUserCounts();
  }, []);

  const allColumns = [
    { key: "name", label: "User" },
    { key: "specialization", label: "Specialization" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone" },
    { key: "pincode", label: "Pincode" },
    { key: "status", label: "Status" },
    { key: "openToWork", label: "Seeking Status" },
    { key: "action", label: "Action" },
  ];
  const [visibleColumns, setVisibleColumns] = useState(
    allColumns.map((c) => c.key)
  );

  // 🔹 Same active/inactive rule as the backend user-count query
  const isActiveSeeker = (s) =>
    s.status === "open_to_work" || s.status === "active";

  // 🔹 Apply filters
  const filteredSeekers = seekers.filter((s) => {
    return (
      (activeCardFilter === "all" ||
        (activeCardFilter === "active" && isActiveSeeker(s)) ||
        (activeCardFilter === "inactive" && !isActiveSeeker(s))) &&
      // ✅ Specialization: partial match (e.g. "Tamil" also matches "Pgt Tamil", "Tamil Literature")
      (!filters.specialization ||
        (s.specialization &&
          s.specialization
            .toLowerCase()
            .includes(filters.specialization.toLowerCase()))) &&
      (!filters.pincode || s.pincode === filters.pincode) &&
      (!filters.status || s.status === filters.status) &&
      (!filters.district || s.area === filters.district) &&
      (!filters.taluk || s.city === filters.taluk) &&
      // ✅ Name search
      (!filters.name ||
        (s.name &&
          s.name.toLowerCase().includes(filters.name.toLowerCase()))) &&
      // ✅ Phone filter (partial match)
      (!filters.phone || (s.phone && s.phone.includes(filters.phone)))
    );
  });

  // 🔹 Pagination
  const indexOfLast = currentPage * seekersPerPage;
  const indexOfFirst = indexOfLast - seekersPerPage;
  const currentSeekers = filteredSeekers.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredSeekers.length / seekersPerPage);

  /*-----------------------------------------------------*/
  const totalRecords = filteredSeekers.length;

  const startRecord =
    totalRecords === 0 ? 0 : (currentPage - 1) * seekersPerPage + 1;

  const endRecord = Math.min(currentPage * seekersPerPage, totalRecords);

  /*------------------------------------------------------*/

  const maxLeft = Math.max(currentPage - Math.floor(pagesToShow / 2), 1);
  const maxRight = Math.min(maxLeft + pagesToShow - 1, totalPages);

  // 🔹 Selection
  const allSelected =
    currentSeekers.length > 0 &&
    currentSeekers.every((s) => selectedSeekers.includes(s.id));

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedSeekers((prev) =>
        prev.filter((id) => !currentSeekers.some((s) => s.id === id))
      );
    } else {
      setSelectedSeekers((prev) => [
        ...new Set([...prev, ...currentSeekers.map((s) => s.id)]),
      ]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedSeekers((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const handleDownload = () => {
    // If no seekers selected, download all filtered seekers (bulk download)
    const dataToExport = selectedSeekers.length === 0 ? filteredSeekers : seekers.filter((s) => selectedSeekers.includes(s.id));

    if (dataToExport.length === 0) {
      toast.warning("No seekers to download.");
      return;
    }

    const exportData = dataToExport.map((s) => {
      const row = {};
      visibleColumns.forEach((colKey) => {
        row[allColumns.find((c) => c.key === colKey).label] = s[colKey];
      });
      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Seekers");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileName = selectedSeekers.length === 0 ? "all_seekers.xlsx" : "selected_seekers.xlsx";
    saveAs(
      new Blob([excelBuffer], { type: "application/octet-stream" }),
      fileName
    );

    const message = selectedSeekers.length === 0
      ? `Downloaded all ${dataToExport.length} seekers successfully!`
      : "Selected seekers downloaded successfully!";
    toast.success(message);
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = Number(params.get("page"));

    if (pageFromUrl && pageFromUrl >= 1) {
      setCurrentPage(pageFromUrl);
    }
  }, [location.search]);

  // 🔹 Save scroll position and state before navigating to seeker details
  const saveScrollPosition = () => {
    // Check different scroll sources
    let scrollY = 0;
    let scrollSource = "none";

    // Priority 1: document.documentElement.scrollTop (HTML scroll)
    if (document.documentElement.scrollTop > 0) {
      scrollY = document.documentElement.scrollTop;
      scrollSource = "documentElement";
    }
    // Priority 2: document.body.scrollTop (Body scroll)
    else if (document.body.scrollTop > 0) {
      scrollY = document.body.scrollTop;
      scrollSource = "body";
    }
    // Priority 3: window.scrollY (Window scroll)
    else if (window.scrollY > 0) {
      scrollY = window.scrollY;
      scrollSource = "window";
    }
    const container = document.querySelector(".seekerprofile-container");

    // Find ALL scrollable elements
    const allElements = document.querySelectorAll("*");
    allElements.forEach((el) => {
      const style = window.getComputedStyle(el);
      if (
        (style.overflowY === "auto" || style.overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight
      ) {
        if (el.scrollTop > 0) {
          scrollY = el.scrollTop;
          scrollSource = el.className || el.tagName;
        }
      }
    });

    sessionStorage.setItem("seekerProfileScrollY", scrollY.toString());
    sessionStorage.setItem("seekerProfilePage", currentPage.toString());
    sessionStorage.setItem("seekerProfileFilters", JSON.stringify(filters));
  };

  // 🔹 Restore scroll position when returning to seeker list
  useEffect(() => {
    const savedScrollY = sessionStorage.getItem("seekerProfileScrollY");
    const savedPage = sessionStorage.getItem("seekerProfilePage");
    const savedFilters = sessionStorage.getItem("seekerProfileFilters");

    // Only restore if we have saved data
    if (savedScrollY || savedPage || savedFilters) {

      // Restore filters if they exist
      if (savedFilters) {
        try {
          const parsedFilters = JSON.parse(savedFilters);
          setFilters(parsedFilters);
        } catch (e) {
          // Silently fail if filters can't be parsed
        }
      }

      // Restore page if it exists and is different from current page
      if (savedPage && parseInt(savedPage) !== currentPage) {
        setCurrentPage(parseInt(savedPage));
      }

      // Restore scroll position after data renders
      if (savedScrollY) {
        // Use requestAnimationFrame to ensure DOM is ready
        requestAnimationFrame(() => {
          setTimeout(() => {
            const targetScroll = parseInt(savedScrollY);

            // Try all scroll methods to restore
            window.scrollTo(0, targetScroll);
            document.documentElement.scrollTop = targetScroll;
            document.body.scrollTop = targetScroll;

            // Find and restore ALL scrollable elements
            const allElements = document.querySelectorAll("*");
            allElements.forEach((el) => {
              const style = window.getComputedStyle(el);
              if (
                (style.overflowY === "auto" || style.overflowY === "scroll") &&
                el.scrollHeight > el.clientHeight
              ) {
                el.scrollTop = targetScroll;
              }
            });

            // Clear saved position after restoring
            sessionStorage.removeItem("seekerProfileScrollY");
            sessionStorage.removeItem("seekerProfilePage");
            sessionStorage.removeItem("seekerProfileFilters");
          }, 50);
        });
      }
    }
  }, [location.pathname]); // Restore when navigating back to this page

  const scrollTable = (direction) => {
    const el = tableScrollRef.current;
    if (!el) return;

    // Setting scrollLeft via JS fires an async "scroll" event, which lands
    // after the synchronous syncing guard below has already reset — so
    // without this flag, syncFromTop's table.scrollLeft assignment fires
    // mid-animation and cancels this smooth scroll almost immediately
    // (observed landing ~2px in, instead of at the end).
    autoScrollingRef.current = true;
    clearTimeout(autoScrollTimerRef.current);
    autoScrollTimerRef.current = setTimeout(() => {
      autoScrollingRef.current = false;
    }, 1000);

    if (direction === -1) {
      el.scrollTo({ left: 0, behavior: "smooth" });
      setCanScrollLeft(false);
      setCanScrollRight(el.scrollWidth > el.clientWidth);
    } else {
      el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
      setCanScrollLeft(true);
      setCanScrollRight(false);
    }
  };

  useEffect(() => {
    const top = topScrollRef.current;
    const table = tableScrollRef.current;

    // The table (and these refs) only exist once loading finishes, so this
    // effect must re-run when that happens instead of only on mount —
    // otherwise the listeners never attach on a cold first load.
    if (!top || !table) return;

    let syncing = false;

    const checkScroll = () => {
      setCanScrollLeft(table.scrollLeft > 0);
      setCanScrollRight(table.scrollLeft + table.clientWidth < table.scrollWidth - 1);
    };

    const syncFromTop = () => {
      // Don't fight a button-triggered smooth scroll on the table — see
      // scrollTable() for why.
      if (syncing || autoScrollingRef.current) return;
      syncing = true;
      table.scrollLeft = top.scrollLeft;
      syncing = false;
      checkScroll();
    };

    const syncFromTable = () => {
      if (syncing) return;
      syncing = true;
      top.scrollLeft = table.scrollLeft;
      syncing = false;
      checkScroll();
    };

    const clearAutoScrolling = () => {
      autoScrollingRef.current = false;
      clearTimeout(autoScrollTimerRef.current);
    };

    top.addEventListener("scroll", syncFromTop);
    table.addEventListener("scroll", syncFromTable);
    table.addEventListener("scrollend", clearAutoScrolling);

    requestAnimationFrame(() => {
      // Use the container's own scrollWidth (not the inner <table>'s) so
      // this includes the padding-right reserved for the floating scroll
      // button — otherwise the mini top-scrollbar falls short of the real
      // end-of-scroll position.
      if (top.firstChild) top.firstChild.style.width = table.scrollWidth + "px";
      checkScroll();
    });

    return () => {
      top.removeEventListener("scroll", syncFromTop);
      table.removeEventListener("scroll", syncFromTable);
      table.removeEventListener("scrollend", clearAutoScrolling);
      clearTimeout(autoScrollTimerRef.current);
    };
    // The table only mounts once loading clears (see `if (loading) return
    // <Loader />` below), so loading must be a dep or this can miss the
    // render where refs first exist.
  }, [loading, seekers, currentPage, visibleColumns]);

  useEffect(() => {
    const el = tableScrollRef.current;
    if (!el) return;

    // Ensure buttons are visible as soon as the table element exists
    setTableInView(true);

    const observer = new IntersectionObserver(
      ([entry]) => setTableInView(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [loading]);

  const handleSoftDelete = async (id) => {
    await softdelete(id);
  };

  if (loading) return <SeekerProfileLoader />;

  return (
    <div className="seekerprofile-container">
      {/* 🔹 Top Cards */}
      <div className="seekerprofile-top-row">
        <div className="seekerprofile-small-cards">
          <div className="seekerprofile-cards-container">
            {/* ✅ Card 1: Total Users */}
            <div
              className={`seekerprofile-card${
                activeCardFilter === "all" ? " selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveCardFilter("all");
                setCurrentPage(1);
              }}
            >
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon total">
                    <IoIosPeople />
                  </div>
                  <h4>Total Users</h4>
                </div>
                <p className="seekerprofile-amount">{userCounts.total_users}</p>
              </div>
            </div>

            {/* ✅ Card 2: Active Users */}
            <div
              className={`seekerprofile-card${
                activeCardFilter === "active" ? " selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveCardFilter((prev) =>
                  prev === "active" ? "all" : "active"
                );
                setCurrentPage(1);
              }}
            >
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon active">
                    <FaUserCheck />
                  </div>
                  <h4>Active Users</h4>
                </div>
                <p className="seekerprofile-amount">
                  {userCounts.active_users_total}
                </p>
              </div>
            </div>

            {/* ✅ Card 3: Inactive Users */}
            <div
              className={`seekerprofile-card${
                activeCardFilter === "inactive" ? " selected" : ""
              }`}
              role="button"
              tabIndex={0}
              onClick={() => {
                setActiveCardFilter((prev) =>
                  prev === "inactive" ? "all" : "inactive"
                );
                setCurrentPage(1);
              }}
            >
              <div className="seekerprofile-card-body">
                <div className="seekerprofile-card-left">
                  <div className="seekerprofile-card-icon inactive">
                    <FaUserClock />
                  </div>
                  <h4>Inactive Users</h4>
                </div>
                <p className="seekerprofile-amount">
                  {userCounts.inactive_users_total}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section Header */}
      <div className="seekerprofile-section-header">
        <h2>Seeker Profiles List ({filteredSeekers.length})</h2>
        <div className="seekerprofile-header-buttons">
          <button onClick={handleDownload} className="seekerprofile-add-btn">
            Download
          </button>
          <button
            onClick={() => setSearchModalOpen((prev) => !prev)}
            className="seekerprofile-search-btn"
          >
            Advanced Search {searchModalOpen ? <FaAngleUp /> : <FaAngleDown />}
          </button>
        </div>
      </div>

      {/* ===== PAGINATION  ===== */}

      <div className="seekerprofile-pagination bottom">
        <span className="pagination-range">
          {startRecord}-{endRecord} of {totalRecords}
        </span>

        <button
          disabled={currentPage === 1}
          onClick={() => {
            const prev = currentPage - 1;
            setCurrentPage(prev);
            navigate(`?page=${prev}`, { replace: true });
          }}
        >
          ❮
        </button>

        <button
          disabled={currentPage === totalPages}
          onClick={() => {
            const next = currentPage + 1;
            setCurrentPage(next);
            navigate(`?page=${next}`, { replace: true });
          }}
        >
          ❯
        </button>
      </div>

      {/* Table wrapper — same format as recruiter */}
      <div className="seeker-table-wrapper">
        {/* Top Scroll bar */}
        <div className="top-scroll" ref={topScrollRef}>
          <div className="top-scroll-inner"></div>
        </div>

        {/* Table with side scroll buttons */}
        <div className="table-with-scroll-btns">
          <button
            type="button"
            className="scroll-nav-btn scroll-nav-left"
            style={{ display: tableInView ? "flex" : "none" }}
            onClick={() => scrollTable(-1)}
            disabled={!canScrollLeft}
            title="Scroll Left"
          >
            ❮
          </button>

          <div className="seekerprofile-table-container" ref={tableScrollRef}>
            <table className="seekerprofile-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={handleSelectAll}
                    />
                  </th>
                  {allColumns
                    .filter((c) => visibleColumns.includes(c.key))
                    .map((col) => (
                      <th key={col.key}>{col.label}</th>
                    ))}
                </tr>
              </thead>
              <tbody>
                {currentSeekers.map((seeker) => (
                  <tr
                    key={seeker.id}
                    className="seekerprofile-row"
                    onClick={() => {
                      saveScrollPosition();
                      navigate(`/dashboard/seeker-profile/${seeker.id}`, {
                        state: {
                          from: `/dashboard/seeker-profile?page=${currentPage}`,
                        },
                      });
                    }}
                  >
                    <td
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectOne(seeker.id);
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSeekers.includes(seeker.id)}
                        readOnly
                      />
                    </td>

                    {allColumns
                      .filter((c) => visibleColumns.includes(c.key))
                      .map((col) => (
                        <td key={col.key}>
                          {col.key === "action" ? (
                            <button
                              type="button"
                              className="delete-btn-table"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSoftDelete(seeker.id);
                              }}
                            >
                              Delete
                            </button>
                          ) : col.key === "name" ? (
                            <div className="seeker-user-cell">
                              {seeker.profile_img ? (
                                <img
                                  src={seeker.profile_img}
                                  alt={seeker.name}
                                  className="seekerprofile-avatar"
                                />
                              ) : (
                                <FaUserCircle className="seekerprofile-avatar-icon" />
                              )}

                              <div className="seeker-user-info">
                                <div className="seeker-name">{seeker.name}</div>

                                <span className="user-type">
                                  {seeker.user_type}
                                </span>
                                <span className="login-date">
                                  {seeker.login_date}
                                </span>
                                <span className="login-time">
                                  {seeker.login_time}
                                </span>
                              </div>
                            </div>
                          ) : col.key === "phone" ? (
                            <a
                              href={`https://wa.me/${seeker.phone?.replace(/[^0-9]/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="whatsapp-phone-link"
                              onClick={(e) => e.stopPropagation()}
                              title="Open WhatsApp"
                            >
                              <FaWhatsapp size={16} />
                              {seeker.phone || "N/A"}
                            </a>
                          ) : col.key === "status" ? (
                            <span
                              className={
                                seeker.aadhaarVerified
                                  ? "seekerprofile-status verified"
                                  : "seekerprofile-status unverified"
                              }
                            >
                              {seeker.aadhaarVerified
                                ? "Verified"
                                : "Unverified"}
                            </span>
                          ) : col.key === "openToWork" ? (
                            <span
                              className={
                                seeker.status === "open_to_work" ||
                                seeker.status === "active"
                                  ? "seekerprofile-status seeking"
                                  : "seekerprofile-status not-seeking"
                              }
                            >
                              {seeker.status === "open_to_work" ||
                              seeker.status === "active"
                                ? "Open to Work"
                                : "Not Actively Seeking"}
                            </span>
                          ) : (
                            seeker[col.key] || ""
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            className="scroll-nav-btn scroll-nav-right"
            style={{ display: tableInView ? "flex" : "none" }}
            onClick={() => scrollTable(1)}
            disabled={!canScrollRight}
            title="Scroll Right"
          >
            ❯
          </button>
        </div> {/* closes table-with-scroll-btns */}
      </div> {/* closes seeker-table-wrapper */}

      {/* Search Modal */}
      {searchModalOpen && (
        <SeekerFilterModal
          filters={filters}
          setFilters={setFilters}
          onClose={() => setSearchModalOpen(false)}
        />
      )}
    </div>
  );
}
