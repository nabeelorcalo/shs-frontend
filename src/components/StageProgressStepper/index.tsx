import React from 'react'
import './style.scss'

export const StageProgressStepper = () => {
  return (
    <ul className="stepper">
      <li className="stepper__item applied">
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
      </li>
    </ul>
  )
}