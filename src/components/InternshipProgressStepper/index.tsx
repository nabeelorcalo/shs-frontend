import './style.scss'

export const InternshipProgressStepper = (props: any) => {

  const { status, interns } = props

  const countFunc = (name: any) => {
    const statusCount = interns?.filter((item: any) => {
      return item?.stage === name
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
      name: "Shortlisted",
      count: countFunc('shortlisted'),
      className: "progress_shortlisted"
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
      count: countFunc('offerLetter'),
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
      name: "Rejected",
      count: countFunc('rejected'),
      className: "progress_reject"
    },
  ]
  return (
    <ul className="progress_stepper xl:text-lg text-base text-secondary-color relative flex my-5 mx-5">
      {
        stepperObj?.map((item: any, idx: any) => {
          return (
            <li key={idx} className={`progress_stepper__item text-center ${status === "DRAFT" || status === "PENDING" ? " progress_grayed-out" : item.className}`}>
              <p>{status === "Draft" || status === "Pending" ? 0 : item.count}</p>
              <p>{item.name}</p>
            </li>
          )
        })
      }
    </ul>
  )
}