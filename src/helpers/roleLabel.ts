import constants from '../config/constants'
const getUserRoleLable = (role: string) => {
  const { AGENT, MANAGER, COMPANY_ADMIN, DELEGATE_AGENT, STUDENT, SYSTEM_ADMIN, UNIVERSITY, INTERN } = constants;
  switch (role) {
    case AGENT:
      return "Agent";
    case COMPANY_ADMIN:
      return "Company Admin";
    case DELEGATE_AGENT:
      return "Delegate Agent";
    case INTERN:
      return "Intern";
    case MANAGER:
      return "Manager";
    case STUDENT:
      return "Student";
    case SYSTEM_ADMIN:
      return "System Admin";
    case UNIVERSITY:
      return "University";
    default:
      return "";
  }
}
export default getUserRoleLable