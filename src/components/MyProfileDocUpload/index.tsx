import { useState } from 'react'
import { PopUpModal } from '../Model';



const MyProfileDocUpload = ({ title, width, showHide, cancelBtntxt, okBtntxt, children }: any) => {
  const [show, setShow] = useState(false)

  return (
    <PopUpModal title={title} width={width} showHide={showHide} cancelBtntxt={cancelBtntxt} okBtntxt={okBtntxt}>
      {children}
    </PopUpModal>
  )
}

export default MyProfileDocUpload