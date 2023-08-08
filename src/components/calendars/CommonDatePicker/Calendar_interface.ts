export interface DatePickerInterface {
  name?: string;
  className?: string;
  dropdownClassName?: string;
  open?: boolean;
  placement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight" | undefined;
  btnClassName?: string;
  requireAsButton?: boolean;
  setOpen?: any;
  setValue?: any;
  size?: "large" | "middle" | "small";
  label?: string;
  picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined;
  onBtnClick?: any;
  btnIcon?: any;
  endIcon?: any;
  monthPicker?: boolean;
  btnIcononRight?: boolean;
  format?: string;
  disabled?: boolean;
  initialDate?: string;
  disabledDates?: any;
  value?: any;
  reset?: boolean;
}
