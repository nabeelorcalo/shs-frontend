import React from 'react'
import './style.scss'

export const InternshipProgressStepper = () => {
  return (
    <ul className="stepper">
      <li className="stepper__item applied">
        <p>12</p>
        <p>Applied</p>
      </li>
      <li className="stepper__item interviewed">
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
      <li className="stepper__item reject-sep">
        <p>0</p>
        <p>Reject</p>
      </li>
    </ul>
  )
}