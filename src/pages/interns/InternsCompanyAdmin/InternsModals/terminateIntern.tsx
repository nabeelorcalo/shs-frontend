import { PopUpModal } from '../../../../components'
import { AlertIcon } from '../../../../assets/images'
import { TextArea } from "../../../../components";
import { Button } from 'antd';

const TerminateIntern = (props: any) => {
  const { terminate, setTerminate, state, setState, updateCandidatesRecords } = props
  return (
    < PopUpModal
      open={terminate.isToggle}
      width={570}
      close={() => { setTerminate({ ...terminate, isToggle: false }) }}
      children={
        <div>
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><AlertIcon /></div>
              <div><h2>Alert</h2></div>
            </div>
            <p>Are you sure you want to terminate this intern?</p>
            <div className="flex flex-col gap-2">
              <p className="text-md text-teriary-color">Reason</p>
              <TextArea
                value={state.termReason}
                rows={5}
                placeholder="Write your reason"
                onChange={(event: any) => {
                  setState({
                    ...state,
                    termReason: event.target.value
                  })
                }}
              />
            </div>
          </div>
        </div >
      }
      footer={
        <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col" >
          <Button
            type="default"
            size="middle"
            className="button-default-error max-sm:w-full rounded-lg"
            onClick={() => { setTerminate({ ...terminate, isToggle: false }) }} >
            Cancel
          </Button>
          <Button
            type="primary"
            size="middle"
            className="button-error max-sm:w-full rounded-lg"
            onClick={() => {
              updateCandidatesRecords(terminate.id, null, state.termReason);
              setTerminate({ ...terminate, isToggle: false })
              setState({
                ...state,
                termReason: ""
              })
            }} >
            Terminate
          </Button>
        </div >
      }
    />
  )
}

export default TerminateIntern