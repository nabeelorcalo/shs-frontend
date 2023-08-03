import { Col, Row, Typography } from "antd";
import "../updatePassword.scss";
import UpdatePasswordForm from "./UpdatePasswordForm";

const CreatePassword = ({setShowSideViewType}:any) => {
  return (
    <div>
      <div className="create-password">
        <UpdatePasswordForm setShowSideViewType={setShowSideViewType}/>
      </div>
    </div>
  );
};

export default CreatePassword;
