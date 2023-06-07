const endpoints = {
  LOGIN: "auth/login",
  LOGOUT: "/auth/logout",
  INTERN_DASHBOARD: "dashboard",

  // PROPERTIES
  GET_AGENT_PROPERTIES: "/property/get-agent-properties",
  ADD_PROPERTY: "/property/add-property",
  GET_PROPERTY: "/property/get-property?propertyId=",
  CHECK_PROPERTY_AVAILABILITY: "/property/check-property-availability",
  UPDATE_PROPERTY: "/property/update-property?propertyId=",
  DELETE_PROPERTY: "/property/delete-property?propertyId=",
  GET_AVAILABLE_PROPERTIES: "/property/get-available-properties",
  GET_SAVED_PROPERTIES: "/property/get-saved-properties",
  GET_RENTED_PROPERTIES: "/property/get-rented-properties",
  GET_PROPERTY_BOOKINGS: "/property/get-property-bookings",
  GET_SEARCH_BOOKING_REQUEST: "/property/search-booking-request",
  CANCEL_BOOKING_REQUEST: "/property/cancel-booking",
  POST_SAVE_PROPERTY: "/property/save-property",
  GET_ALL_PROPERTY_AGENTS: "/property/get-all-property-agents",
  GET_PAYMENTS: "/property/get-property-booking-payment-detail",

  LOCATION: "/location",
  DAPARTMENT: "/department",
  AGENT_DASHBOARD_WIDGETS: "/property/get-agent-dashboard-widgets",
  PAYROLL_FINDALL: "/payroll/findAll",
  SIGNUP: "/auth/signup",
  CHANGEPASSWORD: "/auth/change-password",
  FORGOTPASSWORD: "/auth/forgot-password",
  TIMESHEET_FIND_ALL: "timesheet/category/findAll",
  VERIIFCATION_STUDENT: "/auth/veriff/{cognitoId}",
  PROFILE_CHANGE_PASSWORD: "/auth/change-password",
  PROPERTY_GET_LISTING_STATS: "/property/get-listings-stats",
  PROPERTY_Get_TOTAL_AGENTS: "/property/get-property-agents",
  STUDENT_INTRNE_SAWITCH: "/auth/student-intern-switch",
  MANAGER_COMPANY_ADMIN: "/manager_manager/create-company-manager",
  GET_MANAGER_COMPANY_ADMIN: "/manager_manager/get-company-manager-list",
  GET_MANAGER_DETAIL_ID: "/manager_manager/get-company-manager-detail",
  GET_RECENT_LISTING: "/property/get-recent-listings",
  GET_CONTRACT_LIST: "/Contract/list",
  CONTRACT_DASHBOARD: "/Contract/dashboard",
  DEL_CONTRACT: "/Contract/delete",
  GET_DIGIVAULT_DASHBOARD: "/digivault/get-dashboard",
  GET_FOLDER_CONTENT: "/digivault/get-folder-content",
  POST_DIGIVAULT: "/digivault/set-new-vault-password",
  POST_NEW_VAULT_PASSWORD: "/digivault/set-new-vault-password",
  POST_DIGIVAULT_PASSWORD: "/digivault/enable-disable-lock",
  GET_COUNTRIES_LIST: "https://restcountries.com/v3/all",
  POST_CREATE_FOLDER_FILE: "/digivault/create-folder-file",
  DEL_FOLDER_FILE: "/digivault/delete-folder-file",
  GET_RESERVATIONS: "/property/get-reservations",
  UPDATE_STATUS_RESERVATION: "/property/approve-reject-booking-request",
  GET_GENERAL_LOG: "/general/activity",
  GET_LIST_INTERNSHIP: "/internship/listInternships",
  GET_INTERNSHIP_DETAILS: "/internship/getInternshipDetail",
  DEL_INTERNSHIP: "/internship/deleteInternship",
  DUBLICATE_INTERNSHIP: "/internship/duplicateInternship",
  POST_NEW_INTERNSHIP: "/internship/createInternship",
  POST_OFFERS: "/property/create-offer",
  GET_OFFERS: "/property/get-offers",
  EDIT_OFFERS: "/property/edit-offer",
  GET_LEAVE_POLICY: "/leave-policy",
  //candidates
  CANDIDATE_LIST: `/candidate/listCandidates`,
  UPDATE_CANDIDATE_DETAIL: `/candidate/updateCandidateDetail`,
  STUDENT_DIGIVAULT: "/digivault/get-dashboard",
  POST_REST_DIGIVAULT: "/digivault/reset-vault-password",
  DUPLICATE_INTERNSHIP: "/internship/duplicateInternship",
  EDIT_INTERNSHIP: "/internship/updateInternshipDetail",
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
  // template
  GET_ALL_TEMPLATES: `/template/findAll`,
  //student
  STUDENT_PROFILE: `/student/profile`,
  //documents
  DOCUMENT_REQUEST: `/Document/request`,
  //case-studies
  CASE_STUDIES: `case-studies`,
  // intern
  INTERN_LIST: `/intern/list`,
  // End Point For Leaev Module For Intrne
  //media upload
  MEDIA_UPLOAD: `/media/upload`,
  //dashboards
  SYSTEM_ADMIN_DASHBOARD: `/dashboard/system-admin`,
  // End Point For Leaev Module For Intrne
  CREATE_LEAVE: "/Leaves/create",
  GET_LEAEV_LIST: `/Leaves/list`,
  GET_ALL_INTERNS: "/candidate/listCandidates",
  // university reports
  UNIVERSITY_REPORTS: `/university-reports`,
  UNIVERSITY_USER_REPORTS: `/university-reports/user-reports`,
  UNIVERSITY_REPORTS_FILTER: `/university-reports/get-university-reports-filter`,
  //Internships Summary graph
  ATTENDANCE_OVERVIEW: `/intern/get_attenance_overview`,

  //Applications for student
  GET_APPLICATIONS: "/application/listApplications",
  GET_APPLICATIONS_DETAILS: "/application/getApplicationDetail",
  GET_COMPANY_MANAGERS_LIST: "/manager_manager/get-company-manager-list",
  GET_ALL_UNIVERSITIES: "/university/findAll",
  GET_COMPANYADMIN_UNIVERSITES: "/university/findAll",
  GET_UNIVERSITYINTERNS: "/university/universityInterns",
  GET_GENERAL_ACTIVITY: "/general/activity",
  WITH_DRAWAL_REQUEST: "/withdrawl-request/findAll",
  SETTING_DAPARTMENT: "/department",
  SETTING_LOCATION: "/location",
  SETTING_PERFORMANCE: '/performance',
  SETTINGS_TEMPLATES: '/template/findAll',
  SETTINGS_SHIFTS: '/shift/findAll',
  POST_NEW_SHIFTS: '/shift/add',
  DELETE_SHIFT: '/shift/delete',
  SETTINGS_TIMESHEET: '/timesheet/category/findAll',
  POST_NEW_TIMESHEET: '/timesheet/category/add',
  DELETE_TIMESHEET: '/timesheet/category/delete',
  EDIT_TIMESHEET: '/timesheet/category/edit',
  DELETE_PAYROLL: '/payroll/delete',
  DELETE_SETTING_TEMPLATE: "/template/delete",
  POST_SETTING_TEMPLATE: "/template/add",
  EDIT_SETTING_TEMPLATE: "/template/edit",

  // DELEGATE
  GET_DELEGAE_DASHBOARD: '/delegate/dashboard',
  GET_DELEGAE_MEMBERS: '/delegate/members',
  GET_DELEGAE_AGENTS: '/delegate/agents',
  PATCH_DELEGAE_ACCESS: '/delegate/access',
  GET_DELEGAE_BALANCE: '/delegate/balance',
  GET_DELEGAE_ADMIN_DASHBOARD: '/delegate/admin-dashboard',

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
  GET_PERFORMANCE_LIST: "/performance/evaluation/list",
  GET_PERFORMANCE_DETAIL: "/performance/questionnaire/detail",
  GET_INTERN_EVALUATION_HISTORY: "/performance/intern",

  //Announcement api's
  POST_NEW_ANNOUNCEMENT: "/announcement/add",
  ANNOUNCEMENT_FINDALL: "/announcement/findAll",

  // RECIPES
  GET_ALL_RECIPES: "/recipe/get-recipies",
  GET_RECIPE: "/recipe/get-recipe",
  CREATE_RECIPE: "/recipe/add-recipe",
  UPDATE_RECIPE: "/recipe/edit-recipe",
  DELETE_RECIPE: "/recipe/delete-recipe",

  // Dashboard
  GET_SYSTEM_ADMIN_DASHBOARD: "dashboard/system-admin",
  GET_DELEGATE_DASHBOARD: "delegate/dashboard",
  GET_DELEGATE_MEMBERS: "delegate/members",
  SEND_REFERENCE_INVITE: "delegate/invite",
  GET_ALL_COMAPANIES: "/university/universityCompanies",
  ADD_PAYROLL: "/payroll/add",
  GET_CURRENT_BALANCE: "delegate/balance",

  //Payment Gateway
  LINK_BANK_ACCOUNT: "payment-gateway/account/link",
  GET_BANK_ACCOUNT_LIST: "payment-gateway/accounts/findAll",
  UPDATE_BANK_ACCOUNT: "payment-gateway/account/update",
  GET_BANK_ACCOUNT_DETAIL: "payment-gateway/account/detail",
  ADD_WITH_DRAWL_REQUEST: "/withdrawl-request",
}
export default endpoints;
