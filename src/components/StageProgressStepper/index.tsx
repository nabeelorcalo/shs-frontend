import './style.scss'

interface stageStatus {
  stage?: any
}

export const StageProgressStepper = (props: stageStatus) => {
  const { stage } = props;
  const stageArrays = ['applied', 'interviewed', 'shortList', 'offerLetter', 'hired']
  const stageIndex = stageArrays.indexOf(stage);
  const newStageArray = ['Applied', 'Interviewed', 'ShortList', 'Offer Letter', 'Hired']

  return (
    <ul className="stepper">
      {newStageArray?.map((item: any, i: number) => {
        return (
          <li className={`stepper__item ${i <= stageIndex ? `active-stage` : ''}`}>
            <p>{item}</p>
          </li>
        )
      })}
      {/* <li className="stepper__item applied">
        <p>Applied</p>
      </li>
      <li className="stepper__item interviewed">
        <p>Interviewed</p>
      </li>
      <li className="stepper__item recommended">
        <p>ShortList</p>
      </li>
      <li className="stepper__item offerletter">
        <p>Offer Letter</p>
      </li>
      <li className="stepper__item contract">
        <p>Contract</p>
      </li>
      <li className="stepper__item hired">
        <p>Hired</p>
      </li> */}
    </ul>
  )
}