import { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import {PageHeader} from '../../../components';
import TimeTracking from "../../../components/timeTRacking";
import EmojiMoodRating from "../../../components/EmojiMoodRating";
import {
  TodayWeather,
  AttendanceDetail,
  AnnouncementList,
  BirthdayWishes,
  WorkingStatisticesChart,
  LeaveDetails,
} from "../../../components";
import {
  Terrible,
  Sad,
  Neutral,
  Happy,
  Awesome,
} from '../../../assets/images';
import CustomHook from '../actionHandler';
import "../style.scss";

const Intern = () => {
  const action = CustomHook;

  const [state, setState] = useState({
    list: [],
    loading: false,
    birthdayWishlist: [
      {
        avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
        date: 'Jennie Duncan',
        id: 1,
        name: 'Jennie Duncan'
      },
      {
        avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
        date: 'Jennie Duncan',
        id: 2,
        name: 'Duncan'
      },
      {
        avatar: 'https://png.pngtree.com/png-vector/20220817/ourmid/pngtree-cartoon-man-avatar-vector-ilustration-png-image_6111064.png',
        date: 'Jennie Duncan',
        id: 3,
        name: 'Jennien'
      }
    ]
  });

  const emojiData = [
    {
      name: "Terrible",
      comp: Terrible
    },
    {
      name: "Sad",
      comp: Sad
    },
    {
      name: "Neutral",
      comp: Neutral
    },
    {
      name: "Happy",
      comp: Happy
    },
    {
      name: "Awesome",
      comp: Awesome
    }
  ];

  // move this dummy api to action handler
  const loadMoreData = () => {
    setState(prevState => {
      return {
        ...prevState,
        loading: !state.loading,
      };
    });

    fetch('https://randomuser.me/api/?results=10&inc=name,gender,email,nat,picture&noinfo')
      .then((res) => res.json())
      .then((body) => {
        setState(prevState => {
          return {
            ...prevState,
            list: body.results,
            loading: !state.loading,
          };
        });
      })
      .catch(() => {
      });
  };

  useEffect(() => {
    loadMoreData();
  }, []);

  return (
    <>
      <PageHeader
        title={
          <div className="font-medium">
            It's good to have you back,&nbsp;
            <span className="page-header-secondary-color">
              Maria Sanoid
            </span>
          </div>
        }
      />

      <Row className="xs:gap-4 md:gap-0">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} className='pr-4'>
          <TimeTracking />

          <AnnouncementList
            data={state.list}
            loading={state.loading}
            loadMoreData={loadMoreData}
          />
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12} className='pr-4'>
          <EmojiMoodRating
            title='How are you feeling today?'
            data={emojiData}
            activeIconIndex={-1}
          />

          <div className="flex my-4">
            <Col span={8} className='pr-4'>
              <AttendanceDetail
                label="Avg Clock In"
                time="08:04am"
                colorClass="clock-in"
              />
            </Col>

            <Col span={8} className='pr-4'>
              <AttendanceDetail
                label="Avg Clock Out"
                time="03:04pm"
                colorClass="clock-out"
              />
            </Col>

            <Col span={8}>
              <AttendanceDetail
                label="Avg Hours"
                time="05:48hrs"
                colorClass="avg-hours"
              />
            </Col>
          </div>

          <WorkingStatisticesChart
            heading="Working Statistices"
          />
        </Col>

        <Col xs={24} sm={24} md={4} lg={4} xl={4}>
          <TodayWeather />

          <BirthdayWishes
            wishList={state.birthdayWishlist}
          />

          <LeaveDetails
            sickLeaves="02"
            casualLeaves="03"
            medicalLeaves="04"
            workFromHome="01"
          />
        </Col>
      </Row>
    </>
  )
}

export default Intern