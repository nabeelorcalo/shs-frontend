import { FC } from "react";
import { Tabs, TabsProps } from "antd";
import PersnolInformation from "./persnolInformation";
import { PersnolIcon, DocumentsIcon, HiringIcon, InterviewIcon } from "../../assets/images";
import DrawerDocuments from "./drawerDocuments";
import HiringProcess from "./hiringProcess";
import Interview from "./interview";
import actionHandler from "./actionHandler";
interface IDrawerTabs {
  selectedCandidate: any;
  studentDetails: any;
}
const DrawerTabs: FC<IDrawerTabs> = (props) => {
  const { selectedCandidate, studentDetails } = props;
  
  const { interviewList, getScheduleInterviews, deleteInterview, isLoading } = actionHandler();
  const onChange = (key: string) => {    
    key === "4" && getScheduleInterviews(selectedCandidate?.userDetail?.id);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: (
        <div className="flex gap-2">
          <PersnolIcon />
          <p>Personal Information</p>
        </div>
      ),
      children: <PersnolInformation selectedCandidate={selectedCandidate} studentDetails={studentDetails} />,
    },
    {
      key: "2",

      label: (
        <div className="flex gap-2">
          <DocumentsIcon />
          <p>Documents</p>
        </div>
      ),
      children: <DrawerDocuments email={selectedCandidate?.userDetail?.email} documents={studentDetails?.documents} />,
    },
    {
      key: "3",
      label: (
        <div className="flex gap-2">
          <HiringIcon />
          <p>Hiring Process</p>
        </div>
      ),
      children: <HiringProcess selectedCandidate={selectedCandidate} />,
    },
    {
      key: "4",
      label: (
        <div className="flex gap-2">
          <InterviewIcon />
          <p>Interview</p>
        </div>
      ),
      children: (
        <Interview
          candidateId={selectedCandidate?.userDetail?.id}
          userId={selectedCandidate?.userDetail?.id}
          candidateFirstName={selectedCandidate?.userDetail?.firstName}
          candidateLastName={selectedCandidate?.userDetail?.lastName}
          candidateAvatar={selectedCandidate?.userDetail?.avatar}
          candidateDesignation={selectedCandidate?.internship?.title}
          candidateEventDate={selectedCandidate?.createdAt}
        />
      ),
    },
  ];
  return (
    <div className="md:px-5">
      <Tabs className="" defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default DrawerTabs;
