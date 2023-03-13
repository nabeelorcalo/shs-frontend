import { useState } from "react";
import { Outlet } from "react-router-dom";
import OfferLetterStudent from "./offerLettersSudent";
import "./style.scss";

const OfferLetters = () => {
  return (
    <div>
      <OfferLetterStudent />
    </div>
  );
};

export default OfferLetters;
