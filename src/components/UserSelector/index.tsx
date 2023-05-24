import { Input, Select, Space } from 'antd';
import { GlassMagnifier } from '../../assets/images';
import './styles.scss'

const { Option } = Select;

interface UserSelectorProps {
  label?: any;
  value?: any;
  setState?: any;
  options?: any;
  suffixIcon?: any;
  placeholder?: string;
  searchPlaceHolder?: string;
  onChange?: any;
  handleSearch?: any;
  hasSearch?: boolean;
  hasAvatar?: boolean;
  requiredAttributes?: any
}

const UserSelector = (props: UserSelectorProps) => {
  const { label, value, onChange, suffixIcon, handleSearch,
    placeholder, options, hasSearch, searchPlaceHolder } = props

  const handleInputSearch = (event: any) => {
    handleSearch(event.target.value)
  }

  return (
    <>
      <label>{label}</label>
      <Select
        suffixIcon={suffixIcon}
        // style={{ width: '100%' }}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
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