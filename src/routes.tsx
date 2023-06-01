import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "./components";
import Login from "./pages/onBoarding/sign-in";
import Signup from "./pages/onBoarding/sign-up";
import ForgotPassword from "./pages/onBoarding/sign-in/reset-password";
import AuthGuard from "./helpers/authGuard";
import Layout from "./layout";
import { ROUTES_CONSTANTS } from "./config/constants";
import ResetLinkSent from "./pages/onBoarding/sign-in/reset-password/ResetLink";
import CreatePassword from "./pages/onBoarding/sign-in/reset-password/create-password";
import PasswordSuccess from "./pages/onBoarding/sign-in/reset-password/create-password/PasswordSuccess";
import VerificationLinkSent from "./pages/onBoarding/sign-up/signup-form/VerificationLink";
import VerificationSteps from "./pages/onBoarding/sign-up/signup-form/verification";

//Interns Child Components
import profile from "./pages/interns/profile";
import chat from "./pages/interns/chat";

import Graph from "./components/Graph";
import DropDownDemo from "./components/Dropdown/dropdown-demo";
import DemoCard from "./components/ContractCard/demoCard";

// Lazy load required start
import Chat from "./pages/chat";
import ManageVault from "./pages/digiVault/Student/manageVault";
import ManageViewVault from "./pages/digiVault/Student/manageVault/file-view";
import PropertyDetail from "./pages/propertyAgent/propertDahboard/Dashboard/propertyDetail";
import ActivityData from "./pages/propertyAgent/propertDahboard/Dashboard/activityData";
import AddManager from "./pages/managers/managerMain/addManager";
import ManagerProfile from "./pages/managers/managerMain/managerProfile";
import LinkAccount from "./pages/withdrawalRequest/delegateAgentWithdrawal/linkAccount";
import CompanyAdminVerification from "./pages/onBoarding/sign-up/signup-form/companyAdminVerification";
import Received from "./pages/contracts/student/received";
import Rejected from "./pages/contracts/student/rejected";
import Signed from "./pages/contracts/student/signed";
import ReceivedOfferLetter from "./pages/offerLetters/student/received";
import RejectedOfferLetter from "./pages/offerLetters/student/rejected";
import SignedOfferLetter from "./pages/offerLetters/student/signed";
import RejectedCompany from "./pages/contracts/CompanyAdmin/rejected";
import SignedCompany from "./pages/contracts/CompanyAdmin/signed";
import EditContract from "./pages/contracts/CompanyAdmin/editContract";
import PendingViewDetail from "./pages/contracts/CompanyAdmin/pendingViewDetail";
import EditOfferLetter from "./pages/offerLetters/CompanyAdmin/editContract";
import PendingViewDetailOfferLetter from "./pages/offerLetters/CompanyAdmin/pendingViewDetail";
import SignedOfferLetterCompanyAdmin from "./pages/offerLetters/CompanyAdmin/signed";
import RejectedOfferLetterCompany from "./pages/offerLetters/CompanyAdmin/rejected";
import ResetLink from "./pages/onBoarding/sign-in/reset-password/ResetLink";
import ProfileTabsMain from "./pages/profile/university/universityTabs/profileTabsMain";

// Lazy load required end

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) =>
  (
    <Suspense fallback={<Loader />}>
      <Component {...props} />
    </Suspense>
  );
//Internships Child Components
const NewInternships = Loadable(lazy(() => import("./pages/internships/NewInternships")));
const ViewInternshipDetails = Loadable(lazy(() => import("./pages/internships/ViewInternshipDetails")));

//Company admin Internships
const InternshipsCompanyAdmin = Loadable(lazy(() => import("./pages/internships/InternshipsCompanyAdmin")));
const InternshipPipeLine = Loadable(lazy(() => import("./pages/internships/InternshipsPipeLine")));

//Company admin payroll
const Payroll = Loadable(lazy(() => import("./pages/Payroll")));
const ViewPayrollDetails = Loadable(lazy(() => import("./pages/Payroll/viewPayrollDetails")));
const ViewPayrollSalarySlip = Loadable(lazy(() => import("./pages/Payroll/viewPayrollSalarySlip")));

//Company admin Interns
const InternsCompanyAdmin = Loadable(lazy(() => import("./pages/interns/InternsCompanyAdmin")));

//Interns Child Components
const InternChat = Loadable(lazy(() => import("./pages/interns/chat")));
const Complete = Loadable(lazy(() => import("./pages/interns/complete")));
const ViewPaymentDetails = Loadable(lazy(() => import("./pages/payments/viewPaymentDetails")));

const Dashboard = Loadable(lazy(() => import("./pages/dashboard")));
const Internships = Loadable(lazy(() => import("./pages/internships")));
const Interns = Loadable(lazy(() => import("./pages/interns")));
const Attendance = Loadable(lazy(() => import("./pages/attendance")));
const AttendanceList = Loadable(lazy(() => import("./pages/attendance/attendanceListPage")));
const AttendanceDetail = Loadable(lazy(() => import("./pages/attendance/detailPage")));
const Calendar = Loadable(lazy(() => import("./pages/calendar")));
const CaseStudies = Loadable(lazy(() => import("./pages/caseStudies")));
const ManagerCaseStudiesAssessment = Loadable(lazy(() => import("./pages/caseStudies/Manager/assessmentForm")));
const CompanyAdminCaseStudiesAssessment = Loadable(
  lazy(() => import("./pages/caseStudies/CompanyAdmin/assessmentForm"))
);
const Documents = Loadable(lazy(() => import("./pages/documents")));
const Grievances = Loadable(lazy(() => import("./pages/grievances")));
const ManagerAllGrievances = Loadable(lazy(() => import("./pages/grievances/Manager/AllGrievance")));
const CompanyAdminAllGrievances = Loadable(lazy(() => import("./pages/grievances/CompanyAdmin/AllGrievance")));
const InternAllGrievances = Loadable(lazy(() => import("./pages/grievances/Intern/AllGrievance")));
const ManagerGrievancesDetails = Loadable(lazy(() => import("./pages/grievances/Manager/GrievanceDetails")));
const CompanyAdminGrievancesDetails = Loadable(lazy(() => import("./pages/grievances/CompanyAdmin/GrievanceDetails")));
const InternGrievancesDetails = Loadable(lazy(() => import("./pages/grievances/Intern/GrievanceDetails")));
const Leaves = Loadable(lazy(() => import("./pages/leaves")));
const Performance = Loadable(lazy(() => import("./pages/performance")));
const Structure = Loadable(lazy(() => import("./pages/structure/index")));
const Timesheet = Loadable(lazy(() => import("./pages/timesheet/index")));
const DelegateMembers = Loadable(lazy(() => import("./pages/delegateMembers")));
const WithDrawalRequest = Loadable(lazy(() => import("./pages/withdrawalRequest")));
const WithDrawals = Loadable(lazy(() => import("./pages/withdrawals")));
const Students = Loadable(lazy(() => import("./pages/students")));
const StudentSystemAdmin = Loadable(lazy(() => import("./pages/students/studentSystemAdmin")));
const Universities = Loadable(lazy(() => import("./pages/universities")));
const Companies = Loadable(lazy(() => import("./pages/companies")));
const CompaniesSystemAdmin = Loadable(lazy(() => import("./pages/companies/companiesSystemAdmin")));
const Admin = Loadable(lazy(() => import("./pages/admin")));
const DelegateAgent = Loadable(lazy(() => import("./pages/delegateAgent")));
const PropertyAgent = Loadable(lazy(() => import("./pages/propertyAgent")));
const HelpDesk = Loadable(lazy(() => import("./pages/helpDesk")));
const ActivityLog = Loadable(lazy(() => import("./pages/activityLog")));
const Candidates = Loadable(lazy(() => import("./pages/candidates")));
const OfferLetters = Loadable(lazy(() => import("./pages/offerLetters")));
const Contracts = Loadable(lazy(() => import("./pages/contracts")));
const Managers = Loadable(lazy(() => import("./pages/managers")));
const SearchJobs = Loadable(lazy(() => import("./pages/searchJobs")));
const SearchJobsDetails = Loadable(lazy(() => import("./pages/searchJobs/jobDetails/jobDetails")));
const Application = Loadable(lazy(() => import("./pages/application")));
const Profile = Loadable(lazy(() => import("./pages/profile")));
const Accommodation = Loadable(lazy(() => import("./pages/accommodation")));
const AvailableProperties = Loadable(lazy(() => import("./pages/accommodation/AvailableProperties")));
const SavedSearches = Loadable(lazy(() => import("./pages/accommodation/SavedSearches")));
const RentedProperties = Loadable(lazy(() => import("./pages/accommodation/RentedProperties")));
const BookingRequests = Loadable(lazy(() => import("./pages/accommodation/BookingRequests")));
const AccommodationPayments = Loadable(lazy(() => import("./pages/accommodation/Payments")));
const AccPropertyDetail = Loadable(lazy(() => import("./pages/accommodation/PropertyDetail")));
const Recipes = Loadable(lazy(() => import("./pages/recipes")));
const RecipeDetails = Loadable(lazy(() => import("./pages/recipes/RecipeDetails")));
const AddRecipe = Loadable(lazy(() => import("./pages/recipes/AddRecipe")));
const EditRecipe = Loadable(lazy(() => import("./pages/recipes/EditRecipe")));
const EarnWithUs = Loadable(lazy(() => import("./pages/earnWithUs")));
const DreamUp = Loadable(lazy(() => import("./pages/dreamUp")));
const AllGoals = Loadable(lazy(() => import("./pages/dreamUp/AllGoals/index")));
const Report = Loadable(lazy(() => import("./pages/report")));
const ViewDetailsReport = Loadable(lazy(() => import("./pages/report/UniversityRep/ViewDetails")));
const AssessmentFormReport = Loadable(lazy(() => import("./pages/report/UniversityRep/assessmentForm")));
const Listings = Loadable(lazy(() => import("./pages/listings")));
const ListingUpdate = Loadable(lazy(() => import("./pages/listings/listingUpdate")));
const Offers = Loadable(lazy(() => import("./pages/offers")));
const Reservations = Loadable(lazy(() => import("./pages/reservations")));
const SelfAssesment = Loadable(lazy(() => import("./pages/selfAssesment")));
const AssesmentForm = Loadable(lazy(() => import("./pages/selfAssesment/AssesmentFormPage")));
const DigiVault = Loadable(lazy(() => import("./pages/digiVault")));
const Payments = Loadable(lazy(() => import("./pages/payments")));
const ViewHistory = Loadable(lazy(() => import("./pages/leaves/leaveViewHistory")));
const Setting = Loadable(lazy(() => import("./pages/setting")));
const SettingPerformance = Loadable(lazy(() => import("./pages/setting/companyAdmin/Performance")));
const SettingDepartment = Loadable(lazy(() => import("./pages/setting/companyAdmin/Department")));
const SettingLocation = Loadable(lazy(() => import("./pages/setting/companyAdmin/Location")));
const AddLocation = Loadable(lazy(() => import("./pages/setting/companyAdmin/Location/AddLocation")));
const SettingTemplate = Loadable(lazy(() => import("./pages/setting/companyAdmin/Templates")));
const TemplatesOfferLater = Loadable(lazy(() => import("./pages/setting/companyAdmin/Templates/OfferLetter")));
const OfferLaterNewTemplate = Loadable(
  lazy(() => import("./pages/setting/companyAdmin/Templates/OfferLetter/NewTemplate"))
);
const TCA = Loadable(lazy(() => import("./pages/setting/companyAdmin/Templates/CertificateOfAppreciation")));
const TCANewTemplate = Loadable(
  lazy(() => import("./pages/setting/companyAdmin/Templates/CertificateOfAppreciation/NewTemplate"))
);
const TemplatesCertificateOfCompletion = Loadable(
  lazy(() => import("./pages/setting/companyAdmin/Templates/CertificateOfCompletion"))
);
const TCCNewTemplate = Loadable(
  lazy(() => import("./pages/setting/companyAdmin/Templates/CertificateOfCompletion/NewTemplate"))
);
const TemplatesContract = Loadable(lazy(() => import("./pages/setting/companyAdmin/Templates/Contract")));
const ContractNewTemplate = Loadable(lazy(() => import("./pages/setting/companyAdmin/Templates/Contract/NewTemplate")));
const TemplatesRejectionLetter = Loadable(lazy(() => import("./pages/setting/companyAdmin/Templates/RejectionLetter")));
const RejectionLetterNewTemplate = Loadable(
  lazy(() => import("./pages/setting/companyAdmin/Templates/RejectionLetter/NewTemplate"))
);
const SettingLeaves = Loadable(lazy(() => import("./pages/setting/companyAdmin/Leaves")));
const LeavesAddPolicy = Loadable(lazy(() => import("./pages/setting/companyAdmin/Leaves/AddPolicy")));
const SettingShifts = Loadable(lazy(() => import("./pages/setting/companyAdmin/Shifts")));
const AddShift = Loadable(lazy(() => import("./pages/setting/companyAdmin/Shifts/AddShift")));
const SettingTimesheet = Loadable(lazy(() => import("./pages/setting/companyAdmin/Timesheet")));
const SettingPayroll = Loadable(lazy(() => import("./pages/setting/companyAdmin/Payroll")));
const PayrollAddCategory = Loadable(lazy(() => import("./pages/setting/companyAdmin/Payroll/AddCategory")));
const Charts = Loadable(lazy(() => import("./components/ChartsOfGraphs/Charts")));
const Personalisation = Loadable(lazy(() => import("./pages/personalisation")));
const ViewPerformance = Loadable(lazy(() => import("./pages/performance/viewEvaluation")));
const EditPerformance = Loadable(lazy(() => import("./pages/performance/editEvaluation")));
const PerformanceDetail = Loadable(lazy(() => import("./pages/performance/detailHistory")));
const CompanyAdminPerformanceHistory = Loadable(lazy(() => import("./pages/performance/CompanyAdmin/history")));
const Error = Loadable(lazy(() => import("./pages/errors/404"))); // error page
const Certificate = Loadable(lazy(() => import("./pages/certificate/index")));
const CertificateDetail = Loadable(lazy(() => import("./pages/certificate/certificateDetail")));
const TimeSheetHistory = Loadable(lazy(() => import("./pages/timesheet/companyAdmin/timesheetHistory")));
const InternTimeSheetHistory = Loadable(lazy(() => import("./pages/timesheet/intern/viewHistory")));
const UniversitesInterns = Loadable(lazy(() => import("./pages/universities/CompanyAdmin/Interns")));
const UniversitesProfile = Loadable(lazy(() => import("./pages/universities/CompanyAdmin/Profile")));
const SystemDetailPage = Loadable(lazy(() => import("./pages/universities/SystemAdmin/detailPage")));

const CompanyProfileUni = Loadable(lazy(() => import("./pages/companies/companiesMain/CompanyProfileTabs")));
const StudentProfileUni = Loadable(lazy(() => import("./pages/profile/university/universityTabs/profileTabsMain")));

export const publicRoutes = [
  {
    key: `${ROUTES_CONSTANTS.LOGIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.LOGIN} />,
  },
  {
    key: `${ROUTES_CONSTANTS.LOGIN}`,
    path: `${ROUTES_CONSTANTS.LOGIN}`,
    element: <Login />,
  },
  {
    key: `${ROUTES_CONSTANTS.SIGNUP}`,
    path: `${ROUTES_CONSTANTS.SIGNUP}`,
    element: <Signup />,
  },
  {
    key: `${ROUTES_CONSTANTS.FORGOT_PASSWORD}`,
    path: `${ROUTES_CONSTANTS.FORGOT_PASSWORD}`,
    element: <ForgotPassword />,
  },
  {
    key: `${ROUTES_CONSTANTS.RESET_LINK_SENT}`,
    path: `${ROUTES_CONSTANTS.RESET_LINK_SENT}`,
    element: <ResetLink />,
  },
  // ------Remove below demo components------
  // Demo Graphs
  {
    key: "graph",
    path: `graph`,
    element: <Graph />,
  },
  {
    key: "candidates",
    path: `candidates`,
    element: <Candidates />,
  },
  // Demo dropdowns
  {
    key: "dropdowndemo",
    path: "/demodropdown",
    element: <DropDownDemo />,
  },
  {
    key: "charts",
    path: "/charts",
    element: <Charts />,
  },
  {
    key: "candidates",
    path: "/candidates",
    element: <Candidates />,
  },
  {
    key: "card",
    path: "/democards",
    element: <DemoCard />,
  },
  // ------Remove till here------
  {
    key: `${ROUTES_CONSTANTS.RESET_LINK_SENT}`,
    path: `${ROUTES_CONSTANTS.RESET_LINK_SENT}`,
    element: <ResetLinkSent />,
  },
  {
    key: `${ROUTES_CONSTANTS.CREATE_PASSWORD}`,
    path: `${ROUTES_CONSTANTS.CREATE_PASSWORD}`,
    element: <CreatePassword />,
  },
  {
    key: `${ROUTES_CONSTANTS.SUCCESSFULLY_CREATE_PASSWORD}`,
    path: `${ROUTES_CONSTANTS.SUCCESSFULLY_CREATE_PASSWORD}`,
    element: <PasswordSuccess />,
  },
  {
    key: `${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}`,
    path: `${ROUTES_CONSTANTS.VERIFICATION_LINK_SENT}`,
    element: <VerificationLinkSent />,
  },
  {
    key: `${ROUTES_CONSTANTS.VERIFICATION_STEPS}`,
    path: `${ROUTES_CONSTANTS.VERIFICATION_STEPS}`,
    element: <VerificationSteps />,
  },
  {
    key: `company-admin-verification`,
    path: `company-admin-verification`,
    element: <CompanyAdminVerification />,
  },
];

// Manager
const managerRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}`,
        element: <Internships />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.NEW_INTERNSHIP}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.NEW_INTERNSHIP}`,
        element: <NewInternships />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS}`,
        element: <ViewInternshipDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNS}`,
        path: `${ROUTES_CONSTANTS.INTERNS}`,
        element: <Interns />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNS_PROFILE}`,
        path: `${ROUTES_CONSTANTS.INTERNS_PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNS_CHAT}`,
        path: `${ROUTES_CONSTANTS.INTERNS_CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        element: <Attendance />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}/:id`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}/:id`,
        element: <AttendanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.LEAVES}`,
        path: `${ROUTES_CONSTANTS.LEAVES}`,
        element: <Leaves />,
      },
      {
        key: `${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`,
        path: `${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`,
        element: <ViewHistory />,
      },
      {
        key: `${ROUTES_CONSTANTS.TIMESHEET}`,
        path: `${ROUTES_CONSTANTS.TIMESHEET}`,
        element: <Timesheet />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        element: <Performance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.DETAIL}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.DETAIL}`,
        element: <PerformanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATE}`,
        element: <EditPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        element: <ViewPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.DOCUMENTS}`,
        path: `${ROUTES_CONSTANTS.DOCUMENTS}`,
        element: <Documents />,
      },
      {
        key: `${ROUTES_CONSTANTS.STRUCTURE}`,
        path: `${ROUTES_CONSTANTS.STRUCTURE}`,
        element: <Structure />,
      },
      {
        key: `${ROUTES_CONSTANTS.CASE_STUDIES}`,
        path: `${ROUTES_CONSTANTS.CASE_STUDIES}`,
        element: <CaseStudies />,
      },
      {
        key: `${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}/:id`,
        path: `${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}/:id`,
        element: <ManagerCaseStudiesAssessment />,
      },
      {
        key: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        element: <Grievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.ALL_GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.ALL_GRIEVANCES}`,
        element: <ManagerAllGrievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.GRIEVANCES_DETAILS}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES_DETAILS}`,
        element: <ManagerGrievancesDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.CALENDAR}`,
        path: `${ROUTES_CONSTANTS.CALENDAR}`,
        element: <Calendar />,
      },
      {
        key: `${ROUTES_CONSTANTS.CHAT}`,
        path: `${ROUTES_CONSTANTS.CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        path: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        element: <EarnWithUs />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

// Delegate Agent Routes
const delegateAgentRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.DELEGATE_MEMEBERS}`,
        path: `${ROUTES_CONSTANTS.DELEGATE_MEMEBERS}`,
        element: <DelegateMembers />,
      },
      {
        key: `${ROUTES_CONSTANTS.WITHDRAWAL_REQUEST}`,
        path: `${ROUTES_CONSTANTS.WITHDRAWAL_REQUEST}`,
        element: <WithDrawalRequest />,
      },
      {
        key: `link-account`,
        path: `link-account`,
        element: <LinkAccount />,
      },

      {
        key: `${ROUTES_CONSTANTS.WITHDRAWALS}`,
        path: `${ROUTES_CONSTANTS.WITHDRAWALS}`,
        element: <WithDrawals />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

// System Admin Routes
const systemAdminRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENTPROFILE}`,
        path: `${ROUTES_CONSTANTS.STUDENTPROFILE}`,
        element: <StudentProfileUni />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENT}`,
        path: `${ROUTES_CONSTANTS.STUDENT}`,
        element: <StudentSystemAdmin />,
      },
      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        element: <Universities />,
      },
      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`,
        element: <SystemDetailPage />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANIES}`,
        path: `${ROUTES_CONSTANTS.COMPANIES}`,
        element: <CompaniesSystemAdmin />,
      },
      {
        key: `${ROUTES_CONSTANTS.ADMIN}`,
        path: `${ROUTES_CONSTANTS.ADMIN}`,
        element: <Admin />,
      },
      {
        key: `${ROUTES_CONSTANTS.DELEGATE_AGENT}`,
        path: `${ROUTES_CONSTANTS.DELEGATE_AGENT}`,
        element: <DelegateAgent />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROPERTY_AGENT}`,
        path: `${ROUTES_CONSTANTS.PROPERTY_AGENT}`,
        element: <PropertyAgent />,
      },
      {
        key: `activityData`,
        path: `activityData`,
        element: <ActivityData />,
      },

      {
        key: `propertyDetails`,
        path: `property-agent/:id`,
        element: <PropertyDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.HELP_DESK}`,
        path: `${ROUTES_CONSTANTS.HELP_DESK}`,
        element: <HelpDesk />,
      },
      {
        key: `${ROUTES_CONSTANTS.ACTIVITY_LOG}`,
        path: `${ROUTES_CONSTANTS.ACTIVITY_LOG}`,
        element: <ActivityLog />,
      },
      {
        key: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        path: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        element: <EarnWithUs />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

// Company Admin Routes
const companyAdminRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `graphs`,
        path: `graphs`,
        element: <Graph />,
      },
      {
        key: `${ROUTES_CONSTANTS.CANDIDATES}`,
        path: `${ROUTES_CONSTANTS.CANDIDATES}`,
        element: <Candidates />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}`,
        element: <InternshipsCompanyAdmin />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIP_PIPELINE}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIP_PIPELINE}`,
        element: <InternshipPipeLine />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.NEW_INTERNSHIP}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.NEW_INTERNSHIP}`,
        element: <NewInternships />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}/${ROUTES_CONSTANTS.VIEW_INTERNSHIP_DETAILS}`,
        element: <ViewInternshipDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.PAYROLL}`,
        path: `${ROUTES_CONSTANTS.PAYROLL}`,
        element: <Payroll />,
      },
      {
        key: `${ROUTES_CONSTANTS.PAYROLL_DETAILS}`,
        path: `${ROUTES_CONSTANTS.PAYROLL_DETAILS}`,
        element: <ViewPayrollDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.VIEW_PAYROLL_SALARY_SLIP}`,
        path: `${ROUTES_CONSTANTS.VIEW_PAYROLL_SALARY_SLIP}`,
        element: <ViewPayrollSalarySlip />,
      },
      {
        key: `${ROUTES_CONSTANTS.OFFER_LETTER}`,
        path: `${ROUTES_CONSTANTS.OFFER_LETTER}`,
        element: <OfferLetters />,
      },
      {
        key: `${ROUTES_CONSTANTS.CONTRACTS}`,
        path: `${ROUTES_CONSTANTS.CONTRACTS}`,
        element: <Contracts />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNS}`,
        path: `${ROUTES_CONSTANTS.INTERNS}`,
        element: <InternsCompanyAdmin />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNS_PROFILE}`,
        path: `${ROUTES_CONSTANTS.INTERNS_PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNS_CHAT}`,
        path: `${ROUTES_CONSTANTS.INTERNS_CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPLETE_INTERNS}`,
        path: `${ROUTES_CONSTANTS.COMPLETE_INTERNS}`,
        element: <Complete />,
      },
      {
        key: `${ROUTES_CONSTANTS.MANAGERS}`,
        path: `${ROUTES_CONSTANTS.MANAGERS}`,
        element: <Managers />,
      },
      {
        key: `${ROUTES_CONSTANTS.ADD_MANAGER}`,
        path: `${ROUTES_CONSTANTS.ADD_MANAGER}`,
        element: <AddManager />,
      },
      {
        key: `${ROUTES_CONSTANTS.MANAGER_PROFILE}`,
        path: `${ROUTES_CONSTANTS.MANAGER_PROFILE}/:id`,
        element: <ManagerProfile />,
      },
      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        element: <Universities />,
      },

      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES_INTERNS}`,
        element: <UniversitesInterns />,
      },
      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES_PROFILE}`,
        element: <UniversitesProfile />,
      },
      {
        key: `${ROUTES_CONSTANTS.CALENDAR}`,
        path: `${ROUTES_CONSTANTS.CALENDAR}`,
        element: <Calendar />,
      },
      {
        key: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        element: <Grievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.ALL_GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.ALL_GRIEVANCES}`,
        element: <CompanyAdminAllGrievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.GRIEVANCES_DETAILS}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES_DETAILS}`,
        element: <CompanyAdminGrievancesDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.STRUCTURE}`,
        path: `${ROUTES_CONSTANTS.STRUCTURE}`,
        element: <Structure />,
      },
      {
        key: `${ROUTES_CONSTANTS.CASE_STUDIES}`,
        path: `${ROUTES_CONSTANTS.CASE_STUDIES}`,
        element: <CaseStudies />,
      },
      {
        key: `${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}/:id`,
        path: `${ROUTES_CONSTANTS.CASE_STUDIES_ASSESSMENT_FORM}/:id`,
        element: <CompanyAdminCaseStudiesAssessment />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        element: <Attendance />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}`,
        element: <AttendanceList />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}/:id`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}/${ROUTES_CONSTANTS.DETAIL}/:id`,
        element: <AttendanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.LEAVES}`,
        path: `${ROUTES_CONSTANTS.LEAVES}`,
        element: <Leaves />,
      },
      {
        key: `${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`,
        path: `${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`,
        element: <ViewHistory />,
      },
      {
        key: `${ROUTES_CONSTANTS.TIMESHEET}`,
        path: `${ROUTES_CONSTANTS.TIMESHEET}`,
        element: <Timesheet />,
      },
      {
        key: `${ROUTES_CONSTANTS.TIMESHEETHISTORY}`,
        path: `${ROUTES_CONSTANTS.TIMESHEETHISTORY}/:id`,
        element: <TimeSheetHistory />,
      },
      {
        key: `${ROUTES_CONSTANTS.SETTING}`,
        path: `${ROUTES_CONSTANTS.SETTING}`,
        children: [
          {
            key: `${ROUTES_CONSTANTS.SETTING_LOCATION}`,
            path: `${ROUTES_CONSTANTS.SETTING_LOCATION}`,
            element: (
              <Setting title="Location">
                <SettingLocation />
              </Setting>
            ),
            index: true,
          },
          {
            key: `${ROUTES_CONSTANTS.ADD_LOCATION}`,
            path: `${ROUTES_CONSTANTS.ADD_LOCATION}`,
            element: <AddLocation />,
          },
          {
            key: `${ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER}`,
            path: `${ROUTES_CONSTANTS.TEMPLATE_OFFER_LETTER}`,
            element: <TemplatesOfferLater />,
          },
          {
            key: `${ROUTES_CONSTANTS.TEMPLATE_CONTRACT}`,
            path: `${ROUTES_CONSTANTS.TEMPLATE_CONTRACT}`,
            element: <TemplatesContract />,
          },
          {
            key: `${ROUTES_CONSTANTS.TEMPLATE_REJECTION_LETTER}`,
            path: `${ROUTES_CONSTANTS.TEMPLATE_REJECTION_LETTER}`,
            element: <TemplatesRejectionLetter />,
          },
          {
            key: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATE_APPRECIATION}`,
            path: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATE_APPRECIATION}`,
            element: <TCA />,
          },
          {
            key: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION}`,
            path: `${ROUTES_CONSTANTS.TEMPLATE_CERTIFICATION_COMPLETION}`,
            element: <TemplatesCertificateOfCompletion />,
          },
          {
            key: `${ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}`,
            path: `${ROUTES_CONSTANTS.CONTRACT_NEW_TEMPLATE}`,
            element: <ContractNewTemplate />,
          },
          {
            key: `${ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}`,
            path: `${ROUTES_CONSTANTS.OFFER_LETTER_NEW_TEMPLATE}`,
            element: <OfferLaterNewTemplate />,
          },
          {
            key: `${ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE}`,
            path: `${ROUTES_CONSTANTS.REJECTION_LETTER_NEW_TEMPLATE}`,
            element: <RejectionLetterNewTemplate />,
          },
          {
            key: `${ROUTES_CONSTANTS.TCA_NEW_TEMPLATE}`,
            path: `${ROUTES_CONSTANTS.TCA_NEW_TEMPLATE}`,
            element: <TCANewTemplate />,
          },
          {
            key: `${ROUTES_CONSTANTS.TCC_NEW_TEMPLATE}`,
            path: `${ROUTES_CONSTANTS.TCC_NEW_TEMPLATE}`,
            element: <TCCNewTemplate />,
          },
          {
            key: `${ROUTES_CONSTANTS.SETTING_DEPARTMENT}`,
            path: `${ROUTES_CONSTANTS.SETTING_DEPARTMENT}`,
            element: (
              <Setting title="Department">
                <SettingDepartment />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.SETTING_LEAVES}`,
            path: `${ROUTES_CONSTANTS.SETTING_LEAVES}`,
            element: (
              <Setting title="Leaves">
                <SettingLeaves />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.LEAVES_ADD_POLICY}`,
            path: `${ROUTES_CONSTANTS.LEAVES_ADD_POLICY}`,
            element: <LeavesAddPolicy />,
          },

          {
            key: `${ROUTES_CONSTANTS.SETTING_PERFORMANCE}`,
            path: `${ROUTES_CONSTANTS.SETTING_PERFORMANCE}`,
            element: (
              <Setting title="Performance">
                <SettingPerformance />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.SETTING_TEMPLATE}`,
            path: `${ROUTES_CONSTANTS.SETTING_TEMPLATE}`,
            element: (
              <Setting title="Template">
                <SettingTemplate />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.SETTING_SHIFTS}`,
            path: `${ROUTES_CONSTANTS.SETTING_SHIFTS}`,
            element: (
              <Setting title="Shifts">
                <SettingShifts />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.ADD_SHIFT}`,
            path: `${ROUTES_CONSTANTS.ADD_SHIFT}`,
            element: <AddShift />,
          },
          {
            key: `${ROUTES_CONSTANTS.SETTING_TIMESHEET}`,
            path: `${ROUTES_CONSTANTS.SETTING_TIMESHEET}`,
            element: (
              <Setting title="Timesheet">
                <SettingTimesheet />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.SETTING_PAYROLL}`,
            path: `${ROUTES_CONSTANTS.SETTING_PAYROLL}`,
            element: (
              <Setting title="Payroll">
                <SettingPayroll />
              </Setting>
            ),
          },
          {
            key: `${ROUTES_CONSTANTS.PAYROLL_ADD_CATEGORY}`,
            path: `${ROUTES_CONSTANTS.PAYROLL_ADD_CATEGORY}`,
            element: <PayrollAddCategory />,
          },
        ],
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        element: <Performance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`,
        element: <CompanyAdminPerformanceHistory />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.HISTORY}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.HISTORY}`,
        element: <PerformanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:evalId/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:evalId/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        element: <ViewPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/:evalId`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATE}/:evalId`,
        element: <EditPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.DOCUMENTS}`,
        path: `${ROUTES_CONSTANTS.DOCUMENTS}`,
        element: <Documents />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERSONALISATION}`,
        path: `${ROUTES_CONSTANTS.PERSONALISATION}`,
        element: <Personalisation />,
      },
      {
        key: `${ROUTES_CONSTANTS.CHAT}`,
        path: `${ROUTES_CONSTANTS.CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.CERTIFICATES}`,
        path: `${ROUTES_CONSTANTS.CERTIFICATES}`,
        element: <Certificate />,
      },
      {
        key: `${ROUTES_CONSTANTS.CERTIFICATESDETAIL}`,
        path: `${ROUTES_CONSTANTS.CERTIFICATESDETAIL}/:id`,
        element: <CertificateDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        path: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        element: <EarnWithUs />,
      },
      {
        key: `${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`,
        path: `${ROUTES_CONSTANTS.REJECTED_CompanyAdmin}`,
        element: <RejectedCompany />,
      },
      {
        key: `${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`,
        path: `${ROUTES_CONSTANTS.SIGNED_CompanyAdmin}`,
        element: <SignedCompany />,
      },
      {
        key: `${ROUTES_CONSTANTS.EDIT_CONTRACT}`,
        path: `${ROUTES_CONSTANTS.EDIT_CONTRACT}`,
        element: <EditContract />,
      },
      {
        key: `${ROUTES_CONSTANTS.PENDING_VIEW}`,
        path: `${ROUTES_CONSTANTS.PENDING_VIEW}`,
        element: <PendingViewDetail />,
      },

      {
        key: `${ROUTES_CONSTANTS.RECEIVED_OFFER_CompanyAdmin}`,
        path: `${ROUTES_CONSTANTS.RECEIVED_OFFER_CompanyAdmin}`,
        element: <ReceivedOfferLetter />,
      },
      {
        key: `${ROUTES_CONSTANTS.REJECTED_OFFER_CompanyAdmin}`,
        path: `${ROUTES_CONSTANTS.REJECTED_OFFER_CompanyAdmin}`,
        element: <RejectedOfferLetterCompany />,
      },
      {
        key: `${ROUTES_CONSTANTS.SIGNED_OFFER_CompanyAdmin}`,
        path: `${ROUTES_CONSTANTS.SIGNED_OFFER_CompanyAdmin}`,
        element: <SignedOfferLetterCompanyAdmin />,
      },
      {
        key: `${ROUTES_CONSTANTS.EDIT_OFFER_CONTRACT}`,
        path: `${ROUTES_CONSTANTS.EDIT_OFFER_CONTRACT}`,
        element: <EditOfferLetter />,
      },
      {
        key: `${ROUTES_CONSTANTS.PENDING_OFFER_VIEW}`,
        path: `${ROUTES_CONSTANTS.PENDING_OFFER_VIEW}`,
        element: <PendingViewDetailOfferLetter />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

// Intern Routes
const internRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        element: <Attendance />,
      },
      {
        key: `${ROUTES_CONSTANTS.LEAVES}`,
        path: `${ROUTES_CONSTANTS.LEAVES}`,
        element: <Leaves />,
      },
      {
        key: `${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`,
        path: `${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`,
        element: <ViewHistory />,
      },
      {
        key: `${ROUTES_CONSTANTS.TIMESHEET}`,
        path: `${ROUTES_CONSTANTS.TIMESHEET}`,
        element: <Timesheet />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        element: <Performance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.EVALUATION_FORM}/:evalId`,
        element: <ViewPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.STRUCTURE}`,
        path: `${ROUTES_CONSTANTS.STRUCTURE}`,
        element: <Structure />,
      },
      {
        key: `${ROUTES_CONSTANTS.SELF_ASSESSMENT}`,
        path: `${ROUTES_CONSTANTS.SELF_ASSESSMENT}`,
        element: <SelfAssesment />,
      },
      {
        key: `${ROUTES_CONSTANTS.SELF_ASSESSMENT_Form}`,
        path: `${ROUTES_CONSTANTS.SELF_ASSESSMENT_Form}`,
        element: <AssesmentForm />,
      },
      {
        key: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        element: <Grievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.ALL_GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.ALL_GRIEVANCES}`,
        element: <InternAllGrievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.GRIEVANCES_DETAILS}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES_DETAILS}`,
        element: <InternGrievancesDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.DIGIVAULT}`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}`,
        element: <DigiVault />,
      },
      {
        key: `manageVault`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}/:id`,
        element: <ManageVault />,
      },
      {
        key: `${ROUTES_CONSTANTS.DIGIVAULT}/:id/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}/:id/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
        element: <ManageViewVault />,
      },
      {
        key: `${ROUTES_CONSTANTS.DREAM_UP}`,
        path: `${ROUTES_CONSTANTS.DREAM_UP}`,
        element: <DreamUp />,
      },
      {
        key: `${ROUTES_CONSTANTS.ALL_GOALS}`,
        path: `${ROUTES_CONSTANTS.ALL_GOALS}`,
        element: <AllGoals />,
      },
      {
        key: `${ROUTES_CONSTANTS.PAYMENTS}`,
        path: `${ROUTES_CONSTANTS.PAYMENTS}`,
        element: <Payments />,
      },
      {
        key: `${ROUTES_CONSTANTS.VIEW_PAYMENT_DETAILS}`,
        path: `${ROUTES_CONSTANTS.VIEW_PAYMENT_DETAILS}`,
        element: <ViewPaymentDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.CALENDAR}`,
        path: `${ROUTES_CONSTANTS.CALENDAR}`,
        element: <Calendar />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.ACCOMMODATION}`,
        path: `${ROUTES_CONSTANTS.ACCOMMODATION}`,
        element: <Accommodation />,
        children: [
          {
            key: `${ROUTES_CONSTANTS.AVAILABLE_PROPERTIES}`,
            element: <AvailableProperties />,
            index: true,
          },
          {
            key: `${ROUTES_CONSTANTS.SAVED_SEARCHES}`,
            path: `${ROUTES_CONSTANTS.SAVED_SEARCHES}`,
            element: <SavedSearches />,
          },
          {
            key: `${ROUTES_CONSTANTS.RENTED_PROPERTIES}`,
            path: `${ROUTES_CONSTANTS.RENTED_PROPERTIES}`,
            element: <RentedProperties />,
          },
          {
            key: `${ROUTES_CONSTANTS.BOOKING_REQUESTS}`,
            path: `${ROUTES_CONSTANTS.BOOKING_REQUESTS}`,
            element: <BookingRequests />,
          },
          {
            key: `${ROUTES_CONSTANTS.ACCOMMODATION_PAYMENTS}`,
            path: `${ROUTES_CONSTANTS.ACCOMMODATION_PAYMENTS}`,
            element: <AccommodationPayments />,
          },
        ],
      },
      {
        key: `${ROUTES_CONSTANTS.PROPERTY_DETAIL}/:propertyId`,
        path: `${ROUTES_CONSTANTS.PROPERTY_DETAIL}/:propertyId`,
        element: <AccPropertyDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPES}`,
        path: `${ROUTES_CONSTANTS.RECIPES}`,
        element: <Recipes />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPE_DETAILS}-detail`,
        path: `${ROUTES_CONSTANTS.RECIPE_DETAILS}/:recipeId`,
        element: <RecipeDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPE_ADD}`,
        path: `${ROUTES_CONSTANTS.RECIPE_ADD}`,
        element: <AddRecipe />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPE_UPDATE}Update`,
        path: `${ROUTES_CONSTANTS.RECIPE_UPDATE}/:recipeId`,
        element: <EditRecipe />,
      },
      {
        key: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        path: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        element: <EarnWithUs />,
      },
      {
        key: `${ROUTES_CONSTANTS.CHAT}`,
        path: `${ROUTES_CONSTANTS.CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNTIMESHEETHISTORY}`,
        path: `${ROUTES_CONSTANTS.INTERNTIMESHEETHISTORY}`,
        element: <InternTimeSheetHistory />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

// Student Routes
const studentRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.SEARCH_JOBS}`,
        path: `${ROUTES_CONSTANTS.SEARCH_JOBS}`,
        element: <SearchJobs />,
      },
      {
        key: `${ROUTES_CONSTANTS.JOBDETAILS}`,
        path: `${ROUTES_CONSTANTS.JOBDETAILS}/:id`,
        element: <SearchJobsDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.APPLICATION}`,
        path: `${ROUTES_CONSTANTS.APPLICATION}`,
        element: <Application />,
      },
      {
        key: `${ROUTES_CONSTANTS.OFFER_LETTER}`,
        path: `${ROUTES_CONSTANTS.OFFER_LETTER}`,
        element: <OfferLetters />,
      },
      {
        key: `${ROUTES_CONSTANTS.CONTRACTS}`,
        path: `${ROUTES_CONSTANTS.CONTRACTS}`,
        element: <Contracts />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.DIGIVAULT}`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}`,
        element: <DigiVault />,
      },
      {
        key: `manageVault`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}/:id`,
        element: <ManageVault />,
      },
      {
        key: `${ROUTES_CONSTANTS.DIGIVAULT}/:id/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}/:id/${ROUTES_CONSTANTS.VIEW_DIGIVAULT}`,
        element: <ManageViewVault />,
      },
      {
        key: `${ROUTES_CONSTANTS.DREAM_UP}`,
        path: `${ROUTES_CONSTANTS.DREAM_UP}`,
        element: <DreamUp />,
      },
      {
        key: `${ROUTES_CONSTANTS.ALL_GOALS}`,
        path: `${ROUTES_CONSTANTS.ALL_GOALS}`,
        element: <AllGoals />,
      },
      {
        key: `${ROUTES_CONSTANTS.CALENDAR}`,
        path: `${ROUTES_CONSTANTS.CALENDAR}`,
        element: <Calendar />,
      },
      {
        key: `${ROUTES_CONSTANTS.ACCOMMODATION}`,
        path: `${ROUTES_CONSTANTS.ACCOMMODATION}`,
        element: <Accommodation />,

        children: [
          {
            key: `${ROUTES_CONSTANTS.AVAILABLE_PROPERTIES}`,
            element: <AvailableProperties />,
            index: true,
          },
          {
            key: `${ROUTES_CONSTANTS.SAVED_SEARCHES}`,
            path: `${ROUTES_CONSTANTS.SAVED_SEARCHES}`,
            element: <SavedSearches />,
          },
          {
            key: `${ROUTES_CONSTANTS.RENTED_PROPERTIES}`,
            path: `${ROUTES_CONSTANTS.RENTED_PROPERTIES}`,
            element: <RentedProperties />,
          },
          {
            key: `${ROUTES_CONSTANTS.BOOKING_REQUESTS}`,
            path: `${ROUTES_CONSTANTS.BOOKING_REQUESTS}`,
            element: <BookingRequests />,
          },
          {
            key: `${ROUTES_CONSTANTS.ACCOMMODATION_PAYMENTS}`,
            path: `${ROUTES_CONSTANTS.ACCOMMODATION_PAYMENTS}`,
            element: <AccommodationPayments />,
          },
        ],
      },
      {
        key: `${ROUTES_CONSTANTS.PROPERTY_DETAIL}-detail`,
        path: `${ROUTES_CONSTANTS.PROPERTY_DETAIL}/:propertyId`,
        element: <AccPropertyDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPES}`,
        path: `${ROUTES_CONSTANTS.RECIPES}`,
        element: <Recipes />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPE_DETAILS}-detail`,
        path: `${ROUTES_CONSTANTS.RECIPE_DETAILS}/:recipeId`,
        element: <RecipeDetails />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPE_ADD}`,
        path: `${ROUTES_CONSTANTS.RECIPE_ADD}`,
        element: <AddRecipe />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPE_UPDATE}Update`,
        path: `${ROUTES_CONSTANTS.RECIPE_UPDATE}/:recipeId`,
        element: <EditRecipe />,
      },
      {
        key: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        path: `${ROUTES_CONSTANTS.EARN_WITH_US}`,
        element: <EarnWithUs />,
      },
      {
        key: `${ROUTES_CONSTANTS.CHAT}`,
        path: `${ROUTES_CONSTANTS.CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECEIVED}`,
        path: `${ROUTES_CONSTANTS.RECEIVED}`,
        element: <Received />,
      },
      {
        key: `${ROUTES_CONSTANTS.REJECTED}`,
        path: `${ROUTES_CONSTANTS.REJECTED}`,
        element: <Rejected />,
      },
      {
        key: `${ROUTES_CONSTANTS.SIGNED}`,
        path: `${ROUTES_CONSTANTS.SIGNED}`,
        element: <Signed />,
      },
      {
        key: `${ROUTES_CONSTANTS.RECEIVED_OFFER}`,
        path: `${ROUTES_CONSTANTS.RECEIVED_OFFER}`,
        element: <ReceivedOfferLetter />,
      },
      {
        key: `${ROUTES_CONSTANTS.REJECTED_OFFER}`,
        path: `${ROUTES_CONSTANTS.REJECTED_OFFER}`,
        element: <RejectedOfferLetter />,
      },
      {
        key: `${ROUTES_CONSTANTS.SIGNED_OFFER}`,
        path: `${ROUTES_CONSTANTS.SIGNED_OFFER}`,
        element: <SignedOfferLetter />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

const universityRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.STUDENTPROFILE}/:id`,
        path: `${ROUTES_CONSTANTS.STUDENTPROFILE}/:id`,
        element: <StudentProfileUni />,
      },
      {
        key: `${ROUTES_CONSTANTS.CHAT}`,
        path: `${ROUTES_CONSTANTS.CHAT}`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANIES}/${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.COMPANIES}/${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANIES}/${ROUTES_CONSTANTS.CHAT}/:id`,
        path: `${ROUTES_CONSTANTS.COMPANIES}/${ROUTES_CONSTANTS.CHAT}/:id`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENT}`,
        path: `${ROUTES_CONSTANTS.STUDENT}`,
        element: <Students />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENT}/${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.STUDENT}/${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENT}/${ROUTES_CONSTANTS.CHAT}/:id`,
        path: `${ROUTES_CONSTANTS.STUDENT}/${ROUTES_CONSTANTS.CHAT}/:id`,
        element: <Chat />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANIES}`,
        path: `${ROUTES_CONSTANTS.COMPANIES}`,
        element: <Companies />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANYPROFILEUNI}/:id`,
        path: `${ROUTES_CONSTANTS.COMPANYPROFILEUNI}/:id`,
        element: <CompanyProfileUni />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        element: <Attendance />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}/:id`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}/:id`,
        element: <AttendanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        element: <Performance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/${ROUTES_CONSTANTS.HISTORY}`,
        element: <CompanyAdminPerformanceHistory />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.HISTORY}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.HISTORY}`,
        element: <PerformanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.DETAIL}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.DETAIL}`,
        element: <PerformanceDetail />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATION_FORM}`,
        element: <ViewPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}/:id/${ROUTES_CONSTANTS.EVALUATE}`,
        element: <EditPerformance />,
      },
      {
        key: `${ROUTES_CONSTANTS.REPORT}`,
        path: `${ROUTES_CONSTANTS.REPORT}`,
        element: <Report />,
      },
      {
        key: `${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}`,
        path: `${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}`,
        element: <ViewDetailsReport />,
      },
      {
        key: `${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}${ROUTES_CONSTANTS.REPORT_ASSESSMENT_FORM}`,
        path: `${ROUTES_CONSTANTS.REPORT_VIEW_DETAILS}${ROUTES_CONSTANTS.REPORT_ASSESSMENT_FORM}`,
        element: <AssessmentFormReport />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

const agentRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />,
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard>
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.PROFILE}`,
        path: `${ROUTES_CONSTANTS.PROFILE}`,
        element: <Profile />,
      },
      {
        key: `${ROUTES_CONSTANTS.LISTINGS}`,
        path: `${ROUTES_CONSTANTS.LISTINGS}`,
        element: <Listings />,
      },
      {
        key: `${ROUTES_CONSTANTS.LISTING_EDIT}`,
        path: `${ROUTES_CONSTANTS.LISTING_EDIT}`,
        element: <ListingUpdate />,
      },
      {
        key: `${ROUTES_CONSTANTS.OFFERS}`,
        path: `${ROUTES_CONSTANTS.OFFERS}`,
        element: <Offers />,
      },
      {
        key: `${ROUTES_CONSTANTS.RESERVATIONS}`,
        path: `${ROUTES_CONSTANTS.RESERVATIONS}`,
        element: <Reservations />,
      },
    ],
  },
  {
    key: `${ROUTES_CONSTANTS.ERROR_PAGE}`,
    path: "*",
    element: <Error />,
  },
];

const ROLES_ROUTES: any = {
  SYS_ADMIN: systemAdminRoutes,
  COMPANY_MANAGER: managerRoutes,
  DELEGATE_AGENT: delegateAgentRoutes,
  COMPANY_ADMIN: companyAdminRoutes,
  INTERN: internRoutes,
  STUDENT: studentRoutes,
  UNIVERSITY: universityRoutes,
  PROPERTY_AGENT: agentRoutes,
  PUBLIC: publicRoutes,
};

export const getRoutes = (role: any) => {
  return ROLES_ROUTES[role];
};
