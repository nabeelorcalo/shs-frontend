import './style.scss'

export const InternshipProgressStepper = (props: any) => {

  const { status, interns } = props

  const countFunc = (name: any) => {
    const statusCount = interns.filter((item: any, idx: any) => {
      return item.stage === name
    }).length;
    return statusCount
  }

  const stepperObj = [
    {
      name: "Applied",
      count: countFunc('applied'),
      className: "progress_applied"
    },
    {
      name: "Interviewed",
      count: countFunc('interviewed'),
      className: "progress_interviewed"
    },
    {
      name: "Recommended",
      count: countFunc('recommended'),
      className: "progress_recommended"
    },
    {
      name: "Offer Letter",
      count: countFunc('offer-letter'),
      className: "progress_offer-letter"
    },
    {
      name: "Contract",
      count: countFunc('contract'),
      className: "progress_contract"
    },
    {
      name: "Hired",
      count: countFunc('hired'),
      className: "progress_hired"
    },
    {
      name: "Reject",
      count: countFunc('reject'),
      className: "progress_reject"
    },
  ]
  console.log(stepperObj[0].count)
  return (
    <ul className="progress_stepper">
      {
        stepperObj.map((item: any, idx: any) => {
          return (
            <li key={idx} className={`progress_stepper__item ${status === "Draft" || status === "Pending" ? " progress_grayed-out" : item.className}`}>
              <p>{status === "Draft" || status === "Pending" ? 0 : item.count}</p>
              <p>{item.name}</p>
            </li>
          )
        })
      }
    </ul>
  )
}