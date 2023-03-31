
import React, { useState } from 'react'
import { Divider } from 'antd'
import { BoxWrapper, DropDown, FiltersButton, PageHeader, SearchBar } from '../../../components'
import Drawer from '../../../components/Drawer';
import CaseStudiesTable from '../Common/caseStudiesTable';
import Filters from '../Common/filter';
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
      <div className='flex justify-between my-2'>
        <SearchBar size="middle" handleChange={handleChange} />
        <div className='flex justify-end gap-2'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={setValue}
            />
        </div>
      </div>
      <BoxWrapper>
      <CaseStudiesTable/>
      </BoxWrapper>
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