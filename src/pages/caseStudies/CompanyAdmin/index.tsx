
import React, { useState } from 'react'
import { BoxWrapper, Drawer, DropDown, FiltersButton, PageHeader, SearchBar, } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg'
import CaseStudiesTable from '../Common/caseStudiesTable';
import Filters from '../Common/filter';
import useCustomHook from '../actionHandler';
import './style.scss'

const index = () => {
  const caseStudyTableData = [
    {
      no: '01',
      avater: Image,
      name: "Mino Marina",
      ReportName: 'September 2022',
      department: 'Design',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 7700 900077',
      status: 'Pending',
    },
    {
      no: '02',
      name: "Craig Donin",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Research',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Pending',
    },
    {
      no: '03',
      name: "Gustavo Korsgaard",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Business',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Pending',
    },
    {
      no: '04',
      name: "Omar Schleifer",
      avater: Image,
      ReportName: 'September 2022',
      department: 'Management',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 7700 900077',
      status: 'Pending',
    },
    {
      no: '05',
      avater: Image,
      name: "Adison Donin",
      ReportName: 'University of London',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Approved',
    },
    {
      no: '06',
      name: "Lindsey Mango",
      avater: Image,
      ReportName: 'August 2022',
      department: 'Development',
      assessmentDate: '20/09/2022',
      reportingManager: '+44 2078 628009',
      status: 'Rejected',
    },
  ]
  const TableColumn = ['No.', 'Avater', ' Name', 'Report Name', 'Department', 'Assessment Date', 'Reporting Manager', 'Status']
  const action = useCustomHook();

  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [value, setValue] = useState<any>()
  const handleChange = () => { };
  return (
    <div className='manager-case-studies'>
      <PageHeader title="Case Studies" actions bordered
      />
      <div className='flex flex-row justify-between gap-3 max-sm:flex-col lg:flex-row'>
      <div className= "max-sm:w-full md:w-[50%] lg:w-[25%]"> 
         <SearchBar size="middle" handleChange={handleChange} />
         </div>
        <div className='flex sm:justify-end gap-2'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => { action.downloadPdfOrCsv(event, TableColumn, caseStudyTableData, "Case Studies ") }}
          />
        </div>
      </div>
      <BoxWrapper>
        <CaseStudiesTable caseStudyTableData={caseStudyTableData} />
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