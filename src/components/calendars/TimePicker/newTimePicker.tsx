import { TimePicker } from 'antd';
import './style.scss'

interface TimePickerProps {
  value?: any,
  onChange?:any,
  placeholder?:string
}

const NewTimePicker = ({value,onChange,placeholder}:TimePickerProps) => {

  return (
    <TimePicker
      value={value}
      popupClassName={`CustomTimePicker`}
      use12Hours
      placeholder={placeholder}
      format={"hh:mm"}
      onChange={onChange}
    />
  )
}

export default NewTimePicker