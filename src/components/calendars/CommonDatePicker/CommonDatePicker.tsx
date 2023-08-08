import { Button, DatePicker as AntDatePicker } from "antd";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ArrowDownDark, CalendarIcon } from "../../../assets/images";
import { DatePickerInterface } from "./Calendar_interface";
import "./common-date-picker.scss";

export const CommonDatePicker = (props: DatePickerInterface) => {
  const {
    name = "This Month",
    open = false,
    placement = "bottomRight",
    className,
    dropdownClassName,
    btnClassName,
    size = "large",
    setOpen,
    label,
    requireAsButton,
    setValue,
    monthPicker = false,
    picker,
    btnIcon,
    endIcon = CalendarIcon,
    btnIcononRight = false,
    format,
    disabledDates,
    initialDate,
    reset,
    ...rest
  } = props;
  const [newVal, setNewVal] = useState<{ date: Dayjs | null; dateString: string }>({ date: null, dateString: "" });

  const handleChange = (date: Dayjs | any, dateString: string) => {
    setNewVal({ date, dateString });
    setValue(dateString);
  };

  useEffect(() => { setNewVal({ date: null, dateString: "" }) }, [reset])

  return (
    <div
      className={`${requireAsButton ? "hide-field" : "common-date-picker-wrapper"} 
            ${monthPicker && "month-picker"}`}
    >
      {requireAsButton && (
        <Button
          className={`w-full flex items-center 
                        ${btnIcononRight ? "flex-row-reverse justify-between" : ""} 
                        ${btnClassName}`}
          onClick={() => setOpen(!open)}
        >
          {btnIcon && <img src={btnIcon} alt="icon" style={{ marginRight: !btnIcononRight ? "20px" : "0px" }} />}
          <span className="capitalize">{name}</span>
        </Button>
      )}
      {label && <label className="label">{label}</label>}
      <AntDatePicker
        inputReadOnly={true}
        defaultValue={initialDate ? dayjs(initialDate) : undefined}
        open={open}
        size={size}
        disabledDate={disabledDates}
        value={newVal.date}
        placement={placement}
        format={format}
        onOpenChange={() => setOpen(!open)}
        className={className}
        popupClassName={`common-datepicker-popup-wrapper ${dropdownClassName}`}
        onChange={handleChange}
        clearIcon={""}
        picker={picker}
        suffixIcon={<img src={monthPicker ? ArrowDownDark : endIcon} alt="icon" />}
        {...rest}
      />
    </div>
  );
};
