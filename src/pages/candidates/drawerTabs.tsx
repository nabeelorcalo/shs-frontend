import { FC } from "react";
import { Tabs, TabsProps } from "antd";
import { PersnolIcon, DocumentsIcon, HiringIcon, InterviewIcon } from "../../assets/images";
import HiringProcess from "./hiringProcess";
import Interview from "./interview";
import actionHandler from "./actionHandler";
import { DrawerDocuments, PersnolInformation } from "../../components";
interface IDrawerTabs {
  selectedCandidate: any;
  studentDetails: any;
}
const DrawerTabs: FC<IDrawerTabs> = (props) => {
  const { selectedCandidate, studentDetails } = props;
  const {
    interviewList,
    getScheduleInterviews,
    deleteInterview,
    isLoading,
    companyManagerList,
    getCompanyManagerList,
    handleUpdateInterview,
    scheduleInterview,
    handleRequestDocument,
  } = actionHandler();
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
      children: (
        <PersnolInformation
          userDetail={selectedCandidate?.userDetail}
          personal={studentDetails?.personal}
          general={studentDetails?.general}
          university={studentDetails?.university}
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
          handleRequestDocument={handleRequestDocument}
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
          candidateId={selectedCandidate?.userDetail?.id}
          userId={selectedCandidate?.userDetail?.id}
          candidateFirstName={selectedCandidate?.userDetail?.firstName}
          candidateLastName={selectedCandidate?.userDetail?.lastName}
          candidateAvatar={selectedCandidate?.userDetail?.avatar}
          candidateDesignation={selectedCandidate?.internship?.title}
          candidateEventDate={selectedCandidate?.createdAt}
          stage={selectedCandidate?.stage}
          interviewList={interviewList}
          getScheduleInterviews={getScheduleInterviews}
          deleteInterview={deleteInterview}
          isLoading={isLoading}
          companyManagerList={companyManagerList}
          getCompanyManagerList={getCompanyManagerList}
          handleUpdateInterview={handleUpdateInterview}
          scheduleInterview={scheduleInterview}
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
