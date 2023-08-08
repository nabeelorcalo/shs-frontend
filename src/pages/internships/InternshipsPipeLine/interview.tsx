import { useEffect, useState, useRef } from "react";
import { Schedule } from "../../../assets/images";
import { InterviewList, Loader, NoDataFound, Notifications, ScheduleInterviewModal } from "../../../components";
import actionHandler from "../actionHandler";

let updateData: any;
const Interview = ({
  candidateId,
  candidateFirstName,
  candidateLastName,
  candidateAvatar,
  candidateDesignation,
  candidateEventDate,
  stage,
}: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const [open, setOpen] = useState(false);

  const {
    interviewList,
    getScheduleInterviews,
    deleteInterview,
    isLoading,
    companyManagerList,
    getCompanyManagerList,
    handleUpdateInterview,
    scheduleInterview,
  } = actionHandler();

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getScheduleInterviews(candidateId);
    }
  }, []);

  const openModal = () => {
    if (["hired", "rejected"].includes(stage)) {
      Notifications({
        title: "Restriction",
        description: `You can't schedule interview in ${stage} stage.`,
        type: "error",
      });
    } else setOpen(true);
  };

  const handleEdit = (data: any) => {
    updateData = data;
    data && setOpen(true);
  };

  return (
    <div className="">
      <div className="btn-wrap flex justify-end mt-3 ">
        <button onClick={openModal} className="req-btn flex items-center justify-center cursor-pointer">
          <Schedule />
          <p className="btn-text">Schedule</p>
        </button>
        {open && (
          <ScheduleInterviewModal
            setOpen={setOpen}
            open={open}
            candidateId={candidateId}
            data={updateData}
            handleEdit={handleEdit}
            companyManagerList={companyManagerList}
            getCompanyManagerList={getCompanyManagerList}
            handleUpdateInterview={handleUpdateInterview}
            scheduleInterview={scheduleInterview}
            isLoading={isLoading}
          />
        )}
      </div>
      <>
        {isLoading ? (
          <Loader />
        ) : interviewList?.length > 0 ? (
          interviewList?.map((item: any) => (
            <InterviewList
              candidateFirstName={candidateFirstName}
              candidateLastName={candidateLastName}
              candidateAvatar={candidateAvatar}
              candidateDesignation={candidateDesignation}
              candidateEventDate={candidateEventDate}
              item={item}
              handleEdit={handleEdit}
              openModal={openModal}
              deleteInterview={deleteInterview}
            />
          ))
        ) : (
          <NoDataFound />
        )}
      </>
    </div>
  );
};

export default Interview;
