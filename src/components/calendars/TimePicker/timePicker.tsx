import { TimePicker, Button } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { ClockDarkIcon } from "../../../assets/images";
import "./style.scss";

export const TimePickerComp = (props?: any) => {
  const {
    label,
    open,
    setOpen,
    value = dayjs("12:08", "HH:mm"),
    setValue,
    popupclassName,
    customSetValue,
    optionalTime,
    disabled,
  } = props;

  const format = "HH:mm";

  const [time, setTime] = useState<any>(optionalTime ?? "");

  return (
    <div className="time-picker-wrapper">
      {label && <label className="label">{label}</label>}
      <TimePicker
        disabled={disabled}
        open={open}
        use12Hours
        value={time}
        defaultValue={value}
        className="custom-picker"
        format={format}
        onOpenChange={(val) => setOpen(val)}
        onSelect={(e: any) => {
          setTime(e);
          customSetValue ? setValue(dayjs(e)) : setValue(dayjs(e).format("HH:mm"));
        }}
        popupClassName={`custom-time-picker ${popupclassName}`}
        renderExtraFooter={() => (
          <>
            <label className="absolute header">Set Time</label>
            <Button className="footer-btn" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              className="footer-btn save-btn"
              onClick={() => {
                setValue(dayjs(time).format("HH:mm"));
                setOpen(false);
              }}
            >
              Save
            </Button>
          </>
        )}
        suffixIcon={<ClockDarkIcon />}
      />
    </div>
  );
};

export default TimePickerComp;
