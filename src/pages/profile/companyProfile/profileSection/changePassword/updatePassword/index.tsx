import { Col, Row, Typography } from "antd";
import "../updatePassword.scss";
import UpdatePasswordForm from "./UpdatePasswordForm";

const role: string = "Student";

const CreatePassword = () => {
  return (
    <div>
      <div className="create-password">
          <UpdatePasswordForm />
      </div>
    </div>
  );
};
export default CreatePassword;
