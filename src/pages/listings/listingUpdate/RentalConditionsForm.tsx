import {FC, useState, useCallback} from 'react';
import useListingsHook from "../actionHandler";
import showNotification from '../../../helpers/showNotification';
import { Loader } from '../../../components';
import { 
  Button,
  Form,
  Row,
  Col,
  Radio,
  Spin,
  Typography
} from 'antd'
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const RentalConditionsForm: FC<Props> = ({initValues, listingId, spin}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const { updateListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true)
  
  
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
        <Typography.Title level={4}>Rental Conditions</Typography.Title>
      </div>
      <div className="tabs-pane-card-body rental-condition-body">
        <Spin spinning={spin} indicator={<Loader />}>
          {initValues?.length !== 0 &&
            <Form
              form={form}
              requiredMark={false}
              layout="vertical"
              name="updateRentalConditions"
              initialValues={initValues}
              onValuesChange={(_, values) => {
                setDisabled(false)
              }}
              onFinish={submitUpdateListing}
            >
              <Row gutter={30}>
                <Col xs={24}>
                  <Form.Item name="contractType" label="Contract type" rules={[{ required: true }]}>
                    <Radio.Group>
                      <Row gutter={[30,20]}>
                        <Col xs={24} md={24}lg={24} xl={8} xxl={8}>
                          <Radio value="Daily">
                            <div className="radio-card-content">
                              <div className="radio-card-label">Daily</div>
                              <div className="radio-card-content-text">In case a tenant moves in or moves out in the middle of the month, they will be charged for each day they stayed during that month. For example: if the tenant moves in on the 28th August, they will pay for four days of rent in August.</div>
                            </div>
                          </Radio>
                        </Col>
                        <Col xs={24} md={24}lg={24} xl={8} xxl={8}>
                          <Radio value="Fortnightly">
                            <div className="radio-card-content">
                              <div className="radio-card-label">Weekly</div>
                              <div className="radio-card-content-text">The tenant will pay half of the month's rent if they stay less than two weeks in the month of move in/move out. For example: if the tenant moves in on the 28th of August, they will pay half of the rent for August.</div>
                            </div>
                          </Radio>
                        </Col>
                        <Col xs={24} md={24}lg={24} xl={8} xxl={8}>
                          <Radio value="Monthly">
                            <div className="radio-card-content">
                              <div className="radio-card-label">Monthly</div>
                              <div className="radio-card-content-text">The tenant will always pay the entire month's rent, regardless of the move-in/move-out date. For example: if the tenant moves in on the 28th August, they will pay for the full month of August.</div>
                            </div>
                          </Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
                  </Form.Item>
                </Col>
                <Col xs={24}>
                  <Form.Item name="cancellationPolicy" label="Cancellation policy" rules={[{ required: true }]}>
                    <Radio.Group>
                      <Row gutter={[30,20]}>
                        <Col xs={24} lg={24} md={24} xl={12} xxl={12}>
                          <Radio value="Standard Cancellation">
                            <div className="radio-card-content">
                              <div className="radio-card-label">Standard Cancellation</div>
                              <div className="radio-card-content-text">
                                <div>if tenant cancels a booking:</div>
                                <div>- Within 24 hours of confirmation - Full refund of the first month's rent</div>
                                <div>- After 24 hours of confirmation - No refund</div>
                              </div>
                            </div>
                          </Radio>
                        </Col>
                        <Col xs={24} lg={24} md={24} xl={12} xxl={12}>
                          <Radio value="Flexible Cancellation">
                            <div className="radio-card-content">
                              <div className="radio-card-label">Flexible cancellation</div>
                              <div className="radio-card-content-text">
                                <div>If tenant cancels a booking within 24 hours of confirmation</div>
                                <div>- Full refund of the first month's rent.</div>
                                <div>If the tenant cancels a booking when move-in date is:</div>
                                <div>- More than 30 days away - Fill refund of first month's rent</div>
                                <div>- 30 to 7 days away - 50% refund of first month's rent</div>
                              </div>
                            </div>
                          </Radio>
                        </Col>
                      </Row>
                    </Radio.Group>
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

export default RentalConditionsForm