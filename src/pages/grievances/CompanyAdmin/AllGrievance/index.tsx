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
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import './style.scss'
import useCustomHook from '../action.handler'
const escalatedToMeTableData = [
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
      children: <EscalatedToMe escalatedToMeTableData={escalatedToMeTableData} />,
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
    { name: "Grievances" , onClickNavigateTo:`/${ROUTES_CONSTANTS.GRIEVANCES}` },
  ];
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const [selectedTab, setSelectedTab] = useState<any>("1")
  
  const downloadPdfCsvData = () => {
    if (selectedTab === "1") {
     return escalatedToMeTableData
    } else if (selectedTab === "2") {
     return EscalatedByMeTableData
    } else if (selectedTab === "3") {
     return internGrievancesTableData
    } else if (selectedTab === "4") {
     return managerGrievancesTableData
    } else {
     null
    }
      }

  const downloadPdfCsvColumn = () => {
    if (selectedTab === "1") {
     return TableColumn1
    } else if (selectedTab === "2") {
     return TableColumn2
    } else if (selectedTab === "3") {
     return TableColumn3
    } else if (selectedTab === "4") {
     return TableColumn4
    } else {
     null
    }
      }
  const handleChange = () => {
  }
  return (
    <div className='all-grievance'>
       <Breadcrumb breadCrumbData={breadcrumbArray} />
       <Divider/>

      <div className="flex flex-row justify-between gap-3 max-sm:flex-col lg:flex-row">
      <div className="max-sm:w-full md:w-[50%] lg:w-[25%]">
          <SearchBar size="middle" handleChange={handleChange} />
        </div>
        <div className='w-full flex flex-row lg:justify-end gap-2' >
          <div>
          <Button
            size="middle"
            onClick={() => {
              setShowBlowWhistleModal(!showBlowWhistleModal);
            }}
            className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
          >
            <BlowWistle /> Blow a Whistle
          </Button>
          </div>
          <div>
          <FiltersButton
            label="Filters"
            onClick={() => {setShowDrawer(!showDrawer) }}
          />
          </div>
          <div>
          <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              setValue={() => {
                action.downloadPdfOrCsv(event , downloadPdfCsvColumn(),  downloadPdfCsvData(), "All Grievance",  selectedTab )
              }}
            />
          </div>
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