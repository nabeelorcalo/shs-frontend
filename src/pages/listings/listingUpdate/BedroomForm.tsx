import {FC, useState, useCallback, useEffect} from 'react';
import useListingsHook from "../actionHandler";
import {IconAngleDown, IconAddUpload, IconRemoveAttachment} from '../../../assets/images';
import { LoadingOutlined } from "@ant-design/icons";
import { Notifications } from '../../../components';
import {useNavigate} from 'react-router-dom';
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
  Typography,
  Space
} from 'antd';
interface Props {
  initValues: any
  listingId: any
  spin: boolean
}

const BedroomForm: FC<Props> = ({initValues, listingId, spin}) => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [form] = Form.useForm();
  const { updateListing, createAttachment, deleteAttachment } = useListingsHook();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [loadingAttDel, setLoadingAttDel] = useState(false);
  const attacmentLength = initValues.attachments.length;
  const [fileList, setFileList] = useState(attacmentLength);
  const [loadingAttachment, setLoadingAttachment] = useState(false);
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

  const handleFileUploadChange = async (info:any) => {
    const newFileList = info.fileList.filter((item:any) => !item.hasOwnProperty('url'));
    const formData = new FormData();

    formData.append('entityId', initValues.id);
    formData.append('entityType', 'PROPERTY');
    for (let i = 0; i < newFileList.length; i++) {
      var file = newFileList[i]['originFileObj']
      formData.append('media', file);
    }

    const response = await createAttachment(formData);
    
    if(response.error) {
      setLoadingAttachment(false);
      Notifications({ title: 'Error', description: response.message, type: 'error' })
    }
    if(!response.error) {
      setLoadingAttachment(false);
      Notifications({ title: 'Success', description: 'Attachment uploaded successfully.', type: 'success' })
    }
  };

  const beforeUpload = (file:any) => {
    return false;
  };

  const handleRemoveAttachment = (id:any) => {
    deleteAttachment(id, setLoadingAttDel);
  }
  
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <div className="tabs-pane-card">
      
        <div className="tabs-pane-card-title">
          <Typography.Title level={4}>Bedroom Details</Typography.Title>
        </div>
        <div className="tabs-pane-card-body">
          <Spin spinning={spin} indicator={<LoadingOutlined />}>
            <Form
              form={form}
              requiredMark={false}
              layout="vertical"
              name="updateBedroomDetails"
              initialValues={initValues}
              onValuesChange={(_, values) => {
                setDisabled(false);
                setFileList(values.attachments.length)
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
                          fileList={fileList}
                          multiple={true}
                          accept="image/*"
                          listType={"picture-card"}
                          beforeUpload={beforeUpload}
                          onRemove={(file:any) => handleRemoveAttachment(file.id)}
                          showUploadList={{
                            showPreviewIcon: false,
                            removeIcon:  <IconRemoveAttachment />,
                            showRemoveIcon: fileList > 1
                          }}
                          onChange={handleFileUploadChange}
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

export default BedroomForm