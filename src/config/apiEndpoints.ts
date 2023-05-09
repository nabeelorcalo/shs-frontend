const endpoints = {
  LOGIN: "auth/login",
  LOGOUT:"/auth/logout",
  INTERN_DASHBOARD: "dashboard",
  GET_AGENT_PROPERTIES: "property/get-agent-properties",
  ADD_PROPERTY: "property/add-property",
  GET_AVAILABLE_PROPERTIES: "property/get-available-properties",
  GET_SAVED_PROPERTIES: "property/get-saved-properties",
  GET_RENTED_PROPERTIES: "property/get-rented-properties",
  GET_PROPERTY_BOOKINGS: "property/get-property-bookings",
  POST_SAVE_PROPERTY: "property/save-property",
  SETTING_LOCATION:"location",
  SETTING_DAPARTMENT:"department",
  AGENT_DASHBOARD_WIDGETS:"/property/get-agent-dashboard-widgets",
  PAYROLL_FINDALL: "payroll/findAll",
  SIGNUP: '/auth/signup',
  CHANGEPASSWORD:'/auth/change-password',
  FORGOTPASSWORD:'/auth/forgot-password',
  TIMESHEET_FIND_ALL:'timesheet/category/findAll',
  STUDENT_INTRNE_SAWITCH:"/auth/student-intern-switch",
  VERIIFCATION_STUDENT: "/auth/veriff/{cognitoId}",
  PROFILE_CHANGE_PASSWORD:"/auth/change-password",
  // End Point For Leaev Module For Intrne 
  CREATE_LEAVE:"/Leaves/create",
  GET_LEAEV_LIST:`/Leaves/list`,

}
export default endpoints;