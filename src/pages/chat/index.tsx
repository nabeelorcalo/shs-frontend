import React from "react";
import Student from "./Student";
import Intern from "./Intern";
import CompanyAdmin from "./CompanyAdmin";
import Manager from "./Manager";
import constants from "../../config/constants";

const Chat = () => {
  const renderPage = () => {
    switch (constants.USER_ROLE) {
      case 'CompanyAdmin':
        return <CompanyAdmin />;
      case 'Student':
        return <Student />;
      case 'Intern':
        return <Intern />;
      case 'Manager':
        return <Manager />;
      default:
        return <></>;
    }
  }
  return (
    renderPage()
  )

};

export default Chat;
