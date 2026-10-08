import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// auth
import Login from "/src/auth/Login";
import ProtectedRoute from "/src/auth/ProtectedRoute";

// layout
import MainLayout from "/src/layout/MainLayout";

// pages
import Dashboard from "/src/pages/Dashboard";
import HomeBanner from "/src/pages/HomeBanner";
import JobPostFilter from "/src/pages/JobPostFilter";
import RecruiterProfile from "/src/pages/RecruiterProfile";
import SeekerProfile from "/src/pages/SeekerProfile";
import SeekerSearchFilter from "/src/pages/SeekerSearchFilter";
import SubscriptionPlan from "/src/pages/SubscriptionPlan";
import Education from "./pages/Education.jsx";

// education
import HighestEducation from "./education/HighestEducation.jsx";
import TeachingQualification from "./education/TeachingQualification.jsx";
import JobRoleCategories from "./education/JobRoleCategories.jsx";

// editpages
import AddBanner from "/src/editpages/AddBanner";
import EditBanner from "/src/editpages/EditBanner";

// seekerSearchFilter filters
import ExperienceFilter from "./editpages/ExperienceFilter.jsx";
import EducationQualification from "./editpages/EducationQualification.jsx";
import CompartmentLevel from "./editpages/CompartmentLevel.jsx";
import Subject from "./editpages/Subject.jsx";
import ExpectedSalary from "./editpages/ExpectedSalary.jsx";
import Languages from "./editpages/Languages.jsx";
import Proficiency from "./editpages/Languages.jsx";
import QualificationSpecification from "./editpages/QualificationSpecification.jsx";

// profiles
import GeneralInformation from "./editpages/GeneralInformation.jsx";
import RecruiterGeneralInfo from "./editpages/RecruiterGeneralInfo.jsx";

// jobPostFilter
import JobPostExperienceFilter from "./filterpages/JobPostExperience.jsx";
import JobPostSubjectFilter from "./filterpages/JobPostSubject.jsx";
import JobPostExpectedSalary from "./filterpages/JobPostExpectedSalary.jsx";
import JobPostCompartmentLevel from "./filterpages/JobPostCompartmentLevel.jsx";
import JobPostEducationQualification from "./filterpages/JobPostEducationQualification.jsx";
import WorkTypeFilter from "./filterpages/WorkTypeFilter.jsx";
import JobPostEndDateFilter from "./filterpages/JobPostEndDateFilter.jsx";
import JobPostJobRoleFilter from "./filterpages/JobPostJobRole.jsx";
import AddRecruiterBanner from "./editpages/AddRecruiterBanner.jsx";
import EditRecruiterBanner from "./editpages/EditRecruiterBanner.jsx";
import SeekerTermsCondition from "./pages/SeekerTermsCondition.jsx";
import SeekerPrivacyPolicy from "./pages/SeekerPrivacyPolicy.jsx";
import RecruiterTermsCondition from "./pages/RecruiterTermsCondition.jsx";
import RecruiterPrivacyPolicy from "./pages/RecruiterPrivacyPolicy.jsx";
import SubscribedRecruiterList from "./pages/SubscribedRecruiterList.jsx";
import SeekerBlockList from "./pages/SeekerBlockList.jsx";
import RecruiterBlockList from "./pages/RecruiterBlockList.jsx";
import RecruiterReportAbuse from "./pages/RecruiterReportAbuse.jsx";
import SeekerReportAbuse from "./pages/SeekerReportAbuse.jsx";
import RazorPayInvoiceDetails from "./pages/RazorPayInvoiceDetails.jsx";
import SurveyQuestion from "./pages/SurveyQuestion.jsx";
import SurveyAnalytics from "./pages/SurveyAnalytics.jsx";
import ReferralStatistics from "./pages/ReferralStatistics.jsx";
import ProvidePartner from "./pages/ProvidePartner.jsx";
import PartnerReferralStatistics from "./pages/PartnerReferralStatistics.jsx";

const App = () => {
  return (
    <>
      {/* Toast container - top level */}
      <ToastContainer
        position="top-right"
        autoClose={1200}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <BrowserRouter>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />

            {/* main pages */}
            <Route path="home-banner" element={<HomeBanner />} />
            <Route path="job-post-filter" element={<JobPostFilter />} />
            <Route path="recruiter-profile" element={<RecruiterProfile />} />
            <Route path="seeker-profile" element={<SeekerProfile />} />
            <Route
              path="seeker-search-filter"
              element={<SeekerSearchFilter />}
            />

            {/* Terms & Condition  */}
            <Route
              path="seeker-terms-condition"
              element={<SeekerTermsCondition />}
            />

            {/* Privacy & Policy  */}
            <Route
              path="seeker-privacy-policy"
              element={<SeekerPrivacyPolicy />}
            />

            <Route path="seeker-report-abuse" element={<SeekerReportAbuse />} />

            {/*--------Recruiter Terms & Condition-----------*/}
            <Route
              path="recruiter-terms-condition"
              element={<RecruiterTermsCondition />}
            />

            {/* Privacy & Policy  */}
            <Route
              path="recruiter-privacy-policy"
              element={<RecruiterPrivacyPolicy />}
            />

            {/* Seeker Block List  */}

            <Route path="seeker-block-list" element={<SeekerBlockList />} />

            <Route path="subscription-plan" element={<SubscriptionPlan />} />
            <Route path="survey-question" element={<SurveyQuestion />} />
            <Route path="survey-analytics" element={<SurveyAnalytics />} />
            <Route path="referral-statistics" element={<ReferralStatistics />} />
            <Route path="provide-partner" element={<ProvidePartner />} />
            <Route path="partner-referral-statistics" element={<PartnerReferralStatistics />} />
            <Route path="education-filter" element={<Education />} />

            {/* edit pages */}
            <Route path="home-banner/add" element={<AddBanner />} />
            <Route path="home-banner/edit/:id" element={<EditBanner />} />

            {/* Recruiter Banneers  */}
            <Route
              path="home-banner/recruiter-add"
              element={<AddRecruiterBanner />}
            />
            <Route
              path="home-banner/edit-recruiter/:id"
              element={<EditRecruiterBanner />}
            />

            <Route path="education" element={<Education />} />
            <Route path="highest-education" element={<HighestEducation />} />
            <Route
              path="teaching-qualification"
              element={<TeachingQualification />}
            />
            <Route
              path="job-role-categories"
              element={<JobRoleCategories />}
            />

            {/* seeker filters */}
            <Route
              path="seeker-search-filter/experience"
              element={<ExperienceFilter />}
            />
            <Route
              path="seeker-search-filter/education"
              element={<EducationQualification />}
            />
            <Route
              path="seeker-search-filter/compartment"
              element={<CompartmentLevel />}
            />
            <Route path="seeker-search-filter/subject" element={<Subject />} />
            <Route
              path="seeker-search-filter/salary"
              element={<ExpectedSalary />}
            />
            <Route
              path="seeker-search-filter/languages"
              element={<Languages />}
            />
            <Route
              path="seeker-search-filter/languages"
              element={<Proficiency />}
            />
            <Route
              path="seeker-search-filter/qualification-specification"
              element={<QualificationSpecification />}
            />

            {/* recruiter filters */}
            <Route
              path="recruiter-filters/education"
              element={<EducationQualification />}
            />

            {/* profiles */}
            <Route path="seeker-profile/:id" element={<GeneralInformation />} />
            <Route
              path="recruiter-profile/:id"
              element={<RecruiterGeneralInfo />}
            />

            {/* job post filters */}
            <Route
              path="job-post-filter/experience"
              element={<JobPostExperienceFilter />}
            />
            <Route
              path="job-post-filter/subject"
              element={<JobPostSubjectFilter />}
            />
            <Route
              path="job-post-filter/salary"
              element={<JobPostExpectedSalary />}
            />
            <Route
              path="job-post-filter/compartment"
              element={<JobPostCompartmentLevel />}
            />
            <Route
              path="job-post-filter/education"
              element={<JobPostEducationQualification />}
            />
            <Route
              path="job-post-filter/worktype"
              element={<WorkTypeFilter />}
            />
            <Route
              path="job-post-filter/enddate"
              element={<JobPostEndDateFilter />}
            />
            <Route
              path="job-post-filter/jobrole"
              element={<JobPostJobRoleFilter />}
            />

            {/* Subscribed List  */}
            <Route
              path="subscribed-recruiter"
              element={<SubscribedRecruiterList />}
            />

            {/* Bllocked Recruiter List  */}
            <Route path="blocked-recruiters" element={<RecruiterBlockList />} />

            {/* Report Abuse recruiter  */}
            <Route
              path="recruiter-report-abuse"
              element={<RecruiterReportAbuse />}
            />

            <Route
              path="razorpay-invoice-details"
              element={<RazorPayInvoiceDetails />}
            />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
