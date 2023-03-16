import { useState } from 'react';
import { Checkbox, Dropdown as AntDropDown } from 'antd';
import { ArrowDownDark, DownloadIcon } from '../../assets/images';
import { SearchBar } from '../SearchBar/SearchBar';
import { CommonDatePicker } from '../calendars/CommonDatePicker/CommonDatePicker';
import { DropDownInterface } from './DropDown_interface';
import { handleCheckbox } from './actionHandle';
import './style.scss';



export const DropDown = (props: DropDownInterface) => {
    const {
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
        showDatePickerOnVal,
        setSearchValue,
        selectedList = [],
        setSelectedList,
        startIcon,
        endIcon: EndIcon = ArrowDownDark,
        requiredDownloadIcon,
    } = props;

    const [visible, setVisible] = useState(false);
    const [openPicker, setOpenPicker] = useState(false);

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
                        onChange={(e) => handleCheckbox(e, option, setSelectedList)}
                        checked={selectedList.includes(option)}
                    >
                    </Checkbox>
                    <label htmlFor={option} className='capitalize cursor-pointer'>{option}</label>
                </div>,
                key: option
            }
        }
        if (requireDatePicker && option === showDatePickerOnVal) {
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
            <div className='flex items-center justify-between'>
                <p className='flex items-center'>
                    {startIcon && <img src={startIcon} alt='icon' style={{ marginRight: '20px' }} />}
                    {!requiredDownloadIcon && <span>{value ? value : name}</span>}
                </p>
                <EndIcon className='ml-[10px]' />
                {/* <img src={requiredDownloadIcon ? DownloadIcon : endIcon} alt='icon' style={{ display: !endIcon ? 'none' : '', marginLeft: requiredDownloadIcon ? '1px' : '10px' }} /> */}
            </div>
        </AntDropDown>
    )
}
