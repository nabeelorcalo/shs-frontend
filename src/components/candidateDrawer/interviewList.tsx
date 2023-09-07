import { Avatar, Col, Row } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
import { Fragment, useId, useState } from "react";
import { IconEdit } from "../../assets/images";
import { DeleteFilled } from "@ant-design/icons";
import { Alert } from "../../components";
export const InterviewList = (props: any) => {
  const {
    candidateFirstName,
    candidateLastName,
    candidateAvatar,
    candidateDesignation,
    item,
    handleEdit,
    deleteInterview,
  } = props;
  const [alert, setAlert] = useState(false);
  return (
    <Fragment key={useId()}>
      <div className="onTime mt-8 mb-5">{dayjs(item?.dateFrom).format("DD MMMM, YYYY")}</div>
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
                        {candidateFirstName && candidateFirstName[0]}
                        {candidateLastName && candidateLastName[0]}
                      </span>
                    }
                  />
                </div>
                <div>
                  <h2 className="m-0 text-sm headingg capitalize">{`${candidateFirstName && candidateFirstName} ${candidateLastName && candidateLastName
                    }`}</h2>
                  <p className="bottom-heading capitalize">{candidateDesignation && candidateDesignation}</p>
                </div>
              </div>
            </Col>
            <Col xl={6} lg={6} md={6}>
              <div className="inteview-wrapper ">
                <h2 className="text-sm m-0 font-medium ">
                  Scheduled by
                  <span className="headingg">{` ${item?.organizeBy?.firstName} ${item?.organizeBy?.lastName}`}</span>
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
                    onClick={() => setAlert(true)}
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
            state={true}
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
  );
};
