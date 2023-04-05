import "./style.scss";
import Student from "./student";
// import Intern from "./Intern";
import University from './university'
import constants from "../../config/constants";

const Profile = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case "Student":
        return <Student />;

      case "Intern":
        return <Student />;

      case "University":
        return <University/>;
      default:
        return <></>;
    }
  };
  return renderPage();
};

export default Profile;
