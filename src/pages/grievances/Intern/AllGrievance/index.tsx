import { Button, Divider } from 'antd'
import React, { useState } from 'react'
import { BlowWistle } from '../../../../assets/images'
import { DropDown, FiltersButton, PageHeader, PopUpModal, SearchBar } from '../../../../components'
import { BoxWrapper } from '../../../../components/BoxWrapper/BoxWrapper'
import Drawer from '../../../../components/Drawer'
import AppTabs from '../../../../components/Tabs'
import Filters from '../../Common/filters'
import BlowWhistleForm from '../blowWhistleForm'
import EscalatedByMe from './escalatedByMe'
import EscalatedToMe from './escalatedToMe'
import './style.scss'

const index = () => {
  const [showBlowWhistleModal, setShowBlowWhistleModal] = useState(false);
  const [showDrawer, setShowDrawer] = useState<boolean>(false);
  const handleChange = () => {
  }
  return (
    <div className='add-grievance'>
      <div className='header'>
        <PageHeader title="Grievances" />
        <Divider className="my-1 mb-2" />
      </div>
      <div className="flex justify-between">
        <div><SearchBar size="middle" handleChange={handleChange} /></div>
        <div className='flex  gap-2' >
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
      </div>
      <BoxWrapper className='my-5'>
        <AppTabs
          items={[
            {
              children: <EscalatedByMe />,
              key: '1',
              label: 'Escalated By Me'
            },
            {
              children: <EscalatedToMe />,
              key: '2',
              label: 'Escalated To Me'
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
          <Filters  />
        </React.Fragment>
      </Drawer>

    </div>
  )
}
export default index