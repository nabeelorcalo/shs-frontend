import { useState } from "react";
import { Outlet } from "react-router-dom";
import OfferLetterStudent from "./offerLettersSudent/offerLetterStudent";
import "./style.scss";

const OfferLetters = () => {
  return (
    <div>
      <OfferLetterStudent/>
    </div>
  )
}

export default OfferLetters