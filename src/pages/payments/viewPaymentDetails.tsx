import React, { useState } from 'react'
import { DownlaodFileIcon } from '../../assets/images'
import { IconButton, PageHeader, PopUpModal, SalarySlip } from '../../components'
import './style.scss'
const ViewPaymentDetails = () => {
  const [modalShow, setModalShow] = useState(false)
  const downloadClick = () => { setModalShow(true)};
  return (
    <div>
      <PageHeader
        title="Salary Slip"
        bordered
      />
      <IconButton
        size="large"
        className="icon-btn download-btn"
        onClick={downloadClick}
        icon={<DownlaodFileIcon />}
      />
      <PopUpModal
        open={modalShow}
        close={()=>{ setModalShow(false)}}
        children={
          <div>
            <PageHeader
              title="Salary Slip"
              bordered
            />
            <IconButton
              size="large"
              className="icon-btn download-btn"
              onClick={downloadClick}
              icon={<DownlaodFileIcon />}
            />
            <SalarySlip />
          </div>
        }
      />
      <SalarySlip />
    </div>
  )
}

export default ViewPaymentDetails
