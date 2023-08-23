import { FC, useState } from "react";
import { PopUpModal } from "../Model";
import { TextArea } from "../TextArea";
import { Button } from "antd";
import { ButtonThemePrimary } from "../ButtonThemePrimary";
import { Notifications } from "../Notification";
import { ButtonThemeSecondary } from "../ButtonThemeSecondary";

export const AnnouncementModal: FC<{
  isShowModal: boolean;
  addNewAnnouncement: any;
  close: () => void;
  isLoading?: boolean
}> = (props) => {
  const { isShowModal, close, addNewAnnouncement, isLoading } = props;
  const [description, setDescription] = useState("");
  const handleNewAnnouncement = () => {
    if (!description.trim()) {
      return Notifications({ title: "Validation Error", description: "Notfication can't be empity", type: "error" })
    }
    addNewAnnouncement(description.trim());
  }
  return (
    <PopUpModal
      open={isShowModal}
      title="Announcement"
      width={560}
      close={close}
      footer={
        <div>
          <ButtonThemeSecondary onClick={close}>
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary
            onClick={handleNewAnnouncement}
            loading={isLoading}
          >
            Announce
          </ButtonThemePrimary>
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
      />
    </PopUpModal>
  );
};
