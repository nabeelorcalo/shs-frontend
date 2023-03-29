import { Row } from "antd";
import { FC } from "react";
import { SHSLogo } from "../../assets/images";
import { PopUpModal } from "../Model";

const InvitationModal: FC<{ isShowModal: boolean; close: () => void }> = (
  props
) => {
  const { isShowModal, close } = props;

  return (
    <PopUpModal
      cancelBtntxt="Cancel"
      okBtntxt="Invite"
      open={isShowModal}
      title=""
      width={560}
      close={close}
      footer={false}
    >
      <Row align="middle" justify="center" className="flex-col">
        <SHSLogo />
        <p className="font-medium text-base text-black text-center pt-[34px] pb-[6px]">
          Invitation Sent!
        </p>
        <p className="font-normal text-[14px] leading-[22px] text-secondary-color max-w-[312px] text-center pb-[30px]">
          We have sent an invitation to “johndoemail.com” to join Internship
          Ken.
        </p>
        <p className="font-normal text-[14px] leading-[22px] text-primary-color max-w-[312px] text-center">
          If an email is not received, contact our support team.
        </p>
      </Row>
    </PopUpModal>
  );
};

export default InvitationModal;
