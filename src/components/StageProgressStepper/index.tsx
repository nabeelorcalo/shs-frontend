import './style.scss'

interface stageStatus {
  stage?: any
}

export const StageProgressStepper = (props: stageStatus) => {
  const { stage } = props;
  const stageArrays = ['applied', 'shortlisted', 'interviewed', 'recommended','offerLetter', 'contract', 'hired']
  const stageIndex = stageArrays.indexOf(stage);
  const newStageArray = ['Applied', 'ShortList', 'Interviewed', 'Recommended','Offer Letter', 'Contract', 'Hired']

  return (
    <ul className="stepper flex xl:text-base text-sm">
      {newStageArray?.map((item: any, i: number) => {
        return (
          <li className={`stepper__item ${i <= stageIndex ? `active-stage` : ''}`}>
            <p>{item}</p>
          </li>
        )
      })}
    </ul>
  )
}