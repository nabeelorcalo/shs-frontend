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
  SETTING_LOCATION: "location",
  SETTING_DAPARTMENT: "department",
  AGENT_DASHBOARD_WIDGETS: "/property/get-agent-dashboard-widgets",
  PAYROLL_FINDALL: "payroll/findAll",
  SIGNUP: '/auth/signup',
  CHANGEPASSWORD: '/auth/change-password',
  FORGOTPASSWORD: '/auth/forgot-password',
  TIMESHEET_FIND_ALL: 'timesheet/category/findAll',
  GET_CONTRACT_LIST: '/Contract/list',
  DEL_CONTRACT: '/Contract/delete',
  STUDENT_INTRNE_SAWITCH: "auth/student-intern-switch",
  VERIIFCATION_STUDENT: "/auth/veriff/{cognitoId}",
  PROFILE_CHANGE_PASSWORD: "/auth/change-password",
  GET_DIGIVAULT_DASHBOARD: "/digivault/get-dashboard",
  POST_DIGIVAULT: "/digivault/set-new-vault-password",
  POST_DIGIVAULT_PASSWORD: 'digivault/enable-disable-lock',
  POST_CREATE_FOLDER_FILE: 'digivault/create-folder-file',
  DEL_FOLDER_FILE: 'digivault/delete-folder-file',
  GET_LIST_INTERNSHIP: '/internship/listInternships',
  GET_INTERNSHIP_DETAILS: '/internship/getInternshipDetail',
  DEL_INTERNSHIP: '/internship/deleteInternship',
  DUBLICATE_INTERNSHIP: '/internship/duplicateInternship',
  POST_NEW_INTERNSHIP: '/internship/createInternship',
  // End Point For Leaev Module For Intrne 
  CREATE_LEAVE: "/Leaves/create",
  GET_LEAEV_LIST: `/Leaves/list`,

}
export default endpoints;