import React, { useState, useEffect } from 'react'
import { Col, Divider, Row } from 'antd'
import './InnerData.scss'
import { BoxWrapper } from '../../../../components/BoxWrapper'
import { Layout } from 'antd'
import { Button } from '../../../../components/Button'
import { useRecoilState } from 'recoil'
import { pColorState, sColorState } from '../../../../store'
const { Content } = Layout

const PersonalizeContent = ({buttonPrimaryColor, buttonSecondaryColor}: any) => {
  const [pColor, setPColor] = useRecoilState<any>(pColorState);
  const [sColor, setSColor] = useRecoilState<any>(sColorState);
  return (
    <div className="personalisation-content">
      <Row gutter={[0, 6]}>
        <Col>
          <div className="personalisation-content-title pt-4 pb-4">Personalisation</div>
        </Col>
      </Row>
      <hr className='mb-3 border-1 border-[#D9DBE9] border-solid'/>
      <Row className="second_row h-full" gutter={[20, 20]}>
        <Col xs={24} md={24} xl={24} >
          <BoxWrapper className="h-full box-wrapper-preview">
            <div className="sand-bg-color w-4/12 h-9 mx-6 my-2"></div>
            <div className="sand-bg-color w-1/4 h-6 mx-6 my-4"></div>
            <Divider />
            <div className="grid grid-rows-3 grid-flow-col gap-4 mx-6">
              <div className="row-span-3 ">
                <div className='row-span-1 sand-bg-color w-1/2 h-5'></div>
              </div>
              <div className="col-span-2 sand-bg-color h-5"></div>
              <div className="row-start-2 col-span-2 sand-bg-color h-5"></div>
              <div className="row-start-3 col-span-2 sand-bg-color h-5"></div>
            </div>
            <div className="grid grid-rows-3 grid-flow-col gap-4 mx-6 mt-16 mb-12">
              <div className="row-span-3 ">
                <div className='row-span-1 sand-bg-color w-1/2 h-5'></div>
              </div>
              <div className="col-span-2 sand-bg-color h-5"></div>
              <div className="row-start-2 col-span-2 sand-bg-color h-5"></div>
              <div className="row-start-3 col-span-2 sand-bg-color h-5"></div>
            </div>
            <div className='flex justify-end gap-4 px-6'>
              <Button
                style={{ border: `2px solid ${sColor}`, color: `${sColor}` }}
                label="Button"
                onClick={() => { }}
                type="default"
                className='px-[33px] py-[8px] rounded-[7px]'
              />
              <Button
                style={{ background: `${pColor}` }}
                label="Button"
                onClick={() => { }}
                type="primary"
                className='px-[33px] py-[8px] rounded-[7px]'
              />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}

export default PersonalizeContent
