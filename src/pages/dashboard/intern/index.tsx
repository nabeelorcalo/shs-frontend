import { useState, useEffect } from "react";
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
import {
  announcementDataState,
  currentUserRoleState,
  currentUserState,
} from "../../../store";
import useCustomHook from "../companyAdmin/actionHandler";
const Intern = () => {
  const action = useCustomHook();
  const announcementData = useRecoilValue(announcementDataState);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [state, setState] = useState({
    list: [],
    loading: false,
    birthdayWishlist: [
      {
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        date: "Jennie Duncan",
        id: 1,
        name: "Jennie Duncan",
      },
      {
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        date: "Jennie Duncan",
        id: 2,
        name: "Duncan",
      },
      {
        avatar:
          "https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png",
        date: "Jennie Duncan",
        id: 3,
        name: "Jennien",
      },
    ],
  });

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

  const role = useRecoilValue(currentUserRoleState);
  const userData = useRecoilValue(currentUserState);

  const handleAddAnnouncement = () => {
    setIsShowModal(true);
  };
  const handleSelect = (value: string) => {};
  useEffect(() => {
    console.log("userData", userData);

    action.getData();
  }, []);

  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">
              {" "}
              {userData.firstName + " " + userData.lastName}
            </span>
          </div>
        }
      />

      <Row gutter={gutter}>
        <Col xs={24}>
          <Row gutter={gutter}>
            <Col xs={24} xl={12} xxl={7} className="xs:order-1">
              <TimeTracking />
            </Col>
            <Col xs={24} xxl={12} className="xs:order-3 2xl:order-2">
              <EmojiMoodRating
                title="How are you feeling today?"
                data={emojiData}
                activeIconIndex={-1}
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
              {announcementData && (
                <>
                  <AnnouncementList
                    data={announcementData}
                    role={role}
                    handleAddAnnouncement={handleAddAnnouncement}
                    height={460}
                  />
                </>
              )}
            </Col>
            <Col xs={24} xxl={12}>
              <Row gutter={gutter}>
                <Col xs={24} xxl={24}>
                  <Row gutter={gutter}>
                    <Col flex={1} className="">
                      <AttendanceDetail
                        label="Avg Clock In"
                        time="08:04am"
                        colorClass="clock-in"
                      />
                    </Col>

                    <Col flex={1} className="">
                      <AttendanceDetail
                        label="Avg Clock Out"
                        time="03:04pm"
                        colorClass="clock-out"
                      />
                    </Col>

                    <Col flex={1}>
                      <AttendanceDetail
                        label="Avg Hours"
                        time="05:48hrs"
                        colorClass="avg-hours"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} xxl={24}>
                  <WorkingStatisticesChart
                    heading="Working Statistices"
                    styling={{ height: 268 }}
                  />
                </Col>
              </Row>
            </Col>
            <Col xs={24} xxl={5}>
              <Row gutter={gutter}>
                <Col xs={24} xl={12} xxl={24}>
                  <BirthdayWishes
                    wishList={state.birthdayWishlist}
                    user="Intern"
                  />
                </Col>
                <Col xs={24} xl={12} xxl={24}>
                  <LeaveDetails
                    sickLeaves="02"
                    casualLeaves="03"
                    medicalLeaves="04"
                    workFromHome="01"
                    user="Intern"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <AnnouncementModal
        isShowModal={isShowModal}
        close={() => setIsShowModal(false)}
      />
    </>
  );
};

export default Intern;
