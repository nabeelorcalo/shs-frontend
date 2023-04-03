import React from 'react';
import { Col, Row, Button, Typography } from 'antd';
import { NavLink } from 'react-router-dom';
import { BoxWrapper } from '../../../components/BoxWrapper/BoxWrapper';
const { Text } = Typography;
import './style.scss';
import {
  AllGrievances,
  Clock24h,
  ClockGrievances,
  GrievancesAvater,
  GrievancesDisLike,
  GrievancesLike,
  InProgressGrievances,
  LineGrievances,
  NewGrievances,
  ResolevedGrievances
} from '../../../assets/images';
import {PageHeader, RegisterMemberAndFeddbackGraph}from '../../../components';
import { GrievanceStats } from '../../../components/ChartsOfGraphs/grievanceStats/grievanceStats';
import { ArrowRightOutlined } from '@ant-design/icons/lib/icons';

const Grievance = () => {
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
        <Col className="gutter-row flex py-2" xs={24} md={24} xl={12} >
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
               
              </div>
              <LineGrievances  className='mr-5'/>
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
        <Col className="gutter-row" xs={24} md={24} xl={12}>
          <div className='grievance-card relative flex items-center overflow-hidden rounded-lg w-full'>
            <BoxWrapper className='card-progress-box flex   flex-wrap'>
              <div className="total-hours flex items-center justify-between flex-1 gap-2">
                <div className='flex items-center'>
                  <GrievancesAvater />
                  <div className='flex flex-col mx-2'>
                    <Text className='text-sm font-normal'>Darlene Robertson</Text>
                    <Text className='text-sm font-normal'>UI UX Designer</Text>
                  </div>
                </div>
                <div className=' gap-2'>
                  <span>Grievances Type:</span>
                  <span className='px-2 text-[#F08D97]'>Attendance Log Issue</span>
                </div>
              </div>
              <div className="view-all-btn ">
               <NavLink to="/grievances/all-grievance/grievance-detials">
                <span className='capitalize  xxl:mx-2 white-color' >view</span >
                <span  className='capitalize ml-1 xxl:mx-2 white-color'><ArrowRightOutlined /></span> 
                </NavLink> 
              </div>
            </BoxWrapper>
          </div>
        </Col>
      </Row>
      <Row gutter={[10, 10]} className="mt-5">
        <Col xs={24} md={24} lg={12}>
          <BoxWrapper>
            <div className='flex justify-between'>
              <Text className='text-xl font-medium w-full'>Resolution Feedback </Text>
              <div className='flex justify-end gap-2 w-full'>
                <div > <GrievancesLike /><span className='text-sm teriary-color '> 71% Positive</span></div>
                <div ><GrievancesDisLike /><span className='text-sm secondary-color'> 29% Negative</span></div>
              </div>
            </div>
            <RegisterMemberAndFeddbackGraph graphName="feedback" />
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} lg={12}>
          <BoxWrapper className='px-5' >
            <div className='rievance Stats'>
            <div className='flex justify-between'>
              <Text className='text-xl font-medium'>Grievance Stats</Text>
          
            </div>
            <GrievanceStats
              color={[
                '#9BD5E8',
                '#F08D97',
                '#78DAAC',
                '#FFC15D'
              ]}
              groupField="month"
              isGroup
              isStack
              legend={{
                layout: 'horizontal',
                position: 'top-right'
              }}
              seriesField="product_sub_type"
              statsHeading=""
              xField="product_type"
              yField="order_amt"
            />
         </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}

export default Grievance