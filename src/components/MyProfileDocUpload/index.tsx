import { useState } from 'react'
import { Button } from 'antd';
import { PopUpModal } from '../Model';
import UploadDocument from '../UploadDocument';


const MyProfileDocUpload = ({ title, width, showHide, cancelBtntxt, okBtntxt, children }: any) => {
  const [show, setShow] = useState(false)

  return (
    <>
      <Button onClick={() => { setShow(!show) }}>Assesment Upload, Sign</Button>
      <PopUpModal title={title} width={width} showHide={showHide} cancelBtntxt={cancelBtntxt} okBtntxt={okBtntxt}>
        {children}
        <UploadDocument />
      </PopUpModal>
    </>
  )
}

export default MyProfileDocUpload