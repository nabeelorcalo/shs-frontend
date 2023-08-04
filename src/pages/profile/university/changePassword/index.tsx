import React from "react";
import UpdatePassword from "./updatePassword";
function ChangePassword({setShowSideViewType}: any) {
  return (
    <div>
      <UpdatePassword setShowSideViewType={setShowSideViewType}/>
    </div>
  );
}

export default ChangePassword;
