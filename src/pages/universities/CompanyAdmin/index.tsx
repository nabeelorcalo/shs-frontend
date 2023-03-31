import React, { useState } from 'react'
import { Divider, Select, Row, Col } from 'antd'
import { IconAngleDown } from '../../../assets/images';
import { BoxWrapper, DropDown, PageHeader, SearchBar } from '../../../components'
import UniversityTable from './universityTable';
import './style.scss'


const index: React.FC = () => {
  const [value, setValue] = useState<any>()
  const handleChange = () => { };
  return (
    <div className='company-university '>
      <PageHeader title="Universities" />
      <Divider className="my-0" />
      <Row className="mt-8" gutter={[0, 20]} >
        <Col xxl={6} xl={6} lg={8} md={24} sm={24} xs={24}>
          <SearchBar handleChange={handleChange} />
        </Col>
        <Col xxl={18} xl={18} lg={16} md={24} sm={24} xs={24} className="flex gap-4 md:justify-end" >
          <Select className='w-[200px] select' placeholder="London" suffixIcon={<IconAngleDown />}>
            <Select.Option value="London">London</Select.Option>
            <Select.Option value="Bristol">Bristol</Select.Option>
            <Select.Option value="Manchester">Manchester</Select.Option>
            <Select.Option value="Oxford">Oxford</Select.Option>
            <Select.Option value="Belfast">Belfast</Select.Option>
          </Select>
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            value={value}
            setValue={setValue}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <UniversityTable />
          </BoxWrapper>
        </Col>
      </Row>
      {/* <div className='flex justify-between my-2'>
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
      </div> */}

    </div>
  )
}
export default index