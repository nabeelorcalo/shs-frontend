import React, { useState } from 'react'
import { DownlaodFileIcon } from '../../assets/images'
import { IconButton, PageHeader, PopUpModal, SalarySlip } from '../../components'
import './style.scss'
const ViewPayrollSalarySlip = () => {
  return (
    <div>
      <PageHeader
        title="Salary Slip"
        bordered
      />
      <SalarySlip />
    </div>
  )
}

export default ViewPayrollSalarySlip
