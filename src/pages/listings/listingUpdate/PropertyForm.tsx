import {FC, useState, useCallback} from 'react';
import useListingsHook from "../actionHandler";
import showNotification from '../../../helpers/showNotification';
import { 
  Button,
  Form,
  Row,
  Col,
  Radio,
  Select,
  Checkbox,
  InputNumber,
} from 'antd'
import { IconAngleDown } from '../../../assets/images'
interface Props {
  initValues: any
  listingId: any
}

const PropertyForm: FC<Props> = ({initValues, listingId}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const { updateListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [entireProperty, setEntireProperty] = useState(initValues?.propertyType === 'Entire Property'? true: false);
  
  

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
    <Form
      form={form}
      requiredMark={false}
      layout="vertical"
      name="updatePropertyDetails"
      initialValues={initValues}
      onValuesChange={(value, values) => {
        setDisabled(false)
        console.log('property Details::: ', value)
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
              <Form.Item name="totalBedrooms" label="Bedrooms in total">
                <InputNumber />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={12} xl={8}>
              <Form.Item name="bedroomsForRent" label="Bedrooms for rent">
                <InputNumber />
              </Form.Item>
              
            </Col>
            <Col xs={24} md={24} lg={24} xl={8}>
              <Form.Item name="totalBathrooms" label="Bathrooms">
                <InputNumber />
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
              <Select.Option value="Indvidual units">Indvidual units</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="hasHeating" label="Heating" rules={[{ required: true }]}>
            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
              <Select.Option value="Not available">Not available</Select.Option>
              <Select.Option value="Central Property">Central Property</Select.Option>
              <Select.Option value="Central building">Central building</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item name="hasWaterHeating" label="Does it have heated water system?" rules={[{ required: true }]}>
            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
              <Select.Option value="No">No</Select.Option>
              <Select.Option value="Natural gas">Natural gas</Select.Option>
              <Select.Option value="Electric">Electric</Select.Option>
              <Select.Option value="Centeral property">Centeral property</Select.Option>
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
                  <Checkbox value="Elevator">Elevator</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                  <Checkbox value="Parking">Parking</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                  <Checkbox value="PoolAccess">Pool Access</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                  <Checkbox value="GYM">GYM</Checkbox>
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
                  <Checkbox value="Balcony">Balcony</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                  <Checkbox value="EquippedKitchen">Equipped Kitchen</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                  <Checkbox value="ClothesDryer">Clothes Dryer</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                  <Checkbox value="DishWasher">Dish Washer</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                  <Checkbox value="Oven">Oven</Checkbox>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                  <Checkbox value="WashingMachine">Washing machine</Checkbox>
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
            <Button disabled={disabled} loading={loading} htmlType="submit" className="button-tertiary">Update</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default PropertyForm