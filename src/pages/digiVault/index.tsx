import { useState } from "react";
import TimeTracking from "../../components/timeTracking";
import DigiVaultStudent from "./digiVaultStudent/digiVaultStudent";
import "./style.scss";

const DigiVault = () => {
  const [vartical, setVartical] = useState(true);
  return (
    <div>
      <DigiVaultStudent />
      {/* <TimeTracking vartical={vartical} /> */}
    </div>
  );
};

export default DigiVault;
