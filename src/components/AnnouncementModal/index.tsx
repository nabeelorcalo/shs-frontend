import { FC, useState } from "react";
import { PopUpModal } from "../Model";
import { TextArea } from "../TextArea";
import { Button } from "antd";
import useCustomHook from "../../pages/dashboard/companyAdmin/actionHandler";

export const AnnouncementModal: FC<{
  isShowModal: boolean;
  close: () => void;
}> = (props) => {
  const { isShowModal, close } = props;
  const [description, setDescription] = useState("");
  const { addNewAnnouncement } = useCustomHook();
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
            onClick={() => {
              addNewAnnouncement(description);
              close();
            }}
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
        onChange={(e: any) => {
          setDescription(e.target.value);
        }}
        //maxLength={6}
      />
    </PopUpModal>
  );
};
