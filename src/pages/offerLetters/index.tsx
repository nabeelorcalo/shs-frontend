import "./style.scss";
import Student from "./student";
import CompanyAdmin from "./CompanyAdmin";
import constants from "../../config/constants";

const OfferLetters = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case 'CompanyAdmin':
        return <CompanyAdmin />;
      case 'Student':
        return <Student />;
      default:
        return <></>;
    }
  }
  return (
    renderPage()
  )
}

export default OfferLetters;
