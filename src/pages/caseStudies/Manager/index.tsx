import { Divider } from 'antd'
import React, { useState } from 'react'
import { BoxWrapper, Drawer, DropDown, FiltersButton, PageHeader, SearchBar } from '../../../components'
import CaseStudiesTable from '../Common/caseStudiesTable';
import Filters from '../Common/filter';
import { Row, Col } from 'antd';
import './style.scss'

const index = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [value, setValue] = useState<any>()
  const handleChange = () => { };

  return (
    <div className='manager-case-studies'>
      <PageHeader title="Case Studies"
      />
      <Divider className="my-0" />
      <Row gutter={[20, 20]} className='mt-5'>
        <Col xxl={6} xl={6} md={6} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xxl={18} xl={18} md={18} sm={24} xs={24} className='flex justify-end gap-2'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            value={value}
            setValue={setValue}
          />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <CaseStudiesTable />
          </BoxWrapper>
        </Col>
      </Row>
      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}
      >
        <React.Fragment key=".0">
          <Filters />
        </React.Fragment>
      </Drawer>
    </div>
  )
}

export default index