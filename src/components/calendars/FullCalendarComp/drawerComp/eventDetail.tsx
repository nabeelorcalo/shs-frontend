import { CalendarIcon, ClockDarkIcon } from '../../../../assets/images';
import { eventsMockData } from '../mockData';
import dayjs from 'dayjs';
import weekOfYear from 'dayjs/plugin/weekOfYear';

const EventDetail = (props: any) => {

    dayjs.extend(weekOfYear);

    const { eventId } = props;

    const selectedEvent = eventsMockData.find(event => event.id === eventId);

    const formatTimeDate = (value: string | any, format: string) => {
        return dayjs(value).format(format);
    }

    const hourDiff = (startTime: string, endTime: string) => {
        const start = dayjs(startTime);
        const end = dayjs(endTime);
        console.log(dayjs(end).diff(dayjs(start), "hour", true));

        // return start.diff(dayjs(end), 'hour', true);
    }

    return (
        <div className='event-detail-wrapper'>
            <div className='event-detail'>
                <p className='font-medium text-xl event-title mb-[16px]'>{selectedEvent?.title}</p>

                <div className="flex items-center gap-3">
                    <img src={CalendarIcon} />
                    <p className='event-info'>
                        {formatTimeDate(selectedEvent?.start, 'dddd, MM MMM YYYY')}
                        &nbsp;-&nbsp;
                        {formatTimeDate(selectedEvent?.end, 'dddd, MM MMM YYYY')}
                    </p>
                </div>
                <div className="flex items-center gap-3 my-[20px]">
                    <ClockDarkIcon />
                    <p className='event-info'>
                        {formatTimeDate(selectedEvent?.start, 'HH:MM A')}
                        &nbsp;-&nbsp;
                        {formatTimeDate(selectedEvent?.end, 'HH:MM A')}
                        &nbsp;
                        {/* {`(${hourDiff(selectedEvent?.start, selectedEvent?.end)})`} */}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default EventDetail