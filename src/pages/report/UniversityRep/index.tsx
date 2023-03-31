import { Divider } from 'antd'
import React, { useState } from 'react'
import { BoxWrapper, DropDown, FiltersButton, PageHeader, SearchBar } from '../../../components'
import Drawer from '../../../components/Drawer';
import Filters from './filter';
import UniversityRepReportTable from './reportTable';

const index = () => {
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [value, setValue] = useState<any>()
  const handleChange = () => { };
  return (
    <div>
         <PageHeader title="Report"
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
      <UniversityRepReportTable/>
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