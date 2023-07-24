import React from 'react'
import { AppTabs } from '../../../../../components'
import { GeneralInfo, ProfileUser } from '../../../../../assets/images';
import CompanyInformation from './CompanyInformation';
import PersonalInformation from './PersonalInformation';
import '../../style.scss'

const items = [
    {
      key: "1",
      label: (
        <span>
          <ProfileUser /> 
          <span className="ml-3">Personal Information</span> 
        </span>
      ),
      children: <PersonalInformation />,
    },
    {
      key: "2",
      label: (
        <span>
          <GeneralInfo />
          <span className="ml-3">Company Information</span>
        </span>
      ),
      children: <CompanyInformation />,
    },
  ];

const CompanyTabs = () => {
  return (
      <div className="company-dash">
          <AppTabs items={items} />
      </div>
  )
}

export default CompanyTabs