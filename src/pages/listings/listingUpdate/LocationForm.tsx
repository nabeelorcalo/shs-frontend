import {FC, useState, useCallback, useEffect} from 'react';
import useListingsHook from "../actionHandler";
import { Notifications } from '../../../components';
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { 
  Button,
  Form,
  Input,
  Row,
  Col,
  Radio,
  Spin,
  Typography,
  Space
} from 'antd'
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const LocationForm: FC<Props> = ({initValues, listingId, spin}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const { updateListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
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
        return Notifications({ title: 'Error', description: result.response?.message, type: 'error' })
      } else {
        return Notifications({ title: 'Success', description: result.response?.message, type: 'success' })
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
    setDisabled(true);
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
        <Typography.Title level={4}>Location</Typography.Title>
      </div>
      <div className="tabs-pane-card-body">
        <Spin spinning={spin} indicator={<LoadingOutlined />}>
          <Form
            key="updateLocation"
            form={form}
            initialValues={initValues}
            requiredMark={false}
            layout="vertical"
            name="updateLocation"
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
                  <Input placeholder="Placeholder" />
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
              <Col xs={24}>
                <Form.Item
                  name="description"
                  label="Description"
                >
                  <Input.TextArea rows={4} placeholder="Description" />
                </Form.Item>
              </Col>
              <Col xs={24} md={24} lg={24} xl={24}>
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

export default LocationForm