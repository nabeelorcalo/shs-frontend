import { useState } from "react";
import { Outlet } from "react-router-dom";
import ContractsStudent from "../contracts/contractsStudent/contractsStudent";
import OfferLetters from "../offerLetters/index";
import DigiVaultStudent from "./digiVaultStudent/digiVaultStudent";
import ManageVault from "./digiVaultStudent/manageVault/manageVault";
import "./style.scss";

const DigiVault = () => {
  return (
    <div>
      {/* <DigiVaultStudent /> */}
      {/* <OfferLetters/> */}
      <ContractsStudent/>
      {/* <ManageVault /> */}
    </div>
  );
};

export default DigiVault;
