import { ButtonThemePrimary, ButtonThemeSecondary, PopUpModal } from '../../../../components'
import UserSelector from '../../../../components/UserSelector'


const AssignManager = (props: any) => {
  const { assignManager, setAssignManager, filteredManagersData, updateCandidatesRecords } = props


  return (
    <PopUpModal open={assignManager.isToggle}
      width={600}
      close={() => { setAssignManager({ ...assignManager, isToggle: false }) }}
      title="Assign Manager"
      children={
        <div className="flex flex-col gap-2">
          <UserSelector
            label="Manager"
            placeholder="Select"
            defaultValue={assignManager?.data?.manager?.id}
            value={assignManager.assignedManager}
            onChange={(event: any) => {
              setAssignManager({
                ...assignManager,
                assignedManager: event
              })
            }}
            options={filteredManagersData}
            hasSearch={true}
            searchPlaceHolder="Search by name"
          />
        </div>
      }
      footer={
        <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
          <ButtonThemeSecondary
            // type="default"
            // size="middle"
            // className="button-default-tertiary max-sm:w-full"
            onClick={() => setAssignManager({ ...assignManager, isToggle: false, assignedManager: undefined })}>
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary
            style={{ marginInlineStart: "0px" }}
            onClick={() => {
              updateCandidatesRecords(assignManager.id, assignManager.assignedManager);
              setAssignManager({ ...assignManager, assignManager: undefined, isToggle: false })
            }}
          // type="default"
          // size="middle"
          // className="button-tertiary max-sm:w-full"
          >
            Assign
          </ButtonThemePrimary>
        </div >
      }
    />
  )
}

export default AssignManager