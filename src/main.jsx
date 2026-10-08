import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import HomeBannerProvider from "./UseContexts/SeekerUseContext/HomeBannerContext";
import SubjectProvider from "./UseContexts/RecruiterUseContext/JobPostContext/SubjectContext";
import JobRoleProvider from "./UseContexts/RecruiterUseContext/JobPostContext/JobRoleContext";
import WorkTypeProvider from "./UseContexts/RecruiterUseContext/JobPostContext/WorkTypeContext";
import EndDateProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EndDateContext";
import HighestEducationProvider from "./UseContexts/SeekerUseContext/HighestEducationContext";
import TeachingQualificationProvider from "./UseContexts/SeekerUseContext/TeachingQualificationContext";
import JobRoleCategoriesProvider from "./UseContexts/SeekerUseContext/JobRoleCategoriesContext";
import CompartmentLevelProvider from "./UseContexts/RecruiterUseContext/JobPostContext/CompartmentContext";
import EducationQualificationProvider from "./UseContexts/RecruiterUseContext/JobPostContext/EducationQualificationContext";
import SeekerEduQualificationProvider from "./UseContexts/SeekerUseContext/SeekerEduQualificationContext";
import ExperienceProvider from "./UseContexts/SeekerUseContext/ExperienceContext";
import QualificationSpecificationProvider from "./UseContexts/SeekerUseContext/QualificationSpecificationContext";
import ExpectedSalaryProvider from "./UseContexts/SeekerUseContext/ExpectedSalaryContext";
import SeekerProfileProvider from "./UseContexts/SeekerUseContext/SeekerProfileContent";
import GeneralInformationProvider from "./UseContexts/SeekerUseContext/GeneralInformationContext";
import LanguageProvider from "./UseContexts/SeekerUseContext/LanguageContext";
import ProficiencyProvider from "./UseContexts/SeekerUseContext/ProficiencyContext";
import RecruiterProfileProvider from "./UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterProfileContext";
import RecruiterJobPostsProvider from "./UseContexts/RecruiterUseContext/RecruiterProfileContext/RecruiterJobPostsContext";
import SubscriptionPlanProvider from "./UseContexts/GeneralUseContext/SubscriptionPlansContext/SubscriptionPlanContext";
import DashboardGraphProvider from "./UseContexts/GeneralUseContext/DashBoardContext/DashboardGraphContext";
import DashboardMetricProvider from "./UseContexts/GeneralUseContext/DashBoardContext/DashboardMetricDataContext";
import HomeBannerRecruiterProvider from "./UseContexts/SeekerUseContext/HomeBannerRecruiterProvider";
import SeekerTermsConditionContext from "./UseContexts/SeekerTerms&ConditionContext/SeekerTermsConditionContext";
import SeekerPrivacyPolicyContext from "./UseContexts/SeekerTerms&ConditionContext/SeekerPrivacyPolicyContext";
import RecruiterTermsConditionContext from "./UseContexts/RecruiterTerms&ConditionContext/RecruiterTermsConditionContext";
import RecruiterPrivacyPolicyContext from "./UseContexts/RecruiterTerms&ConditionContext/RecruiterPrivacyPolicyContext";
import SubscribedRecruiterContext from "./UseContexts/RecruiterUseContext/SubscribedContext/SubscribedRecruiterContext";
import RecruiterReportAbuseContext from "./UseContexts/RecruiterAbuseContext/RecruiterReportAbuseContext";
import SeekerReportAnuseContext from "./UseContexts/SeekerAbuseContext/SeekerReportAnuseContext";
import RazorpayInvoiceDetailsContext from "./UseContexts/RazorpayInvoiceDetailsContext/RazorpayInvoiceDetailsContext";
import SurveyQuestionProvider from "./UseContexts/GeneralUseContext/SurveyQuestionContext/SurveyQuestionContext";
import SurveyAnalyticsProvider from "./UseContexts/GeneralUseContext/SurveyAnalyticsContext/SurveyAnalyticsContext";
import RecruiterSubscriptionProvider from "./UseContexts/GeneralUseContext/RecruiterSubscriptionContext/RecruiterSubscriptionContext";
import { PartnerProvider } from "./UseContexts/PartnerUseContext/PartnerContext";
import { PartnerReferralStatisticsProvider } from "./UseContexts/PartnerUseContext/PartnerReferralStatisticsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <PartnerProvider>
    <PartnerReferralStatisticsProvider>
      <SurveyQuestionProvider>
      <SurveyAnalyticsProvider>
        <RecruiterSubscriptionProvider>
          <RazorpayInvoiceDetailsContext>
        <SeekerReportAnuseContext>
        <RecruiterReportAbuseContext>
        <SubscribedRecruiterContext>
          <RecruiterPrivacyPolicyContext>
            <RecruiterTermsConditionContext>
              <SeekerPrivacyPolicyContext>
                <SeekerTermsConditionContext>
                  <HomeBannerRecruiterProvider>
                    <DashboardMetricProvider>
                      <DashboardGraphProvider>
                        <SubscriptionPlanProvider>
                          <RecruiterJobPostsProvider>
                            <RecruiterProfileProvider>
                              <ProficiencyProvider>
                                <LanguageProvider>
                                  <GeneralInformationProvider>
                                    <SeekerProfileProvider>
                                      <ExpectedSalaryProvider>
                                        <ExperienceProvider>
                                          <QualificationSpecificationProvider>
                                          <SeekerEduQualificationProvider>
                                            <EducationQualificationProvider>
                                              <CompartmentLevelProvider>
                                                <TeachingQualificationProvider>
                                                <JobRoleCategoriesProvider>
                                                  <HighestEducationProvider>
                                                    <EndDateProvider>
                                                      <WorkTypeProvider>
                                                        <SubjectProvider>
                                                          <JobRoleProvider>
                                                            <HomeBannerProvider>
                                                              <App />
                                                            </HomeBannerProvider>
                                                          </JobRoleProvider>
                                                        </SubjectProvider>
                                                      </WorkTypeProvider>
                                                    </EndDateProvider>
                                                  </HighestEducationProvider>
                                                </JobRoleCategoriesProvider>
                                                </TeachingQualificationProvider>
                                              </CompartmentLevelProvider>
                                            </EducationQualificationProvider>
                                          </SeekerEduQualificationProvider>
                                          </QualificationSpecificationProvider>
                                        </ExperienceProvider>
                                      </ExpectedSalaryProvider>
                                    </SeekerProfileProvider>
                                  </GeneralInformationProvider>
                                </LanguageProvider>
                              </ProficiencyProvider>
                            </RecruiterProfileProvider>
                          </RecruiterJobPostsProvider>
                        </SubscriptionPlanProvider>
                      </DashboardGraphProvider>
                    </DashboardMetricProvider>
                  </HomeBannerRecruiterProvider>
                </SeekerTermsConditionContext>
              </SeekerPrivacyPolicyContext>
            </RecruiterTermsConditionContext>
          </RecruiterPrivacyPolicyContext>
        </SubscribedRecruiterContext>
        </RecruiterReportAbuseContext>
        </SeekerReportAnuseContext>
      </RazorpayInvoiceDetailsContext>
        </RecruiterSubscriptionProvider>
      </SurveyAnalyticsProvider>
    </SurveyQuestionProvider>
    </PartnerReferralStatisticsProvider>
  </PartnerProvider>
);
