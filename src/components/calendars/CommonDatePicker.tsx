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
    setValue
}:
    Props) => {

    const [newVal, setNewVal] = useState<{ date: Dayjs, dateString: string }>({ date: dayjs(), dateString: '' });

    const handleChange = (date: Dayjs | any, dateString: string) => {
        setNewVal({ date, dateString });
        setValue(dateString);
    }

    return (
        <div className={`${requireAsButton ? 'hide-field' : 'common-date-picker-wrapper'}`}>
            {requireAsButton && <Button className={`${btnClassName}`} onClick={() => setOpen(!open)}>
                {name}
            </Button>}
            {label && <label className='label'>{label}</label>}
            <AntDatePicker
                open={open}
                size={size}
                value={newVal.date}
                placement={placement}
                onOpenChange={() => setOpen(!open)}
                className={className}
                popupClassName={`common-datepicker-dropdown-wrapper ${dropdownClassName}`}
                onChange={handleChange}
                clearIcon={''}
                suffixIcon={<img src={CalendarIcon} alt='icon' />}
            />
        </div>
    )
}
