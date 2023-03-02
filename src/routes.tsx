import { FC, lazy, LazyExoticComponent, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Login from "./pages/onBoarding/login";
import Signup from "./pages/onBoarding/signup";
import ForgotPassword from "./pages/onBoarding/ForgotPassword";
import AuthGuard from "./helpers/authGuard";
import Layout from "./layout";
import SelfAssesment from "./pages/selfAssesment";
import DigiVault from "./pages/digiVault";
import Payments from "./pages/payments";

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
const Error = Loadable(lazy(() => import("./pages/404"))); // error page

export const authRoutes = [
  { path: "/", element: <Navigate to="login" /> },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "sign-up",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
];

// Manager
const managerRoutes: any = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "internships",
        element: <Internships />,
      },
      {
        path: "interns",
        element: <Interns />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "leaves",
        element: <Leaves />,
      },
      {
        path: "timesheets",
        element: <Timesheet />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
      {
        path: "structure",
        element: <Structure />,
      },
      {
        path: "case-studies",
        element: <CaseStudies />,
      },
      {
        path: "grievances",
        element: <Grievances />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

// Delegate Agent Routes
const delegateAgentRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "delegate-members",
        element: <DelegateMembers />,
      },
      {
        path: "withdrawal-request",
        element: <WithDrawalRequest />,
      },
      {
        path: "withdrawals",
        element: <WithDrawals />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

// System Admin Routes
const systemAdminRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "universities",
        element: <Universities />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "admin",
        element: <Admin />,
      },
      {
        path: "delegate-agent",
        element: <DelegateAgent />,
      },
      {
        path: "property-agent",
        element: <PropertyAgent />,
      },
      {
        path: "help-desk",
        element: <HelpDesk />,
      },
      {
        path: "activity-log",
        element: <ActivityLog />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

// Company Admin Routes
const companyAdminRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "candidates",
        element: <Candidates />,
      },
      {
        path: "internships",
        element: <Internships />,
      },
      {
        path: "offer-letter",
        element: <OfferLetters />,
      },
      {
        path: "contracts",
        element: <Contracts />,
      },
      {
        path: "interns",
        element: <Interns />,
      },
      {
        path: "managers",
        element: <Managers />,
      },
      {
        path: "universities",
        element: <Universities />,
      },
      {
        path: "structure",
        element: <Structure />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "leaves",
        element: <Leaves />,
      },
      {
        path: "timesheets",
        element: <Timesheet />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "documents",
        element: <Documents />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

// Intern Routes
const internRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "leaves",
        element: <Leaves />,
      },
      {
        path: "timesheets",
        element: <Timesheet />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "structure",
        element: <Structure />,
      },
      {
        path: "self-assessment",
        element: <SelfAssesment />,
      },
      {
        path: "grievances",
        element: <Grievances />,
      },
      {
        path: "digivault",
        element: <DigiVault />,
      },
      {
        path: "dream-up",
        element: <DreamUp />,
      },
      {
        path: "payments",
        element: <Payments />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "accommodation",
        element: <Accommodation />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

// Student Routes
const studentRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "search-jobs",
        element: <SearchJobs />,
      },
      {
        path: "application",
        element: <Application />,
      },
      {
        path: "offer-letter",
        element: <OfferLetters />,
      },
      {
        path: "contracts",
        element: <Contracts />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "digivault",
        element: <DigiVault />,
      },
      {
        path: "dream-up",
        element: <DreamUp />,
      },
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "accommodation",
        element: <Accommodation />,
      },
      {
        path: "recipes",
        element: <Recipes />,
      },
      {
        path: "earn-with-us",
        element: <EarnWithUs />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

const universityRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "students",
        element: <Students />,
      },
      {
        path: "companies",
        element: <Companies />,
      },
      {
        path: "attendance",
        element: <Attendance />,
      },
      {
        path: "performance",
        element: <Performance />,
      },
      {
        path: "report",
        element: <Report />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

const agentRoutes = [
  {
    path: "/",
    element: <Navigate to="dashboard" />
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Layout />
      </AuthGuard >
    ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "listings",
        element: <Listings />,
      },
      {
        path: "offers",
        element: <Offers />,
      },
      {
        path: "reservations",
        element: <Reservations />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
];

const ROLES_ROUTES: any = {
  SystemAdmin: systemAdminRoutes,
  Manager: managerRoutes,
  DelegateAgent: delegateAgentRoutes,
  CompanyAdmin: companyAdminRoutes, 
  intern: internRoutes,
  Student: studentRoutes,
  University: universityRoutes,
  Agent: agentRoutes,
  auth: authRoutes,
};

export const getRoutes = (role: any) => {
  return ROLES_ROUTES[role] ?? authRoutes;
};