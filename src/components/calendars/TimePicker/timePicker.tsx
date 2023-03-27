import { TimePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { ClockDarkIcon } from '../../../assets/images';
import './style.scss';

const TimePickerComp = (props: any) => {
  const { label, open, setOpen, value = dayjs('12:08', 'HH:mm'), setValue } = props;

  const format = 'HH:mm';

  return (
    <div className='time-picker-wrapper'>
      {label && <label className='label'>{label}</label>}
      <TimePicker
        open={open}
        use12Hours
        defaultValue={value}
        className='custom-picker'
        format={format}
        onOpenChange={(val) => setOpen(val)}
        onSelect={(e: any) => { setValue(dayjs(e).format('HH:mm')); }}
        popupClassName='custom-time-picker'
        renderExtraFooter={() => <>
          <label className='absolute header'>Set Time</label>
          <Button className='footer-btn'>Cancel</Button>
          <Button className='footer-btn save-btn' onClick={() => setValue(value)}>Save</Button>
        </>}
        suffixIcon={<ClockDarkIcon />}
      />
    </div>
  )
}

export default TimePickerComp