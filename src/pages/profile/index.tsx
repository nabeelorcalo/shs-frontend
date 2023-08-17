import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Student from "./student";
import constants from "../../config/constants";
import "./style.scss";
import UniversityProfile from "./university";
import AgentProfile from "./agentProfile";

const Profile = () => {
  const renderPage = () => {
    const role = useRecoilValue(currentUserRoleState);

    switch (role) {
      case constants.STUDENT:
        return <Student />;
      case constants.INTERN:
        return <Student />;
      case constants.UNIVERSITY:
        return <UniversityProfile />;
      case constants.COMPANY_ADMIN:
        return <UniversityProfile />;
      // case constants.AGENT:
      //   return <UniversityProfile />;
      case constants.DELEGATE_AGENT:
        return <UniversityProfile />;
      case constants.SYSTEM_ADMIN:
        return <AgentProfile />;
      case constants.AGENT:
        return <AgentProfile />;
      default:
        return <></>;
    }
  };
  return renderPage();
};

export default Profile;
