
export default {
  APP_URL: import.meta.env.VITE_APP_URL,
  ATTENDANCE: "attendance",
  REGISTER_AGENTS: "registerAgents",
  REWARDS: "rewards",
  REGISTER_MEMBERS: "registerMember",
  FEEDBACk: "feedback",
  LISTINGS: "listings",
  SYSTEM_ADMIN: 'SYS_ADMIN',
  INTERN: 'INTERN',
  COMPANY_ADMIN: 'COMPANY_ADMIN',
  MANAGER: 'COMPANY_MANAGER',
  DELEGATE_AGENT: 'DELEGATE_AGENT',
  AGENT: 'PROPERTY_AGENT',
  STUDENT: 'STUDENT',
  UNIVERSITY: 'UNIVERSITY',
  PUBLIC: 'PUBLIC',
  NOTIFICATION_DETAILS: {
    success: {
      message: "Details Submitted!",
      description:
        "We've got your information. Our team will get in touch you shortly!",
    },
    error: {
      message: "Something went wrong!",
      description: "Please try again later or email us",
    },
  }
};

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
  INTERNSHIP_PIPELINE: "internships/pipeline",
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
  TIMESHEETHISTORY: "timesheet/history",
  INTERNTIMESHEETHISTORY: "timesheet/view-history",
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
  RECEIVED_OFFER_CompanyAdmin: "received-company-admin-offer",
  RECEIVED: "received",
  REJECTED:"rejected",
  SIGNED:"signed",
// Student offerLetter
  RECEIVED_OFFER:"received-offer",
  REJECTED_OFFER:"rejected-offer",
  SIGNED_OFFER:"signed-offer",
  //companyAdmin Contract
  SIGNED_CompanyAdmin:"signed-company-admin",
  PENDING_VIEW:"pending-view-details",
  EDIT_CONTRACT: "edit-contract",
//ComapnyAdmin offerLetter
 REJECTED_CompanyAdmin:"rejected-company-admin",
 PENDING_OFFER_VIEW:"pending-view-details-offer",
 EDIT_OFFER_CONTRACT: "edit-offer-letter",
 REJECTED_OFFER_CompanyAdmin:"rejected-company-admin-offer",
 SIGNED_OFFER_CompanyAdmin:"signed-company-admin-offer",
  CONTRACTS: "contracts",
  RECEIVED_CompanyAdmin: "received-company-admin",
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
  CERTIFICATESDETAIL: "certificates/detail",
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
  TEMPLATE_CERTIFICATE_APPRECIATION:
    "/settings/template/certificate-of-appreciation",
  TEMPLATE_CERTIFICATION_COMPLETION:
    "/settings/template/certificate-of-completion",
  OFFER_LETTER_NEW_TEMPLATE: "/settings/template/offer-letters/new-template",
  CONTRACT_NEW_TEMPLATE:"/settings/template/contract/new-template",
  REJECTION_LETTER_NEW_TEMPLATE:"/settings/template/rejection-letter/new-template",
  TCA_NEW_TEMPLATE:"/settings/template/certificate-of-appreciation/new-template",
  TCC_NEW_TEMPLATE:"/settings/template/certificate-of-completion/new-template",
  ADD_SHIFT:"/settings/shifts/add-shift",
  PAYROLL_ADD_CATEGORY:"/settings/payroll/add-category",
  ALL_GRIEVANCES:"/grievances/all-grievance",
  GRIEVANCES_Details:"/grievances/all-grievance/grievance-detials",
  HISTORY: 'history',
  UNIVERSITIES_INTERNS:"universities/interns",
  UNIVERSITIES_PROFILE:"universities/profile",
  AcceptedFileTyp:'application/pdf,image/jpeg,application/msword',
  JOBDETAILS:'search-jobs/job-details',
};

export const STATUS_CONSTANTS: any = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
  ACTIVE: "active",
  PENDING: "pending",
  CLOSED: "closed",
  REJECTED: "rejected",
};
export const AcceptedFileTyp = "application/pdf,image/jpeg,application/msword";
