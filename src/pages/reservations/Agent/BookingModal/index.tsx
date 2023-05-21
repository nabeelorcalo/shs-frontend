import { TabsProps } from "antd";
import { DocTabsIcon, UserTabsIcon } from "../../../../assets/images";
import { PopUpModal } from "../../../../components";
import AppTabs from "../../../../components/Tabs";
import Documents from "../DocumentAgent";
import PersonalInfo from "../PersonalInfo/personalInfo";
import "./style.scss";

const BookingModal = (props: any) => {
  const { open, setOpen } = props;

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (<div className="flex items-center"><UserTabsIcon /><span className="pl-1">Personal Information</span></div>),
      children: <PersonalInfo data={open.viewReservations} setOpen={setOpen} />,
    },
    {
      key: "2",
      label: (<div className="flex items-center"><DocTabsIcon /><span className="pl-1">Documents</span></div>),
      children: <Documents />,
    },
  ];
  return (
    <div>
      <PopUpModal
        title="Bookings"
        open={open.openViewModal}
        close={() => setOpen(false)}
        footer={false}
      >
        <AppTabs items={items} />
      </PopUpModal>
    </div>
  );
};

export default BookingModal;
