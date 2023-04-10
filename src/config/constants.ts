console.log("ENV: ", import.meta.env.VITE_APP_URL);

export default {
  APP_URL: import.meta.env.VITE_APP_URL || "http://localhost:8001",
  ATTENDANCE: "attendance",
  REGISTER_AGENTS: "registerAgents",
  REWARDS: "rewards",
  REGISTER_MEMBERS: "registerMember",
  FEEDBACk: "feedback",
  LISTINGS: "listings",
  COMPANY_ADMIN: 'CompanyAdmin',
  MANAGER: 'Manager',
  INTERN: 'Intern',
  UNIVERSITY: 'University',
  SYSTEM_ADMIN: 'SystemAdmin',
  DELEGATE_AGENT: 'DelegateAgent',
  STUDENT: 'STUDENT',
  AGENT: 'Agent',
  USER_ROLE: JSON.parse(
    localStorage.getItem("UserData") || JSON.stringify({ role: "" })
  )?.role,
};

// Possible string of roles:
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
  INTERNSHIP_PIPELINE: 'internships/pipeline',
  NEW_INTERNSHIP: "internships/new-internship",
  VIEW_INTERNSHIP_DETAILS: "internships/view-internship-details",
  PAYROLL: "payroll",
  PAYROLL_DETAILS: "payroll/payroll-details",
  VIEW_PAYROLL_SALARY_SLIP: "payroll/payroll-details/view-payroll-details",
  INTERNS: "interns",
  COMPLETE_INTERNS: "interns/complete",
  INTERNS_PROFILE: "interns/profile",
  INTERNS_CHAT: "interns/chat",
  ATTENDANCE: "attendance",
  LEAVES: "leaves",
  VIEWLEAVEHISTORY: "leaves/history",
  TIMESHEET: "timesheet",
  TIMESHEETHISTORY: 'timesheet/history',
  INTERNTIMESHEETHISTORY: 'timesheet/view-history',
  PERFORMANCE: "performance",
  VIEW_PERFORMANCE_HISTORY: "performance/history/:id",
  DETAIL: "detail",
  EVALUATION_FORM: "evaluation-form",
  EVALUATE: "evaluate",
  DOCUMENTS: "documents",
  STRUCTURE: "structure",
  CASE_STUDIES: "case-studies",
  CASE_STUDIES_ASSESSMENT_FORM: "case-studies/assessment-form/:id",
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
  SELF_ASSESSMENT_Form: "self-assessment/assessment-form",
  DIGIVAULT: "digivault",
  DREAM_UP: "dream-up",
  ALL_GOALS: "dream-up/all-goals",
  PAYMENTS: "payments",
  VIEW_PAYMENT_DETAILS: "payments/view-payment-details",
  ACCOMMODATION: "accommodation",
  SAVED_SEARCHES: "saved-searches",
  RENTED_PROPERTIES: "rented-properties",
  BOOKING_REQUESTS: "booking-requests",
  ACCOMMODATION_PAYMENTS: "payments",
  PROPERTY_DETAIL: "property/:propertyId",
  SEARCH_JOBS: "search-jobs",
  APPLICATION: "application",
  PROFILE: "profile",
  RECIPES: "recipes",
  RECIPE_DETAILS: "recipe/:recipeId",
  RECIPE_UPDATE: "recipe-update/:recipeId",
  RECIPE_ADD: "recipe-add",
  EARN_WITH_US: "earn-with-us",
  REPORT: "report",
  REPORT_VIEW_DETAILS: "report/view-details/:id",
  REPORT_ASSESSMENT_FORM: "assement-form/:id",
  LISTINGS: "listings",
  LISTING_EDIT: "edit-listing/:listingId",
  OFFERS: "offers",
  RESERVATIONS: "reservations",
  SETTING: "settings",
  CERTIFICATES: "certificates",
  CERTIFICATESDETAIL: 'certificates/detail',
  PERSONALISATION: "personalisation",
  CHAT: "chat",
  SETTING_LOCATION: "location",
  SETTING_DEPARTMENT: "department",
  SETTING_LEAVES: "leaves",
  SETTING_PERFORMANCE: "performance",
  SETTING_TEMPLATE: "template",
  SETTING_SHIFTS: "shifts",
  SETTING_TIMESHEET: "timesheet",
  SETTING_PAYROLL: "payroll",
  ADD_LOCATION: "/settings/location/add-location",
  LEAVES_ADD_POLICY: "/settings/leaves/add-policy",
  TEMPLATE_OFFER_LETTER: "/settings/template/template-offer-letters",
  TEMPLATE_CONTRACT: "/settings/template/contract",
  TEMPLATE_REJECTION_LETTER: "/settings/template/rejection-letter",
  TEMPLATE_CERTIFICATE_APPRECIATION: "/settings/template/certificate-of-appreciation",
  TEMPLATE_CERTIFICATION_COMPLETION: "/settings/template/certificate-of-completion",
  OFFER_LETTER_NEW_TEMPLATE: "/settings/template/offer-letters/new-template",
  CONTRACT_NEW_TEMPLATE: "/settings/template/contract/new-template",
  REJECTION_LETTER_NEW_TEMPLATE: "/settings/template/rejection-letter/new-template",
  TCA_NEW_TEMPLATE: "/settings/template/certificate-of-appreciation/new-template",
  TCC_NEW_TEMPLATE: "/settings/template/certificate-of-completion/new-template",
  ADD_SHIFT: "/settings/shifts/add-shift",
  PAYROLL_ADD_CATEGORY: "/settings/payroll/add-category",
  ALL_GRIEVANCES: "/grievances/all-grievance",
  GRIEVANCES_Details: "/grievances/all-grievance/grievance-detials",
  HISTORY: 'history',
  UNIVERSITIES_INTERNS: "universities/interns",
  UNIVERSITIES_PROFILE: "universities/profile",
  AcceptedFileTyp: 'application/pdf,image/jpeg,application/msword',
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
export const AcceptedFileTyp = 'application/pdf,image/jpeg,application/msword'