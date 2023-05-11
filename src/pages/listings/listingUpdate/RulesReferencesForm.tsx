import {FC, useState, useCallback} from 'react';
import useListingsHook from "../actionHandler";
import showNotification from '../../../helpers/showNotification';
import {IconAngleDown} from '../../../assets/images';
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
} from 'antd'
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const RulesReferencesForm: FC<Props> = ({initValues, listingId, spin}) => {
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
        <Typography.Title level={4}>Rules & Prefrences</Typography.Title>
      </div>
      <div className="tabs-pane-card-body">
        <Spin spinning={spin}>
          {initValues?.length !== 0 &&
            <Form
              form={form}
              requiredMark={false}
              layout="vertical"
              name="updateRulesPrefrences"
              initialValues={initValues}
              onValuesChange={(_, values) => {
                setDisabled(false)
                console.log('Rules & References ;; all values::: ', values)
              }}
              onFinish={submitUpdateListing}
            >
              <Row gutter={30}>
                <Col xs={24}>
                  <Form.Item name="gender" label="Do you prefer tenants have a specific gender" rules={[{ required: true }]}>
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
                  {/* <Form.Item name="selectDocument">
                    <Checkbox.Group>
                      <div className="select-doc-checkbox">
                        <Checkbox value="proofOfIdentity">Proof of identity</Checkbox>
                        <div className="select-doc-checkbox-help">Government issued ID, passport, driver’s license.</div>
                      </div>
                      <div className="select-doc-checkbox">
                        <Checkbox value="proofOfOccupationEnrollment">Proof of occupation or enrollment</Checkbox>
                        <div className="select-doc-checkbox-help">University enrolment certificate, Internship or employee contract. </div>
                      </div>
                      <div className="select-doc-checkbox">
                        <Checkbox value="proofOfIncome">Proof of income</Checkbox>
                        <div className="select-doc-checkbox-help">Salary slip or bank statements from the tenant or their sponsor</div>
                      </div>
                    </Checkbox.Group>
                  </Form.Item> */}
                  <Form.Item name="identityProofRequired" valuePropName="checked" rules={[{ required: true }]}>
                    <div className="select-doc-checkbox">
                      <Checkbox>Proof of identity</Checkbox>
                      <div className="select-doc-checkbox-help">Government issued ID, passport, driver’s license.</div>
                    </div>
                  </Form.Item>
                  <Form.Item name="occupationProofRequired" valuePropName="checked" rules={[{ required: true }]}>
                    <div className="select-doc-checkbox">
                      <Checkbox>Proof of occupation or enrollment</Checkbox>
                      <div className="select-doc-checkbox-help">University enrolment certificate, Internship or employee contract. </div>
                    </div>
                  </Form.Item>
                  <Form.Item name="incomeProofRequired" valuePropName="checked" rules={[{ required: true }]}>
                    <div className="select-doc-checkbox">
                      <Checkbox>Proof of income</Checkbox>
                      <div className="select-doc-checkbox-help">Salary slip or bank statements from the tenant or their sponsor</div>
                    </div>
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

export default RulesReferencesForm