import { useState, useEffect, useRef } from "react";
import { Col, Row } from "antd";
import { AnnouncementModal, TimeTracking } from "../../../components";
import EmojiMoodRating from "../../../components/EmojiMoodRating";
import {
  TodayWeather,
  AttendanceDetail,
  AnnouncementList,
  BirthdayWishes,
  WorkingStatisticesChart,
  LeaveDetails,
  PageHeader,
} from "../../../components";
import { Terrible, Sad, Neutral, Happy, Awesome } from "../../../assets/images";
import "../style.scss";
import { gutter } from "..";
import { useRecoilValue } from "recoil";
import { announcementDataState, currentUserRoleState, currentUserState } from "../../../store";
import useCustomHook from "../actionHandler";

const emojiData = [
  {
    name: "Terrible",
    comp: Terrible,
  },
  {
    name: "Sad",
    comp: Sad,
  },
  {
    name: "Neutral",
    comp: Neutral,
  },
  {
    name: "Happy",
    comp: Happy,
  },
  {
    name: "Awesome",
    comp: Awesome,
  },
];

const Intern = () => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const {
    usersBirthdaysList,
    getUsersBirthdaysList,
    getDashboardLeavesCount,
    dashboardLeavesCount,
    addFeelingTodayMood,
    feelingTodayMood,
    // attendance clockin-out
    handleAttendenceClockin,
    attendenceClockin,
    handleAttendenceClockout,
    getInternTodayAttendance,
    // attendence Average
    attendenceAverage,
    getAttendanceAverage,
    // INTERN working stats state
    internWorkingStats,
    getInternWorkingStats,
  } = useCustomHook();
  const announcementData = useRecoilValue(announcementDataState);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);

  const role = useRecoilValue(currentUserRoleState);
  const userData = useRecoilValue(currentUserState);

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  const handleTodayFeeling = (value: string) => {
    addFeelingTodayMood(value);
  };
  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getUsersBirthdaysList();
      getDashboardLeavesCount();
      getAttendanceAverage();
      getInternWorkingStats();
      getInternTodayAttendance();
    }
  }, []);

  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color capitalize">
              {userData.firstName + " " + userData.lastName}
            </span>
          </div>
        }
      />

      <Row gutter={gutter}>
        <Col xs={24}>
          <Row gutter={gutter}>
            <Col xs={24} xl={12} xxl={7} className="xs:order-1">
              <TimeTracking
                handleAttendenceClockin={handleAttendenceClockin}
                attendenceClockin={attendenceClockin}
                handleAttendenceClockout={handleAttendenceClockout}
              />
            </Col>
            <Col xs={24} xxl={12} className="xs:order-3 2xl:order-2">
              <EmojiMoodRating
                title="How are you feeling today?"
                data={emojiData}
                feelingTodayMood={feelingTodayMood}
                onClick={handleTodayFeeling}
              />
            </Col>
            <Col xs={24} xl={12} xxl={5} className="xs:order-2 2xl:order-3">
              <TodayWeather />
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Row gutter={gutter}>
            <Col xs={24} xxl={7}>
              <AnnouncementList
                data={announcementData}
                role={role}
                handleAddAnnouncement={handleAddAnnouncement}
                height={460}
              />
            </Col>
            <Col xs={24} xxl={12}>
              <Row gutter={gutter}>
                <Col xs={24} xxl={24}>
                  <Row gutter={gutter}>
                    <Col flex={1} className="">
                      <AttendanceDetail
                        label="Avg Clock In"
                        time={attendenceAverage?.avgClockInTime ?? "N/A"}
                        colorClass="clock-in"
                      />
                    </Col>

                    <Col flex={1} className="">
                      <AttendanceDetail
                        label="Avg Clock Out"
                        time={attendenceAverage?.avgClockOutTime ?? "N/A"}
                        colorClass="clock-out"
                      />
                    </Col>

                    <Col flex={1}>
                      <AttendanceDetail
                        label="Avg Hours"
                        time={attendenceAverage?.avgHours ? `${attendenceAverage?.avgHours}hrs` : "N/A"}
                        colorClass="avg-hours"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} xxl={24}>
                  <WorkingStatisticesChart
                    heading="Working Statistices"
                    styling={{ height: 268 }}
                    internWorkingStats={internWorkingStats}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xxl={5}>
              <Row gutter={gutter}>
                <Col xs={24} xl={12} xxl={24}>
                  <BirthdayWishes wishList={usersBirthdaysList} user="Intern" />
                </Col>
                <Col xs={24} xl={12} xxl={24}>
                  <LeaveDetails
                    sickLeaves={dashboardLeavesCount?.sick ?? 0}
                    casualLeaves={dashboardLeavesCount?.casual ?? 0}
                    medicalLeaves={dashboardLeavesCount?.medical ?? 0}
                    workFromHome={dashboardLeavesCount?.wfh ?? 0}
                    user="Intern"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      {isShowModal && <AnnouncementModal isShowModal={isShowModal} close={() => setIsShowModal(false)} />}
    </>
  );
};

export default Intern;
