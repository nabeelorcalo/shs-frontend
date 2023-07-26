import {FC, useState, useCallback, useEffect} from 'react';
import useListingsHook from "../actionHandler";
import { IconAngleDown } from '../../../assets/images'
import { LoadingOutlined } from "@ant-design/icons";
import {useNavigate} from 'react-router-dom';
import { 
  Button,
  Form,
  Row,
  Col,
  Radio,
  Select,
  Checkbox,
  InputNumber,
  Spin,
  Typography,
  Space
} from 'antd';
import { Notifications } from '../../../components';
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const PropertyForm: FC<Props> = ({initValues, listingId, spin}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const { updateListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [entireProperty, setEntireProperty] = useState(initValues?.propertyType === 'Entire Property'? true: false);
  const navigate = useNavigate();
  
  

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    form.setFieldsValue(initValues)
  }, [form, initValues])


  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSubmission = useCallback(
    (result:any) => {
      if (result.error) {
        Notifications({title: `Error: ${result.error.statusText}`, description: result.error.data.message, type: 'error'});
      } else {
        Notifications({title: "Success", description: result.response?.message, type: 'success'});
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
        <Typography.Title level={4}>Property Details</Typography.Title>
      </div>
      <div className="tabs-pane-card-body">
        <Spin spinning={spin} indicator={<LoadingOutlined />}>
          <Form
            form={form}
            initialValues={initValues}
            requiredMark={false}
            layout="vertical"
            name="updatePropertyDetails"
            onValuesChange={(value, values) => {
              setDisabled(false)
              values?.propertyType === 'Entire Property' ? setEntireProperty(true) : setEntireProperty(false)
            }}
            onFinish={submitUpdateListing}
          >
            <Row gutter={30}>
              <Col xs={24}>
                <Form.Item name="propertyType" label="How will you rent your property?" rules={[{ required: true }]}>
                  <Radio.Group>
                    <Row gutter={[30, 30]}>
                      <Col xs={24}>
                        <Radio value="Entire Property">Entire Property</Radio>
                      </Col>
                      <Col xs={24}>
                        <Radio value="Studio">Studio</Radio>
                      </Col>
                      <Col xs={24}>
                        <Radio value="Rooms In Shared Property">Rooms in shared property</Radio>
                      </Col>
                    </Row>
                  </Radio.Group>
                </Form.Item>
              </Col>
              {entireProperty &&
              <Col xs={24}>
                <Row gutter={[30,20]}>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Form.Item name="totalBedrooms" label="Bedrooms in total" rules={[{ required: form.getFieldValue('propertyType') === 'Entire Property'}]}>
                      <InputNumber min={1} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={24} lg={12} xl={8}>
                    <Form.Item name="bedroomsForRent" label="Bedrooms for rent" rules={[{ required: form.getFieldValue('propertyType') === 'Entire Property'}]}>
                      <InputNumber min={1} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                    
                  </Col>
                  <Col xs={24} md={24} lg={24} xl={8}>
                    <Form.Item name="totalBathrooms" label="Bathrooms" rules={[{ required: form.getFieldValue('propertyType') === 'Entire Property'}]}>
                      <InputNumber min={0} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              }
              
              <Col xs={24}>
                <Form.Item name="hasAirConditioning" label="Does it have air conditioning?" rules={[{ required: true }]}>
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value="Not available">Not available</Select.Option>
                    <Select.Option value="Central">Central</Select.Option>
                    <Select.Option value="IndividualUnits">Indvidual units</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="hasHeating" label="Heating" rules={[{ required: true }]}>
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value="Not available">Not available</Select.Option>
                    <Select.Option value="Central">Central</Select.Option>
                    <Select.Option value="Indvidual units">Individual units</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="hasWaterHeating" label="Does it have heated water system?" rules={[{ required: true }]}>
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value="No">No</Select.Option>
                    <Select.Option value="Natural gas">Natural gas</Select.Option>
                    <Select.Option value="Electric">Electric</Select.Option>
                    <Select.Option value="Central property">Centeral property</Select.Option>
                  </Select>
                </Form.Item>
              </Col>

              <Col xs={24}>
                <div className="step-form-fields-title">
                  The building has:
                </div>
                <Form.Item name="buildingHas">
                  <Checkbox.Group>
                    <Row gutter={[30,20]}>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                        <Checkbox value="elevator">Elevator</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                        <Checkbox value="parking">Parking</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                        <Checkbox value="poolAccess">Pool Access</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                        <Checkbox value="gym">GYM</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <div className="step-form-fields-title">
                  The property has:
                </div>
                <Form.Item name="propertyHas">
                  <Checkbox.Group>
                    <Row gutter={[30, 20]}>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                        <Checkbox value="balcony">Balcony</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                        <Checkbox value="equippedKitchen">Equipped Kitchen</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                        <Checkbox value="clothesDryer">Clothes Dryer</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                        <Checkbox value="dishWasher">Dish Washer</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                        <Checkbox value="oven">Oven</Checkbox>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                        <Checkbox value="washingMachine">Washing machine</Checkbox>
                      </Col>
                    </Row>
                  </Checkbox.Group>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="propertySize" label="Property Size(optional)">
                  <InputNumber placeholder="Placeholder" />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item className="form-btn-right">
                  <Space size={20}>
                    <Button type="ghost" className="button-tertiary" onClick={() => navigate(-1)}>Cancel</Button>
                    <Button disabled={disabled} loading={loading} htmlType="submit" className="button-tertiary">Update</Button>
                  </Space>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    </div>
  )
}

export default PropertyForm