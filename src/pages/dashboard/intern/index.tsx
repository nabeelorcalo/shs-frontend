import { useState } from "react";
import { Col, Row } from 'antd';
import PageHeader from '../../../components/PageHeader';
import TimeTracking from "../../../components/timeTRacking";
import EmojiMoodRating from "../../../components/EmojiMoodRating";
import TodayWeather from "../../../components/todayWeather";
import { Terrible, Sad, Neutral, Happy, Awesome } from '../../../assets/images';
import "../style.scss";

const Intern = () => {
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

      <Row>
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
    </>
  )
}

export default Intern