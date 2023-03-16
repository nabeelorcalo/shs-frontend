import { useState } from "react";
import Intern from "./intern";
import constants from "../../config/constants";
import "./style.scss";

const Performance = () => {
  const renderPage = (role: string) => {
    switch (role) {
      case 'Intern':
        return <Intern />;
      default:
        return <></>;
    }
  }

  return (
    renderPage(constants.USER_ROLE)
  )
}

export default Performance;