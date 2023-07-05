import { PopUpModal } from '../../../../components'
import { SuccessIcon } from '../../../../assets/images'
import { Button } from 'antd'

function CompleteModal(props: any) {
  const { complete, setComplete, setCertificateModal, setInternCertificate } = props;

  return (
    <PopUpModal
      open={complete}
      width={570}
      close={() => {
        setComplete(false);
        setInternCertificate({})
      }}
      children={
        <div className="flex flex-col gap-5" >
          <div className='flex flex-row items-center gap-3'>
            <div><SuccessIcon /></div>
            <div><h2>Success</h2></div>
          </div>
          <p>Are you sure you want to mark the internship as complete for this intern?</p>
        </div >
      }
      footer={
        <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col" >
          <Button
            type="default"
            size="middle"
            className="button-default-tertiary max-sm:w-full rounded-lg"
            onClick={() => {
              setComplete(false); setInternCertificate({})
            }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            size="middle"
            className="button-tertiary max-sm:w-full rounded-lg"
            onClick={() => {
              setComplete(false)
              setCertificateModal(true)
              // setPreviewModal(true)
              // updateCandidatesRecords(complete.id, null, null, 'completed')
              // setComplete({ ...complete, isToggle: false })
            }}
          >
            Complete
          </Button>
        </div >
      }
    />
  )
}

export default CompleteModal