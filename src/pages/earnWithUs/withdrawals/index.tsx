import React, { useState, useEffect } from "react"
import { Form, Input, Button, Select, Row, Col } from 'antd'
import { IconAngleDown, IconBank, IconEditAccount } from '../../../assets/images'
import { SearchBar } from "../../../components";
import "./style.scss";





const Withdrawals = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [isAccountList, setIsAccountList] = useState(false)
  const [form] = Form.useForm();
  const [initValues,  setInitValues] = useState({
    "withdrawAccoutn": null,
    "withdrawAmount": "",
  })


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function submitWithdrawals(values: any) {
    console.log('Success:', values);
  }



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="earnwith-withdrawals">
        <div className="withdrawals-header">
          <div className="withdrawals-title">
            Current Balance: {"$ 2000.00"}
          </div>
          <div className="withdrawals-header-actions">
          {!isAccountList &&
            <Button className="button-tertiary" onClick={() => setIsAccountList(true)}>Link a bank Account</Button>
          }
          {isAccountList &&
            <Button className="button-tertiary">Add New</Button>
          }
            
          </div>
        </div>

        {!isAccountList &&
          <div className="withdrawals-body">
            <Form
              form={form}
              layout="vertical"
              name="updateListing"
              initialValues={initValues}
              onValuesChange={(_, values) => {
                setInitValues(prevState => ({...prevState, ...values}))
                console.log('init:: ', values)
              }}
              onFinish={submitWithdrawals}
            >
              <Row gutter={115}>
                <Col sm={12}>
                  <Form.Item name="withdrawAccoutn" label="Withdraw Account">
                    <Select className="filled" placeholder="Withdraw Method" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="natwestGroup">Natwest Group</Select.Option>
                      <Select.Option value="HBL">HBL</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col sm={12}>
                  <Form.Item name="withdrawAmount" label="Amount">
                    <Input placeholder="Enter Amount" className="filled" />
                  </Form.Item>
                </Col>
              </Row>
              {initValues.withdrawAccoutn !== null && initValues.withdrawAmount !== '' &&
              <div className="withdrawals-details">
                <div className="withdrawals-details-title">Withdraw Details</div>
                <div className="withdrawals-details-card">
                  <Row gutter={[158, 14]}>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Withdraw Amount</div>
                        <div className="item-label-value">1000 GBP</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Withdraw Fee</div>
                        <div className="item-label-value">3 GBP</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Account Name</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Account Number</div>
                        <div className="item-label-value">31926819</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Sort Code</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Routing Number</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                    <Col sm={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Account Type</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                  </Row>

                  <div className="withdraw-now">
                    <Button className="button-tertiary">WITHDRAW  NOW</Button>
                  </div>
                </div>
              </div>
              }
            </Form> 
          </div>
        }
        {isAccountList &&
          <div className="account-list-card">
            <div className="account-list-header">
              <div className="account-list-header-title">Banks</div>
            </div>
            <ul className="account-list">
              <li>
                <div className="account-list-item-left">
                  <div className="account-item-icon"><IconBank /></div>
                  <div className="account-item-content">
                    <div className="bank-name">Natwest Group</div>
                    <div className="account-title">Checking*******4512</div>
                  </div>
                </div>
                <div className="account-list-item-right">
                  <div className="account-edit-btn"><IconEditAccount /></div>
                </div>
              </li>

              <li>
                <div className="account-list-item-left">
                  <div className="account-item-icon"><IconBank /></div>
                  <div className="account-item-content">
                    <div className="bank-name">UBLBANK, NATIONAL ASSOCIATION</div>
                    <div className="account-title">Saving*******5622</div>
                  </div>
                </div>
                <div className="account-list-item-right">
                  <div className="account-edit-btn"><IconEditAccount /></div>
                </div>
              </li>

              <li>
                <div className="account-list-item-left">
                  <div className="account-item-icon"><IconBank /></div>
                  <div className="account-item-content">
                    <div className="bank-name">HBLBANK, NATIONAL ASSOCIATION</div>
                    <div className="account-title">Checking*******8633</div>
                  </div>
                </div>
                <div className="account-list-item-right">
                  <div className="account-edit-btn"><IconEditAccount /></div>
                </div>
              </li>
            </ul>
          </div>
        }
      </div>
    </>
  )
}

export default Withdrawals