import { TabsProps } from "antd";
import React from "react";
import { PopUpModal } from "../../../../components";
import AppTabs from "../../../../components/Tabs";
import Documents from "../Documents";
import PersonalInfo from "../PersonalInfo/personalInfo";
import "./style.scss";

const BookingModal = (props: any) => {
  const { open, setOpen } = props;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: `Personal Information`,
      children: <PersonalInfo open={open} setOpen={setOpen} />,
    },
    {
      key: "2",
      label: `Documents`,
      children: <Documents />,
    },
  ];
  return (
    <div>
      <PopUpModal
        title="Bookings"
        open={open}
        close={() => setOpen(false)}
        footer={false}
      >
        <AppTabs items={items} />
      </PopUpModal>
    </div>
  );
};

export default BookingModal;
