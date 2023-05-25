const endpoints = {
  LOGIN: "auth/login",
  LOGOUT: "/auth/logout",
  INTERN_DASHBOARD: "dashboard",
  GET_AGENT_PROPERTIES: "property/get-agent-properties",
  ADD_PROPERTY: "property/add-property",
  GET_PROPERTY: "property/get-property?propertyId=",
  UPDATE_PROPERTY: "/property/update-property?propertyId=",
  GET_AVAILABLE_PROPERTIES: "property/get-available-properties",
  GET_SAVED_PROPERTIES: "property/get-saved-properties",
  GET_RENTED_PROPERTIES: "property/get-rented-properties",
  GET_PROPERTY_BOOKINGS: "property/get-property-bookings",
  POST_SAVE_PROPERTY: "property/save-property",
  LOCATION: "/location",
  DAPARTMENT: "/department",
  AGENT_DASHBOARD_WIDGETS: "/property/get-agent-dashboard-widgets",
  PAYROLL_FINDALL: "/payroll/findAll",
  SIGNUP: '/auth/signup',
  CHANGEPASSWORD: '/auth/change-password',
  FORGOTPASSWORD: '/auth/forgot-password',
  TIMESHEET_FIND_ALL: 'timesheet/category/findAll',
  VERIIFCATION_STUDENT: "/auth/veriff/{cognitoId}",
  PROFILE_CHANGE_PASSWORD: "/auth/change-password",
  PROPERTY_GET_LISTING_STATS: "/property/get-listings-stats",
  PROPERTY_Get_TOTAL_AGENTS: "/property/get-property-agents",
  STUDENT_INTRNE_SAWITCH: "/auth/student-intern-switch",
  MANAGER_COMPANY_ADMIN: "/manager_manager/create-company-manager",
  GET_MANAGER_COMPANY_ADMIN: "/manager_manager/get-company-manager-list",
  GET_MANAGER_DETAIL_ID:"/manager_manager/get-company-manager-detail",
  GET_RECENT_LISTING: "/property/get-recent-listings",
  GET_CONTRACT_LIST: '/Contract/list',
  DEL_CONTRACT: '/Contract/delete',
  GET_DIGIVAULT_DASHBOARD: "/digivault/get-dashboard",
  GET_FOLDER_CONTENT: '/digivault/get-folder-content',
  POST_DIGIVAULT: "/digivault/set-new-vault-password",
  POST_NEW_VAULT_PASSWORD: '/digivault/set-new-vault-password',
  POST_DIGIVAULT_PASSWORD: '/digivault/enable-disable-lock',
  POST_CREATE_FOLDER_FILE: '/digivault/create-folder-file',
  DEL_FOLDER_FILE: '/digivault/delete-folder-file',
  GET_RESERVATIONS: '/property/get-reservations',
  UPDATE_STATUS_RESERVATION: '/property/approve-reject-booking-request',
  GET_GENERAL_LOG: '/general/activity',
  GET_LIST_INTERNSHIP: '/internship/listInternships',
  GET_INTERNSHIP_DETAILS: '/internship/getInternshipDetail',
  DEL_INTERNSHIP: '/internship/deleteInternship',
  DUBLICATE_INTERNSHIP: '/internship/duplicateInternship',
  POST_NEW_INTERNSHIP: '/internship/createInternship',
  POST_OFFERS: '/property/create-offer',
  GET_OFFERS: '/property/get-offers',
  EDIT_OFFERS: '/property/edit-offer',
  GET_LEAVE_POLICY: '/leave-policy',
  //candidates 
  CANDIDATE_LIST: `/candidate/listCandidates`,
  UPDATE_CANDIDATE_DETAIL: `/candidate/updateCandidateDetail`,
  STUDENT_DIGIVAULT: "/digivault/get-dashboard",
  POST_REST_DIGIVAULT: "/digivault/reset-vault-password",
  DUPLICATE_INTERNSHIP: '/internship/duplicateInternship',
  EDIT_INTERNSHIP: '/internship/updateInternshipDetail',
  //comment
  GET_COMMENTS: '/comment/getComments',
  ADD_COMMENT: `/comment/addComment`,
  // End Point For Leaev Module For Intrne 
  CREATE_LEAVE: "/Leaves/create",
  GET_LEAEV_LIST: `/Leaves/list`,
  GET_ALL_INTERNS: "/candidate/listCandidates",
  //Applications for student
  GET_APPLICATIONS: '/application/listApplications',
  GET_APPLICATIONS_DETAILS: '/application/getApplicationDetail',
  GET_COMPANY_MANAGERS_LIST: "/manager_manager/get-company-manager-list",
  GET_ALL_UNIVERSITIES: "/university/findAll",
  GET_PERFORMANCE_LIST: "/performance/evaluation/list",
  GET_COMPANYADMIN_UNIVERSITES: "/university/findAll",
  GET_UNIVERSITYINTERNS:"/university/universityInterns",
  GET_GENERAL_ACTIVITY: "/general/activity",
  WITH_DRAWAL_REQUEST:"/withdrawl-request/findAll",
  SETTING_DAPARTMENT: "/department",
  SETTING_LOCATION: "/location"
}
export default endpoints;