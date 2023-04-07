import CalendarComp from '../../components/calendars/FullCalendarComp/index';
import { calendarMockData } from '../../components/calendars/FullCalendarComp/mockData';

const Index = () => {

  const roleToShow: any = {
    // 'manager':
    // 'student':
    // 'intern':
  }

  return (
    <CalendarComp eventData={calendarMockData}/>
  )
}

export default Index