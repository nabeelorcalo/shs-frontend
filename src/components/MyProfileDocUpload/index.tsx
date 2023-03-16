import { useState } from 'react'
import { PopUpModal } from '../Model';



const MyProfileDocUpload = ({ title, width, showHide, cancelBtntxt, okBtntxt, children }: any) => {
  const [show, setShow] = useState(false)

  return (
    <PopUpModal title={title} width={width} open={show} close={() => setShow(false)}>
      {children}
    </PopUpModal>
  )
}

export default MyProfileDocUpload