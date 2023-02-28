import { useState } from 'react';
import { Checkbox, Dropdown as AntDropDown } from 'antd';
import { ArrowDownDark, SearchIcon } from '../../assets/images';
import { SearchBar } from '../SearchBar/SearchBar';
import './style.scss';
import { CommonCalendar } from '../calendars/CommonCalendar';

interface Props {
    name?: string;
    value?: string;
    options?: string[];
    requireSearchBar?: boolean;
    requireCheckbox?: boolean;
    checkboxPosition?: string;
    searchValue: string;
    selectedList?: string[];
    setValue({ }): void;
    setSearchValue({ }): void;
    setSelectedList({ }): void;
}

export const DropDown = ({
    name = 'this month',
    value,
    options,
    requireSearchBar,
    requireCheckbox,
    checkboxPosition,
    searchValue,
    setValue,
    setSearchValue,
    selectedList = [],
    setSelectedList,
    ...props
}: Props) => {


    const [visible, setVisible] = useState(false);

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
                    icon={SearchIcon}
                />,
                key: option
            }
        }
        return {
            label: <span className={`drop-down-menu-item ${checkboxPosition === 'right' && 'checkbox-right'}`}>
                {requireCheckbox && <Checkbox
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
                    {option === 'custom' ? <div style={{ position: 'relative' }}><CommonCalendar /></div> : option}
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
            className={`drop-down-wrapper ${visible && 'active'}`}
            overlayClassName='drop-down-overlay'
            onOpenChange={setVisible}
            {...props}
        >
            <div>
                <span>{value ? value : name}</span>
                <img src={ArrowDownDark} alt='icon' />
            </div>
        </AntDropDown>
    )
}
