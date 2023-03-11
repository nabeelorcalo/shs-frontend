import { useState, useEffect } from "react";
import { Col, Row } from 'antd';
import PageHeader from '../../../components/PageHeader';
import TimeTracking from "../../../components/timeTRacking";
import EmojiMoodRating from "../../../components/EmojiMoodRating";
import TodayWeather from "../../../components/todayWeather";
import AnnouncementList from "../../../components/AnnouncementList";
import { Terrible, Sad, Neutral, Happy, Awesome } from '../../../assets/images';
import CustomHook from '../actionHandler';
import "../style.scss";

const Intern = () => {
  const action = CustomHook;

  const [state, setState] = useState({
    list: [],
    loading: false,
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

  // move this dummy api to api handler
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
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12} className='pr-4'>
          <EmojiMoodRating
            title='How are you feeling today?'
            data={emojiData}
          />
        </Col>
        <Col xs={24} sm={24} md={4} lg={4} xl={4} className=''>
          <TodayWeather />
        </Col>
      </Row>

      <Row className="xs:gap-4 md:gap-0 mt-4">
        <Col xs={24} sm={24} md={8} lg={8} xl={8} className='pr-4'>
          <AnnouncementList
            data={state.list}
            loading={state.loading}
            loadMoreData={loadMoreData}
          />
        </Col>
      </Row>
    </>
  )
}

export default Intern