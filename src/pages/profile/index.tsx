import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Student from "./student";
// import University from "./university";
import constants from "../../config/constants";
import "./style.scss";
import UniversityProfile from "./university";

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
      default:
        return <></>;
    }
  };
  return renderPage();
};

export default Profile;
