import { Button, DatePicker as AntDatePicker } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import './common-date-picker.scss';
import { ArrowDownDark, CalendarIcon } from '../../assets/images';

interface Props {
    name?: string;
    className?: string;
    dropdownClassName?: string;
    open?: boolean;
    placement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight" | undefined;
    btnClassName?: string;
    requireAsButton?: boolean;
    setOpen?: any;
    setValue?: any;
    size?: 'large' | 'middle' | 'small';
    label?: string;
    picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined;
    onBtnClick?: any;
    btnIcon?: any;
    endIcon?: any;
    monthPicker?: boolean;
    btnIcononRight?: boolean;
}

export const CommonDatePicker = ({
    name = 'This Month',
    open = false,
    placement = 'bottomRight',
    className,
    dropdownClassName,
    btnClassName,
    size = 'large',
    setOpen,
    label,
    requireAsButton,
    setValue,
    monthPicker = false,
    picker,
    btnIcon,
    endIcon = CalendarIcon,
    btnIcononRight = false,
    ...rest
}:
    Props) => {

    const [newVal, setNewVal] = useState<{ date: Dayjs, dateString: string }>({ date: dayjs(), dateString: '' });

    const handleChange = (date: Dayjs | any, dateString: string) => {
        setNewVal({ date, dateString });
        setValue(dateString);
    }

    return (
        <div className={`${requireAsButton ? 'hide-field' : 'common-date-picker-wrapper'} ${monthPicker && 'month-picker'}`}>
            {requireAsButton && <Button className={`w-full flex items-center justify-between ${btnIcononRight ? 'flex-row-reverse' : ''} ${btnClassName}`} onClick={() => setOpen(!open)}>
                {btnIcon && <img src={btnIcon} alt='icon' />}
                <span className='capitalize'>{name}</span>
            </Button>}
            {label && <label className='label'>{label}</label>}
            <AntDatePicker
                open={open}
                size={size}
                value={newVal.date}
                placement={placement}
                onOpenChange={() => setOpen(!open)}
                className={className}
                popupClassName={`common-datepicker-popup-wrapper ${dropdownClassName}`}
                onChange={handleChange}
                clearIcon={''}
                picker={picker}
                suffixIcon={<img src={monthPicker ? ArrowDownDark : endIcon} alt='icon' />}
                {...rest}
            />
        </div>
    )
}
