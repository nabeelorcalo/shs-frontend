import { useEffect, useState, Fragment } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { Avatar, Col, Row } from "antd";
import { Schedule, DrawerIcon, IconEdit } from "../../assets/images";
import { Alert, NoDataFound } from "../../components";
import ScheduleModal from "./scheduleModal";
import actionHandler from "./actionHandler";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
let updateData: any;
const Interview = ({
  userId,
  candidateId,
  candidateFirstName,
  candidateLastName,
  candidateAvatar,
  candidateDesignation,
  candidateEventDate,
}: any) => {
  dayjs.extend(utc);
  const [open, setOpen] = useState(false);
  const [alert, setAlert] = useState(false);
  // const [updateData, setUpdateData] = useState({});
  const { interviewList, getScheduleInterviews, deleteInterview } = actionHandler();

  useEffect(() => {
    getScheduleInterviews(candidateId);
  }, []);
  // console.log(interviewList, "interviewList");
  // console.log(updateData, "updateData");

  const openModal = () => {
    setAlert(true);
  };

  const handleEdit = (data: any) => {
    // console.log(data);
    updateData = data;
    data && setOpen(true);
  };

  return (
    <div className="">
      <div className="btn-wrap flex justify-end mt-3 ">
        <button onClick={() => setOpen(true)} className="req-btn flex items-center justify-center cursor-pointer">
          <Schedule />
          <p className="btn-text">Schedule</p>
        </button>
        {open && (
          <ScheduleModal
            setOpen={setOpen}
            open={open}
            userId={userId}
            data={updateData}
            // setUpdateData={setUpdateData}
            handleEdit={handleEdit}
          />
        )}
      </div>
      <>
        {interviewList?.length > 0 ? (
          interviewList?.map((item: any) => (
            <Fragment key={item?.id}>
              <div className="onTime mt-8 mb-5">{dayjs(candidateEventDate).format("DD MMM YYYY")}</div>
              <div className="main-wrapperr pb-6 relative">
                <div className="interview-content px-4 py-4">
                  <Row gutter={[20, 20]} align="middle">
                    <Col xl={6} lg={6} md={6}>
                      <div className="inteview-wrapper flex items-center gap-2">
                        <div>
                          <Avatar
                            className="h-[48px] w-[48px] rounded-full object-cover relative"
                            src={candidateAvatar}
                            alt={candidateFirstName}
                            icon={
                              <span className="uppercase text-[20px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                {candidateFirstName[0]}
                                {candidateLastName[0]}
                              </span>
                            }
                          />
                        </div>
                        <div>
                          <h2 className="m-0 text-sm headingg capitalize">{`${candidateFirstName} ${candidateLastName}`}</h2>
                          <p className="bottom-heading capitalize">{candidateDesignation}</p>
                        </div>
                      </div>
                    </Col>
                    <Col xl={6} lg={6} md={6}>
                      <div className="inteview-wrapper ">
                        <h2 className="text-sm m-0 font-medium ">
                          Suhedule by
                          <span className="headingg">{` ${item?.organizerId?.firstName} ${item?.organizerId?.lastName}`}</span>
                        </h2>
                        <p className="bottom-heading">{item?.locationType}</p>
                      </div>
                    </Col>
                    <Col xl={6} lg={6} md={6}>
                      <div className="inteview-wrapper ">
                        <h2 className="text-sm	m-0 headingg">
                          {`${dayjs(item?.startTime).utc().format("HH:mm")} -
                          ${dayjs(item?.endTime).utc().format("HH:mm")}`}
                        </h2>
                        <p className="bottom-heading">{`${dayjs(item?.endTime).diff(
                          dayjs(item?.startTime),
                          "minutes"
                        )} minutes interview`}</p>
                      </div>
                    </Col>
                    <Col xl={6} lg={6} md={6}>
                      <div className="hover-effect">
                        <div className=" flex gap-4 items-center h-[55px]">
                          <div className="edit-icon h-[40px] w-[40px] flex justify-center items-center ">
                            <IconEdit onClick={() => handleEdit(item)} className="cursor-pointer" />
                          </div>
                          <div
                            onClick={openModal}
                            className=" delete-icon edit-icon h-[40px] w-[40px] flex justify-center items-center cursor-pointer"
                          >
                            <DeleteFilled />
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
                {alert && (
                  <Alert
                    state={alert}
                    setState={setAlert}
                    cancelBtntxt={"No"}
                    okBtnFunc={() => deleteInterview(item?.id)}
                    okBtntxt={"Yes"}
                    children={"Are you sure you want to cancel this meeting."}
                    type={"error"}
                  />
                )}
              </div>
            </Fragment>
          ))
        ) : (
          <NoDataFound />
        )}
      </>
    </div>
  );
};

export default Interview;
