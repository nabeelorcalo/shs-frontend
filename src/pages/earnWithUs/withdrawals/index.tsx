import { useState, useEffect } from "react"
import {Form,Input,Button,Select,Row,Col,Space,Typography} from 'antd'
import { 
  IconAngleDown, 
  IconBank, 
  IconEditAccount, 
  IconCheckSuccess, 
  IconWithdrawAgain 
} from '../../../assets/images'
import { PopUpModal } from "../../../components";
import "./style.scss";



const Withdrawals = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [isAccountList, setIsAccountList] = useState(false)
  const [modalAddAccountOpen, setModalAddAccountOpen] = useState(false)
  const [modalEditAccountOpen, setModalEditAccountOpen] = useState(false)
  const [modalWithdrawSuccessfulOpen, setModalWithdrawSuccessfulOpen] = useState(false)
  const [form] = Form.useForm();
  const [initValues,  setInitValues] = useState({
    "withdrawAccoutn": null,
    "withdrawAmount": "",
  })
  const [addAccountValues,  setAddAccountValues] = useState({
    "selectBank": null,
    "accountNumber": "",
    "accountName": "",
    "routingNumber": "",
    "sortCode": "",
    "accountType": null,
  })
  const [editAccountValues,  setEditAccountValues] = useState({
    "selectBank": "NatWest Group",
    "accountNumber": "31926819",
    "accountName": "Business: porter inc.",
    "routingNumber": "GB29 NWBK 6016 1331 9268 19 ",
    "sortCode": "31926819",
    "accountType": "checking",
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

  function openModalAddAccount() {
    setModalAddAccountOpen(true)
  }

  function closeModalAddAccount() {
    setModalAddAccountOpen(false)
  }

  function submitAddAccount(values: any) {
    console.log('Success:', values);
  }

  function openModalEditAccount() {
    setModalEditAccountOpen(true)
  }

  function closeModalEditAccount() {
    setModalEditAccountOpen(false)
  }

  function submitEditAccount(values: any) {
    console.log('Success:', values);
    closeModalEditAccount()
  }

  function openModalWithdrawSuccessful() {
    setModalWithdrawSuccessfulOpen(true)
  }

  function closeModalWithdrawSuccessful() {
    setModalWithdrawSuccessfulOpen(false)
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
            <Button className="button-tertiary" onClick={openModalAddAccount}>Add New</Button>
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
              <Row gutter={[{xs: 30, sm: 30, md:30, lg:115}, 0]}>
                <Col xs={24} sm={12}>
                  <Form.Item name="withdrawAccoutn" label="Withdraw Account">
                    <Select className="filled" placeholder="Withdraw Method" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="natwestGroup">Natwest Group</Select.Option>
                      <Select.Option value="HBL">HBL</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} sm={12}>
                  <Form.Item name="withdrawAmount" label="Amount">
                    <Input 
                      placeholder="Enter Amount"
                      className="filled"
                      type="number"
                      min={0}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
              {initValues.withdrawAccoutn !== null && initValues.withdrawAmount !== '' &&
              <div className="withdrawals-details">
                <div className="withdrawals-details-title">Withdraw Details</div>
                <div className="withdrawals-details-card">
                  <Row gutter={[{xs: 30, sm: 30,md: 30, lg:158}, 14]}>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Withdraw Amount</div>
                        <div className="item-label-value">1000 GBP</div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Withdraw Fee</div>
                        <div className="item-label-value">3 GBP</div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Account Name</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Account Number</div>
                        <div className="item-label-value">31926819</div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Sort Code</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Routing Number</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                    <Col xs={24} md={12}>
                      <div className="withdrawals-card-item">
                        <div className="item-label">Account Type</div>
                        <div className="item-label-value">Porter inc</div>
                      </div>
                    </Col>
                  </Row>

                  <div className="withdraw-now">
                    <Button className="button-tertiary" onClick={openModalWithdrawSuccessful}>WITHDRAW  NOW</Button>
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
              <li className="sm:items-baseline justify-between py-3.5 px-3 sm:px-5">
                <div className="flex sm:items-center sm:flex-row flex-col gap-4">
                  <div className="account-item-icon"><IconBank /></div>
                  <div className="account-item-content">
                    <div className="bank-name text-primary-color">Natwest Group</div>
                    <div className="account-title text-primary-color">Checking*******4512</div>
                  </div>
                </div>
                <div className="account-list-item-right">
                  <div className="account-edit-btn" onClick={openModalEditAccount}><IconEditAccount className="cursor-pointer" /></div>
                </div>
              </li>

              <li className="sm:items-baseline justify-between py-3.5 px-3 sm:px-5">
                <div className="flex sm:items-center sm:flex-row flex-col gap-4">
                  <div className="account-item-icon"><IconBank /></div>
                  <div className="account-item-content">
                    <div className="bank-name text-primary-color">UBLBANK, NATIONAL ASSOCIATION</div>
                    <div className="account-title text-primary-color">Saving*******5622</div>
                  </div>
                </div>
                <div className="account-list-item-right">
                  <div className="account-edit-btn" onClick={openModalEditAccount}><IconEditAccount className="cursor-pointer"/></div>
                </div>
              </li>

              <li className="sm:items-baseline justify-between py-3.5 px-3 sm:px-5">
                <div className="flex sm:items-center sm:flex-row flex-col gap-4">
                  <div className="account-item-icon"><IconBank /></div>
                  <div className="account-item-content">
                    <div className="bank-name text-primary-color">HBLBANK, NATIONAL ASSOCIATION</div>
                    <div className="account-title text-primary-color">Checking*******8633</div>
                  </div>
                </div>
                <div className="account-list-item-right">
                  <div className="account-edit-btn" onClick={openModalEditAccount}><IconEditAccount className="cursor-pointer"/></div>
                </div>
              </li>
            </ul>
          </div>
        }
      </div>

      {/* STARTS: MODAL WITHDRAW REQUEST SUCCESSFUL
      *************************************************************************/}
      <PopUpModal
        open={modalWithdrawSuccessfulOpen}
        close={closeModalWithdrawSuccessful}
        footer={null}
        width={1140}
        wrapClassName="modal-withdraw-successful"
      >
        <div className="withdraw-success-icon">
          <IconCheckSuccess />
        </div>
        <div className="withdraw-success-title">$1000 Withdraw Request Successful</div>
        <Typography.Paragraph>
          The Withdraw Request has been successfully sent
        </Typography.Paragraph>
        <Typography.Paragraph>
          Transaction ID: TRX2MGNVHSEZR
        </Typography.Paragraph>
        <Button className="button-tertiary" icon={<IconWithdrawAgain />} onClick={closeModalWithdrawSuccessful}>
          WITHDRAW REQUEST AGAIN
        </Button>
      </PopUpModal>
      {/* ENDS: MODAL WITHDRAW REQUEST SUCCESSFUL
      *************************************************************************/}

      {/* STARTS: MODAL ADD ACCOUNT
      *************************************************************************/}
      <PopUpModal
        open={modalAddAccountOpen}
        close={closeModalAddAccount}
        closable={false}
        footer={null}
        width={824}
        wrapClassName="modal-add-account"
      >
        <Form
          form={form}
          layout="vertical"
          name="addAccount"
          initialValues={addAccountValues}
          onValuesChange={(_, values) => {
            setAddAccountValues(prevState => ({...prevState, ...values}))
            console.log('init:: ', values)
          }}
          onFinish={submitAddAccount}
        >
          <Row gutter={40}>
            <Col xs={24} sm={12}>
              <Form.Item name="selectBank" label="Choose your Bank">
                <Select className="filled" placeholder="Select your bak" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="natwestGroup">Natwest Group</Select.Option>
                  <Select.Option value="HBL">HBL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountNumber" label="Account Number">
                <Input className="filled" placeholder="Enter account number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountName" label="Account Name">
                <Input className="filled" placeholder="Enter account name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="routingNumber" label="Routing Number">
                <Input className="filled" placeholder="Enter routing number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="sortCode" label="Sort Code">
                <Input className="filled" placeholder="Enter sort code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountType" label="Account Type">
                <Select className="filled" placeholder="Select account type" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="savings">Savings</Select.Option>
                  <Select.Option value="current">Current</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <div className="add-account-modal-footer">
            <Space size={20}>
              <Button className="btn-close-add-account-modal" onClick={closeModalAddAccount}>Cancel</Button>
              <Button htmlType="submit" className="button-tertiary">Link Account</Button>
            </Space>
          </div>
        </Form>
      </PopUpModal>
      {/* ENDS: MODAL ADD ACCOUNT
      *************************************************************************/}

      {/* STARTS: MODAL EDIT ACCOUNT
      *************************************************************************/}
      <PopUpModal
        open={modalEditAccountOpen}
        close={closeModalEditAccount}
        closable={false}
        footer={null}
        width={824}
        wrapClassName="modal-add-account"
      >
        <Form
          form={form}
          layout="vertical"
          name="editAccount"
          initialValues={editAccountValues}
          onValuesChange={(_, values) => {
            setEditAccountValues(prevState => ({...prevState, ...values}))
            console.log('init:: ', values)
          }}
          onFinish={submitEditAccount}
        >
          <Row gutter={40}>
            <Col xs={24} sm={12}>
              <Form.Item name="selectBank" label="Choose your Bank">
                <Select className="filled" placeholder="Select your bak" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="natwestGroup">Natwest Group</Select.Option>
                  <Select.Option value="HBL">HBL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountNumber" label="Account Number">
                <Input className="filled" placeholder="Enter account number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountName" label="Account Name">
                <Input className="filled" placeholder="Enter account name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="routingNumber" label="Routing Number">
                <Input className="filled" placeholder="Enter routing number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="sortCode" label="Sort Code">
                <Input className="filled" placeholder="Enter sort code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountType" label="Account Type">
                <Select className="filled" placeholder="Select account type" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="checking">Checking</Select.Option>
                  <Select.Option value="current">Current</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <div className="add-account-modal-footer">
            <Space size={20}>
              <Button className="btn-close-add-account-modal" onClick={closeModalEditAccount}>Cancel</Button>
              <Button htmlType="submit" className="button-tertiary">Update</Button>
            </Space>
          </div>
        </Form>
      </PopUpModal>
      {/* ENDS: MODAL EDIT ACCOUNT
      *************************************************************************/}
    </>
  )
}

export default Withdrawals