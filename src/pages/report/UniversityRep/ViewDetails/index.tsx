import React from 'react'
import { NavLink } from 'react-router-dom'
import { SettingHorizontalLine } from '../../../../assets/images'
import { PageHeader } from '../../../../components'

const index = () => {
  return (
    <div>
     <PageHeader title={<> Mino Mrina {<span className='inline-block align-middle mx-2'><SettingHorizontalLine className="" /></span>}
          <NavLink to="/report">
            <span className='text-base font-medium dashboard-primary-color' >Report</span>
          </NavLink>  </>} />
          
    </div>
  )
}

export default index

