import { Col, Row, Typography } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { BoxWrapper } from '../../../components';
import {
  AllGrievances,
  Clock24h,
  ClockGrievances,
  GrievancesArrowForward,
  GrievancesAvater,
  GrievancesDisLike,
  GrievancesLike,
  InProgressGrievances,
  LineGrievances,
  NewGrievances,
  ResolevedGrievances
} from '../../../assets/images';
import {Button, PageHeader, RegisterMemberAndFeddbackGraph}from '../../../components';
import { GrievanceStats } from '../../../components/ChartsOfGraphs/grievanceStats/grievanceStats';
import { ROUTES_CONSTANTS } from '../../../config/constants';
import './style.scss';

const { Text } = Typography;
const Grievance = () => {
  const navigate = useNavigate()
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
      <PageHeader
        actions
        bordered
        title="Grievences"
      >
        <div className='flex items-center justify-end header-btn'>
          <Button
            className='button font-semibold px-8'
            onClick={() => navigate(`${ROUTES_CONSTANTS.ALL_GRIEVANCES}`)}
            label='All Grievences'
          // size="small"
          />
        </div>
      </PageHeader>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
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
      <Row gutter={[20, 20]} className="mt-5">
        <Col className="gutter-row flex py-2" xs={24} md={24} xl={12} >
          <BoxWrapper className="grievances-box-wrapper w-full">
            <div className="flex xs:flex-col sm:flex-row justify-between gap-2 p-1">
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
              <div className='flex flex-row  w-full '>
              <div  className='xs:mr-0 xs:hidden sm:block sm:mr-5'><LineGrievances /></div> 
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
          <div className='grievance-card relative flex items-center overflow-hidden rounded-lg w-full my-1'>
            <BoxWrapper className='card-progress-box flex   flex-wrap'>
              <div className="total-hours flex xs:flex-col sm:flex-row  flex-1 gap-2">
                <div className='flex  items-center'>
                  <div className='flex '>
                  <GrievancesAvater />
                  <div className='flex xs:flex-row sm:flex-col mx-2 gap-2 xs:mt-3 sm:mt-0'>
                    <Text className='text-sm font-normal'>Darlene Robertson</Text>
                    <Text className='text-sm font-normal'>UI UX Designer</Text>
                  </div>
                  </div>
                </div>
                <div className='gap-2 grievance-type'>
                  <span>Grievances Type:</span>
                  <span className='text-[#F08D97] attendance-log'>Attendance Log Issue</span>
                </div>
              </div>
              <div className="view-all-btn ">
               <NavLink to={ROUTES_CONSTANTS.GRIEVANCES_Details}>
                <span className='capitalize  xxl:mx-2 white-color' >view</span >
                <span  className='capitalize ml-1 xxl:mx-2 white-color'><GrievancesArrowForward /></span> 
                </NavLink> 
              </div>
            </BoxWrapper>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-5">
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