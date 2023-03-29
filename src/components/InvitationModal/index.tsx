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
      <Row align='middle' justify="center" className="flex-col">
        <SHSLogo />
        <p className="font-medium text-base text-black text-center pt-2 pb-[30px]">
          Share Link
        </p>
      </Row>
    </PopUpModal>
  );
};

export default InvitationModal;
