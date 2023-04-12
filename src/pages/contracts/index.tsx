import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Student from "./student";
import CompanyAdmin from "./CompanyAdmin";
import constants from "../../config/constants";
import "./style.scss";

const Contracts = () => {
  const renderPage = () => {
    const role = useRecoilValue(currentUserRoleState);

    switch (role) {
      case constants.COMPANY_ADMIN:
        return <CompanyAdmin />;
      case constants.STUDENT:
        return <Student />;
      default:
        return <></>;
    }
  }
  return (
    renderPage()
  )

};

export default Contracts;
