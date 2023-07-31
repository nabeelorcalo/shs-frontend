import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal, Typography, Col, Row } from 'antd'
import { CheckCircleFilled } from '@ant-design/icons'
import { BackButton, IconCloseModal, DegreeCap, OfficeBag, Home } from '../../../assets/images'
import '../styles.scss'
import { ROUTES_CONSTANTS } from '../../../config/constants'

const userType = [
  {
    id: '1',
    img: <DegreeCap />,
    role: 'Student',
    key: 'STUDENT'
  },
  {
    id: '2',
    img: <OfficeBag />,
    role: 'Company',
    key: 'COMPANY_ADMIN'
  },
  {
    id: '3',
    img: <Home />,
    role: 'University',
    key: 'UNIVERSITY'
  }
]

const SelectUserType = (props: any) => {
  const navigate = useNavigate()
  const [activeButton, setActiveButton] = useState('')
  const [userTypeRole, setUserTypeRole] = useState('')

  const handleClick = (buttonIndex: any) => {
    setActiveButton(buttonIndex)
  }

  return (
    <div className='select-user-type-modal'>
      <Modal
        open={props.isModalOpen}
        closeIcon={
          <IconCloseModal
            onClick={() => {
              props.setIsModalOpen(false)
            }}
          />
        }
        footer={null}
        width={1000}
      >
        <div className='pt-10'>
          <Typography className='select-user-heading'>
            Select User Type
          </Typography>
        </div>
        <div className='images-wrapper'>
          <Row gutter={[24, 15]}>
            {userType.map(item => {
              return (
                  <Col xxl={8} xl={8} lg={8} md={12} xs={24} key={item.id}>
                    <center
                      key={item.id}
                      onClick={() => {
                        handleClick(item.id)
                        setUserTypeRole(item.key)
                      }}
                      className={`image-wrapper-box ${item.id === activeButton ? 'active' : ''
                        }`}
                    >
                      <div
                        className={`${item.id === activeButton ? '' : 'icon-check'
                          }`}
                      >
                        <CheckCircleFilled
                          className='icon-check'
                          style={{ color: '#363565', fontSize: '36px' }}
                        />
                      </div>
                      {item.img}
                      <Typography className='select-user-label'>
                        {item.role}
                      </Typography>
                    </center>
                  </Col>
              )
            })}
          </Row>
        </div>
        <div className='btn-wrapper flex justify-center gap-4 pt-24 pb-10'>
          <BackButton
            style={{ cursor: 'pointer' }}
            onClick={() => {
              props.setIsModalOpen(false)
            }}
          />
          <Button
            onClick={() => {
              navigate(`/${ROUTES_CONSTANTS.SIGNUP}?signupRole=${userTypeRole}`)
            }}
            className='select-user-continue'
          >
            Continue
          </Button>
        </div>
      </Modal>
    </div>
  )
}

export default SelectUserType
