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
import { Button, PageHeader, RegisterMemberAndFeddbackGraph } from '../../../components';
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
      name: "Open Grievances ",
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
          title="Grievances"
        >
          <div className='flex items-center justify-end header-btn'>
            <Button
              className='button font-semibold px-8'
              onClick={() => navigate(`${ROUTES_CONSTANTS.ALL_GRIEVANCES}`)}
              label='All Grievances'
            />
          </div>
        </PageHeader>
      </div>
      <Row gutter={[20, 20]} className="mt-5">
        {overview.map((data: any, index: any) => {
          return (
            <Col key={index} className="gutter-row flex" xs={24} md={12} xxl={6} >
              <BoxWrapper className="grievances-box-wrapper w-full h-[150px]">
                <div className="flex row gap-2 ">
                  <div>{data.icon}</div>
                  <div className="flex my-5 mx-3 flex-col ">
                    <Text className="text-xl font-semibold text-primary-color">{data.name}</Text>
                    <Text className="text-[38px] font-medium text-secondary-color">
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
        <Col className="gutter-row flex " xs={24} md={24} xl={12} >
          <BoxWrapper className="grievances-box-wrapper w-full min-h-[106px] ">
            <div className="flex xs:flex-col sm:flex-row justify-between gap-2 ">
              <div className='flex flex-row w-full'>
                <div className='flex flex-row'>
                  <span className='flex justify-center items-center'><Clock24h /></span>
                  <div className='flex flex-col m-auto'>
                    <Text className="text-base font-normal mx-2 primary-color">
                      Avg Resolution Time
                    </Text>
                    <Text className="text-2xl font-semibold mx-2 teriary-color">
                      20:20 <span className='text-base'>hrs</span>
                    </Text>
                  </div>
                </div>
              </div>
              <div className='flex flex-row  w-full '>
                <div className='xs:mr-0 xs:hidden sm:block sm:mr-5'><LineGrievances /></div>
                <div className='flex flex-row'>
                  <span className='flex justify-center items-center'><ClockGrievances /></span>
                  <div className='flex flex-col  m-auto'>
                    <Text className="text-base font-normal mx-2 primary-color">
                      Avg Resolution Time
                    </Text>
                    <Text className="text-2xl font-semibold mx-2 teriary-color">
                      20:20 <span className='text-base'>hrs</span>
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Col>
        <Col xs={24} md={24} xl={12}>
          <div className="card-share-wrapper">
            <div className="card-share" >
              <div>
                <NavLink to={ROUTES_CONSTANTS.GRIEVANCES_DETAILS} className="white-color cursor-pointer border-0">View <GrievancesArrowForward />
                </NavLink> </div>
            </div>
            <div className="top-card card-user-welcome">
              <Row gutter={15}>
                <Col xs={24} lg={12}>
                  <div className="top-card-inner">
                    <div className='flex-col sm:flex  w-full'>
                      <div className='flex flex-col md:flex-row '>
                        <GrievancesAvater />
                        <div className='flex flex-col md:mx-2 '>
                          <Text className='text-sm font-normal text-primary-color '>Maria Sanoid</Text>
                          <Text className='text-sm font-normal text-secondary-color'>UI UX Designer</Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col xs={24} lg={12}>
                  <div className="top-card-inner ref-number">
                    <div className="user-reference-no flex flex-col sm:flex-row">
                      <span>Grievances Type:</span>
                      <span className='discipline'>Discipline</span></div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[20, 20]} className="mt-5">
        <Col xs={24} md={24} lg={12}>
          <BoxWrapper>
            <div className='flex justify-between'>
              <Text className='text-xl font-medium w-full'>Resolution Feedback </Text>
              <div className='flex justify-end gap-5 w-full'>
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