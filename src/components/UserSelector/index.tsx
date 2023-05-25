import { Input, Select, Space } from 'antd';
import { GlassMagnifier } from '../../assets/images';
import './styles.scss'
import { useState } from 'react';

const { Option } = Select;

interface UserSelectorProps {
  className?: string;
  label?: any;
  // value?: any;
  // setState?: any;
  options?: any;
  placeholder?: string;
  searchPlaceHolder?: string;
  // onChange?: any;
  handleSearch?: any;
  hasSearch?: boolean;
  hasAvatar?: boolean;
  requiredAttributes?: any
}

const UserSelector = (props: UserSelectorProps) => {
  const { label, handleSearch,
    placeholder, options, hasSearch, searchPlaceHolder, className } = props;

  const [state, setState] = useState({ value: 'select', label: 'select' })

  const handleInputSearch = (event: any) => {
    handleSearch(event.target.value)
  }

  const onChange = (value: any) => {
    let label = options.find((obj: any) => obj.value === value).label;
    console.log(JSON.stringify(label, null, 4));
    setState((prevState) => ({
      ...prevState,
      value: value,
      label: label
    }))
  }

  return (
    <>
      <label>{label}</label>
      <Select
        className={className}
        placeholder={placeholder}
        value={state.value}
        onChange={(event) => onChange(event)}
        dropdownRender={(menu) => (
          <div className='input-wrapper'>
            {hasSearch && <div className='select-search'>
              <Input
                prefix={<GlassMagnifier />}
                placeholder={searchPlaceHolder}
                className='search-bar'
                onChange={handleInputSearch} />
            </div>}
            {menu}
          </div>
        )}
      >
        {options?.map((item: any) => {
          return <Option value={item?.value}>
            <Space>
              {item?.avatar && <img src={item?.avatar?.type} alt="avatar" />}
              {item?.label}
            </Space>
          </Option>
        })}
      </Select>
    </>
  )
}

export default UserSelector