import { Button, DatePicker as AntDatePicker } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import './common-date-picker.scss';
import { ArrowDownDark, SearchIcon, CalendarIcon } from '../../assets/images';

interface Props {
    name?: string;
    className?: string;
    dropdownClassName?: string;
    open?: boolean;
    placement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight" | undefined;
    btnClassName?: string;
    requireAsButton?: boolean;
    endIcon?: any;
    startIcon?: any;
    setOpen?: any;
    setValue?: any;
    size?: 'large' | 'middle' | 'small';
    label?: string;
    picker?: "time" | "date" | "week" | "month" | "quarter" | "year" | undefined;
    onBtnClick?: any;
    monthPicker?: boolean;
}

export const CommonDatePicker = ({
    name = 'This Month',
    open = false,
    placement = 'bottomRight',
    className,
    dropdownClassName,
    btnClassName,
    startIcon: StartIcon,
    endIcon: EndIcon,
    size = 'large',
    setOpen,
    label,
    requireAsButton,
    setValue,
    monthPicker = false,
    picker,
}:
    Props) => {

    const [newVal, setNewVal] = useState<{ date: Dayjs, dateString: string }>({ date: dayjs(), dateString: '' });

    const handleChange = (date: Dayjs | any, dateString: string) => {
        setNewVal({ date, dateString });
        setValue(dateString);
    }

    return (
        <div className={`${requireAsButton ? 'hide-field' : 'common-date-picker-wrapper'} ${monthPicker && 'month-picker'}`}>
            {requireAsButton && <Button className={`${btnClassName}`} onClick={() => setOpen(!open)}>
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
                popupClassName={`common-datepicker-popup-wrapper ${dropdownClassName} ${monthPicker && 'month-picker'}`}
                onChange={handleChange}
                clearIcon={''}
                picker={picker}
                suffixIcon={<img src={monthPicker ? ArrowDownDark : CalendarIcon} alt='icon' />}
            />
        </div>
    )
}
