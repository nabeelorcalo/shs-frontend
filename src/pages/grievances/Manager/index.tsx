import React from 'react';
import { Col, Row, Button, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { PageHeader, SearchBar } from '../../../components';
import { BoxWrapper } from '../../../components/BoxWrapper/BoxWrapper';
const { Title, Text } = Typography;
import './style.scss';
import { AllGrievances, Clock24h, ClockGrievances, InProgressGrievances, LineGrievances, NewGrievances, ResolevedGrievances } from '../../../assets/images';

const index = () => {
  let overview = [
    {
      name: "All Grievances",
      count: "10",
      icon: <AllGrievances />

    },
    {
      name: "New Grievances",
      count: "02",
      icon: <NewGrievances />

    },
    {
      name: "In Progress Grievances ",
      count: "01",
      icon: <InProgressGrievances />

    },
    {
      name: "Resolved Grievances",
      count: "07",
      icon: <ResolevedGrievances />
    },
  ];
  let timeData = [
    {
      title: "Avg Resolution Time",
      icon: <Clock24h />,
      time: "20:20"
    },
    {
      title: "Avg ResponseTime",
      icon: <ClockGrievances />,
      time: "20:20"
    },
  ]

  const handleChange = () => {
  }
  return (
    <div className="grievances">
      <div>
        <div className="flex justify-between">
          <PageHeader title="Grievances" />
          <NavLink to="/grievances/all-grievance">
            <Button className='teriary-color header-btn'>All Grievences</Button>
          </NavLink>
        </div>
      </div>
      <Row gutter={[10, 10]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={12} xxl={6} >
              <BoxWrapper className="grievances-box-wrapper w-full">
                <div className="flex row gap-2 p-1">
                  <div>{data.icon}</div>
                  <div className="flex my-5 flex-col ">
                    <Text className="text-xl font-semibold">{data.name}</Text>
                    <Text className="text-4xl font-medium">
                      {data.count}
                    </Text>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          );
        })}
      </Row>
      <Row gutter={[10, 10]} className="mt-5">
        <Col className="gutter-row flex py-2" xs={24} md={24} lg={12} >
          <BoxWrapper className="grievances-box-wrapper w-full">
            <div className="flex justify-between gap-2 p-1">
              <div className='flex flex-row w-full'>
                <div className='flex flex-row'>
                  <Clock24h />
                  <div className='flex flex-col'>
                    <Text className="text-base font-medium mx-2">
                      Avg Resolution Time
                    </Text>
                    <Text className="text-2xl font-medium mx-2 teriary-color">
                      20:20 <span className='text-base'>hrs</span>
                    </Text>
                  </div>
                </div>
                <LineGrievances className='ml-5'/>
              </div>
              <div className='flex flex-row  w-full'>
                <div className='flex flex-row'>
                  <ClockGrievances />
                  <div className='flex flex-col'>
                    <Text className="text-base font-medium mx-2">
                      Avg Resolution Time
                    </Text>
                    <Text className="text-2xl font-medium mx-2 teriary-color">
                      20:20 <span className='text-base'>hrs</span>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Col>


      </Row>


    </div>
  )
}

export default index