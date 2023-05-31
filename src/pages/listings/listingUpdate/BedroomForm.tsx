import {FC, useState, useCallback} from 'react';
import useListingsHook from "../actionHandler";
import showNotification from '../../../helpers/showNotification';
import {IconAngleDown, IconAddUpload, IconRemoveAttachment} from '../../../assets/images';
import { Loader } from '../../../components';
import { 
  Button,
  Form,
  Row,
  Col,
  Radio,
  Select,
  Checkbox,
  Upload,
  Spin,
  Typography
} from 'antd'
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const BedroomForm: FC<Props> = ({initValues, listingId, spin}) => {
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
  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="tabs-pane-card">
      
        <div className="tabs-pane-card-title">
          <Typography.Title level={4}>Bedroom Details</Typography.Title>
        </div>
        <div className="tabs-pane-card-body">
          <Spin spinning={spin} indicator={<Loader />}>
            {initValues?.length !== 0 &&
              <Form
                form={form}
                requiredMark={false}
                layout="vertical"
                name="updateBedroomDetails"
                initialValues={initValues}
                onValuesChange={(_, values) => {
                  setDisabled(false)
                }}
                onFinish={submitUpdateListing}
              >
                <Row gutter={30}>
                  <Col xs={24}>
                    <div className="bedromm-count">Bedroom 1</div>
                    <div className="add-bedroom-photos-holder">
                      <div className="add-bedroom-photos-label">Add photos of general view of the room.</div>
                      <div className="add-bedroom-photos">
                        <Form.Item
                          name="attachments"
                          valuePropName="fileList"
                          getValueFromEvent={normFile}
                        >
                          <Upload
                            name="logo"
                            action="/upload.do"
                            listType="picture-card"
                            showUploadList={{showPreviewIcon: false, removeIcon: <IconRemoveAttachment />}}
                          >
                            <div className="upload-device-btn">
                              <IconAddUpload />
                              <div className="label">Upload from device</div>
                            </div>
                          </Upload>
                        </Form.Item>
                      </div>
                    </div>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="bedType" label="Bed Type" rules={[{ required: true }]}>
                      <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                        <Select.Option value="Futon">Futon</Select.Option>
                        <Select.Option value="Airbed">Airbed</Select.Option>
                        <Select.Option value="Waterbed">Waterbed</Select.Option>
                        <Select.Option value="Queen bed">Queen bed</Select.Option>
                        <Select.Option value="King bed">King bed</Select.Option>
                        <Select.Option value="Twin XL">Twin XL</Select.Option>
                        <Select.Option value="XL">XL</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24}>
                    <Form.Item name="twoPeopleAllowed" label="Are two people allowed to live in this bedroom">
                      <Radio.Group>
                        <Row gutter={[30, 20]}>
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
                    <Form.Item name="bedroomAmenities" label="What kind of amenities does bedroom 1 have? ">
                      <Checkbox.Group>
                        <Row gutter={[30, 30]}>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Chest of drawers">Chest of drawers</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Desk">Desk</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Private Bathroom">Private Bathroom</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Key or Locker">Key or Locker</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Wardrobe">Wardrobe</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Shelving">Shelving</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="TV">TV</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Wi-fi">Wi-fi</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Carpeted Floors">Carpeted Floors</Checkbox>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                            <Checkbox value="Other">Other</Checkbox>
                          </Col>
                        </Row>
                      </Checkbox.Group>
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

export default BedroomForm