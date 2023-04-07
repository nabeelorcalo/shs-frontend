import "./style.scss";
import Student from "./Student";
import Intern from "./Intern";
import constants from "../../config/constants";

const DigiVault = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case 'Intern':
        return <Intern />;
      case 'Student':
        return <Student />;
      default:
        return <></>;
    }
  }
  return (
    renderPage()
  )
};

export default DigiVault;
