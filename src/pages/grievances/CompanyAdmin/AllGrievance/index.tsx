import { Button, Divider, TabsProps } from 'antd'
import React, { useState } from 'react'
import { BlowWistle } from '../../../../assets/images'
import { Breadcrumb, DropDown, FiltersButton ,Drawer,AppTabs, BoxWrapper, PopUpModal, SearchBar } from '../../../../components'
import BlowWhistleForm from '../../Common/blowWhistleForm'
import Filters from '../../Common/filters'
import EscalatedByMe from './escalatedByMe'
import EscalatedToMe from './escalatedToMe'
import InternGrievances from './internGrievances'
import ManagerGrievances from './managerGrievances'
import Image1 from '../../../../assets/images/Grievances/avater-1.svg'
import Image2 from '../../../../assets/images/Grievances/avater-2.svg'
import Image3 from '../../../../assets/images/Grievances/avater-3.svg'
import Image4 from '../../../../assets/images/Grievances/avater-4.svg'
import {
  GrievancesAvater1,
  GrievancesAvater2,
  GrievancesAvater3,
  GrievancesAvater4
} from '../../../../assets/images'
import './style.scss'
import useCustomHook from '../../actionHandler'

const escalatedByMeTableData = [
  {
    no: '01',
    avater: <GrievancesAvater1/>,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Julie Andrews',
    status: 'New',
  },
  {
    no: '02',
    avater: <GrievancesAvater2/>,
    subject: 'Working conditions',
    type: 'Discipline',
    date: '2/09/2022',
    escalatedBy: 'Sean Bean',
    status: 'In Progess',
  },
  {
    no: '03',
    avater:   <GrievancesAvater3/>,
    subject: 'Bullying',
    type: 'Personal',
    date: '22/09/2022',
    escalatedBy: 'Emma Thompson',
    status: 'Re-Opened',
  },
  {
    no: '04',
    avater:  <GrievancesAvater4/>,
    subject: 'Attendance Log Issue',
    type: 'Work',
    date: '04/09/2022',
    escalatedBy: 'Robert Carlyle',
    status: 'Resolved',
  },
]
const EscalatedByMeTableData =  [
  {
    no: '01',
    subject:'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedTo: 'Maria Sanoid',
    status: 'New',
  },
  {
    no: '02',
    subject:'Working conditions',
    type: 'Discipline',
    date: '22/09/2022',
    escalatedTo: 'Zach Levery',
    status: 'In Progess',
  },
  {
    no: '03',
    subject:'Bullying',
    type: 'Personal',
    date: '22/09/2022',
    escalatedTo: 'Mino Marina',
    status: 'Re-Opened',
  },
  {
    no: '04',
    subject:'Work Environment ',
    type: 'Work',
    date: '22/09/2022',
    escalatedTo: 'Tom Hanks',
    status: 'Resolved',
  },
]
const internGrievancesTableData = [
  {
    no: '01',
    avater: Image1,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Julie Andrews',
    escalatedTo: 'Maria Sanoid',
    status: 'New',
  },
  {
    no: '02',
    avater: Image2,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Sean Bean',
    escalatedTo: 'David Miller',
    status: 'In Progess',
  },
  {
    no: '03',
    avater: Image3,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Emma Thompson',
    escalatedTo: 'Tom Hanks',
    status: 'Re-Opened',
  },
  {
    no: '04',
    avater: Image4,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedTo: 'David Miller',
    escalatedBy: 'Robert Carlyle',
    status: 'Resolved',
  },
]
const managerGrievancesTableData = [
  {
    no: '01',
    avater: Image1,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Julie Andrews',
    escalatedTo: 'Maria Sanoid',
    status: 'New',
  },
  {
    no: '02',
    avater: Image2,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Sean Bean',
    escalatedTo: 'David Miller',
    status: 'In Progess',
  },
  {
    no: '03',
    avater: Image3,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedBy: 'Emma Thompson',
    escalatedTo: 'Tom Hanks',
    status: 'Re-Opened',
  },
  {
    no: '04',
    avater: Image4,
    subject: 'Attendance Log Issue',
    type: 'Others',
    date: '22/09/2022',
    escalatedTo: 'David Miller',
    escalatedBy: 'Robert Carlyle',
    status: 'Resolved',
  },
]

const index = () => {
  const items: TabsProps["items"] = [
    {
      children: <EscalatedToMe escalatedByMeTableData={escalatedByMeTableData} />,
      key: '1',
      label: 'Escalated To Me'
    },
    {
      children: <EscalatedByMe  EscalatedByMeTableData ={EscalatedByMeTableData}/>,
      key: '2',
      label: 'Escalated By Me'
    },
    {
      children: <InternGrievances internGrievancesTableData={internGrievancesTableData
      } />,
      key: '3',
      label: 'Intern Grievances'
    },
    {
      children: <ManagerGrievances  managerGrievancesTableData ={managerGrievancesTableData}/>,
      key: '4',
      label: 'Manager Grievances'
    },
  ]
  const TableColumn1 = ['No.' ,'Escalated By', 'Subject' , 'Type' , 'Date' , 'Status']
  const TableColumn2 = ['No.' , 'Subject','Type', 'Date','Escalated To','Status']
  const TableColumn3 = ['No.' ,'Escalated By', 'Subject','Type','Date','Escalated To', 'Status']
  const TableColumn4 = ['No.'  ,'Escalated By', 'Subject','Type','Date', 'Escalated To' , 'Status']
  const action = useCustomHook();
  const breadcrumbArray = [
    { name: "All Grievance"},
    { name: "Grievances" , onClickNavigateTo:"/grievances" },
  ];
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<any>(1)
  const handleChange = () => {
  }
  return (
    <div className='add-grievance'>
       <Breadcrumb breadCrumbData={breadcrumbArray} />
       <Divider/>

      <div className="flex justify-between">
        <div><SearchBar size="middle" handleChange={handleChange} /></div>
        <div className='flex  gap-2' >
          <Button
            size="middle"
            onClick={() => {
              setShowBlowWhistleModal(!showBlowWhistleModal);
            }}
            className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
          >
            <BlowWistle /> Blow a Whistle
          </Button>
          <FiltersButton
            label="Filters"
            onClick={() => {setShowDrawer(!showDrawer) }}
          />
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              // setValue={()=>action.downloadPdfOrCsv(event,TableColumn,escalatedByMeTableData,"University Details" )}
              setValue={() => {
                action.downloadPdfOrCsv(event , selectedTab === "2" ?
                 TableColumn2 : selectedTab === "3" ? TableColumn3: selectedTab === "4" ? TableColumn4 :  TableColumn1  , 
                  selectedTab === "2" ?  EscalatedByMeTableData : selectedTab === "3" ? internGrievancesTableData:selectedTab === "4" ?
                   managerGrievancesTableData : escalatedByMeTableData , 
                   "All Grievance",  selectedTab )
              }}

            />
        </div>
      </div>
      <BoxWrapper className='my-5'>
      <AppTabs items={items} onChange={(selectedTab: any) => {
              setSelectedTab(selectedTab)
            }} />

      </BoxWrapper>
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => {setShowBlowWhistleModal(false)}}
        footer=""
      >
        <BlowWhistleForm setState={setShowBlowWhistleModal} />
      </PopUpModal>
      <Drawer
        closable={() => setShowDrawer(false)}
        onClose={() => setShowDrawer(false)}
        title="Filters"
        open={showDrawer}
      >
        <React.Fragment key=".0">
          <Filters  />
        </React.Fragment>
      </Drawer>

    </div>
  )
}
export default index