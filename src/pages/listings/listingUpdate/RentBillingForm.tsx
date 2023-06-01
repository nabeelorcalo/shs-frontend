import {FC, useState, useCallback} from 'react';
import useListingsHook from "../actionHandler";
import showNotification from '../../../helpers/showNotification';
import {IconAngleDown} from '../../../assets/images';
import { Loader } from '../../../components';
import { 
  Button,
  Form,
  Row,
  Col,
  Radio,
  Select,
  InputNumber,
  Switch,
  Spin,
  Typography
} from 'antd'
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const RentBillingForm: FC<Props> = ({initValues, listingId, spin}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const { updateListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  
  

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSubmission = useCallback(
    (result:any) => {
      if (result.error) {
        showNotification("error", `Error: ${result.error.statusText}`, result.error.data.message);
      } else {
        showNotification("success", "Success", result.response?.message);
      }
    },
    [form]
  );

  const submitUpdateListing = useCallback(async () => {
    var values;
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      return;
    }
    setLoading(true);
    const result = await updateListing(listingId, values);
    setDisabled(true)
    setLoading(false);
    handleSubmission(result);
  }, [form, handleSubmission]);
  



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="tabs-pane-card">
      <div className="tabs-pane-card-title">
        <Typography.Title level={4}>Rent & Billing</Typography.Title>
      </div>
      <div className="tabs-pane-card-body">
        <Spin spinning={spin} indicator={<Loader />}>
          {initValues?.length !== 0 &&
            <Form
              form={form}
              requiredMark={false}
              layout="vertical"
              name="updateRentBilling"
              initialValues={initValues}
              onValuesChange={(_, values) => {
                setDisabled(false)
                console.log('Rent & Billing : all values::: ', values)
              }}
              onFinish={submitUpdateListing}
            >
              <Row gutter={30}>
                <Col xs={24}>
                  <Form.Item name="rentFrequency" label="Rent Frequency" rules={[{ required: true }]}>
                    <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="day">Day</Select.Option>
                      <Select.Option value="week">Week</Select.Option>
                      <Select.Option value="month">Month</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="rent" label="Rent" rules={[{ required: true }]}>
                    <InputNumber
                      placeholder="Placeholder"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true }]}>
                    <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="Credit/Debit Card">Credit/Debit card</Select.Option>
                      <Select.Option value="Cash">Cash</Select.Option>
                      <Select.Option value="Cheque">Cheque</Select.Option>
                      <Select.Option value="IBFT">IBFT</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="hasSecurityDeposit" label="Is there security deposit?">
                    <Radio.Group>
                      <Row gutter={[30,20]}>
                        <Col xs={24} md={24} xl={12}>
                          <Radio value={true}>Yes</Radio>
                        </Col>
                        <Col xs={24} md={24} xl={12}>
                          <Radio value={false}>No</Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="depositType" label="Which kind of deposit?">
                    <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="Half month">Half month</Select.Option>
                      <Select.Option value="Full month">Full month</Select.Option>
                      <Select.Option value="Fixed">Fixed</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item
                    name="depositAmount"
                    label="Enter fixed amount"
                    rules={[{ required: true }]}
                  >
                    <InputNumber
                      min={0}
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="minimumStay" label="Minimum Stay" rules={[{ required: true }]}>
                    <InputNumber
                      placeholder="Placeholder"
                      onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item valuePropName="checked" name="allBillsIncluded" label="All bills are included" className="custom-input-switch">
                    <Switch size="small" />
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="electricityBillPayment" label="Ho do you want to charge electricity bill?">
                    <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="Included">Included</Select.Option>
                      <Select.Option value="Included (Up to a limit)">Included(up to a limit)</Select.Option>
                      <Select.Option value="Pay landlord (fixed amount)">Pay landlord(fixed amount)</Select.Option>
                      <Select.Option value="Pay landlord (for amount used)">Pay landlord(for amount used)</Select.Option>
                      <Select.Option value="Pay provider (for amount used)">Pay provider(for amount used)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="waterBillPayment" label="Ho do you want to charge water bill?">
                    <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="Included">Included</Select.Option>
                      <Select.Option value="Included (Up to a limit)">Included(up to a limit)</Select.Option>
                      <Select.Option value="Pay landlord (fixed amount)">Pay landlord(fixed amount)</Select.Option>
                      <Select.Option value="Pay landlord (for amount used)">Pay landlord(for amount used)</Select.Option>
                      <Select.Option value="Pay provider (for amount used)">Pay provider(for amount used)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="gasBillPayment" label="Ho do you want to charge gas bill?">
                    <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                      <Select.Option value="Included">Included</Select.Option>
                      <Select.Option value="Included (Up to a limit">Included(up to a limit)</Select.Option>
                      <Select.Option value="Pay landlord (fixed amount)">Pay landlord(fixed amount)</Select.Option>
                      <Select.Option value="Pay landlord (for amount used)">Pay landlord(for amount used)</Select.Option>
                      <Select.Option value="Pay provider (for amount used)">Pay provider(for amount used)</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item className="form-btn-right">
                    <Button disabled={disabled} loading={loading} htmlType="submit" className="button-tertiary">Update</Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          }
        </Spin>
      </div>
    </div>
  )
}

export default RentBillingForm