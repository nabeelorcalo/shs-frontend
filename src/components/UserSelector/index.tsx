import { Avatar, Input, Select, Space } from 'antd';
import { GlassMagnifier } from '../../assets/images';
import './styles.scss'
import { SearchBar } from '../SearchBar/SearchBar';
import { useState } from 'react';

const { Option } = Select;

interface UserSelectorProps {
  className?: string;
  label?: any;
  value?: any;
  defaultValue?: any;
  options?: any;
  placeholder?: string;
  searchPlaceHolder?: string;
  onChange?: any;
  handleSearch?: any;
  hasSearch?: boolean;
  hasAvatar?: boolean;
  hasMultiple?: boolean;
  showInnerSearch?: boolean;
  disabled?:boolean;
}

const UserSelector = (props: UserSelectorProps) => {
  const { label, value, onChange, handleSearch,
    placeholder, options, hasSearch, searchPlaceHolder, className, defaultValue, hasMultiple,disabled=false } = props
  const [selectArrayData, setSelectArrayData] = useState(options)

  const handleChangeSearch = (e: any) => {
    if (e.trim() === '') setSelectArrayData(options)
    else {
      const searchedData = selectArrayData?.filter((emp: any) => emp?.label?.toLowerCase()?.includes(e))
      setSelectArrayData(searchedData)
    }
  }

  return (
    <>
      <label>{label}</label>
      <Select
        showSearch={props.showInnerSearch}
        mode={hasMultiple ? 'multiple' : undefined}
        className={className}
        placeholder={placeholder}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={onChange}
        dropdownRender={(menu) => (
          <div className='input-wrapper'>
            {hasSearch && <div className='select-search'>
              <SearchBar placeholder={searchPlaceHolder} handleChange={handleChangeSearch} />
            </div>}
            {menu}
          </div>
        )}
      >
        {selectArrayData?.map((item: any) => {
          const names = item.label.split(" ");
          let initials = "";
          names.forEach((name: any) => {
            initials += name.charAt(0);
          });
          return <Option value={item?.value} key={item?.value}>
            <Space>
              {item?.avatar && <Avatar size={35} src={item?.avatar}>
                <span className='text-sm'>{initials}</span>
              </Avatar>}
              {item?.label}
            </Space>
          </Option>
        })}
      </Select>
    </>
  )
}

export default UserSelector