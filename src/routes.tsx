import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Login from "./pages/onBoarding/login";
import Signup from "./pages/onBoarding/signup";
import ForgotPassword from "./pages/onBoarding/forgotPassword";
import AuthGuard from "./helpers/authGuard";
import Layout from "./layout";
import {ROUTES_CONSTANTS} from "./config/constants";

const spinIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const Loadable = (Component: LazyExoticComponent<FC>) => (props: any) => (
  <Suspense
    fallback={
      <Spin indicator={spinIcon} />
    }
  >
    <Component {...props} />
  </Suspense>
);

const Dashboard = Loadable(lazy(() => import("./pages/dashboard")));
const Internships = Loadable(lazy(() => import("./pages/internships")));
const Interns = Loadable(lazy(() => import("./pages/interns")));
const Attendance = Loadable(lazy(() => import("./pages/attendance")));
const Calendar = Loadable(lazy(() => import("./pages/calendar")));
const CaseStudies = Loadable(lazy(() => import("./pages/caseStudies")));
const Documents = Loadable(lazy(() => import("./pages/documents")));
const Grievances = Loadable(lazy(() => import("./pages/grievances")));
const Leaves = Loadable(lazy(() => import("./pages/leaves")));
const Performance = Loadable(lazy(() => import("./pages/performance")));
const Structure = Loadable(lazy(() => import("./pages/structure")));
const Timesheet = Loadable(lazy(() => import("./pages/timesheet")));
const DelegateMembers = Loadable(lazy(() => import("./pages/delegateMembers")));
const WithDrawalRequest = Loadable(lazy(() => import("./pages/withdrawalRequest")));
const WithDrawals = Loadable(lazy(() => import("./pages/withdrawals")));
const Students = Loadable(lazy(() => import("./pages/students")));
const Universities = Loadable(lazy(() => import("./pages/universities")));
const Companies = Loadable(lazy(() => import("./pages/companies")));
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
const Application = Loadable(lazy(() => import("./pages/application")));
const Profile = Loadable(lazy(() => import("./pages/profile")));
const Accommodation = Loadable(lazy(() => import("./pages/accommodation")));
const Recipes = Loadable(lazy(() => import("./pages/recipes")));
const EarnWithUs = Loadable(lazy(() => import("./pages/earnWithUs")));
const DreamUp = Loadable(lazy(() => import("./pages/dreamUp")));
const Report = Loadable(lazy(() => import("./pages/report")));
const Listings = Loadable(lazy(() => import("./pages/listings")));
const Offers = Loadable(lazy(() => import("./pages/offers")));
const Reservations = Loadable(lazy(() => import("./pages/reservations")));
const SelfAssesment = Loadable(lazy(() => import("./pages/selfAssesment")));
const DigiVault = Loadable(lazy(() => import("./pages/digiVault")));
const Payments = Loadable(lazy(() => import("./pages/payments")));
const Error = Loadable(lazy(() => import("./pages/errors/404"))); // error page

export const publicRoutes = [
  {
    key: `${ROUTES_CONSTANTS.LOGIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.LOGIN} />
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
];

// Manager
const managerRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
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
        key: `${ROUTES_CONSTANTS.INTERNS}`,
        path: `${ROUTES_CONSTANTS.INTERNS}`,
        element: <Interns />,
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
        key: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        element: <Grievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.CALENDAR}`,
        path: `${ROUTES_CONSTANTS.CALENDAR}`,
        element: <Calendar />,
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
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.DELEGATE_AGENT}`,
        path: `${ROUTES_CONSTANTS.DELEGATE_AGENT}`,
        element: <DelegateMembers />,
      },
      {
        key: `${ROUTES_CONSTANTS.WITHDRAWAL_REQUEST}`,
        path: `${ROUTES_CONSTANTS.WITHDRAWAL_REQUEST}`,
        element: <WithDrawalRequest />,
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
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENT}`,
        path: `${ROUTES_CONSTANTS.STUDENT}`,
        element: <Students />,
      },
      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        element: <Universities />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANIES}`,
        path: `${ROUTES_CONSTANTS.COMPANIES}`,
        element: <Companies />,
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
        key: `${ROUTES_CONSTANTS.HELP_DESK}`,
        path: `${ROUTES_CONSTANTS.HELP_DESK}`,
        element: <HelpDesk />,
      },
      {
        key: `${ROUTES_CONSTANTS.ASCTIVITY_LOG}`,
        path: `${ROUTES_CONSTANTS.ASCTIVITY_LOG}`,
        element: <ActivityLog />,
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
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.CANDIDATES}`,
        path: `${ROUTES_CONSTANTS.CANDIDATES}`,
        element: <Candidates />,
      },
      {
        key: `${ROUTES_CONSTANTS.INTERNSHIPS}`,
        path: `${ROUTES_CONSTANTS.INTERNSHIPS}`,
        element: <Internships />,
      },
      {
        key: `${ROUTES_CONSTANTS.OFFER_LETTERS}`,
        path: `${ROUTES_CONSTANTS.OFFER_LETTERS}`,
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
        element: <Interns />,
      },
      {
        key: `${ROUTES_CONSTANTS.MANAGERS}`,
        path: `${ROUTES_CONSTANTS.MANAGERS}`,
        element: <Managers />,
      },
      {
        key: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        path: `${ROUTES_CONSTANTS.UNIVERSITIES}`,
        element: <Universities />,
      },
      {
        key: `${ROUTES_CONSTANTS.STRUCTURE}`,
        path: `${ROUTES_CONSTANTS.STRUCTURE}`,
        element: <Structure />,
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
        key: `${ROUTES_CONSTANTS.DOCUMENTS}`,
        path: `${ROUTES_CONSTANTS.DOCUMENTS}`,
        element: <Documents />,
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
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
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
        key: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        path: `${ROUTES_CONSTANTS.GRIEVANCES}`,
        element: <Grievances />,
      },
      {
        key: `${ROUTES_CONSTANTS.DIGIVAULT}`,
        path: `${ROUTES_CONSTANTS.DIGIVAULT}`,
        element: <DigiVault />,
      },
      {
        key: `${ROUTES_CONSTANTS.DREAM_UP}`,
        path: `${ROUTES_CONSTANTS.DREAM_UP}`,
        element: <DreamUp />,
      },
      {
        key: `${ROUTES_CONSTANTS.PAYMENTS}`,
        path: `${ROUTES_CONSTANTS.PAYMENTS}`,
        element: <Payments />,
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
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
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
        key: `${ROUTES_CONSTANTS.APPLICATION}`,
        path: `${ROUTES_CONSTANTS.APPLICATION}`,
        element: <Application />,
      },
      {
        key: `${ROUTES_CONSTANTS.OFFER_LETTERS}`,
        path: `${ROUTES_CONSTANTS.OFFER_LETTERS}`,
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
        key: `${ROUTES_CONSTANTS.DREAM_UP}`,
        path: `${ROUTES_CONSTANTS.DREAM_UP}`,
        element: <DreamUp />,
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
      },
      {
        key: `${ROUTES_CONSTANTS.RECIPES}`,
        path: `${ROUTES_CONSTANTS.RECIPES}`,
        element: <Recipes />,
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

const universityRoutes = [
  {
    key: `${ROUTES_CONSTANTS.MAIN}`,
    path: "/",
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.STUDENT}`,
        path: `${ROUTES_CONSTANTS.STUDENT}`,
        element: <Students />,
      },
      {
        key: `${ROUTES_CONSTANTS.COMPANIES}`,
        path: `${ROUTES_CONSTANTS.COMPANIES}`,
        element: <Companies />,
      },
      {
        key: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        path: `${ROUTES_CONSTANTS.ATTENDANCE}`,
        element: <Attendance />,
      },
      {
        key: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        path: `${ROUTES_CONSTANTS.PERFORMANCE}`,
        element: <Performance />,
      },
      {
        key: `${ROUTES_CONSTANTS.REPORT}`,
        path: `${ROUTES_CONSTANTS.REPORT}`,
        element: <Report />,
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
    element: <Navigate to={ROUTES_CONSTANTS.DASHBOARD} />
  },
  {
    key: `${ROUTES_CONSTANTS.MAIN_LAYOUT}`,
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        key: `${ROUTES_CONSTANTS.DASHBOARD}`,
        path: `${ROUTES_CONSTANTS.DASHBOARD}`,
        element: <Dashboard />,
      },
      {
        key: `${ROUTES_CONSTANTS.LISTINGS}`,
        path: `${ROUTES_CONSTANTS.LISTINGS}`,
        element: <Listings />,
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
  SystemAdmin: systemAdminRoutes,
  Manager: managerRoutes,
  DelegateAgent: delegateAgentRoutes,
  CompanyAdmin: companyAdminRoutes,
  Intern: internRoutes,
  Student: studentRoutes,
  University: universityRoutes,
  Agent: agentRoutes,
  Public: publicRoutes,
};

export const getRoutes = (role: any) => {
  return ROLES_ROUTES[role];
};