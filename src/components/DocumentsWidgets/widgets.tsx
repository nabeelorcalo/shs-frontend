import { Col, Row } from 'antd';
import React from 'react'
import "./widgets.scss"
import { ContractsRecieved, ContractsSigned, ContractsRejected } from '../../assets/images/index';

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

      <Row gutter={[10, 20]} justify="space-between">
        {data.map((data: any) => (
          <Col lg={lg} md={md} sm={sm} xs={xs} >
            <div className='flex '>
              <img src={data.img} alt="" />
              <div className='ml-3'>
                <p className='text-base font-semibold'>{data.title}</p>
                <span>{data.description}</span>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default Widgets
