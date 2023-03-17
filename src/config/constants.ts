console.log("ENV: ", import.meta.env.VITE_APP_URL);
export default {
  appUrl: import.meta.env.APP_URL || "http://localhost:8001",
  ATTENDANCE: "attendance",
  REGISTER_AGENTS: "registerAgents",
  REWARDS: "rewards",
  REGISTER_MEMBERS: "registerMember",
  FEEDBACk: "feedback",
  LISTINGS: "listings",
  USER_ROLE: "Manager",
};

// Possibe string of roles:
// SystemAdmin,
// Manager,
// DelegateAgent,
// CompanyAdmin,
// Intern,
// Student,
// University,
// Agent,

export const ROUTES_CONSTANTS: any = {
  LOGIN: "login",
  SIGNUP: "signup",
  FORGOT_PASSWORD: "forgot-password",
  RESET_LINK_SENT: "reset-link-sent",
  CREATE_PASSWORD: "create-password",
  SUCCESSFULLY_CREATE_PASSWORD: "create-password-success",
  VERIFICATION_LINK_SENT: "verification-link-sent",
  VERIFICATION_STEPS: "verification-steps",
  MAIN: "main",
  MAIN_LAYOUT: "main-layout",
  ERROR_PAGE: "error-page",
  DASHBOARD: "dashboard",
  INTERNSHIPS: "internships",
  NEW_INTERNSHIP: "internships/new-internship",
  VIEW_INTERNSHIP_DETAILS: "internships/view-internship-details",
  INTERNS: "interns",
  INTERNS_PROFILE: "interns/profile",
  INTERNS_CHAT:"interns/chat",
  ATTENDANCE: "attendance",
  LEAVES: "leaves",
  VIEWLEAVEHISTORY: "leaves/history",
  TIMESHEET: "timesheet",
  TIMESHEETHISTORY: 'timesheet/history/:id',
  PERFORMANCE: "performance",
  EVALUATION_FORM: "evaluation-form",
  DOCUMENTS: "documents",
  STRUCTURE: "structure",
  CASE_STUDIES: "case-studies",
  GRIEVANCES: "grievances",
  CALENDAR: "calendar",
  DELEGATE_MEMEBERS: "delegate-members",
  WITHDRAWAL_REQUEST: "withdrawal-request",
  WITHDRAWALS: "withdrawals",
  STUDENT: "student",
  UNIVERSITIES: "universities",
  COMPANIES: "companies",
  ADMIN: "admin",
  DELEGATE_AGENT: "delegate-agent",
  PROPERTY_AGENT: "property-agent",
  HELP_DESK: "help-desk",
  ACTIVITY_LOG: "activity-log",
  CANDIDATES: "candidates",
  OFFER_LETTER: "offer-letter",
  CONTRACTS: "contracts",
  MANAGERS: "managers",
  SELF_ASSESSMENT: "self-assessment",
  DIGIVAULT: "digivault",
  DREAM_UP: "dream-up",
  PAYMENTS: "payments",
  ACCOMMODATION: "accommodation",
  SAVED_SEARCHES: "saved-searches",
  RENTED_PROPERTIES: "rented-properties",
  BOOKING_REQUESTS: "booking-requests",
  ACCOMMODATION_PAYMENTS: "payments",
  PROPERTY_DETAIL: "property",
  SEARCH_JOBS: "search-jobs",
  APPLICATION: "application",
  PROFILE: "profile",
  RECIPES: "recipes",
  EARN_WITH_US: "earn-with-us",
  REPORT: "report",
  LISTINGS: "listings",
  OFFERS: "offers",
  RESERVATIONS: "reservations",
  SETTING: "settings",
  CERTIFICATES: "certificates",
  CERTIFICATESDETAIL: 'certificates/detail/:id',
  PAYROLL: "payroll",
  PERSONALISATION: "personalisation",
  CHAT: "chat",
};

export const STATUS_CONSTANTS: any = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  ACTIVE: "active",
  PENDING: "pending",
  CLOSED: "closed",
  REJECTED: "rejected"
}