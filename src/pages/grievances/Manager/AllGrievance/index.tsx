import { Button, Col, Divider, Row, TabsProps } from 'antd'
import React, { useState } from 'react'
import { BlowWistle } from '../../../../assets/images'
import { Breadcrumb, AppTabs, DropDown, FiltersButton, Drawer, BoxWrapper, PopUpModal, SearchBar } from '../../../../components'
import BlowWhistleForm from '../../Common/blowWhistleForm'
import EscalatedByMe from './escalatedByMe'
import EscalatedToMe from './escalatedToMe'
import Filters from '../../Common/filters'
import './style.scss'
import useCustomHook from '../actionHandler'
import { ROUTES_CONSTANTS } from '../../../../config/constants'


const index = () => {
  const escalatedByMe = [
    {
      no: '01',
      subject: 'Attendance Log Issue',
      type: 'Others',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'New',
    },
    {
      no: '02',
      subject: 'Working conditions',
      type: 'Discipline',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'In Progess',
    },
    {
      no: '03',
      subject: 'Bullying',
      type: 'Personal',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'Re-Opened',
    },
    {
      no: '04',
      subject: 'Attendance Log Issue',
      type: 'Work',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'Resolved',
    },

  ]
  const escalatedToMeTableData = [
    {
      no: '01',
      subject: 'Attendance Log Issue',
      type: 'Others',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'New',
    },
    {
      no: '02',
      subject: 'Working conditions',
      type: 'Discipline',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'In Progess',
    },
    {
      no: '03',
      subject: 'Bullying',
      type: 'Personal',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'Re-Opened',
    },
    {
      no: '04',
      subject: 'Attendance Log Issue',
      type: 'work',
      date: '22/09/2022',
      escalatedTo: 'Maria Sanoid',
      status: 'Resolved',
    },

  ]
  const items: TabsProps["items"] = [
    {
      children: <EscalatedToMe escalatedToMeTableData={escalatedToMeTableData} />,
      key: '1',
      label: 'Escalated To Me'
    },
    {
      children: <EscalatedByMe escalatedByMe={escalatedByMe} />,
      key: '2',
      label: 'Escalated By Me'
    },
  ]

  const breadcrumbArray = [
    { name: "All Grievance" },
    { name: "Grievances", onClickNavigateTo: `${ROUTES_CONSTANTS.GRIEVANCES}` },
  ];
  const TableColumn1 = ['No.', 'Subject', 'Type', 'Date', 'Escalated To', 'Status']
  const TableColumn2 = ['No.', 'Subject', 'Type', 'Date', 'Escalated To', 'Status']
  const action = useCustomHook();
  const [selectedTab, setSelectedTab] = useState<any>(1)
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleChange = () => {

  }
  return (
    <div className='add-grievance'>
      <Breadcrumb breadCrumbData={breadcrumbArray} />
      <Divider />
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} md={6} sm={24} xs={24}>
          <SearchBar size="middle" handleChange={handleChange} />
        </Col>
        <Col xxl={18} xl={18} md={18} sm={24} xs={24} className='flex  gap-2 justify-end gerievance-right-sec'>
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
            onClick={() => { setShowDrawer(!showDrawer) }}
          />
          <DropDown
            requiredDownloadIcon
            options={["pdf", "excel"]}
            setValue={() => {
              action.downloadPdfOrCsv(event, selectedTab === "2" ?
                TableColumn2 : TableColumn1,
                selectedTab === "2" ? escalatedByMe : escalatedToMeTableData,
                "All Grievance", selectedTab)
            }}
          />
        </Col>
      </Row>

      <BoxWrapper className='my-5'>
        <AppTabs items={items} onChange={(selectedTab: any) => {
          setSelectedTab(selectedTab)
        }} />

      </BoxWrapper>
      <PopUpModal
        open={showBlowWhistleModal}
        title="Blow a Whistle"
        width={600}
        close={() => setShowBlowWhistleModal(false)}
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
          <Filters />
        </React.Fragment>
      </Drawer>

    </div>
  )
}
export default index