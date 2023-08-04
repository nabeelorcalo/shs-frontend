import { useState } from 'react';
import { Checkbox, Dropdown as AntDropDown } from 'antd';
import { ArrowDownDark, DownloadIconLeave } from '../../assets/images';
import { SearchBar } from '../SearchBar/SearchBar';
import { CommonDatePicker } from '../calendars/CommonDatePicker/CommonDatePicker';
import { DropDownInterface } from './DropDown_interface';
import { handleCheckbox } from './actionHandle';
import CommonRangePicker from '../calendars/CommonDatePicker/CommonRangePicker';
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
    requireRangePicker,
    dateRangePlacement = 'bottomRight'
  } = props;

  const [visible, setVisible] = useState(false);
  const [openPicker, setOpenPicker] = useState(false);
  const [openRangePicker, setOpenRangePicker] = useState(false);

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
            setValue={(val: string) => { setValue(val); setVisible(false) }}
          />,
        key: option
      }
    }
    if (requireRangePicker && option === showDatePickerOnVal) {
      return {
        label: <CommonRangePicker
          className='common-range-picker-wrapper'
          open={openRangePicker}
          setOpen={setOpenRangePicker}
          option={option}
          onChange={(_: any, val: string[]) => { setValue(val.toString().split(',').join(' , ')); setVisible(false) }}
          placement={dateRangePlacement}
        />,
        key: option
      }
    }
    return {
      label: <span className='capitalize' onClick={() => { setValue(option); setVisible(false) }}>{option}</span>,
      key: option
    }
  });

  return (
    <AntDropDown
      menu={{ items }}
      trigger={['click']}
      open={visible}
      placement={placement}
      className={`drop-down-wrapper ${pilled && 'pilled'}`}
      overlayClassName='drop-down-overlay'
      onOpenChange={setVisible}
    >
      <div className='flex items-center justify-between'>
        <p className='flex items-center'>
          {startIcon && <img src={startIcon} alt='icon' style={{ marginRight: '20px' }} />}
          {!requiredDownloadIcon && <span className='mr-[20px]'>{value ? value : name}</span>}
        </p>
        {!requiredDownloadIcon && <EndIcon className='ml-[10px]' />}
        {requiredDownloadIcon && <div className='mr-[-5px]'><DownloadIconLeave /></div>}
      </div>
    </AntDropDown>
  )
}
