const endpoints = {
  LOGIN: "auth/login",
  EMAIL_VERIFY: "auth/email-verify",
  LOGOUT: "/auth/logout",
  INTERN_DASHBOARD: "dashboard",

  // GENERALS
  GET_GENERAL_ACTIVITY: "/general/activity",
  GENERATE_PDF: "/general/generatePdf",
  SEND_EMAIL: "/general/sendEmail",

  //ATTACHMENTS
  CREATE_ATTACHMENT: "/attachment/create",
  UPDATE_ATTACHMENT: "/attachment/update",
  DELETE_ATTACHMENT: "/attachment/delete",

  // PROPERTIES
  GET_AGENT_PROPERTIES: "/property/get-agent-properties",
  ADD_PROPERTY: "/property/add-property",
  GET_PROPERTY: "/property/get-property?propertyId=",
  CHECK_PROPERTY_AVAILABILITY: "/property/check-property-availability",
  UPDATE_PROPERTY: "/property/update-property?propertyId=",
  DELETE_PROPERTY: "property/delete-property?propertyId=",
  GET_AVAILABLE_PROPERTIES: "property/get-available-properties",
  GET_SAVED_PROPERTIES: "property/get-saved-properties",
  GET_RENTED_PROPERTIES: "property/get-rented-properties",
  GET_PROPERTY_BOOKINGS: "property/get-property-bookings",
  POST_SAVE_PROPERTY: "/property/save-property",
  POST_UNSAVE_PROPERTY: "/property/unsave-property",
  GET_SEARCH_BOOKING_REQUEST: "/property/search-booking-request",
  CANCEL_BOOKING_REQUEST: "/property/cancel-booking",
  GET_ALL_PROPERTY_AGENTS: "/property/get-all-property-agents",
  GET_PAYMENTS: "/property/get-property-booking-payment-detail",
  SEND_BOOKING_REQUEST: "/property/add-property-booking",
  ADD_PROPERTY_VIEWS: "/property/add-count-in-property-total-views",

  LOCATION: "/location",
  DEPARTMENT: "/department",
  AGENT_DASHBOARD_WIDGETS: "/property/get-agent-dashboard-widgets",
  UNIVERSITY_DASHBOARD_WIDGETS: "/university/dashboard-stats",
  PAYROLL_FINDALL: "/payroll/findAll",
  SIGNUP: "/auth/signup",
  CHANGEPASSWORD: "/auth/confirm-password",
  FORGOTPASSWORD: "/auth/forgot-password",
  TIMESHEET_FIND_ALL: "timesheet/category/findAll",
  GET_CONTRACT_LIST: "/Contract/list",
  DEL_CONTRACT: "/Contract/delete",
  CONTRACT_DETAILS: '/Contract/detail',
  EDIT_CONTRACT: '/Contract/update',
  RECEIVED_VIEW: '/Contract/received-view-details',
  VERIIFCATION_STUDENT: "/student/signup-stepper",
  COMPANY_VERIFICATION_STEP_1: "/company/add-business-information",
  COMPANY_VERIFICATION_STEP_2: "/company/add-company-address",
  COMPANY_VERIFICATION_STEP_3: "/company/add-owner-information",
  SEARCH_COMPANY_HOUSE: "/company/search",
  PROFILE_CHANGE_PASSWORD: "/auth/change-password",
  PROPERTY_GET_LISTING_STATS: "/property/get-listings-stats",
  PROPERTY_Get_TOTAL_AGENTS: "/property/get-property-agents",
  STUDENT_INTRNE_SAWITCH: "/auth/student-intern-switch",
  MANAGER_COMPANY_ADMIN: "/manager_manager/create-company-manager",
  GET_MANAGER_COMPANY_ADMIN: "/manager_manager/get-company-manager-list",
  GET_MANAGER_DETAIL_ID: "/manager_manager/get-company-manager-detail",
  UPDATE_MANAGER_PROFILE: "/manager_manager/update-company-manager",
  GET_RECENT_LISTING: "/property/get-recent-listings",
  CONTRACT_DASHBOARD: "/Contract/contract-dashboard",
  OFFER_LETTER_DASHBOARD: "/Contract/offer-letter-dashboard",
  GET_DIGIVAULT_DASHBOARD: "/digivault/get-dashboard",
  GET_FOLDER_CONTENT: "/digivault/get-folder-content",
  RESET_dIGIVAULT_PASSWORD: "/digivault/set-new-vault-password",
  POST_REST_DIGIVAULT: "/digivault/reset-vault-password",
  GET_LIST_INTERNSHIP: "/internship/listInternships",
  GET_INTERNSHIP_DETAILS: "/internship/getInternshipDetail",
  DEL_INTERNSHIP: "/internship/deleteInternship",
  POST_NEW_INTERNSHIP: "/internship/createInternship",
  STUDENT_INTRNE_SWITCH: "/auth/student-intern-switch",
  AUTH_VERIFF: "/auth/veriff",
  EDIT_INTERNSHIP: "/internship/updateInternshipDetail",
  GET_ALL_LISTINGS: "/property/get-all-listings",
  // AUTH_VERIFF:'/auth/veriff/{cognitoId}',

  // End Point For Leave Module For Intrne
  CREATE_LEAVE: "/Leaves/create",
  GET_LEAEV_LIST: `/Leaves/list`,
  // AUTH_VERIFF:'/auth/veriff/{cognitoId}',
  CALANDER_LEAEV_LIST: `/Leaves/calender-list`,
  HOLIDAY_LIST: "/Leaves/upcoming-holidays",
  IP_API: "http://ip-api.com/json",
  LEAVE_STATE: "/Leaves/state",
  PENDING_LEAVES: "Leaves/get-pending-leaves",
  UPDATE_LEAVE_STATUS: "Leaves/update",
  DELETE_LEAVE: "Leaves/delete",

  LEAVE_DETAIL: "Leaves/detail",
  LEAVE_WHO_AWAY: "Leaves/whos-away",

  // GET_ALL_INTERNS: "/candidate/listCandidates",
  POST_NEW_VAULT_PASSWORD: "/digivault/set-new-vault-password",
  POST_DIGIVAULT_PASSWORD: "/digivault/enable-disable-lock",
  GET_COUNTRIES_LIST: "https://restcountries.com/v3/all",
  POST_CREATE_FOLDER_FILE: "/digivault/create-folder-file",
  DEL_FOLDER_FILE: "/digivault/delete-folder-file",
  GET_RESERVATIONS: "/property/get-reservations",
  UPDATE_STATUS_RESERVATION: "/property/approve-reject-booking-request",
  GET_GENERAL_LOG: "/general/activity",
  DUBLICATE_INTERNSHIP: "/internship/duplicateInternship",
  POST_OFFERS: "/property/create-offer",
  GET_OFFERS: "/property/get-offers",
  EDIT_OFFERS: "/property/edit-offer",
  GET_LEAVE_POLICY: "/leave-policy",
  REJECT_CANDIDATE: `/candidate/rejectCandidate`,

  //candidates
  GET_HELP_DESK_LIST: "/helpdesk/list-helpdesk",
  EDIT_HELP_DESK: "/helpdesk/update-helpdesk",
  POST_HELP_DESK: "/helpdesk/create-helpdesk",
  HISTORY_HELP_DESK: "/helpdesk/history-helpdesk",
  GET_ROLEBASE_USERS: "/auth/get-rolebase-user",
  VIEW_HELP_DESK_DETAILS: "/helpdesk/get-helpdesk-by-id",
  CREATE_HELPDESK_COMMENT: "/helpdesk-comments",
  UPDATE_HELPDESK_COMMENT: "/helpdesk-comments/likes",
  CREATE_CONTRACT_OFFERLETTER: `/Contract/create`,
  //candidates
  CANDIDATE_LIST: `/candidate/listCandidates`,
  UPDATE_CANDIDATE_DETAIL: `/candidate/updateCandidateDetail`,
  STUDENT_DIGIVAULT: "/digivault/get-dashboard",
  DUPLICATE_INTERNSHIP: "/internship/duplicateInternship",
  // birthdat notification
  CREATE_NOTIFICATION: `/notification/create-notification`,
  //comment
  GET_COMMENTS: "/comment/getComments",
  ADD_COMMENT: `/comment/addComment`,

  // manager
  GET_COMPANY_MANAGER_LIST: `/manager_manager/get-company-manager-list`,
  GET_SINGLE_COMPANY_MANAGER_LIST: `/manager_manager/get-single-company-manager-list`,

  //event
  CREATE_MEETING: `/Event/create-meeting`,
  ADMIN_MEETING_LIST: `/Event/admin-meeting-list`,
  DELETE_MEETING: `/Event/delete-meeting`,
  UPDATE_MEETING: `/Event/update-meeting`,
  UPDATE_MEETING_STATUS: "/Event/update-meeting-Confirmation",

  // template
  GET_ALL_TEMPLATES: `/template/findAll`,

  //student
  STUDENT_PROFILE: `/student/profile`,
  STUDENT_INTERN_DOCUMENT: "/student-intern-documents",
  ATTACHMENT_UPDATE_STUDENT: "/attachment/update",
  ATTACHMENT_CREATE_STUDENT: "/attachment/create",
  ATTACHMENT_DELETE_STUDENT: "/attachment/delete",

  //documents
  DOCUMENT_REQUEST: `/student-intern-documents/request`,

  //case-studies
  CASE_STUDIES: `case-studies`,

  // intern
  INTERN_LIST: `/intern/list`,

  //media upload
  MEDIA_UPLOAD: `/media/upload`,

  //dashboards
  SYSTEM_ADMIN_DASHBOARD: `/dashboard/system-admin`,
  TODAY_USERS_BIRTH_DAYS_LIST: `/dashboard/today/users/birthdays`,
  PERFORMANCE_GRAPH_ANALYTICS: `/performance/graph/analytics`,
  DASHBOARD_LEAVES_COUNT: `/Leaves/whos-away-dashboard`,
  DASHBOARD_ATTENDANCE_AVERAGE: `/intern/get-attendance-average`,
  DASHBOARD_ATTENDANCE_MOOD: `/intern/add-attendance-mood`,
  DASHBOARD_ATTENDANCE_CLOCKIN: `/intern/add-attendance-clockin`,
  DASHBOARD_ATTENDANCE_CLOCKOUT: `/intern/add-attendance-clockout`,
  GET_INTERN_TODAY_INTERN_ATTENDANCE: `/intern/get-intern-today-attendance`,
  AGENT_DASHBOARD_LISTING_GRAPH: `/property/get-listings-stats_for_graph`,
  COMPANY_DASHBOARD_PIPLINE_TABLE: ``,
  COMPANY_DASHBOARD_INTERSHIP_SUMMERY_GRAPH: ``,
  COMPANY_DASHBOARD_WIDGETS: `dashboard/admin/stats`,
  COMPANY_DASHBOARD_UNIVERSITIES: ``,
  CMANAGER_DASHBOARD_UNIVERSITIES: ``,
  MANAGER_DASHBOARD_WIDGETS: `/dashboard/intern/statistics`,
  MANAGER_COMPANY_UNIVERSITIES: `/company/universities`,

  // End Point For Leaev Module For Intrne
  // CREATE_LEAVE: "/Leaves/create",
  GET_LEAVE_LIST: `/Leaves/list`,
  GET_ALL_INTERNS: "/candidate/listCandidates",
  // university reports
  UNIVERSITY_REPORTS: `/university-reports`,
  UNIVERSITY_USER_REPORTS: `/university-reports/user-reports`,
  UNIVERSITY_REPORTS_FILTER: `/university-reports/get-university-reports-filter`,
  //attendance graph

  //Internships Summary graph
  ATTENDANCE_OVERVIEW: `/intern/get_attenance_overview`,

  //Applications for student
  GET_APPLICATIONS: "/application/listApplications",
  GET_APPLICATIONS_DETAILS: "/application/getApplicationDetail",
  GET_COMPANY_MANAGERS_LIST: "/manager_manager/get-company-manager-list",
  GET_INTERNAL_UNIVERSITIES: "/university/findAll",
  GET_ALL_UNIVERSITIES: "/university",
  GET_COMPANYADMIN_UNIVERSITES: "/university/findAll",
  GET_UNIVERSITYINTERNS: "/university/universityInterns",
  WITH_DRAWAL_REQUEST: "/withdrawl-request/findAll",
  SETTING_DAPARTMENT: "/department",
  SETTING_LOCATION: "/location",
  STUDENT_SYSTEM_ADMIN: "/sys_admin/get-sub-admin-student",
  UNIVERSITY_SUB_ADMIN_SYSTEM_ADMIN: "/sys_admin/get-sub-admin-universities",
  COMPANY_SUB_ADMIN_SYSTEM_ADMIN: "/sys_admin/get-sub-admin-companies",
  ADMIN_SUB_ADMIN_SYSTEM_ADMIN: "/sys_admin/get-sub-admin",
  ADD_ADMIN_SUB_ADMIN_SYSTEM_ADMIN: "/sys_admin/create-sub-admin",
  GET_DELEGATE_ADMIN_DASHBOARD: "/delegate/admin-dashboard",
  GET_DELEGATE_AGENTS_DASHBOARD: "/delegate/agents",
  ADD_DELEGATE_REWARDS: "/reward/add",
  GET_PROPERTY_AGENTS: "/property/get-all-property-agents",
  GET_ALL_REWARD_DATA: "/reward/findAll",
  REFRESH_TOKEN: "/auth/refresh-token",
  GET_LISTING_STATS_FOR_GRAPH: "/property/get-listings-stats_for_graph",
  STUDENT_PROFILE_COMPLETION: "/student/profile-completion",

  SETTING_PERFORMANCE: "/performance",
  SETTINGS_TEMPLATES: "/template/findAll",
  SETTINGS_SHIFTS: "/shift/findAll",
  POST_NEW_SHIFTS: "/shift/add",
  DELETE_SHIFT: "/shift/delete",
  SETTINGS_TIMESHEET: "/timesheet/category/findAll",
  POST_NEW_TIMESHEET: "/timesheet/category/add",
  DELETE_TIMESHEET: "/timesheet/category/delete",
  EDIT_TIMESHEET: "/timesheet/category/edit",
  DELETE_PAYROLL: "/payroll/delete",
  GET_INTERN_PAYMENT: "/intern/get-intern-total-hours",
  DELETE_SETTING_TEMPLATE: "/template/delete",
  POST_SETTING_TEMPLATE: "/template/add",
  EDIT_SETTING_TEMPLATE: "/template/edit",
  GET_CERTIFICATES: "/certificate/listCertificates",
  GET_PAYROLL_DETAILS: "/intern/get-intern-total-hours-for-admin",

  // DELEGATE
  GET_DELEGAE_DASHBOARD: "/delegate/dashboard",
  GET_DELEGAE_MEMBERS: "/delegate/members",
  GET_DELEGAE_AGENTS: "/delegate/agents",
  PATCH_DELEGAE_ACCESS: "/delegate/access",
  GET_DELEGAE_BALANCE: "/delegate/balance",
  GET_DELEGAE_ADMIN_DASHBOARD: "/delegate/admin-dashboard",

  // Dreamup Endpoints
  DREAMUP: {
    GET_GOALS: "/dreamup/get-goals",
    ADD_GOALS: "dreamup/add-goal",
    DELETE_GOAL: "dreamup/delete-goal",
    ADD_TASK: "dreamup/add-task",
    EDIT_TASK: "dreamup/edit-task",
    DELETE_TASK: "dreamup/delete-task",
    MARK_TASK: "dreamup/mark-task",
    UPDATE_LIFE_ASSESSMENT: "dreamup/add-update-life-assesment",
    LIFE_ASSESSMENT: "dreamup/get-life-assesment",
  },

  AGENT_PROFILE: "/auth/profile",
  CHANGE_AGENT_PASSWORD: "/auth/change-password",

  // PERFORMANCE
  GET_PERFORMANCE: "/performance",
  PERFORMANCE_EVALUATION: "/performance/evaluation",
  GET_PERFORMANCE_LIST: "/performance/evaluation/list",
  GET_PERFORMANCE_DETAIL: "/performance/questionnaire/detail",
  GET_INTERN_PERFORMANCE: '/performance/intern',
  GET_PERFORMANCE_EVALUATION: "/performance/intern",

  //Announcement api's
  POST_NEW_ANNOUNCEMENT: "/announcement/add",
  ANNOUNCEMENT_FINDALL: "/announcement/findAll",

  // RECIPES
  GET_ALL_RECIPES: "/recipe/get-recipies",
  GET_RECIPE: "/recipe/get-recipe",
  CREATE_RECIPE: "/recipe/add-recipe",
  UPDATE_RECIPE: "/recipe/edit-recipe",
  DELETE_RECIPE: "/recipe/delete-recipe",
  ADD_RATING: "/recipe/add-rating",
  GET_SEARCHJOBS: "/job/listJobs",
  GET_DETAILESEARCHJOBS: "/job/getJob",

  // Dashboard
  GET_SYSTEM_ADMIN_DASHBOARD: "dashboard/system-admin",
  GET_DELEGATE_DASHBOARD: "delegate/dashboard",
  GET_DELEGATE_MEMBERS: "delegate/members",
  SEND_REFERENCE_INVITE: "delegate/invite",
  GET_ALL_COMAPANIES: "/university/universityCompanies",
  ADD_PAYROLL: "/payroll/add",
  EDIT_PAYROLL: "/payroll/edit",
  EDIT_SHIFT: "/shift/edit",
  GET_CURRENT_BALANCE: "delegate/balance",
  INTERN_WORKING_STATS: `/intern/get-intern-working-stats`,

  //Payment Gateway
  LINK_BANK_ACCOUNT: "payment-gateway/account/link",
  GET_BANK_ACCOUNT_LIST: "payment-gateway/accounts/findAll",
  UPDATE_BANK_ACCOUNT: "payment-gateway/account/update",
  GET_BANK_ACCOUNT_DETAIL: "payment-gateway/account/detail",
  ADD_WITH_DRAWL_REQUEST: "/withdrawl-request",
  CREATE_PAYMENT_CARD: "/payment-gateway/add/card",
  GET_PAYMENT_CARDS: "/payment-gateway/list/cards",
  DELETE_PAYMENT_CARD: "/payment-gateway/delete/card",

  // student dashboard
  STUDENT_DASHBOARD_WIDGET: "/job/studentDashboardWidget",
  STUDENT_RECENT_JOB: "/job/listJobs",
  UPDATE_STUDENT_PROFILE: "/student/profile",
  STUDENT_IMMIGRATION_STATUS_WITHOUT_SHARECODE: "/student/immigration-status-without-sharecode",
  GET_IMMIGRATION_STATUS_WITHOUT_SHARECODE: "/student/immigration-status-without-sharecode",

  //TimeSheet

  INTERN_ADD_TIMESHEET: "timesheets/create-task",
  INTERN_EDIT_TIMESHEET: "timesheets/update-task",
  GET_INTERN_TIMESHEET_CATEGORIES: "timesheets/get-tasks-with-categories",
  GET_INTERN_TIMESHEET_DATE: "timesheets/get-tasks-of-a-date",
  GET_INTERN_TIMESHEET_DATE_RANGE: "timesheets/get-tasks-in-a-date-range",
  GET_INTERN_TIMESHEET_USERS: "timesheets/get-users-tasks-stats",
  GET_INTERN_TIMESHEET_TIMELINE: "timesheets/get-tasks-between-timeline",

  //Events Reminders
  GET_ALL_MEETINGS: "Event/meeting-list",
  INTERN_ATTENDEES_LIST: "/manager_manager/get-company-manager-list-intern",
  CREATE_REMINDER: "Event/create-reminder",
  UPDATE_REMINDER: "Event/update-reminder",
  DELETE_REMINDER: "Event/delete-reminder",

  // Structure
  GET_STRUCTURE_HEIRARACHY: "/auth/get-hierarchy-structure",
  // Self assessment
  ASSESSMENT: {
    GET_ASSESSMENTS: "/assessment/get-assessments",
    GET_ASSESSMENT: "/assessment/get-assessments",
    ADD_ASSESSMENT: "assessment/add-assessment",
    DELETE_ASSESSMENT: "/assessment/delete-assessment",
    EDIT_ASSESSMENT: "/assessment/edit-assessment",
  },
  // Attendance
  INTERN: {
    LIST: "intern/list",
    ADD_ATTENDANCE_CLOCKIN: "/intern/add-attendance-clockin",
    ADD_ATTENDANCE_CLOCKOUT: "/intern/add-attendance-clockout",
    ADD_ATTENDANCE_MOOD: "/intern/add-attendance-mood",
    GET_ATTENDANCE_LIST: "/intern/get-attendance-list",
    GET_ATTENDANCE_AVERAGE: "/intern/get-attendance-average",
    GET_ATTENDANCE_STATS: "/intern/get-intern-attendance-stats",
    GET_ATTENDANCE_TODAY: "/intern/get-today-attendance",
    GET_ATTENDANCE_EMPLOYEES: "/intern/get_attendance_of_all_employees",
    GET_ATTENDANCE_DEP: "/intern/get_attendance_by_department",
    GET_ATTENDANCE_OVERVIEW: "/intern/get_attenance_overview",
    GET_ATTENDANCE_DETAILS_INTERN: "/intern/get-attendance-detail-of-intern",
  },

  DELEGATE_ACCESS: "/delegate/access",
  UPDATE_PUBLICATION_STATUS: "/property/update-property-publication-status",
  UPDATE_VERIFICATION_STATUS: "/property/update-property-verification-status",

  GET_APPLICATION_INTERN: "/application/applyInternship",
  GET_DEPARTMENT_JOBS: "/department",

  // Grievences
  GRIEVANCE_LIST: "/grievance/list",
  GRIEVANCE_CREATE: "/grievance/create",
  GRIEVANCE_DETAIL: "/grievance/detail",
  GRIEVANCE_UPDATE: "/grievance/update",
  GRIEVANCE_DELETE: "/grievance/delete",

  // Student/Intern Documents
  DOCUMENTS_LIST: "/student-intern-documents",

  // Grievances
  GRIEVANCE_DASHBOARD: "/grievance/grievance_dashboard_graph",
  GRIEVANCE_RESPONSE_TIME: "/grievance/avg_resol_res_time",
  GRIEVANCE_FEEDBACK_GRAPH: "/grievance/feedback_graph",
  GRIEVANCE_REPLY: "/grievance/grievance_reply",
  GRIEVANCE_GRIEVANCE_GRAPH: "/grievance/grievance_graph",
  GRIEVANCE_REPLY_LIST: "/grievance/grievance_reply_list",
  GRIEVANCE_FEEDBACK: "/grievance/feedback",
};
export default endpoints;
