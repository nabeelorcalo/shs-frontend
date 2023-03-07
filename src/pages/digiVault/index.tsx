import { useState } from "react";
import { Outlet } from "react-router-dom";
import DigiVaultStudent from "./digiVaultStudent/digiVaultStudent";
import "./style.scss";

const DigiVault = () => {
  return (
    <div>
      <DigiVaultStudent />
    </div>
  );
};

export default DigiVault;
