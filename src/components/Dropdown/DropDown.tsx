import { useState } from 'react';
import { Checkbox, Dropdown as AntDropDown } from 'antd';
import { ArrowDownDark, DownloadIcon } from '../../assets/images';
import { SearchBar } from '../SearchBar/SearchBar';
import './style.scss';
import { CommonDatePicker } from '../calendars/CommonDatePicker';

interface Props {
    name?: string;
    value?: string;
    options?: string[];
    requireSearchBar?: boolean;
    requireCheckbox?: boolean;
    requireDatePicker?: boolean;
    checkboxOnRight?: boolean;
    searchValue?: string;
    selectedList?: string[];
    placement?: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight" | "top" | "bottom" | undefined;
    setValue?: any;
    setSearchValue?: any;
    setSelectedList?: any;
    setDateValue?: any;
    pilled?: boolean;
    datePickerValue?: string;
    requiredDownloadIcon?: boolean;
}

export const DropDown = ({
    name = 'this month',
    value,
    options = [],
    requireSearchBar = false,
    requireCheckbox = false,
    requireDatePicker = false,
    checkboxOnRight = false,
    searchValue = '',
    placement = 'bottomRight',
    setValue,
    pilled = false,
    datePickerValue,
    setSearchValue,
    selectedList = [],
    setSelectedList,
    setDateValue,
    requiredDownloadIcon,
    ...props
}: Props) => {

    const [visible, setVisible] = useState(false);
    const [openPicker, setOpenPicker] = useState(false);


    const handleCheckbox = (e: any, option: string) => {
        e.target.checked ?
            setSelectedList([...selectedList, option]) :
            setSelectedList(selectedList.filter(op => op !== option));
    };

    const items = options?.map((option: string, i: number) => {
        if (requireSearchBar && option === 'search') {
            return {
                label: <SearchBar
                    size='middle'
                    value={searchValue}
                    name='searchbar'
                    handleChange={setSearchValue}
                />,
                key: option
            }
        }
        if (requireCheckbox) {
            return {
                label: <div className={`flex  gap-5 ${checkboxOnRight ? 'justify-between flex-row-reverse' : ''}`}>
                    <Checkbox id={option} name={option}
                        onChange={(e) => handleCheckbox(e, option)}
                        checked={selectedList.includes(option)}
                    >
                    </Checkbox>
                    <label htmlFor={option} className='capitalize cursor-pointer'>{option}</label>
                </div>,
                key: option
            }
        }
        if (requireDatePicker && option === datePickerValue) {
            return {
                label:
                    <CommonDatePicker
                        requireAsButton
                        btnClassName='drop-down-btn'
                        name={option}
                        open={openPicker}
                        setOpen={setOpenPicker}
                        dropdownClassName='picker-extra-class'
                        placement='bottomLeft'
                        setValue={setValue}
                    />,
                key: option
            }
        }
        return {
            label: <span className='capitalize' onClick={() => setValue(option)}>{option}</span>,
            key: option
        }
    });

    return (
        <AntDropDown
            menu={{ items }}
            trigger={['click']}
            open={visible}
            placement={placement}
            className={`drop-down-wrapper ${visible && 'active'} ${pilled && 'pilled'} `}
            overlayClassName='drop-down-overlay'
            onOpenChange={setVisible}
            {...props}
        >
            <div>
                {!requiredDownloadIcon && <span>{value ? value : name}</span>}
                <img src={requiredDownloadIcon ? DownloadIcon : ArrowDownDark} alt='icon' style={{ marginLeft: requiredDownloadIcon ? '' : '10px' }} />
            </div>
        </AntDropDown>
    )
}
