import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import type { ColumnsType } from 'antd/es/table'
import { Table, Typography, Row, Col, Form, Input, Button } from 'antd'
import {
  IconWalletMoney,
  IconInactiveMemberBal,
  IconTotalMember,
  IconActiveMember,
  IconInactiveMember,
  IconShare,
  FacebookCircle,
  TwitterCircle,
  WhatsAppCircle,
  IconDocumentCopy,
  Logo
} from '../../../assets/images'
import { RegisterMemberAndFeddbackGraph, PopUpModal } from "../../../components";
import "./style.scss";

interface DataType {
  key: React.Key;
  name: string;
  delegateAmount: string;
  member: string;
  status: string;
}


// Temporary Data
const tableData = [
  {
    key: '1',
    name: 'Ana Black',
    delegateAmount: '£15',
    member: 'University',
    status: 'active'
  },
  {
    key: '2',
    name: 'James',
    delegateAmount: '£3',
    member: 'Student',
    status: 'inactive'
  },
  {
    key: '3',
    name: 'Elijah',
    delegateAmount: '£5',
    member: 'Intern',
    status: 'active'
  },
  {
    key: '4',
    name: 'Ana Black',
    delegateAmount: '£15',
    member: 'University',
    status: 'active'
  },
  {
    key: '5',
    name: 'James',
    delegateAmount: '£3',
    member: 'Student',
    status: 'inactive'
  },
];



const Dashboard = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const [modalShareLinkOpen, setModalShareLinkOpen] = useState(false)
  const [modalInvitaionOpen, setModalInvitaionOpen] = useState(false)
  const [initValues,  setInitValues] = useState({
    "delegateLink": "htttp://delegate_and_earn08765808.com",
    "email": "",
  })
  const tableColumns: ColumnsType<DataType> = [
  {
    title: 'No',
    dataIndex: 'no.',
    align: 'center',
    render: (_, row, index) => {
      return (
        <>{index < 9?0 : null}{index + 1}</>
      );
    },
  },
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Delegate Amount',
    dataIndex: 'delegateAmount',
  },
  {
    title: 'Member',
    dataIndex: 'member',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    align: 'center',
    render: (_, row, index) => {
      return (
        <div className={`shs-status-badge ${row.status === 'inactive'? 'error' : 'success'}`}>
          {row.status === 'inactive'? 'Inactive': 'Active'}
        </div>
      );
    },
  },
];



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function openModalShareLink() {
    setModalShareLinkOpen(true)
  }

  function closeModalShareLink() {
    setModalShareLinkOpen(false)
  }

  function openModalInvitaion() {
    setModalInvitaionOpen(true)
  }

  function closeModalInvitaion() {
    setModalInvitaionOpen(false)
  }

  function submitShareLink(values: any) {
    console.log('Success:', values);
    closeModalShareLink()
    openModalInvitaion()
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="earn-with-us-dashboard">
        <div className="earnwith-topcards">
          <Row gutter={30}>
            <Col xs={24} sm={24} md={12}>
              <div className="top-card">
                <Row gutter={15}>
                  <Col xs={12}>
                    <div className="top-card-inner">
                      <div className="top-card-icon balance">
                        <IconWalletMoney />
                      </div>
                      <div className="top-card-body">
                        <div className="top-card-title">Current Balance</div>
                        <div className="top-card-value">£ 6371.3</div>
                      </div>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <div className="top-card-inner with-divider">
                      <div className="top-card-icon inactive">
                        <IconInactiveMemberBal />
                      </div>
                      <div className="top-card-body">
                        <div className="top-card-title">Inactive Members Balance</div>
                        <div className="top-card-value">£ 562</div>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col xs={24} sm={24} md={12}>
                <div className="card-share-wrapper">
                  <div className="card-share" onClick={openModalShareLink}>
                    <div>Share <IconShare /></div>
                  </div>
                  <div className="top-card card-user-welcome">
                    <Row gutter={15}>
                      <Col xs={12}>
                        <div className="top-card-inner">
                          <div className="user-welcome-text">Welcome Back, <span>Stephen!</span></div>
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div className="top-card-inner ref-number">
                          <div className="user-reference-no">Reference Number: <span>DF41331056</span></div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
            </Col>
          </Row>
        </div>

        <div className="members-cards">
          <Row gutter={30}>
            <Col md={24} lg={8}>
              <div className="member-card">
                <div className="member-card-icon">
                  <IconTotalMember />
                </div>
                <div className="member-card-body">
                  <div className="member-card-title">Total Members</div>
                  <div className="member-card-value">10</div>
                </div>
              </div>
            </Col>
            <Col md={24} lg={8}>
              <div className="member-card">
                <div className="member-card-icon">
                  <IconActiveMember />
                </div>
                <div className="member-card-body">
                  <div className="member-card-title">Active Members</div>
                  <div className="member-card-value">11</div>
                </div>
              </div>
            </Col>
            <Col md={24} lg={8}>
              <div className="member-card">
                <div className="member-card-icon">
                  <IconInactiveMember />
                </div>
                <div className="member-card-body">
                  <div className="member-card-title">Inactive Members</div>
                  <div className="member-card-value">01</div>
                </div>
              </div>
            </Col>
          </Row>
        </div>

        <div className="earnwith-bottom-content">
          <Row gutter={[30, 30]}>
            <Col md={24} lg={12}>
              <div className="registered-members">
                <Typography.Title level={4}>Registered Members</Typography.Title>
                <RegisterMemberAndFeddbackGraph  graphName='registerMember' />
              </div>
              
            </Col>
            <Col md={24} lg={12}>
              <div className="shs-table-card table-members-detail">
                <Typography.Title level={4}>Members Details</Typography.Title>
                <div className="shs-table">
                  <Table
                    scroll={{ x: "max-content" }}
                    columns={tableColumns}
                    dataSource={tableData}
                    pagination={false}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>

        
      </div>

      {/* STARTS: MODAL SHARE LINK
      *************************************************************************/}
      <PopUpModal
        open={modalShareLinkOpen}
        close={closeModalShareLink}
        footer={null}
        width={560}
        wrapClassName="modal-share-link"
      >
        <div className="modal-share-link-title">Share Link</div>
          <Form
            form={form}
            layout="vertical"
            name="updateListing"
            initialValues={initValues}
            onValuesChange={(_, values) => {
              setInitValues(prevState => ({...prevState, ...values}))
              console.log('init:: ', values)
            }}
            onFinish={submitShareLink}
          >
            <Form.Item name="delegateLink" label="Delegate Link">
              <Input placeholder="Placeholder" suffix={<IconDocumentCopy />} />
            </Form.Item>
            <div className="invite-email">
              <div className="invite-email-field">
                <Form.Item name="email" label="Email">
                  <Input placeholder="Placeholder" />
                </Form.Item>
              </div>
              <div className="invite-email-submit">
                <Form.Item>
                  <Button htmlType="submit" className="button-tertiary" block>Invite</Button>
                </Form.Item>
              </div>
            </div>
          </Form>
          <div className="share-links-cont">
            <div className="share-link-label">Share this link via:</div>
            <div className="share-links">
              <Link className="share-link-item" to={''}><FacebookCircle /></Link>
              <Link className="share-link-item" to={''}><TwitterCircle /></Link>
              <Link className="share-link-item" to={''}><WhatsAppCircle /></Link>
            </div>
          </div>
      </PopUpModal>
      {/* ENDS: MODAL SHARE LINK
      *************************************************************************/}

      {/* STARTS: MODAL INVITATION SENT
      *************************************************************************/}
      <PopUpModal
        open={modalInvitaionOpen}
        close={closeModalInvitaion}
        footer={null}
        width={560}
        wrapClassName="modal-invitation"
      >
        <div className="invitation-content">
          <div className="invitation-content-header">
            <Logo />
          </div>
          <div className="invitation-body">
            <div className="invitaion-title">Invitation Sent!</div>
            <div className="invitation-text-light">
              We have sent an invitation to “johndoemail.com” to join Student Help Squad. 
            </div>
            <div className="invitation-text-dark">
              If an email is not received, contact our support team. 
            </div>
          </div>
        </div>
      </PopUpModal>
      {/* ENDS: MODAL INVITATION SENT
      *************************************************************************/}
    </>
  )
}

export default Dashboard