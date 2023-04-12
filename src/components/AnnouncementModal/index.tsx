import { FC } from "react";
import { PopUpModal } from "../Model";
import { TextArea } from "../TextArea";

export const AnnouncementModal: FC<{ isShowModal: boolean,close:()=>void }> = (props) => {
const {isShowModal,close} = props;
  return (
    <PopUpModal
      cancelBtntxt="Cancel"
      okBtntxt="Announce"
      open={isShowModal}
      title="Announcement"
      width={560}
      close={close}
    >
      <TextArea
        className="text-input-bg-color my-4"
        rows={5}
        placeholder="Type here..."
        maxLength={6}
      />
    </PopUpModal>
  );
};
