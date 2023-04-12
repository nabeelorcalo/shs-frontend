import { useState, useEffect } from "react"
import type { RadioChangeEvent, TabsProps } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import { PageHeader, SearchBar } from '../../../components'
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
  Table,
  Dropdown,
  Modal,
  Space,
  Steps,
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
  Tabs
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
  const [form] = Form.useForm();
  const [billsIncluded, setBillsIncluded] = useState(false)
  const [entireProperty, setEntireProperty] = useState(false)
  const [uploadURL, setUploadURL] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [initValues,  setInitValues] = useState({
    "address": "12 Gibson Close, Waterbeach, CB25 9HY",
    "address2": "",
    "postcode": "WF1 2UP",
    "isFurnished": "furnishedYes",
    "propertyType": "entireProperty",
    "bedroomsTotal": "3",
    "bedroomsForRent": "3",
    "bathrooms": "2",
    "airConditioning": "central",
    "heating": "centralProperty",
    "heatedWaterSystem": "naturalGas",
    "buildingHas": ["buildingElevator"],
    "PropertyHas": ["propertyBalcony", "propertyClothesDryer"],
    "bedroomPhotos": [
      {
        uid: '-1',
        name: 'image_name_12312.png',
        status: 'done',
        url: 'https://placehold.co/600x400',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://placehold.co/600x400',
      },
    ],
    "bedType": "typeFuton",
    "allowedTwoPeople": "allowedYes",
    "kindOfAmenities": ["desk", "keyLocker"],
    "paymentMethod": "cash",
    "securityDeposit": "securityDepositYes",
    "kindOfDeposit": "depositHalfMont",
    "minimumStay": "2",
    "allBillsIncluded": billsIncluded,
    "chargeElectricityBill": "electricityIcluded",
    "chargeWaterBill": "waterIcluded",
    "chargeGasBill": "gasIcludedLimit",
    "specificGender": "genderMale",
    "maxAge": "less40",
    "tenantsKind": "tenantStudents",
    "couplesAllowed": "couplesAllowedNo",
    "tenantsRegisterAddress": "tenantsRegisterAddressYes",
    "allowedPets": "allowedYes",
    "allowedMusic": "allowedMusicNo",
    "selectDocument": ["proofOfIdentity"],
    "contractType": "contractTypeDaily",
    "cancellationPolicy": "standardCancellation"
  })
  


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {

  }, [])



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

  function onSubmitUpdateListing(values: any) {
    console.log('Success:', values);
  }
  

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="agent-listing-update">
        <PageHeader title="Edit Listing" />
        <div className="listing-edit-content">
          <Form
            form={form}
            layout="vertical"
            name="updateListing"
            initialValues={initValues}
            onValuesChange={(_, values) => {
              setInitValues(prevState => ({...prevState, ...values}))
              console.log('init:: ', values)
            }}
            onFinish={onSubmitUpdateListing}
          >
            <Tabs tabPosition="left">
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
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Location
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Row gutter={30}>
                      <Col xs={24} md={24}>
                        <Form.Item name="address" label="Address">
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12}>
                        <Form.Item name="address2" label="Address  Line 2 (optional)">
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={12} xl={12}>
                        <Form.Item name="postcode" label="Postcode">
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24} xl={24}>
                        <Form.Item name="isFurnished" label="Is it furnished?">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} lg={12} xl={12}>
                                <Radio value="furnishedYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12}>
                                <Radio value="furnishedNo">No</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24} md={24} lg={24} xl={24}>
                        <Form.Item className="form-btn-right">
                          <Button className="button-tertiary">Update</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Tabs.TabPane>

              <Tabs.TabPane 
                key="propertyDetails"
                tab={
                  <div className="listing-edit-nav-item">
                    <div className="listing-edit-nav-title"><IconPropertyDetail /> Property Details</div>
                    <Typography.Paragraph>
                    Describe the property details, such as what type of property you want to rent out.
                    </Typography.Paragraph>
                  </div>
                }
              >
                <div className="tabs-pane-card">
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Property Details
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Row gutter={30}>
                      <Col xs={24}>
                        <Form.Item name="propertyType" label="How will you rent your property?">
                          <Radio.Group onChange={onChangeRadioProperty}>
                            <Row gutter={[30, 30]}>
                              <Col xs={24}>
                                <Radio value="entireProperty">Entire Property</Radio>
                              </Col>
                              <Col xs={24}>
                                <Radio value="studio">Studio</Radio>
                              </Col>
                              <Col xs={24}>
                                <Radio value="sharedProperty">Rooms in shared property</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      {initValues.propertyType === "entireProperty" &&
                      <>
                      <Col xs={24}>
                        <Row gutter={[30,20]}>
                          <Col xs={24} md={24} lg={12} xl={8}>
                            <Form.Item name="bedroomsTotal" label="Bedrooms in total">
                              <InputNumber min={1} max={10} />
                            </Form.Item>
                          </Col>
                          <Col xs={24} md={24} lg={12} xl={8}>
                            <Form.Item name="bedroomsForRent" label="Bedrooms for rent">
                              <InputNumber min={1} max={10} />
                            </Form.Item>
                            
                          </Col>
                          <Col xs={24} md={24} lg={24} xl={8}>
                            <Form.Item name="bathrooms" label="Bathrooms">
                              <InputNumber min={1} max={10} />
                            </Form.Item>
                          </Col>
                        </Row>
                      </Col>
                      </>
                      }
                      
                      <Col xs={24}>
                        <Form.Item name="airConditioning" label="Does it have air conditioning?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="notAvailable">Not available</Select.Option>
                            <Select.Option value="central">Central</Select.Option>
                            <Select.Option value="indvidualUnits">Indvidual units</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="heating" label="Heating">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="heatingNotAvailable">Not available</Select.Option>
                            <Select.Option value="centralProperty">Central Property</Select.Option>
                            <Select.Option value="centralBuilding">Central building</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="heatedWaterSystem" label="Does it have heated water system?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="heatedWaterSystemNo">No</Select.Option>
                            <Select.Option value="naturalGas">Natural gas</Select.Option>
                            <Select.Option value="heatedWaterSystemElectric">Electric</Select.Option>
                            <Select.Option value="heatedWaterSystemCenteral">Centeral property</Select.Option>
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
                                <Checkbox value="buildingElevator">Elevator</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                                <Checkbox value="buildingParking">Parking</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                                <Checkbox value="buildingPoolAccess">Pool Access</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={6}>
                                <Checkbox value="buildingGYM">GYM</Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <div className="step-form-fields-title">
                          The property has:
                        </div>
                        <Form.Item name="PropertyHas">
                          <Checkbox.Group>
                            <Row gutter={[30, 20]}>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="propertyBalcony">Balcony</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="propertyEquippedKitchen">Equipped Kitchen</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="propertyClothesDryer">Clothes Dryer</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="propertyDishWasher">Dish Washer</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="propertyOven">Oven</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="propertyWashingMachine">Washing machine</Checkbox>
                              </Col>
                            </Row>
                          </Checkbox.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="properySize" label="Property Size(optional)">
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item className="form-btn-right">
                          <Button className="button-tertiary">Update</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
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
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Bedroom Details
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Row gutter={30}>
                      <Col xs={24}>
                        <div className="bedromm-count">Bedroom 1</div>
                        <div className="add-bedroom-photos-holder">
                          <div className="add-bedroom-photos-label">Add photos of general view of the room.</div>
                          <div className="add-bedroom-photos">
                            <Form.Item
                              name="bedroomPhotos"
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
                        <Form.Item name="bedType" label="Bed Type">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="typeFuton">Futon</Select.Option>
                            <Select.Option value="typeAirbed">Airbed</Select.Option>
                            <Select.Option value="typeWaterbed">Waterbed</Select.Option>
                            <Select.Option value="typeQueenBed">Queen bed</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="allowedTwoPeople" label="Are two people allowed to live in this bedroom">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="allowedYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="allowedNo">No</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="kindOfAmenities" label="What kind of amenities does bedroom 1 have? ">
                          <Checkbox.Group>
                            <Row gutter={[30, 30]}>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="ChestOfDrawers">Chest of drawers</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="desk">Desk</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="rivateBathroom">Private Bathroom</Checkbox>
                              </Col>
                              <Col xs={24} md={24} lg={12} xl={12} xxl={8}>
                                <Checkbox value="keyLocker">Key or Locker</Checkbox>
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
                                <Checkbox value="carpetedFloors">Carpeted Floors</Checkbox>
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
                          <Button className="button-tertiary">Update</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
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
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Rent & Billing
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Row gutter={30}>
                      <Col xs={24}>
                        <Form.Item name="monthlyRent" label="Monthly Rent">
                          <Input placeholder="Placeholder" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="paymentMethod" label="Payment Method">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="creditDebitCard">Credit/Debit card</Select.Option>
                            <Select.Option value="cash">Cash</Select.Option>
                            <Select.Option value="chegue">Cheque</Select.Option>
                            <Select.Option value="ibft">IBFT</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="securityDeposit" label="Is there security deposit?">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="securityDepositYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="securityDepositNo">No</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="kindOfDeposit" label="Which kind of deposit?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="depositHalfMont">Half month</Select.Option>
                            <Select.Option value="depositfullMonth">Full month</Select.Option>
                            <Select.Option value="depositFixed">Fixed</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="minimumStay" label="Minimum Stay">
                          <InputNumber  />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="allBillsIncluded" label="All bills are included">
                          <Switch onChange={onChangeSwitch} checked={billsIncluded} size="small" />
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="chargeElectricityBill" label="Ho do you want to charge electricity bill?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="electricityIcluded">Included</Select.Option>
                            <Select.Option value="electricityIcludedLimit">Included(up to a limit)</Select.Option>
                            <Select.Option value="electricityPayLandlordFixed">Pay landlord(fixed amount)</Select.Option>
                            <Select.Option value="electricityPayLandlordAmount">Pay landlord(for amount used)</Select.Option>
                            <Select.Option value="payProvider">Pay provider(for amount used)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="chargeWaterBill" label="Ho do you want to charge water bill?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="waterIcluded">Included</Select.Option>
                            <Select.Option value="waterIcludedLimit">Included(up to a limit)</Select.Option>
                            <Select.Option value="waterPayLandlordFixed">Pay landlord(fixed amount)</Select.Option>
                            <Select.Option value="waterPayLandlordAmount">Pay landlord(for amount used)</Select.Option>
                            <Select.Option value="waterPayProvider">Pay provider(for amount used)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="chargeGasBill" label="Ho do you want to charge gas bill?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="gasIcluded">Included</Select.Option>
                            <Select.Option value="gasIcludedLimit">Included(up to a limit)</Select.Option>
                            <Select.Option value="gasPayLandlordFixed">Pay landlord(fixed amount)</Select.Option>
                            <Select.Option value="gasPayLandlordAmount">Pay landlord(for amount used)</Select.Option>
                            <Select.Option value="gasPayProvider">Pay provider(for amount used)</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item className="form-btn-right">
                          <Button className="button-tertiary">Update</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
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
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Rules & Prefrences
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body">
                    <Row gutter={30}>
                      <Col xs={24}>
                        <Form.Item name="specificGender" label="Do you prefer tenants have a specific gender">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="genderMale">Male</Select.Option>
                            <Select.Option value="genderFemale">Female</Select.Option>
                            <Select.Option value="genderMixed">Mixed</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="maxAge" label="What is the maximum age of your preferred tenants?">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="less60">Less than 60</Select.Option>
                            <Select.Option value="less40">Less than 40</Select.Option>
                            <Select.Option value="less30">Less than 30</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="tenantsKind" label="What kind of  tenants would you prefer? ">
                          <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                            <Select.Option value="tenantStudents">Students</Select.Option>
                            <Select.Option value="tenantProfessional">Working professionals</Select.Option>
                            <Select.Option value="tenantsNoPreferences">No preferences</Select.Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="couplesAllowed" label="Are couples allowed to rent your property?">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="couplesAllowedYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="couplesAllowedNo">No</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="tenantsRegisterAddress" label="Can tenants register to your address?">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="tenantsRegisterAddressYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="tenantsRegisterAddressNo">No</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="allowedPets" label="Are tenants allowed to have pets in your property?">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="allowedYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="allowedNo">No</Radio>
                              </Col>
                            </Row>
                          </Radio.Group>
                        </Form.Item>
                      </Col>
                      <Col xs={24}>
                        <Form.Item name="allowedMusic" label="Can tenants play musical instrument in your property?">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="allowedMusicYes">Yes</Radio>
                              </Col>
                              <Col xs={24} md={24} xl={12}>
                                <Radio value="allowedMusicNo">No</Radio>
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
                          <Button className="button-tertiary">Update</Button>
                        </Form.Item>
                      </Col>
                    </Row>
                  </div>
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
                  <div className="tabs-pane-card-title">
                    <Typography.Title level={4}>
                      Rental Conditions
                    </Typography.Title>
                  </div>
                  <div className="tabs-pane-card-body rental-condition-body">
                    <Row gutter={30}>
                      <Col xs={24}>
                        <Form.Item name="contractType" label="Contract type">
                          <Radio.Group>
                            <Row gutter={[30,20]}>
                              <Col xs={24} md={24}lg={24} xl={8} xxl={8}>
                                <Radio value="contractTypeDaily">
                                  <div className="radio-card-content">
                                    <div className="radio-card-label">Daily</div>
                                    <div className="radio-card-content-text">In case a tenant moves in or moves out in the middle of the month, they will be charged for each day they stayed during that month. For example: if the tenant moves in on the 28th August, they will pay for four days of rent in August.</div>
                                  </div>
                                </Radio>
                              </Col>
                              <Col xs={24} md={24}lg={24} xl={8} xxl={8}>
                                <Radio value="contractTypeFortnightly">
                                  <div className="radio-card-content">
                                    <div className="radio-card-label">Fortnightly</div>
                                    <div className="radio-card-content-text">The tenant will pay half of the month's rent if they stay less than two weeks in the month of move in/move out. For example: if the tenant moves in on the 28th of August, they will pay half of the rent for August.</div>
                                  </div>
                                </Radio>
                              </Col>
                              <Col xs={24} md={24}lg={24} xl={8} xxl={8}>
                                <Radio value="contractTypeMonthly">
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
                                <Radio value="standardCancellation">
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
                                <Radio value="clexibleCancellation">
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
                          <Button className="button-tertiary">Update</Button>
                        </Form.Item>
                      </Col>
                    </Row> 
                  </div>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </Form>
        </div>
      </div>
    </>
  )
}

export default ListingUpdate