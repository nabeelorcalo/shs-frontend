import { useEffect, useState } from 'react';
import { Button, Col, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import dayjs from "dayjs";
import { HeartIcon, LeavesIcon, MedicalHeart, WorkFromHom } from '../../../assets/images';
import { LeaveCard, PageHeader, UpcomingHolidayComp } from '../../../components';
import { BoxWrapper } from '../../../components';
import Calendar from "./calendar";
import { ROUTES_CONSTANTS } from '../../../config/constants';
import useCustomHook from '../actionHandler';
import "./style.scss"

const index = () => {
  // Variable declaration block
  // ------------------------------------------------
  const navigate = useNavigate();
  
  const {
    leaveStats, getLeaveStats,
    upcomingHolidays, getUpcomingHolidaysList
  } = useCustomHook();

  const [state, setState] = useState({
    currentDate: dayjs().locale("en"),
  });

  const cardIcon = [
    { Icon: <LeavesIcon />, bg: "rgba(255, 193, 93, 0.1)" },
    { Icon: <MedicalHeart />, bg: "rgba(106, 173, 142, 0.1)" },
    { Icon: <HeartIcon />, bg: "rgba(76, 164, 253, 0.1)" },
    { Icon: <WorkFromHom />, bg: "rgba(233, 111, 124, 0.1)" }
  ]

  // React Hooks defination block
  // ------------------------------------------------
  useEffect(() => {
    const startOfMonth = state.currentDate.startOf('month').format("YYYY-MM-DD");
    const endOfMonth = state.currentDate.endOf('month').format("YYYY-MM-DD");

    getLeaveStats(startOfMonth, endOfMonth);
    getUpcomingHolidaysList();
  }, [])

  // Return block
  // ------------------------------------------------
  return (
    <div className='intrne_main'>

      <PageHeader actions title="Leave">
        <div className='flex items-center justify-end view_history_button_wrapper'>
          <Button className='button font-semibold px-8' onClick={() => navigate(`/${ROUTES_CONSTANTS.VIEWLEAVEHISTORY}`)}>View History</Button>
        </div>
      </PageHeader>

      <Row gutter={[20, 20]} >
        
        {leaveStats.map((data: any, index: number) => (
          
          <Col className="gutter-row" xs={24} sm={12} md={12} lg={8} xl={6}>
            <LeaveCard
              Icon={cardIcon[index]?.Icon}
              bg={cardIcon[index]?.bg}
              title={data?.type}
              total={data?.totalCount}
              pending={data?.pending}
              approved={data?.approved}
              declined={data?.declined}
            />
          </Col>

        ))}

      </Row>

      <Row className='mt-[30px] h-full' gutter={[20, 20]}>
        
        <Col xs={24} md={12} xl={17}>
          <BoxWrapper className='h-full' boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)'>
            <Calendar />
          </BoxWrapper>
        </Col>

        <Col xs={24} md={12} xl={7} >
          <UpcomingHolidayComp upcomingHolidayData={upcomingHolidays} />
        </Col>

      </Row>
      
    </div>
  )
}
export default index