import "./style.scss";
import Student from "./student";
import University from "./university";
import constants from "../../config/constants";

const Profile = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case constants.STUDENT:
        return <Student />;

      case constants.INTERN:
        return <Student />;

      case constants.UNIVERSITY:
        return <University />;
      default:
        return <></>;
    }
  };
  return renderPage();
};

export default Profile;
