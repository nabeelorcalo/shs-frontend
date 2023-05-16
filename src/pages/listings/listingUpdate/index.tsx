import { useState, useEffect, useCallback } from "react";
import type { RadioChangeEvent, TabsProps } from 'antd';
import { useParams } from "react-router-dom";
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PageHeader, SearchBar, Notifications } from '../../../components';
import { useRecoilValue } from "recoil";
import useListingsHook from "../actionHandler";
import { listingState } from "../../../store";
import showNotification from '../../../helpers/showNotification';
import constants from '../../../config/constants'
import { 
  IconLocations,
  IconPropertyDetail,
  IconBedroomDetail,
  IconRentBilling,
  IconRulesRef,
  IconAngleDown,
  IconRentalConditon,
  IconAddUpload,
  IconLink,
  IconRemoveAttachment
} from '../../../assets/images'
import { 
  Button,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Radio,
  Select,
  Checkbox,
  Upload,
  InputNumber,
  Switch,
  Tabs,
  Spin
} from 'antd'
import "./style.scss";


const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    console.log('promise::: ', file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });


const ListingUpdate = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {listingId} = useParams();
  const [tabKey, setTabKey] = useState('locations')
  const { getListing, updateListing } = useListingsHook();
  const singleListing:any = useRecoilValue(listingState);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true)
  const [billsIncluded, setBillsIncluded] = useState(false)
  const [entireProperty, setEntireProperty] = useState(false)
  const [uploadURL, setUploadURL] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [updateLoading, setUpdateLoading] = useState<boolean>();
  

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getListing(listingId, setLoading)
    console.log("UseEffect: ", singleListing);
  }, [])

  useEffect(() => {
    getListing(listingId, setLoading)
    console.log("UseEffect: ", singleListing);
  }, [tabKey])


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
    setUpdateLoading(true);
    const result = await updateListing(listingId, values);
    setDisabled(true)
    setUpdateLoading(false);
    handleSubmission(result);
  }, [form, handleSubmission]);



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const onChangeSwitch = (checked: boolean) => {
    setBillsIncluded(checked)
  };

  function onChangeRadioProperty(e: RadioChangeEvent) {
    e.target.value === 'entireProperty'? setEntireProperty(true) : setEntireProperty(false)
  }

  const normFile = (e: any) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  function onUpdateLocation(values: any) {
    console.log('Success:', values);
  }

  function onTabChange(activeKey:any) {
    setTabKey(activeKey)
  }
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="agent-listing-update">
        <PageHeader title="Edit Listing" />
        <div className="listing-edit-content">
          <Tabs tabPosition="left" onChange={onTabChange}>
            <Tabs.TabPane
              key="locations" 
              tab={
                <div className="listing-edit-nav-item">
                  <div className="listing-edit-nav-title"><IconLocations /> Locations</div>
                  <Typography.Paragraph>
                    Please enter the location you are interested in renting
                  </Typography.Paragraph>
                </div>
              }
            >
              <div className="tabs-pane-card">
                <Spin spinning={loading}>
                  {singleListing?.length !== 0 &&
                  <>
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Location
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Form
                      form={form}
                      requiredMark={false}
                      layout="vertical"
                      name="updateLocation"
                      initialValues={singleListing}
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
                            <Button disabled={disabled} loading={updateLoading} htmlType="submit" className="button-tertiary">Update</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                  </>
                  }
                </Spin>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane 
              key="propertyDetails"
              tab={
                <div className="listing-edit-nav-item">
                  <div className="listing-edit-nav-title"><IconPropertyDetail />Property Details</div>
                  <Typography.Paragraph>
                  Describe the property details, such as what type of property you want to rent out.
                  </Typography.Paragraph>
                </div>
              }
            >
              <div className="tabs-pane-card">
                <Spin spinning={loading}>
                {singleListing?.length !== 0 &&
                <>
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Property Details
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Form
                      form={form}
                      requiredMark={false}
                      layout="vertical"
                      name="updatePropertyDetails"
                      initialValues={singleListing}
                      onValuesChange={(_, values) => {
                        setDisabled(false)
                        console.log('all values::: ', values)
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
                        {singleListing?.propertyType === "Entire Property" &&
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
                            <Button disabled={disabled} loading={updateLoading} htmlType="submit" className="button-tertiary">Update</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </>
                }
                </Spin>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane 
              key="bedroomDetails"
              tab={
                <div className="listing-edit-nav-item">
                  <div className="listing-edit-nav-title"><IconBedroomDetail />Bedroom Details</div>
                  <Typography.Paragraph>
                    Describe the bedroom in detail, such as what type of bed is available, No. of people are allowed to stay.
                  </Typography.Paragraph>
                </div>
              }
            >
              <div className="tabs-pane-card">
                <Spin spinning={loading}>
                {singleListing?.length !== 0 &&
                <>
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Bedroom Details
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Form
                      form={form}
                      requiredMark={false}
                      layout="vertical"
                      name="updateBedroomDetails"
                      initialValues={singleListing}
                      onValuesChange={(_, values) => {
                        setDisabled(false)
                        console.log('all values::: ', values)
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
                                name="media"
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
                            <Button disabled={disabled} loading={updateLoading} htmlType="submit" className="button-tertiary">Update</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </>
                }
                </Spin>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane 
              key="rentBillings"
              tab={
                <div className="listing-edit-nav-item">
                  <div className="listing-edit-nav-title"><IconRentBilling />Rent & Billing</div>
                  <Typography.Paragraph>
                    Provide information about the monthly rental and preferred method of payment 
                  </Typography.Paragraph>
                </div>
              }
            >
              <div className="tabs-pane-card">
                <Spin spinning={loading}>
                {singleListing?.length !== 0 &&
                <>
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Rent & Billing
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Form
                      form={form}
                      requiredMark={false}
                      layout="vertical"
                      name="updateRentBilling"
                      initialValues={singleListing}
                      onValuesChange={(_, values) => {
                        setDisabled(false)
                        console.log('all values::: ', values)
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
                          <Form.Item name="rent " label="Rent" rules={[{ required: true }]}>
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
                              <Select.Option value="Credit/Debit card">Credit/Debit card</Select.Option>
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
                              <Select.Option value="halfMonth">Half month</Select.Option>
                              <Select.Option value="fullMonth">Full month</Select.Option>
                              <Select.Option value="fixed">Fixed</Select.Option>
                            </Select>
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
                              <Select.Option value="Included(up to a limit)">Included(up to a limit)</Select.Option>
                              <Select.Option value="Pay landlord(fixed amount)">Pay landlord(fixed amount)</Select.Option>
                              <Select.Option value="Pay landlord(for amount used)">Pay landlord(for amount used)</Select.Option>
                              <Select.Option value="Pay provider(for amount used)">Pay provider(for amount used)</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item name="waterBillPayment" label="Ho do you want to charge water bill?">
                            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                              <Select.Option value="Included">Included</Select.Option>
                              <Select.Option value="Included(up to a limit)">Included(up to a limit)</Select.Option>
                              <Select.Option value="Pay landlord(fixed amount)">Pay landlord(fixed amount)</Select.Option>
                              <Select.Option value="Pay landlord(for amount used)">Pay landlord(for amount used)</Select.Option>
                              <Select.Option value="Pay provider(for amount used)">Pay provider(for amount used)</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item name="gasBillPayment" label="Ho do you want to charge gas bill?">
                            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                              <Select.Option value="Included">Included</Select.Option>
                              <Select.Option value="Included(up to a limit)">Included(up to a limit)</Select.Option>
                              <Select.Option value="Pay landlord(fixed amount)">Pay landlord(fixed amount)</Select.Option>
                              <Select.Option value="Pay landlord(for amount used)">Pay landlord(for amount used)</Select.Option>
                              <Select.Option value="Pay provider(for amount used)">Pay provider(for amount used)</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item className="form-btn-right">
                            <Button disabled={disabled} loading={updateLoading} htmlType="submit" className="button-tertiary">Update</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </>
                }
                </Spin>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane 
              key="rulesReferences"
              tab={
                <div className="listing-edit-nav-item">
                  <div className="listing-edit-nav-title"><IconRulesRef />Rules & References</div>
                  <Typography.Paragraph>
                    Provide details about any specific rules/preferences  for the rental property
                  </Typography.Paragraph>
                </div>
              }
            >
              <div className="tabs-pane-card">
                <Spin spinning={loading}>
                {singleListing?.length !== 0 &&
                <>
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Rules & Prefrences
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Form
                      form={form}
                      layout="vertical"
                      name="updateRulesPrefrences"
                      initialValues={singleListing}
                      onValuesChange={(_, values) => {
                        setDisabled(false)
                        console.log('all values::: ', values)
                      }}
                      onFinish={submitUpdateListing}
                    >
                      <Row gutter={30}>
                        <Col xs={24}>
                          <Form.Item name="gender" label="Do you prefer tenants have a specific gender">
                            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                              <Select.Option value="Male">Male</Select.Option>
                              <Select.Option value="Female">Female</Select.Option>
                              <Select.Option value="Mixed">Mixed</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item name="maxAgePreference" label="What is the maximum age of your preferred tenants?">
                            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                              <Select.Option value="Less than 60">Less than 60</Select.Option>
                              <Select.Option value="Less than 40">Less than 40</Select.Option>
                              <Select.Option value="Less than 30">Less than 30</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item name="tenantsKind" label="What kind of  tenants would you prefer? ">
                            <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                              <Select.Option value="Students">Students</Select.Option>
                              <Select.Option value="Working professionals">Working professionals</Select.Option>
                              <Select.Option value="No preferences">No preferences</Select.Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item name="couplesAllowed" label="Are couples allowed to rent your property?">
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
                          <Form.Item name="tenantsCanRegisterAddress" label="Can tenants register to your address?">
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
                          <Form.Item name="petsAllowed" label="Are tenants allowed to have pets in your property?">
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
                          <Form.Item name="musicalInstrumentsAllowed" label="Can tenants play musical instrument in your property?">
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
                          <Form.Item name="selectDocument">
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
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item className="form-btn-right">
                            <Button disabled={disabled} loading={updateLoading} htmlType="submit" className="button-tertiary">Update</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form>
                  </div>
                </>
                }
                </Spin>
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane 
              key="rentalConditions"
              tab={
                <div className="listing-edit-nav-item">
                  <div className="listing-edit-nav-title"><IconRentalConditon />Rental Conditions</div>
                  <Typography.Paragraph>
                    Provide details about any specific rules/preferences  for the rental property
                  </Typography.Paragraph>
                </div>
              }
            >
              <div className="tabs-pane-card">
                <Spin spinning={loading}>
                {singleListing?.length !== 0 &&
                <>
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Rental Conditions
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body rental-condition-body">
                    <Form
                      form={form}
                      layout="vertical"
                      name="updateRentalConditions"
                      initialValues={singleListing}
                      onValuesChange={(_, values) => {
                        setDisabled(false)
                        console.log('all values::: ', values)
                      }}
                      onFinish={submitUpdateListing}
                    >
                      <Row gutter={30}>
                        <Col xs={24}>
                          <Form.Item name="contractType" label="Contract type">
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
                                      <div className="radio-card-label">Fortnightly</div>
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
                          <Form.Item name="cancellationPolicy" label="Cancellation policy">
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
                                  <Radio value="Flexible cancellation">
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
                            <Button disabled={disabled} loading={updateLoading} htmlType="submit" className="button-tertiary">Update</Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Form> 
                  </div>
                </>
                }
                </Spin>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
    </>
  )
}

export default ListingUpdate