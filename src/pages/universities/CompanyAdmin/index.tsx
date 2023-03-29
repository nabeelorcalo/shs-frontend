import React, { useState } from 'react'
import { Divider, Select } from 'antd'
import { IconAngleDown } from '../../../assets/images';
import { BoxWrapper, DropDown, PageHeader, SearchBar } from '../../../components'
import './style.scss'
import UniversityTable from './universityTable';

const index: React.FC = () => {
  const [value, setValue] = useState<any>()
  const handleChange = () => { };
  return (
    <div className='company-university '>
      <PageHeader title="Universities" />
      <Divider className="my-0" />
      <div className='flex justify-between my-2'>
        <SearchBar size="middle" handleChange={handleChange} />
        <div className='flex justify-end gap-2'>
          <Select className='w-[200px] select' placeholder="London" suffixIcon={<IconAngleDown />}>
            <Select.Option value="London">London</Select.Option>
            <Select.Option value="Bristol">Bristol</Select.Option>
            <Select.Option value="Manchester">Manchester</Select.Option>
            <Select.Option value="Oxford">Oxford</Select.Option>
            <Select.Option value="Belfast">Belfast</Select.Option>
          </Select>
          <div className="flex justify-end items-center gap-3">
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={setValue}
            />
          </div>
        </div>
      </div>
      <BoxWrapper>
      <UniversityTable/>
      </BoxWrapper>
    </div>
  )
}
export default index