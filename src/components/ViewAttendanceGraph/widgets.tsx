import { Col, Row } from 'antd';
import React from 'react'
import "./widgets.scss"
import { ContractsRecieved, ContractsSigned, ContractsRejected } from '../../assets/images/index';
import { ContractCard } from '../ContractCard';

interface Props {
  id?: string;
  name?: string;
  icon?: any;

}

export const array = [
  {
    img: ContractsRecieved,
    title: "Contact",
    description: "From PowerSource",
  },
  {
    img: ContractsSigned,
    title: "Contact",
    description: "From PowerSource",
  },
  {
    img: ContractsRejected,
    title: "Contact",
    description: "From PowerSource",
  },
  {
    img: ContractsRecieved,
    title: "Contact",
    description: "From PowerSource",
  }
]

const Widgets = (props: any) => {
  const { lg = 7, md = 12, sm = 24, xs = 24, data = { array } } = props
  return (
    <>
      <ContractCard />
      <ContractCard cardWithProgressBar/>
    </>
  )
}

export default Widgets
