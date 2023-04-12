import './style.scss';

export const InternshipProgressStepper = (props : any) => {

  const {status, interns} = props 

  const countFunc = (name:any)=>{
    const statusCount = interns.filter((item: any, idx: any)=> {
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
            <li key={idx} className={`stepper__item ${status=== "Draft" || status === "Pending" ?" grayed-out" : item.className}`}>
              <p>{status=== "Draft" || status === "Pending" ? 0 : item.count}</p>
              <p>{item.name}</p>
            </li>
          )
        })
      }
      {/* <li className="stepper__item grayed-out">
        <p>12</p>
        <p>Applied</p>
      </li>
      <li className="stepper__item ">
        <p>8</p>
        <p>Interviewed</p>
      </li>
      <li className="stepper__item recommended">
        <p>1</p>
        <p>Recommended</p>
      </li>
      <li className="stepper__item offerletter">
        <p>1</p>
        <p>Offer letter</p>
      </li>
      <li className="stepper__item contract">
        <p>1</p>
        <p>Contract</p>
      </li>
      <li className="stepper__item hired">
        <p>1</p>
        <p>Hired</p>
      </li>
      <li className="stepper__item reject">
        <p>0</p>
        <p>Reject</p>
      </li> */}
    </ul>
  )
}