import { DatePicker as AntDatePicker } from 'antd';

import './common-calendar.scss';

export const CommonCalendar = () => {

    const handleChange = (date: any, dateString: string) => { }

    return (
        <AntDatePicker popupClassName='popclass' open={true}
            onChange={handleChange} className='common-calendar-wrapper' />
    )
}
