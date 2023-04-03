import { Button, Col, Divider, Row } from 'antd'
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { BlowWistle, SettingHorizontalLine, } from '../../../../assets/images'
import { DropDown, FiltersButton, PageHeader, PopUpModal, SearchBar } from '../../../../components'
import { BoxWrapper } from '../../../../components/BoxWrapper/BoxWrapper'
import Drawer from '../../../../components/Drawer'
import AppTabs from '../../../../components/Tabs'
import BlowWhistleForm from '../../Common/blowWhistleForm'
import EscalatedByMe from './escalatedByMe'
import EscalatedToMe from './escalatedToMe'
import Filters from '../../Common/filters'
import './style.scss'

const index = () => {
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleChange = () => {

  }
  return (
    <div className='add-grievance'>
      <div className='header'>
        <PageHeader title={<> All Grievances {<span className='inline-block align-middle mx-2'><SettingHorizontalLine className="" /></span>}
          <NavLink to="/grievances">
            <span className='text-base font-medium dashboard-primary-color' >Grievances</span>
          </NavLink>  </>} />
        <Divider className="my-1 mb-2" />
      </div>
      <Row gutter={[20,20]}>
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
            options={[
              'pdf',
              'excel'
            ]}
            requiredDownloadIcon
            setValue={() => { }}
            value=""
          />
        </Col>
      </Row>
      {/* <div className="flex justify-between">
        <div>
          <SearchBar size="middle" handleChange={handleChange} />
        </div>
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
            onClick={() => { setShowDrawer(!showDrawer) }}
          />
          <DropDown
            options={[
              'pdf',
              'excel'
            ]}
            requiredDownloadIcon
            setValue={() => { }}
            value=""
          />
        </div>
      </div> */}
      <BoxWrapper className='my-5'>
        <AppTabs
          items={[
            {
              children: <EscalatedToMe />,
              key: '1',
              label: 'Escalated To Me'
            },
            {
              children: <EscalatedByMe />,
              key: '2',
              label: 'Escalated By Me'
            },

          ]}
        />

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