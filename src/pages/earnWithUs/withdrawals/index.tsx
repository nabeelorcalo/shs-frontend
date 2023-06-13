import { useState, useEffect } from "react"
import {Form,Input,Button,Select,Row,Col,Space,Typography, InputNumber, Empty, Spin} from 'antd'
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Loader, Notifications, PopUpModal } from "../../../components";
import "./style.scss";
import { 
  IconAngleDown, 
  IconBank, 
  IconEditAccount, 
  IconCheckSuccess, 
  IconWithdrawAgain
} from '../../../assets/images'
import useEarnWithUsHook from '../actionHandler';
import { useRecoilValue } from "recoil";
import { earnWithUsTabsState } from "../../../store";



const Withdrawals = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {
    getCurrentBalance,
    currentBalance,
    getBanksList,
    banksList,
    linkAccount,
    updateBankAccount,
    createWithdrawal
  } = useEarnWithUsHook();
  const tabKey = useRecoilValue(earnWithUsTabsState);
  const [formEditAccount] = Form.useForm();
  const [formAddAccount] = Form.useForm();
  const [formWithDrawals] = Form.useForm();
  const [isAccountList, setIsAccountList] = useState(false);
  const [modalAddAccountOpen, setModalAddAccountOpen] = useState(false);
  const [modalEditAccountOpen, setModalEditAccountOpen] = useState(false);
  const [modalWithdrawSuccessfulOpen, setModalWithdrawSuccessfulOpen] = useState(false);
  const [isWithdrawDetail, setIsWithdrawDetail] = useState(false);
  const [loadingAddAccount, setLoadingAddAccount] = useState(false);
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [bankId, setBankId] = useState("");
  const [withdrawalAccountDetail, setWithdrawalAccountDetail]:any = useState({})
  const [withdrawalAmount, setWithdrawalAmount] = useState(0);
  const [transactionId, setTransactionId] = useState('')
  const [loadingWithdrawal, setLoadingWithdrawal] = useState(false);



  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if(tabKey === 'earnWithUsWithdrawals') {
      formWithDrawals.resetFields();
      setIsWithdrawDetail(false);
      setIsAccountList(false)
      getCurrentBalance();
      getBanksList(setLoadingBanks);
    }
  }, [tabKey])

  useEffect(() => {
    if(!modalWithdrawSuccessfulOpen) {
      formWithDrawals.resetFields();
      setIsWithdrawDetail(false);
      setIsAccountList(false)
      getCurrentBalance();
      getBanksList(setLoadingBanks);
    }
  }, [modalWithdrawSuccessfulOpen])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const submitAddAccount = async (values: any) => {
    setLoadingAddAccount(true);
    const response:any = await linkAccount(values);
    setLoadingAddAccount(false);
    closeModalAddAccount();
    Notifications({ title: "Success", description: response.message, type: "success" });
  }

  const submitUpdateAccount = async (values: any) => {
    setLoadingAddAccount(true);
    const response:any = updateBankAccount({ accName: values?.accName, accType: values?.accType }, bankId)
    if (response.error) {
      setLoadingAddAccount(false);
      closeModalEditAccount()
      return Notifications({title: "Error", description: response.message || response.error, type: "error",});
    }

    setLoadingAddAccount(false);
    closeModalEditAccount();
    Notifications({ title: "Success", description: response.message, type: "success" });
    getBanksList(setLoadingBanks);
  }

  const  submitWithdrawals = async (values: any) => {
    setLoadingWithdrawal(true)
    const requsetBody = {
      bankId: withdrawalAccountDetail?.id,
      bankName: withdrawalAccountDetail?.metadata?.bank_name,
      amount: values?.amount,
    }
    const response = await createWithdrawal(requsetBody);
    if(!response.error) {
      setTransactionId(response?.data?.transactionId)
      openModalWithdrawSuccessful()
    }
  }


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function handleChangeWithDrawals(changedField:any, values:any) {
    if(values.bankName != null && values.amount != null) {
      setIsWithdrawDetail(true)
    } else {
      setIsWithdrawDetail(false)
    }
    if(values.bankName != null) {
      const selectedBank:any = banksList?.find((item:any) => item.id === values.bankName)
      setWithdrawalAccountDetail(selectedBank)
      setBankId(values.bankName)
    }
    if(values.amount != null) {
      setWithdrawalAmount(values.amount)
    }
  }


  function openModalAddAccount() {
    setModalAddAccountOpen(true)
  }

  function closeModalAddAccount() {
    formAddAccount.resetFields();
    setModalAddAccountOpen(false)
  }

  function openModalEditAccount(bank:any) {
    setBankId(bank?.id)
    formEditAccount.setFields([
      { name: "bankName", value: bank?.metadata?.bank_name },
      { name: "accNumber", value: `*******${bank?.last4}` },
      { name: "accName", value: bank?.account_holder_name },
      { name: "routingNumber", value: bank?.routing_number },
      { name: "sortCode", value: "test" },
      { name: "accType", value: bank?.account_holder_type },
    ]);
    setModalEditAccountOpen(true)
  }

  function closeModalEditAccount() {
    formEditAccount.resetFields();
    setModalEditAccountOpen(false)
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
    <Spin spinning={loadingBanks} indicator={<Loader />}>
      <div className="earnwith-withdrawals">
        <div className="withdrawals-header">
          <div className="withdrawals-title">
          {isAccountList &&
            <Button size={"small"} type="text" icon={<ArrowLeftOutlined />} onClick={() => setIsAccountList(false)}>Back</Button> 
          }
            Current Balance: $ {currentBalance}
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
            {currentBalance > 0 ? (
              <Form
                requiredMark={false}
                form={formWithDrawals}
                layout="vertical"
                name="updateListing"
                onValuesChange={handleChangeWithDrawals}
                onFinish={submitWithdrawals}
              >
                <Row gutter={[{xs: 30, sm: 30, md:30, lg:115}, 0]}>
                  <Col xs={24} sm={12}>
                    <Form.Item name="bankName" label="Withdraw Account" rules={[{ required: true }]}>
                      <Select className="filled" placeholder="Withdraw Method" suffixIcon={<IconAngleDown />}>
                        {banksList?.map((bank:any) => {
                          return (
                            <Select.Option key={bank?.id} value={bank?.id}>{bank?.metadata?.bank_name}</Select.Option>
                          )
                        })}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item name="amount" label="Amount" rules={[{ required: true }]}>
                      <InputNumber 
                        placeholder="Enter Amount"
                        className="filled"
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
                {isWithdrawDetail &&
                  <div className="withdrawals-details">
                    <div className="withdrawals-details-title">Withdraw Details</div>
                    <div className="withdrawals-details-card">
                      <Row gutter={[{xs: 30, sm: 30,md: 30, lg:158}, 14]}>
                        <Col xs={24} md={12}>
                          <div className="withdrawals-card-item">
                            <div className="item-label">Withdraw Amount</div>
                            <div className="item-label-value">{withdrawalAmount} GBP</div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="withdrawals-card-item">
                            <div className="item-label">Withdraw Fee</div>
                            <div className="item-label-value">{(withdrawalAmount / 5)} GBP</div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="withdrawals-card-item">
                            <div className="item-label">Account Name</div>
                            <div className="item-label-value">{withdrawalAccountDetail?.account_holder_name}</div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="withdrawals-card-item">
                            <div className="item-label">Account Number</div>
                            <div className="item-label-value">********{withdrawalAccountDetail?.last4}</div>
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
                            <div className="item-label-value">{withdrawalAccountDetail?.routing_number}</div>
                          </div>
                        </Col>
                        <Col xs={24} md={12}>
                          <div className="withdrawals-card-item">
                            <div className="item-label">Account Type</div>
                            <div className="item-label-value">{withdrawalAccountDetail?.account_holder_type}</div>
                          </div>
                        </Col>
                      </Row>

                      <div className="withdraw-now">
                        <Button htmlType="submit" className="button-tertiary" loading={loadingWithdrawal}>WITHDRAW  NOW</Button>
                      </div>
                    </div>
                  </div>
                }
              </Form>
            ): (
              <div className="no-data-found">
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description="No balance found" 
                />
              </div>
            )}
             
          </div>
        }
        {isAccountList &&
          <div className="account-list-card">
            <div className="account-list-header">
              <div className="account-list-header-title">Banks</div>
            </div>
            {banksList.length === 0 ? (
              <div className="no-data-found">
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
              </div>
            ): (
              <ul className="account-list">
                {banksList?.map((bank:any) => (
                  <li key={bank?.id} className="sm:items-baseline justify-between py-3.5 px-3 sm:px-5">
                    <div className="flex sm:items-center sm:flex-row flex-col gap-4">
                      <div className="account-item-icon"><IconBank /></div>
                      <div className="account-item-content">
                        <div className="bank-name text-primary-color">{bank?.metadata?.bank_name}</div>
                        <div className="account-title text-primary-color">{bank?.account_holder_type}*******{bank.last4}</div>
                      </div>
                    </div>
                    <div className="account-list-item-right">
                      <div className="account-edit-btn" onClick={() => openModalEditAccount(bank)}><IconEditAccount className="cursor-pointer" /></div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            
          </div>
        }
      </div>
    </Spin>
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
        <div className="withdraw-success-title">${withdrawalAmount} Withdraw Request Successful</div>
        <Typography.Paragraph>
          The Withdraw Request has been successfully sent
        </Typography.Paragraph>
        <Typography.Paragraph>
          Transaction ID: {transactionId}
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
          requiredMark={false}
          form={formAddAccount}
          layout="vertical"
          name="addAccount"
          onFinish={submitAddAccount}
        >
          <Row gutter={40}>
            <Col xs={24} sm={12}>
              <Form.Item name="bankName" label="Choose your Bank" rules={[{ required: true }]}>
                <Select className="filled" placeholder="Select your bank" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="Natwest Group">Natwest Group</Select.Option>
                  <Select.Option value="HBL">HBL</Select.Option>
                  <Select.Option value="SCB">SCB</Select.Option>
                  <Select.Option value="UBL">UBL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accNumber" label="Account Number" rules={[{ required: true }]}>
                <Input className="filled" placeholder="Enter account number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accName" label="Account Name" rules={[{ required: true }]}>
                <Input className="filled" placeholder="Enter account name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="routingNumber" label="Routing Number" rules={[{ required: true, pattern: /^\d{9}$/, message: "Routing number must have 9 digits"}]}>
                <Input className="filled" placeholder="Enter routing number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="sortCode" label="Sort Code" rules={[{ required: true }]}>
                <Input className="filled" placeholder="Enter sort code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accType" label="Account Type" rules={[{ required: true }]}>
                <Select className="filled" placeholder="Select account type" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="individual">Individual</Select.Option>
                  <Select.Option value="company">Company</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <div className="add-account-modal-footer">
            <Space size={20}>
              <Button className="btn-close-add-account-modal" disabled={loadingAddAccount} onClick={closeModalAddAccount}>Cancel</Button>
              <Button htmlType="submit" className="button-tertiary" loading={loadingAddAccount}>Link Account</Button>
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
          requiredMark={false}
          form={formEditAccount}
          layout="vertical"
          name="editAccount"
          onFinish={submitUpdateAccount}
        >
          <Row gutter={40}>
            <Col xs={24} sm={12}>
              <Form.Item name="selectBank" label="Choose your Bank">
                <Select disabled className="filled" placeholder="Select your bak" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="Natwest Group">Natwest Group</Select.Option>
                  <Select.Option value="HBL">HBL</Select.Option>
                  <Select.Option value="SCB">SCB</Select.Option>
                  <Select.Option value="UBL">UBL</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountNumber" label="Account Number">
                <Input disabled className="filled" placeholder="Enter account number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountName" label="Account Name">
                <Input className="filled" placeholder="Enter account name" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="routingNumber" label="Routing Number">
                <Input disabled className="filled" placeholder="Enter routing number" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="sortCode" label="Sort Code">
                <Input disabled className="filled" placeholder="Enter sort code" />
              </Form.Item>
            </Col>
            <Col xs={24} sm={12}>
              <Form.Item name="accountType" label="Account Type">
                <Select className="filled" placeholder="Select account type" suffixIcon={<IconAngleDown />} >
                  <Select.Option value="individual">Individual</Select.Option>
                  <Select.Option value="company">Company</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          
          <div className="add-account-modal-footer">
            <Space size={20}>
              <Button className="btn-close-add-account-modal" disabled={loadingAddAccount} onClick={closeModalEditAccount}>Cancel</Button>
              <Button htmlType="submit" className="button-tertiary" loading={loadingAddAccount}>Update</Button>
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