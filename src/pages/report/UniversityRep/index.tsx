import { Divider } from 'antd'
import React, { useState } from 'react'
import { BoxWrapper, DropDown, FiltersButton, PageHeader, SearchBar } from '../../../components'
import Drawer from '../../../components/Drawer';
import Filters from './filter';
import Image from '../../../assets/images/Grievances/avater-1.svg'
import UniversityRepReportTable from './reportTable';
import useCustomHook from '../actionHandler';

const reportTableData = [
  {
    no: '01',
    avater: Image,
    name: "Mino Marina",
    department: 'Design',
    company: 'Power Source',
    reviewer: 'Amilia Clark',
  },
  {
    no: '02',
    name: "Craig Donin",
    avater: Image,
    department: 'Research',
    company: 'DevSpot',
    reviewer: 'Jacob Jones',
  },
  {
    no: '03',
    name: "Gustavo Korsgaard",
    avater: Image,
    department: 'Business',
    company: 'Abacus',
    reviewer: 'Savannah',
  },
  {
    no: '04',
    name: "Omar Schleifer",
    avater: Image,
    department: 'Management',
    company: 'Orcalo Holdings',
    reviewer: 'Albert Flores',
  },
  {
    no: '05',
    avater: Image,
    name: "Adison Donin",
    department: 'Development',
    company: 'Poer Source',
    reviewer: 'Leslie Alexander',

  },
  {
    no: '06',
    name: "Lindsey Mango",
    avater: Image,
    department: 'Development',
    company: 'Poer Source',
    reviewer: 'Wade Warren',
   
  },
]

const index = () => {
  const TableColumn = ['No.' , 'Avater',' Name', 'Department' , 'Company' , 'Reviewer']
  const action = useCustomHook();
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
              setValue={()=>action.downloadPdfOrCsv(event,TableColumn,reportTableData,"Report" )}
            />
        </div>
      </div>
      <BoxWrapper>
      <UniversityRepReportTable reportTableData={reportTableData}/>
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