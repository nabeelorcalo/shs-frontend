import { Button, Divider } from 'antd'
import { NavLink } from 'react-router-dom'
import { BlowWistle, SettingHorizontalLine, Settinglocation } from '../../../../assets/images'
import { DropDown, FiltersButton, PageHeader, SearchBar } from '../../../../components'
import { BoxWrapper } from '../../../../components/BoxWrapper/BoxWrapper'
import AppTabs from '../../../../components/Tabs'
import { ROUTES_CONSTANTS } from '../../../../config/constants'
import EscalatedByMe from './escalatedByMe'
import './style.scss'

const index = () => {
  const handleChange = () => {

  }
  return (
    <div className='add-grievance'>
      <div className='header'>
        <PageHeader title={<> All Grievances {<SettingHorizontalLine className="" />} <span className='text-base font-medium'>Grievances</span> </>} />
        <Divider className="my-1 mb-2" />
      </div>
      <div className="flex justify-between">
        <div><SearchBar size="middle" handleChange={handleChange} /></div>
        <div className='flex  gap-2' >
          <NavLink to={`${ROUTES_CONSTANTS.ADD_LOCATION}`}>
            <Button
              size="middle"
              onClick={() => { }}
              className="flex gap-2 blow-whistle-button white-color teriary-bg-color"
            >
              <BlowWistle /> Blow a Whistle
            </Button>
          </NavLink>
          <FiltersButton
            label="Filters"
            onClick={() => { }}
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
      </div>
      <BoxWrapper className='my-5'>
        <AppTabs
          items={[
            {
              children: 'Components1',
              key: '1',
              label: 'Escalated To Me'
            },
            {
              children: <EscalatedByMe/>,
              key: '2',
              label: 'Escalated By Me'
            },

          ]}
        />


      </BoxWrapper>
    </div>
  )
}
export default index