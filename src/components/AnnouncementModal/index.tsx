import { FC } from "react";
import { PopUpModal } from "../Model";
import { TextArea } from "../TextArea";
import { Button } from "antd";

export const AnnouncementModal: FC<{ isShowModal: boolean, close: () => void }> = (props) => {
  const { isShowModal, close } = props;
  return (
    <PopUpModal
      open={isShowModal}
      title="Announcement"
      width={560}
      close={close}
      footer={
        <div>
          <Button
            type="default"
            className="button-default-tertiary max-sm:w-full"
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            className="button-tertiary max-sm:w-full"
          >
            Announce
          </Button>
        </div>
      }
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
