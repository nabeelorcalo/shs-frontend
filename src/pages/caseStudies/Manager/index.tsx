
import React, { useState } from 'react'
import { BoxWrapper, Drawer, DropDown, FiltersButton, PageHeader, SearchBar } from '../../../components'
import Image from '../../../assets/images/Grievances/avater-1.svg'
import CaseStudiesTable from '../Common/caseStudiesTable';
import Filters from '../Common/filter';
import { Row, Col } from 'antd';
import './style.scss'
import useCustomHook from '../actionHandler';

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
  const TableColumn = ['No.','Avater',' Name', 'Report Name' , 'Department' , 'Assessment Date' , 'Reporting Manager'  , 'Status']
  const action = useCustomHook();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [value, setValue] = useState<any>()
  const handleChange = () => { };

  return (
    <div className='manager-case-studies'>
      <PageHeader title="Case Studies" actions bordered/>
      <Row gutter={[20, 20]} className='mt-5'>
        <Col xxl={6} xl={6} md={6} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xxl={18} xl={18} md={18} sm={24} xs={24} className='flex justify-end gap-2'>
          <FiltersButton label="Filter" onClick={() => { setShowDrawer(!showDrawer) }} />
          <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={()=>{action.downloadPdfOrCsv(event,TableColumn,caseStudyTableData,"Case Studies " )}}
            />
        </Col>
        <Col xs={24}>
          <BoxWrapper>
            <CaseStudiesTable caseStudyTableData={caseStudyTableData} />
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