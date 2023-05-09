import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import type { ColumnsType } from 'antd/es/table'
import type { RadioChangeEvent } from 'antd'
import type { RcFile, UploadProps } from 'antd/es/upload';
import type { UploadFile } from 'antd/es/upload/interface';
import type { CheckboxChangeEvent } from 'antd/es/checkbox';
import { PageHeader, SearchBar } from '../../components'
import useListingsHook from './actionHandler'
import { listingsState } from "../../store";
import { useRecoilValue } from "recoil";
import dayjs from 'dayjs'
import showNotification from '../../helpers/showNotification'
import constants from '../../config/constants'

import {
  IconAddListings,
  IconAngleDown,
  IconMore,
  IconLink,
  IconAddUpload,
  IconRemoveAttachment
} from '../../assets/images'
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
  Switch
} from 'antd'
import "./style.scss";

interface DataType {
  key: React.Key;
  id: number;
  nameAddress: string;
  propertyType: string;
  totalBedrooms: number;
  verificationStatus: string;
  rent: number;
  availability: any;
  publicationStatus: string;
  availabilityStart: any;
  availabilityEnd: any;
}

const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    console.log('promise::: ', file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });



const Listings = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { getListings, createListing } = useListingsHook()
  const allProperties = useRecoilValue(listingsState)
  const [loadingAllProperties, setLoadingAllProperties] = useState(false)
  const [form] = Form.useForm();
  const mediaValue = Form.useWatch('media', form);
  const navigate = useNavigate()
  const [billsIncluded, setBillsIncluded] = useState(false)
  const [modalAddListingOpen, setModalAddListingOpen] = useState(false)
  const [current, setCurrent] = useState(0)
  const [entireProperty, setEntireProperty] = useState(false)
  const [uploadURL, setUploadURL] = useState(false)
  const [uploadDevice, setUploadDevice] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [listingValues, setListingValues] = useState({});
  const [nextDisabled, setNextDisabled] = useState(true)

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'Name/Address',
      dataIndex: 'addressOne',
    },
    {
      title: 'Property Type',
      dataIndex: 'propertyType',
      render: (_, row, index) => {
        return (
          <>
            <div>{row.propertyType}</div>
            <div style={{ fontSize: '14px', lineHeight: '22px' }}>{row.totalBedrooms} {row.totalBedrooms > 1 ? "Bedrooms" : "Bedroom"}</div>
          </>
        );
      },
    },
    {
      title: 'Verification Status',
      dataIndex: 'verificationStatus',
      align: 'center',
      render: (_, row, index) => {
        return (
          <div className={`shs-status-badge ${row.verificationStatus === 'unchecked' ? 'error' : 'success'}`}>
            {row.verificationStatus === 'unchecked' ? 'Unchecked' : 'Checked'}
          </div>
        );
      },
    },
    {
      title: 'Rent',
      dataIndex: 'rent',
      render: (text, row, index) => {
        return (
          <>£ {text}</>
        )

      }
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
      render: (_, row, index) => {
        return (
          <>{dayjs(row.availabilityStart).format('DD/MM/YYYY')} - {dayjs(row.availabilityEnd).format('DD/MM/YYYY')}</>
        );
      },
    },
    {
      title: 'Publication Status',
      dataIndex: 'publicationStatus',
      align: 'center',
      render: (_, row, index) => {
        return (
          <div className={`shs-status-badge ${row.publicationStatus === 'pending' ? 'error' : 'success'}`}>
            {row.publicationStatus === 'pending' ? 'Pending' : 'Published'}
          </div>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      align: 'center',
      render: (_, row, index) => {
        return (
          <Dropdown
            overlayClassName="shs-dropdown"
            trigger={['click']}
            placement="bottomRight"
            menu={{
              items: [
                { label: 'Edit', key: 'listingEdit', onClick: () => navigate(`/edit-listing/${row.id}`) },
                { label: 'Remove', key: 'listingRemove', onClick: () => console.log('listingRemove') }
              ]
            }}
          >
            <div className="dropdown-button">
              <IconMore />
            </div>
          </Dropdown>
        );
      },
    },
  ];


  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getListings(setLoadingAllProperties)
  }, [])



  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/
  const handleSubmission = useCallback(
    (result: any) => {
      if (result.error) {
        showNotification("error", `Error: ${result.error.statusText}`, result.error.data.message);
      } else {
        showNotification("success", "Success", result.response?.message);
      }
    },
    [form]
  );

  const submitAddListing = useCallback(async () => {
    let values;
    try {
      values = await form.validateFields();
    } catch (errorInfo) {
      return;
    }
    // setAddListingLoading(true);
    const result = await createListing(JSON.stringify(listingValues));
    // setAddListingLoading(false);
    handleSubmission(JSON.stringify(result));
  }, [form, handleSubmission]);


  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function openModalAddListing() {
    setModalAddListingOpen(true)
  }

  function closeModalAddListing() {
    form.resetFields();
    setNextDisabled(true);
    setModalAddListingOpen(false);
  }

  function onChangeRadioProperty(e: RadioChangeEvent) {
    e.target.value === 'Entire Property' ? setEntireProperty(true) : setEntireProperty(false)
  }

  const onChangeSwitch = (checked: boolean) => {
    setBillsIncluded(checked)
  };

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    console.log("check:: ", e.target)
    // setChecked(e.target.checked);
  };

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };



  /* ADD LISTING STEPS
  -------------------------------------------------------------------------------------*/
  const steps = [
    {
      key: 'stepLocation',
      title: 'Step 1',
      content: <div className="step-location steps-content">
        <div className="step-content-header">
          <div className="step-content-header-title">Location</div>
          <Typography.Title level={2}>Make sure your property is in our supported area & furnished</Typography.Title>
          <Typography.Title level={3}>What's the address?</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item
              name="addressOne"
              label="Address"
              rules={[{ required: true }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              name="addressTwo"
              label="Address Line 2 (optional)"
              help="Apartment, suite, unit, building, floor, etc."
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item
              name="postCode"
              label="Postcode"
              rules={[{ required: true }]}
            >
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="isFurnished"
              label="Is it furnished?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value={true}>Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value={false}>No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
      </div>,
    },
    {
      key: 'stepPropertyDetails',
      title: 'Step 2',
      content: <div className="step-property-detail steps-content">
        <div className="step-content-header">
          <div className="step-content-header-title">Property Details</div>
          <Typography.Title level={2}>How would you like to rent out your place?</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item
              name="propertyType"
              label="How will you rent your property?"
              rules={[{ required: true }]}

            >
              <Radio.Group onChange={onChangeRadioProperty}>
                <Row gutter={[30, 30]}>
                  <Col xs={24}>
                    <Radio value="Entire Property" >Entire Property</Radio>
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
            <>
              {/* <Col xs={24}>
                <Form.Item name="maximumOccupants" label="Maximum Occupants">
                  <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                    <Select.Option value="occupants2">2</Select.Option>
                    <Select.Option value="Occupants4">4</Select.Option>
                    <Select.Option value="Occupants6">6</Select.Option>
                  </Select>
                </Form.Item>
              </Col> */}
              <Col xs={24}>
                <Row gutter={30}>
                  <Col xs={8}>
                    <Form.Item name="totalBedrooms" label="Bedrooms in total">
                      <InputNumber min={1} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                  </Col>
                  <Col xs={8}>
                    <Form.Item name="bedroomsForRent" label="Bedrooms for rent">
                      <InputNumber min={1} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>

                  </Col>
                  <Col xs={8}>
                    <Form.Item name="totalBathrooms" label="Bathrooms">
                      <InputNumber min={1} onKeyPress={(event) => {
                        if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                        }
                      }} />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
            </>
          }

          <Col xs={24}>
            <Form.Item
              name="hasAirConditioning"
              label="Does it have air conditioning?"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="notAvailable">Not available</Select.Option>
                <Select.Option value="central">Central</Select.Option>
                <Select.Option value="indvidualUnits">Indvidual units</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="hasHeating"
              label="Heating"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="heatingNotAvailable">Not available</Select.Option>
                <Select.Option value="centralProperty">Central Property</Select.Option>
                <Select.Option value="centralBuilding">Central building</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="hasWaterHeating"
              label="Does it have heated water system?"
              rules={[{ required: true }]}
            >
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
                <Row gutter={30}>
                  <Col xs={6}>
                    <Checkbox value="elevator">Elevator</Checkbox>
                  </Col>
                  <Col xs={6}>
                    <Checkbox value="parking">Parking</Checkbox>
                  </Col>
                  <Col xs={6}>
                    <Checkbox value="poolAccess">Pool Access</Checkbox>
                  </Col>
                  <Col xs={6}>
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
                <Row gutter={[30, 30]}>
                  <Col xs={8}>
                    <Checkbox value="balcony">Balcony</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="equippedKitchen">Equipped Kitchen</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="clothesDryer">Clothes Dryer</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="dishWasher">Dish Washer</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="oven">Oven</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="washingMachine">Washing machine</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="propertySize" label="Property Size(optional)">
              <InputNumber placeholder="Placeholder" onKeyPress={(event) => {
                if (!/[0-9]/.test(event.key)) {
                  event.preventDefault();
                }
              }} />
            </Form.Item>
          </Col>
        </Row>
      </div>
    },
    {
      key: 'stepBedroomDetails',
      title: 'Step 3',
      content: <div className="step-bedroom-details steps-content">
        <div className="step-content-header">
          <div className="step-content-header-title">Bedroom Details</div>
          <Typography.Title level={2}>Lets begin with bedroom 1</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <div className="bedromm-count">Bedroom 1</div>
            <div className={`add-bedroom-photos-holder ${uploadDevice ? '' : 'no-photos'}`}>
              <div className="add-bedroom-photos-label">Add photos of general view of the room.</div>
              <div className="add-bedroom-photos">
                <Form.Item
                  name="media"
                  valuePropName="fileList"
                  getValueFromEvent={normFile}
                >
                  <Upload
                    name="logo"
                    listType={"picture-card"}
                    showUploadList={{ showPreviewIcon: false, removeIcon: <IconRemoveAttachment /> }}
                  >
                    {uploadDevice && (
                      <div className="upload-device-btn">
                        <IconAddUpload />
                        <div className="label">Upload from device</div>
                      </div>
                    )}
                    {!uploadDevice && (
                      <div className="button-upload-from-device">
                        <Button className="button-tertiary">Upload from device</Button>
                      </div>
                    )
                    }
                  </Upload>
                </Form.Item>
                {!uploadDevice &&
                  <div className="upload-step-url">
                    <div className="upload-or-text">or</div>
                    <div className="upload-from-url">
                      <Button type="text" icon={<IconLink />} onClick={() => setUploadURL(true)}>Enter URL</Button>
                    </div>
                  </div>
                }
                <div className={`enter-url-card ${uploadURL ? 'show' : 'hide'}`}>
                  <div className="enter-url-form-field">
                    <Form.Item name={'enterUrl'} label="Enter URL">
                      <Input placeholder="https://www.example.com/examplefile.pdf" />
                    </Form.Item>
                  </div>
                  <div className="enter-url-actions">
                    <Space size={30}>
                      <Button className="button-tertiary" ghost onClick={() => setUploadURL(false)}>Back</Button>
                      <Button className="button-tertiary">Add</Button>
                    </Space>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="bedType"
              label="Bed Type"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="typeFuton">Futon</Select.Option>
                <Select.Option value="typeAirbed">Airbed</Select.Option>
                <Select.Option value="typeWaterbed">Waterbed</Select.Option>
                <Select.Option value="typeQueenBed">Queen bed</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="twoPeopleAllowed" label="Are two people allowed to live in this bedroom">
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value="allowedYes">Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value="allowedNo">No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="bedroomAmenities" label="What kind of amenities does bedroom 1 have? ">
              <Checkbox.Group>
                <Row gutter={[30, 30]}>
                  <Col xs={8}>
                    <Checkbox value="Chest of drawers">Chest of drawers</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Desk">Desk</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Private Bathroom">Private Bathroom</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Key or Locker">Key or Locker</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Wardrobe">Wardrobe</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Shelving">Shelving</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="TV">TV</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Wi-fi">Wi-fi</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Carpeted Floors">Carpeted Floors</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Other">Other</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
      </div>,
    },
    {
      key: 'stepRentBilling',
      title: 'Step 4',
      content: <div className="step-rent-billing steps-content">
        <div className="step-content-header">
          <div className="step-content-header-title">Rent and Billing</div>
          <Typography.Title level={2}>Set the price of bedroom 1</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item
              name="monthlyRent"
              label="Monthly Rent"
              rules={[{ required: true }]}
            >
              <InputNumber
                placeholder="Placeholder"
                min={0}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="paymentMethod"
              label="Payment Method"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="creditDebitCard">Credit/Debit card</Select.Option>
                <Select.Option value="cash">Cash</Select.Option>
                <Select.Option value="chegue">Cheque</Select.Option>
                <Select.Option value="ibft">IBFT</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="hasSecurityDeposit" label="Is there security deposit?">
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value="yes">Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value="no">No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="depositType"
              label="Which kind of deposit?"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="depositHalfMont">Half month</Select.Option>
                <Select.Option value="depositfullMonth">Full month</Select.Option>
                <Select.Option value="depositFixed">Fixed</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="depositAmount"
              label="Enter fixed amount"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="minimumStay"
              label="Minimum Stay"
              rules={[{ required: true }]}
            >
              <InputNumber
                min={0}
                onKeyPress={(event) => {
                  if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="allBillsIncluded" label="All bills are included" className="custom-input-switch">
              <Switch onChange={onChangeSwitch} checked={billsIncluded} size="small" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="electricityBillPayment"
              label="How do you want to charge electricity bill?"
              rules={[{ required: true }]}
            >
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
            <Form.Item
              name="waterBillPayment"
              label="How do you want to charge water bill?"
              rules={[{ required: true }]}
            >
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
            <Form.Item
              name="gasBillPayment"
              label="How do you want to charge gas bill?"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="gasIcluded">Included</Select.Option>
                <Select.Option value="gasIcludedLimit">Included(up to a limit)</Select.Option>
                <Select.Option value="gasPayLandlordFixed">Pay landlord(fixed amount)</Select.Option>
                <Select.Option value="gasPayLandlordAmount">Pay landlord(for amount used)</Select.Option>
                <Select.Option value="gasPayProvider">Pay provider(for amount used)</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </div>,
    },
    {
      key: 'stepRulesPreferences',
      title: 'Step 5',
      content: <div className="step-rules-preferences steps-content">
        <div className="step-content-header">
          <div className="step-content-header-title">Rules and Preferences </div>
          <Typography.Title level={2}>Set rules for your property </Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item
              name="gender"
              label="Do you prefer tenants have a specific gender"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="Male">Male</Select.Option>
                <Select.Option value="Female">Female</Select.Option>
                <Select.Option value="Mixed">Mixed</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="maxAgePreference"
              label="What is the maximum age of your preferred tenants?"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="Less than 60">Less than 60</Select.Option>
                <Select.Option value="Less than 40">Less than 40</Select.Option>
                <Select.Option value="Less than 30">Less than 30</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="tenantTypePreference"
              label="What kind of tenants would you prefer?"
              rules={[{ required: true }]}
            >
              <Select placeholder="Select" suffixIcon={<IconAngleDown />}>
                <Select.Option value="tenantStudents">Students</Select.Option>
                <Select.Option value="tenantProfessional">Working professionals</Select.Option>
                <Select.Option value="tenantsNoPreferences">No preferences</Select.Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="couplesAllowed"
              label="Are couples allowed to rent your property?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value={true}>Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value={false}>No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="tenantsCanRegisterAddress"
              label="Can tenants register to your address?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value={true}>Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value={false}>No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="petsAllowed"
              label="Are tenants allowed to have pets in your property?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value={true}>Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value={false}>No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="musicalInstrumentsAllowed"
              label="Can tenants play musical instrument in your property?"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
                    <Radio value={true}>Yes</Radio>
                  </Col>
                  <Col xs={12}>
                    <Radio value={false}>No</Radio>
                  </Col>
                </Row>
              </Radio.Group>
            </Form.Item>
          </Col>
          <Col xs={24} className="select-documents">
            <div className="documents-from-tenants">
              <Typography.Title level={3}>Documents From tenants</Typography.Title>
              <Typography.Paragraph>Select document what you need from the tenants to accept their booking requests. If you do not select any option now, you can still ask tenants for these documents later when booking is confirmed</Typography.Paragraph>
            </div>
            {/* <Form.Item name="documents" rules={[{ required: true }]}>
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
            <Form.Item name="identityProofRequired" rules={[{ required: true }]} valuePropName="checked">
              <div className="SingelDocCheckbox">
                <div className="select-doc-checkbox">
                  <Checkbox >Proof of identity</Checkbox>
                  <div className="select-doc-checkbox-help">Government issued ID, passport, driver’s license.</div>
                </div>
              </div>
            </Form.Item>
            <Form.Item name="occupationProofRequired " rules={[{ required: true }]} valuePropName="checked">
              <div className="SingelDocCheckbox">
                <div className="select-doc-checkbox">
                  <Checkbox >Proof of occupation or enrollment</Checkbox>
                  <div className="select-doc-checkbox-help">University enrolment certificate, Internship or employee contract. </div>
                </div>
              </div>
            </Form.Item>
            <Form.Item name="incomeProofRequired" rules={[{ required: true }]} valuePropName="checked">
              <div className="SingelDocCheckbox">
                <div className="select-doc-checkbox">
                  <Checkbox >Proof of income</Checkbox>
                  <div className="select-doc-checkbox-help">Salary slip or bank statements from the tenant or their sponsor</div>
                </div>
              </div>
            </Form.Item>
          </Col>
        </Row>
      </div>,
    },
    {
      key: 'stepRentalConditions',
      title: 'Step 6',
      content: <div className="step-rental-conditions">
        <div className="step-content-header">
          <div className="step-content-header-title">Rental Conditions</div>
          <Typography.Title level={2}>Set the rental conditions for the contract</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item name="contractType" label="Contract type" rules={[{ required: true }]}>
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={8}>
                    <Radio value="daily">
                      <div className="radio-card-content">
                        <div className="radio-card-label">Daily</div>
                        <div className="radio-card-content-text">In case a tenant moves in or moves out in the middle of the month, they will be charged for each day they stayed during that month. For example: if the tenant moves in on the 28th August, they will pay for four days of rent in August.</div>
                      </div>
                    </Radio>
                  </Col>
                  <Col xs={8}>
                    <Radio value="fortnightly">
                      <div className="radio-card-content">
                        <div className="radio-card-label">Fortnightly</div>
                        <div className="radio-card-content-text">The tenant will pay half of the month's rent if they stay less than two weeks in the month of move in/move out. For example: if the tenant moves in on the 28th of August, they will pay half of the rent for August.</div>
                      </div>
                    </Radio>
                  </Col>
                  <Col xs={8}>
                    <Radio value="monthly">
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
            <Form.Item
              name="cancellationPolicy"
              label="Cancellation policy"
              rules={[{ required: true }]}
            >
              <Radio.Group>
                <Row gutter={30}>
                  <Col xs={12}>
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
                  <Col xs={12}>
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
        </Row>
      </div>,
    },
    {
      key: 'step7',
      content: <div className="step-publish">
        <div className="step-content-header">
          <div className="step-content-header-title">All Ready to publish!</div>
          <Typography.Title level={2}>Before you finish....</Typography.Title>
        </div>

        <div className="step-publish-cards">
          <div className="step-publish-card">
            <Typography.Title level={4}>About Verification</Typography.Title>
            <Typography.Paragraph>Once a new listing is submitted, the home checkers then verifies if all the provided information is in fact correct. Verifying helps us ensure the safety of our users.</Typography.Paragraph>
          </div>

          <div className="step-publish-card">
            <Typography.Title level={4}>When will my listing publish?</Typography.Title>
            <Typography.Paragraph>The listings can take up to 4 to 5 working days for verification and finally it will be published onto our website, you can always check back when the listings will be online and running</Typography.Paragraph>
          </div>
        </div>
      </div>,
    },
  ];

  const stepItems = steps.map((item) => {
    return (
      { key: item.title, title: item.title }
    )
  });

  function next() {
    setListingValues((prev) => {
      return {
        ...prev,
        ...form.getFieldsValue()
      }
    })
    console.log('listingValues:: ', listingValues)
    setCurrent(current + 1);
    setNextDisabled(true)

    // if(current === 0) {
    //   setNextDisabled(true)
    //   validateStepOne(listingValues)
    // }

    // if(current === 1) {
    //   setNextDisabled(true)
    //   validateStepTwo(listingValues)
    // }

    // if(current === 2) {
    //   setNextDisabled(true)
    //   validateStepThree(listingValues)
    // }
  };

  function prev() {
    setCurrent(current - 1);
    setNextDisabled(false)
  };

  const validateStepOne = (values: any) => {
    const { addressOne, postCode, isFurnished } = values;
    if (addressOne !== "" && addressOne != null
      && postCode !== "" && postCode != null
      && isFurnished != null
    ) {
      setNextDisabled(false)
    } else {
      setNextDisabled(true)
    }
  }

  const validateStepTwo = (values: any) => {
    const { propertyType, hasAirConditioning, hasHeating, hasWaterHeating } = values;
    if (propertyType !== "" && propertyType != null
      && hasAirConditioning !== "" && hasAirConditioning != null
      && hasHeating !== "" && hasHeating != null
      && hasWaterHeating !== "" && hasWaterHeating != null
    ) {
      setNextDisabled(false)
    } else {
      setNextDisabled(true)
    }
  }

  const validateStepThree = (values: any) => {
    const { media, bedType } = values;
    if (bedType != null && bedType !== ""
      && media != null && media.length !== 0
    ) {
      setNextDisabled(false)
    } else {
      setNextDisabled(true)
    }
  }

  const validateStepFour = (values: any) => {
    const { monthlyRent, paymentMethod, depositType, depositAmount, minimumStay, electricityBillPayment, waterBillPayment, gasBillPayment } = values;
    if (monthlyRent != null
      && paymentMethod != null && paymentMethod !== ""
      && depositType != null && depositType !== ""
      && depositAmount != null
      && minimumStay != null
      && electricityBillPayment != null && electricityBillPayment !== ""
      && waterBillPayment != null && waterBillPayment !== ""
      && gasBillPayment != null && gasBillPayment !== ""
    ) {
      setNextDisabled(false)
    } else {
      setNextDisabled(true)
    }
  }

  const validateStepFive = (values: any) => {
    const { gender, maxAgePreference, tenantTypePreference, couplesAllowed, tenantsCanRegisterAddress, petsAllowed,
       musicalInstrumentsAllowed, identityProofRequired, occupationProofRequired, incomeProofRequired } = values;
    if (gender != null && gender !== ""
      && maxAgePreference != null && maxAgePreference !== ""
      && tenantTypePreference != null && tenantTypePreference !== ""
      && couplesAllowed != null
      && tenantsCanRegisterAddress != null
      && petsAllowed != null
      && musicalInstrumentsAllowed != null
      && identityProofRequired != null
      && occupationProofRequired != null
      && incomeProofRequired != null
    ) {
      setNextDisabled(false)
    } else {
      setNextDisabled(true)
    }
  }

  const validateStepSix = (values: any) => {
    const { contractType, cancellationPolicy } = values;
    if (contractType != null && contractType !== ""
      && cancellationPolicy != null && cancellationPolicy !== ""
    ) {
      setNextDisabled(false)
    } else {
      setNextDisabled(true)
    }
  }

  const onValuesChange = (changedValues: any, allValues: any) => {
    // console.log(changedValues, " single Field changed  value ")
    console.log(allValues, "All form values ")
    if (current === 0) {
      validateStepOne(allValues)
    } else if (current === 1) {
      validateStepTwo(allValues)
    } else if (current === 2) {
      validateStepThree(allValues)
      if (allValues.media != null && allValues.media.length != 0) {
        setUploadDevice(true)
      } else {
        setUploadDevice(false)
      }
    } else if (current === 3) {
      validateStepFour(allValues)
    } else if (current === 4) {
      validateStepFive(allValues)
    } else if (current === 5) {
      validateStepSix(allValues)
    }
  };



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="agent-listings">
        <PageHeader title="Listings" bordered />
        <Row gutter={[20, 20]}>
          <Col xl={6} md={24} sm={24} xs={24}>
            <div className="searchbar-wrapper">
              <SearchBar handleChange={() => console.log('Search')} />
            </div>
          </Col>
          <Col xl={18} md={24} sm={24} xs={24} className="flex md:justify-end">
            <div className="page-filterbar-right">
              <Button
                className="button-tertiary"
                icon={<IconAddListings />}
                onClick={openModalAddListing}
              >
                Add Listing
              </Button>
            </div>
          </Col>
          <Col xs={24}>
            <div className="agent-listing-content">
              <div className="shs-table-card">
                <div className="shs-table">
                  <Table
                    scroll={{ x: "max-content" }}
                    loading={loadingAllProperties}
                    columns={tableColumns}
                    dataSource={allProperties}
                    pagination={{ pageSize: 7, showTotal: (total) => <>Total: <span>{total}</span></> }}
                  />
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>

      {/* MODAL: ADD LISTING 
      ***********************************************************************************/}
      <Modal
        wrapClassName="modal-add-listings"
        open={modalAddListingOpen}
        onCancel={closeModalAddListing}
        closable={false}
        footer={null}
        width="100%"
      >
        <Form
          requiredMark={false}
          form={form}
          className="modal-add-listing-content"
          layout="vertical"
          name="addListing"
          onValuesChange={onValuesChange}
          onFinish={submitAddListing}
        >
          <div className="modal-add-listing-body">
            <div className="add-listing-inner-content">
              {current < 6 &&
                <Steps
                  className="add-listing-steps"
                  current={current}
                  items={stepItems}
                  labelPlacement="vertical"
                  progressDot
                />
              }
              <div className="steps-content-outer">
                {steps[current].content}
              </div>
            </div>
          </div>
          <div className="modal-add-listing-footer">
            <Space size={30}>
              {current < 1 &&
                <Button className="button-tertiary" ghost onClick={() => closeModalAddListing()}>Back</Button>
              }
              {current > 0 &&
                <Button className="button-tertiary" ghost onClick={() => prev()}>Back</Button>
              }
              {current < 6 &&
                <Button disabled={nextDisabled} className="button-tertiary" onClick={() => next()}>Next</Button>
              }
              {current === 6 &&
                <Button htmlType="submit" className="button-tertiary">Publish</Button>
              }
            </Space>
          </div>
        </Form>
      </Modal>

      {/* ENDS MODAL: ADD LISTING 
      ***********************************************************************************/}
    </>
  )
}

export default Listings