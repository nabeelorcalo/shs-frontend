import { IconButton } from '../IconButton';
import { ArrowToLeft, ArrowToRight1, CalendarPickerIcon } from '../../assets/images';
import { DatePicker } from 'antd';

interface MonthChangerProps {
  month: any,
  hasDatePicker?: boolean,
  datePickerClassName?: string,
  onClick?: () => void,
  setState?: any;
}

export const MonthChanger: any = (props: MonthChangerProps) => {
  const {
    month,
    onClick,
    hasDatePicker = false,
    datePickerClassName,
    setState
  } = props;

  function onChange(dateString: any) {
    setState((prevState: any) => ({
      ...prevState,
      currentDate: dateString,
    }))
  }
  return (
    <div className='flex items-center ml-auto mb-4 month-changer'>
      {
        hasDatePicker &&
        <DatePicker
          bordered={false}
          className={datePickerClassName}
          placement="bottomRight"
          suffixIcon={<CalendarPickerIcon className='text-sm' />}
          onChange={onChange}
        />
      }

      <p className='min-w-fit mx-2 text-primary-color'>{month}</p>

      <div className='flex flex-row ml-1'>
        <IconButton
          name="prev"
          className="icon-btn left-radius"
          icon={<ArrowToLeft />}
          onClick={onClick}
        />

        <IconButton
          name="next"
          className="icon-btn right-radius"
          icon={<ArrowToRight1 />}
          onClick={onClick}
        />
      </div>
    </div>
  )
}