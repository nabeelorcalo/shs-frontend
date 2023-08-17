import { FC } from "react";
import { Tabs, TabsProps } from "antd";
import { PersnolIcon, DocumentsIcon, HiringIcon, InterviewIcon } from "../../assets/images";
import HiringProcess from "./hiringProcess";
import Interview from "./interview";
import actionHandler from "./actionHandler";
import { PersnolInformation } from "../../components";
import { DrawerDocuments } from "./drawerDocuments";
interface IDrawerTabs {
  selectedCandidate: any;
  studentDetails: any;
}
const DrawerTabs: FC<IDrawerTabs> = (props) => {
  const { selectedCandidate, studentDetails } = props;
  const { getScheduleInterviews } = actionHandler();

  const onChange = (key: string) => {
    key === "4" && getScheduleInterviews(selectedCandidate?.id);
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
      children: (
        <PersnolInformation
          userDetail={selectedCandidate?.userDetail}
          personal={studentDetails?.personalInfo}
          general={studentDetails?.general}
          university={studentDetails?.general?.userUniversity?.university}
        />
      ),
    },
    {
      key: "2",

      label: (
        <div className="flex gap-2">
          <DocumentsIcon />
          <p>Documents</p>
        </div>
      ),
      children: (
        <DrawerDocuments
          email={selectedCandidate?.userDetail?.email}
          documents={studentDetails?.docs}
          stage={selectedCandidate?.stage}
          userId={selectedCandidate?.userDetail?.id}
        />
      ),
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
          candidateId={selectedCandidate?.id}
          userId={selectedCandidate?.userDetail?.id}
          candidateFirstName={selectedCandidate?.userDetail?.firstName}
          candidateLastName={selectedCandidate?.userDetail?.lastName}
          candidateAvatar={selectedCandidate?.userDetail?.avatar}
          candidateDesignation={selectedCandidate?.internship?.title}
          stage={selectedCandidate?.stage}
        />
      ),
    },
  ];
  return (
    <div className="md:px-5">
      <Tabs className="tabs-parent" defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  );
};

export default DrawerTabs;
