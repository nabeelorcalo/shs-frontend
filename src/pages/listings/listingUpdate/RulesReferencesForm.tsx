import {FC, useState, useCallback, useEffect} from 'react';
import useListingsHook from "../actionHandler";
import {IconAngleDown} from '../../../assets/images';
import { Notifications } from '../../../components';
import { LoadingOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import { 
  Button,
  Form,
  Row,
  Col,
  Typography,
  Radio,
  Select,
  Checkbox,
  Spin,
  Space
} from 'antd'
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const RulesReferencesForm: FC<Props> = ({initValues, listingId, spin}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { updateListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const documentProofValues = {
    identityProofRequired: initValues.identityProofRequired,
    occupationProofRequired: initValues.occupationProofRequired,
    incomeProofRequired: initValues.incomeProofRequired
  }
  const [checkboxValues, setCheckboxValues] = useState(documentProofValues)
  
  

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
    setDisabled(true)
    setLoading(false);
    handleSubmission(result);
  }, [form, handleSubmission]);



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleCheckboxChange = (e:any) => {
    const {name, checked} = e.target
    setCheckboxValues((prev:any) => {
      return {
        ...prev,
        [name]: checked
      }
    })
  };

  const validateAtLeastOneCheckbox = (rule:any, value:any, callback:any) => {
    const { getFieldValue, setFields }:any = form;
    const checkboxes = [
      getFieldValue('identityProofRequired'),
      getFieldValue('occupationProofRequired'),
      getFieldValue('incomeProofRequired'),
    ];

    if (!checkboxes.includes(true)) {
      const errorMessage = 'Please select at least one document.';
      setFields([
        {
          name: 'identityProofRequired',
          errors: [errorMessage],
        },
        {
          name: 'occupationProofRequired',
          errors: [errorMessage],
        },
        {
          name: 'incomeProofRequired',
          errors: [errorMessage],
        },
      ]);
      return Promise.reject(errorMessage);
    } else {
      setFields([
        {
          name: 'identityProofRequired',
          errors: [],
        },
        {
          name: 'occupationProofRequired',
          errors: [],
        },
        {
          name: 'incomeProofRequired',
          errors: [],
        },
      ]);
      return Promise.resolve();
    }
  };
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="tabs-pane-card">
      <div className="tabs-pane-card-title">
        <Typography.Title level={4}>Rules & Preferences</Typography.Title>
      </div>
      <div className="tabs-pane-card-body">
        <Spin spinning={spin} indicator={<LoadingOutlined />}>
          <Form
            form={form}
            requiredMark={false}
            layout="vertical"
            name="updateRulesPrefrences"
            initialValues={initValues}
            onValuesChange={(_, values) => {
              setDisabled(false)
            }}
            onFinish={submitUpdateListing}
          >
            <Row gutter={30}>
              <Col xs={24}>
                <Form.Item name="genderPreference" label="Do you prefer tenants have a specific gender" rules={[{ required: true }]}>
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value="Male">Male</Select.Option>
                    <Select.Option value="Female">Female</Select.Option>
                    <Select.Option value="Mixed">Mixed</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="maxAgePreference" label="What is the maximum age of your preferred tenants?" rules={[{ required: true }]}>
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                  <Select.Option value="Less than 30">Less than 30</Select.Option>
                  <Select.Option value="Less than 40">Less than 40</Select.Option>
                  <Select.Option value="Less than 60">Less than 60</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="tenantTypePreference" label="What kind of tenants would you prefer?" rules={[{ required: true }]}>
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value="Students">Students</Select.Option>
                    <Select.Option value="Working professionals">Working professionals</Select.Option>
                    <Select.Option value="No preferences">No preferences</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="couplesAllowed" label="Are couples allowed to rent your property?" rules={[{ required: true }]}>
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
                <Form.Item name="tenantsCanRegisterAddress" label="Can tenants register to your address?" rules={[{ required: true }]}>
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
                <Form.Item name="petsAllowed" label="Are tenants allowed to have pets in your property?" rules={[{ required: true }]}>
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
                <Form.Item name="musicalInstrumentsAllowed" label="Can tenants play musical instrument in your property?" rules={[{ required: true }]}>
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
                <div className="documents-from-tenants">
                  <Typography.Title level={3}>Documents From tenants</Typography.Title>
                  <Typography.Paragraph>Select document what you need from the tenants to accept their booking requests. If you do not select any option now, you can still ask tenants for these documents later when booking is confirmed</Typography.Paragraph>
                </div>
                <Form.Item name="identityProofRequired" valuePropName="checked" rules={[{validator: validateAtLeastOneCheckbox}]}>
                  <div className="select-doc-checkbox">
                    <Checkbox name="identityProofRequired" checked={checkboxValues.identityProofRequired} onChange={handleCheckboxChange}>Proof of identity</Checkbox>
                    <div className="select-doc-checkbox-help">Government issued ID, passport, driver’s license.</div>
                  </div>
                </Form.Item>
                <Form.Item name="occupationProofRequired" valuePropName="checked" rules={[{validator: validateAtLeastOneCheckbox}]}>
                  <div className="select-doc-checkbox">
                    <Checkbox name="occupationProofRequired" checked={checkboxValues.occupationProofRequired} onChange={handleCheckboxChange}>Proof of occupation or enrollment</Checkbox>
                    <div className="select-doc-checkbox-help">University enrolment certificate, Internship or employee contract. </div>
                  </div>
                </Form.Item>
                <Form.Item name="incomeProofRequired" valuePropName="checked" rules={[{validator: validateAtLeastOneCheckbox}]}>
                  <div className="select-doc-checkbox">
                    <Checkbox name="incomeProofRequired" checked={checkboxValues.incomeProofRequired} onChange={handleCheckboxChange}>Proof of income</Checkbox>
                    <div className="select-doc-checkbox-help">Salary slip or bank statements from the tenant or their sponsor</div>
                  </div>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item className="form-btn-right">
                  <Space size={20}>
                    <Button ghost className="button-tertiary" onClick={() => navigate(-1)}>Cancel</Button>
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

export default RulesReferencesForm