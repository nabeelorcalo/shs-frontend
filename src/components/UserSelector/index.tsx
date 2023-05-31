import { Input, Select, Space } from 'antd';
import { GlassMagnifier } from '../../assets/images';
import './styles.scss'

const { Option } = Select;

interface UserSelectorProps {
  className?: string;
  label?: any;
  value?: any;
  options?: any;
  placeholder?: string;
  searchPlaceHolder?: string;
  onChange?: any;
  handleSearch?: any;
  hasSearch?: boolean;
  hasAvatar?: boolean;
}

const UserSelector = (props: UserSelectorProps) => {
  const { label, value, onChange, handleSearch,
    placeholder, options, hasSearch, searchPlaceHolder, className } = props

  const handleInputSearch = (event: any) => {
    handleSearch(event.target.value)
  }

  return (
    <>
      <label>{label}</label>
      <Select
        className={className}
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