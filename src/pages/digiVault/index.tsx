import { useState } from "react";
import DigiVaultStudent from "./digiVaultStudent/digiVaultStudent";
import "./style.scss";

const DigiVault = () => {
  const [vartical, setVartical] = useState(true);
  return (
    <div>
      <DigiVaultStudent />
    </div>
  );
};

export default DigiVault;
