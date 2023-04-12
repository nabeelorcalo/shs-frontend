import { useRecoilValue } from "recoil";
import { currentUserRoleState } from "../../store";
import Student from "./Student";
import Intern from "./Intern";
import constants from "../../config/constants";
import "./style.scss";

const DigiVault = () => {
  const renderPage = () => {
    const role = useRecoilValue(currentUserRoleState);

    switch (role) {
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
