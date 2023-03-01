import { Button, DatePicker as AntDatePicker } from 'antd';
import { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import './common-date-picker.scss';
import { ArrowDownDark, SearchIcon } from '../../assets/images';

interface Props {
    name?: string;
    className?: string;
    dropdownClassName?: string;
    open?: boolean;
    placement?: "bottomRight" | "bottomLeft" | "topLeft" | "topRight" | undefined;
    btnClassName?: string;
    endIcon?: any;
    startIcon?: any;
    setOpen?: any;
    setValue?: any;
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
    setOpen,
    setValue }:
    Props) => {

    const [newVal, setNewVal] = useState<{ date: Dayjs, dateString: string }>({ date: dayjs(), dateString: '' });

    const handleChange = (date: any, dateString: string) => {
        setNewVal({ date, dateString });
        setValue(dateString);
    }

    return (
        <div className='common-date-picker-wrapper'>
            <Button className={`${btnClassName}`} onClick={() => setOpen(!open)}>
                {name}
            </Button>
            <AntDatePicker
                open={open}
                value={newVal.date}
                placement={placement}
                onOpenChange={() => setOpen(false)}
                className={className}
                popupClassName={`common-datepicker-dropdown-wrapper ${dropdownClassName}`}
                onChange={handleChange}
            />
        </div>
    )
}
