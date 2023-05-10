import {FC, useState, useCallback} from 'react';
import useListingsHook from "../actionHandler";
import showNotification from '../../../helpers/showNotification';
import { 
  Button,
  Form,
  Input,
  Row,
  Col,
  Radio,
  InputNumber,
} from 'antd'
import "./style.scss";
interface Props {
  initValues: any
  listingId: any
}

const LocationForm: FC<Props> = ({initValues, listingId}) => {
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
    <Form
      form={form}
      requiredMark={false}
      layout="vertical"
      name="updateLocation"
      initialValues={initValues}
      onValuesChange={(_, values) => {
        setDisabled(false)
      }}
      onFinish={submitUpdateListing}
    >
      <Row gutter={30}>
        <Col xs={24} md={24}>
          <Form.Item name="addressOne" label="Address" rules={[{ required: true }]}>
            <Input placeholder="Placeholder" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={12} xl={12}>
          <Form.Item name="addressTwo" label="Address  Line 2 (optional)">
            <Input placeholder="Placeholder" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={12} xl={12}>
          <Form.Item name="postCode" label="Postcode" rules={[{ required: true }]}>
            <InputNumber placeholder="Placeholder" />
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={24} xl={24}>
          <Form.Item name="isFurnished" label="Is it furnished?" rules={[{ required: true }]}>
            <Radio.Group>
              <Row gutter={[30,20]}>
                <Col xs={24} md={24} lg={12} xl={12}>
                  <Radio value={true}>Yes</Radio>
                </Col>
                <Col xs={24} md={24} lg={12} xl={12}>
                  <Radio value={false}>No</Radio>
                </Col>
              </Row>
            </Radio.Group>
          </Form.Item>
        </Col>
        <Col xs={24} md={24} lg={24} xl={24}>
          <Form.Item className="form-btn-right">
            <Button disabled={disabled} loading={loading} htmlType="submit" className="button-tertiary">Update</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

export default LocationForm