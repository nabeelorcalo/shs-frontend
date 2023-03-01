import { useState } from 'react';
import { Checkbox, Dropdown as AntDropDown } from 'antd';
import { ArrowDownDark } from '../../assets/images';
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
    checkboxPosition?: string;
    searchValue?: string;
    selectedList?: string[];
    placement?: "topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight" | "top" | "bottom" | undefined;
    setValue?: any;
    setSearchValue?: any;
    setSelectedList?: any;
    pilled?: boolean;
}

export const DropDown = ({
    name = 'this month',
    value,
    options = [],
    requireSearchBar = false,
    requireCheckbox = false,
    requireDatePicker = false,
    checkboxPosition = '',
    searchValue = '',
    placement = 'bottomRight',
    setValue,
    pilled = false,
    setSearchValue,
    selectedList = [],
    setSelectedList,
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
                    placeholder='Search'
                    handleChange={setSearchValue}
                />,
                key: option
            }
        }
        return {
            label: <span className={`drop-down-menu-item ${checkboxPosition === 'right' && option !== 'custom' && 'checkbox-right'}`}>
                {requireCheckbox && option !== 'custom' && <Checkbox
                    onChange={(e) => requireCheckbox && handleCheckbox(e, option)}
                    checked={selectedList.includes(option)}
                    id={`item${i}`}
                    name={`item${i}`}
                    className={`check-box ${checkboxPosition === 'right' && 'mr-0'}`} />}
                <label
                    htmlFor={`item${i}`}
                    className='option'
                    onClick={() => !requireCheckbox && setValue(option)}
                >
                    {option === 'custom' && requireDatePicker ?
                        <CommonDatePicker
                            btnClassName='drop-down-btn'
                            name={option}
                            open={openPicker}
                            setOpen={setOpenPicker}
                            dropdownClassName='picker-extra-class'
                            placement='bottomRight'
                        /> :
                        option}
                </label>
            </span>,
            key: option,
        }
    });

    return (
        <AntDropDown
            menu={{ items }}
            trigger={['click']}
            open={visible}
            placement={placement}
            className={`drop-down-wrapper ${visible && 'active'} ${pilled && 'pilled'}`}
            overlayClassName='drop-down-overlay'
            onOpenChange={setVisible}
            {...props}
        >
            <div>
                <span>{value ? value : name}</span>
                <img src={ArrowDownDark} alt='icon' style={{ marginLeft: '10px' }} />
            </div>
        </AntDropDown>
    )
}
