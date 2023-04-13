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
      className: "applied"
    },
    {
      name: "Interviewed",
      count: countFunc('interviewed'),
      className: "interviewed"
    },
    {
      name: "Recommended",
      count: countFunc('recommended'),
      className: "recommended"
    },
    {
      name: "Offer Letter",
      count: countFunc('offer-letter'),
      className: "offer-letter"
    },
    {
      name: "Contract",
      count: countFunc('contract'),
      className: "contract"
    },
    {
      name: "Hired",
      count: countFunc('hired'),
      className: "hired"
    },
    {
      name: "Reject",
      count: countFunc('reject'),
      className: "reject"
    },
  ]
  console.log(stepperObj[0].count)
  return (
    <ul className="stepper">
      {
        stepperObj.map((item: any, idx: any) => {
          return (
            <li key={idx} className={`stepper__item ${status === "Draft" || status === "Pending" ? " grayed-out" : item.className}`}>
              <p>{status === "Draft" || status === "Pending" ? 0 : item.count}</p>
              <p>{item.name}</p>
            </li>
          )
        })
      }
    </ul>
  )
}