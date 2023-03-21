import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { Button, Table, Dropdown, Modal, Space, Steps,
  Form, Input, Row, Col, Typography, Radio, Select, Checkbox, Upload, 
} from 'antd'
import { PageHeader, SearchBar } from '../../components'
import { IconAddListings, IconAngleDown, IconMore } from '../../assets/images'
import "./style.scss";
interface DataType {
  key: React.Key;
  nameAddress: string;
  propertyType: string;
  bedroom: string;
  verificationStatus: string;
  rent: string;
  availability: any;
  publicationStatus: string;
}

// Temporary Data
const tableData = [
  {
    key: '1',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'checked',
    publicationStatus: 'published'
  },
  {
    key: '2',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '1',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'checked',
    publicationStatus: 'published'
  },
  {
    key: '3',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'unchecked',
    publicationStatus: 'pending'
  },
  {
    key: '4',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'checked',
    publicationStatus: 'pending'
  },
  {
    key: '5',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'checked',
    publicationStatus: 'published'
  },
  {
    key: '6',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'unchecked',
    publicationStatus: 'published'
  },
  {
    key: '7',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'checked',
    publicationStatus: 'published'
  },
  {
    key: '8',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'checked',
    publicationStatus: 'published'
  },
  {
    key: '9',
    nameAddress: '118-127 Park Ln, London W1K 7AF, UK',
    propertyType: 'Shared Apartment',
    bedroom: '2',
    rent: '£ 170/day',
    availability: '22/09/2022 - 22/12/2022',
    verificationStatus: 'unchecked',
    publicationStatus: 'published'
  },
];



const Listings = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate()
  const [ modalAddListingOpen, setModalAddListingOpen ] = useState(false);
  const [current, setCurrent] = useState(0);

  const items: MenuProps['items'] = [
    {
      label: 'Edit',
      key: 'listingEdit',
    },
    {
      label: 'Remove',
      key: 'listingRemove',
    },
  ];

  const tableColumns: ColumnsType<DataType> = [
    {
      title: 'Name/Address',
      dataIndex: 'nameAddress',
    },
    {
      title: 'Property Type',
      dataIndex: 'propertyType',
      render: (_, row, index) => {
        return (
          <>
            <div>{row.propertyType}</div>
            <div style={{fontSize: '14px', lineHeight: '22px'}}>{row.bedroom} {Number(row.bedroom) > 1? "Bedrooms": "Bedroom"}</div>
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
          <div className={`shs-status-badge ${row.verificationStatus === 'unchecked'? 'error': 'success'}`}>
            {row.verificationStatus === 'unchecked'? 'Unchecked': 'Checked'}
          </div>
        );
      },
    },
    {
      title: 'Rent',
      dataIndex: 'rent',
    },
    {
      title: 'Availability',
      dataIndex: 'availability',
    },
    {
      title: 'Publication Status',
      dataIndex: 'publicationStatus',
      align: 'center',
      render: (_, row, index) => {
        return (
          <div className={`shs-status-badge ${row.publicationStatus === 'pending'? 'error': 'success'}`}>
            {row.publicationStatus === 'pending'? 'Pending': 'Published'}
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
          <Dropdown overlayClassName="shs-dropdown" menu={{ items, onClick: ({key}) => handleActionItem(key, row.key) }} trigger={['click']} placement="bottomRight">
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

  }, [])



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
  function handleActionItem (key:any, id:any) {
    if(key === 'viewDetails') {
      navigate(`/property/${id}`)
    }
    if(key === 'viewContract') {
      console.log('view')
    }
    if(key === 'chatWithAgent') {
      navigate(`/chat`)
    }
  }

  function openModalAddListing() {
    setModalAddListingOpen(true)
  }

  function closeModalAddListing() {
    setModalAddListingOpen(false)
  }


  /* ADD LISTING STEPS
  -------------------------------------------------------------------------------------*/
  function StepLocation() {
    return (
      <div className="step-location">
        <div className="step-content-header">
          <div className="step-content-header-title">Location</div>
          <Typography.Title level={2}>Make sure your property is in our supported area & furnished</Typography.Title>
          <Typography.Title level={3}>What's the address?</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item name="address" label="Address">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="address2" label="Address  Line 2 (optional)" help="Apartment, suite, unit, building, floor, etc.">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={12}>
            <Form.Item name="postcode" label="Postcode">
              <Input placeholder="Placeholder" />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item name="isFurnished" label="Is it furnished?">
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
        </Row>
      </div>
    )
  }

  function StepPropertyDetails() {
    return (
      <div className="step-property-detail">
        <div className="step-content-header">
          <div className="step-content-header-title">Property Details</div>
          <Typography.Title level={2}>How would you like to rent out your place?</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <Form.Item name="propertyType" label="How will you rent your property?">
              <Radio.Group>
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
                <Row gutter={30}>
                  <Col xs={6}>
                    <Checkbox value="buildingElevator">Elevator</Checkbox>
                  </Col>
                  <Col xs={6}>
                    <Checkbox value="buildingParking">Parking</Checkbox>
                  </Col>
                  <Col xs={6}>
                    <Checkbox value="buildingPoolAccess">Pool Access</Checkbox>
                  </Col>
                  <Col xs={6}>
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
                <Row gutter={[30, 30]}>
                  <Col xs={8}>
                    <Checkbox value="propertyBalcony">Balcony</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="propertyEquippedKitchen">Equipped Kitchen</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="propertyClothesDryer">Clothes Dryer</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="propertyDishWasher">Dish Washer</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="propertyOven">Oven</Checkbox>
                  </Col>
                  <Col xs={8}>
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
        </Row>
      </div>
    )
  }

  function StepBedroomDetails() {
    return (
      <div className="step-property-detail">
        <div className="step-content-header">
          <div className="step-content-header-title">Bedroom Details</div>
          <Typography.Title level={2}>Lets begin with bedroom 1</Typography.Title>
        </div>
        <Row gutter={30}>
          <Col xs={24}>
            <div className="bedromm-count">Bedroom 1</div>
            <div className="add-bedroom-photos-holder">
              <div className="add-bedroom-photos-label">Add photos of general view of the room .</div>
              <div className="add-bedroom-photos">
                <Form.Item name="bedType">
                
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
            <Form.Item name="kindOfAmenities" label="What kind of amenities does bedroom 1 have? ">
              <Checkbox.Group>
                <Row gutter={[30, 30]}>
                  <Col xs={8}>
                    <Checkbox value="ChestOfDrawers">Chest of drawers</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="desk">Desk</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="rivateBathroom">Private Bathroom</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="keyLocker">Key or Locker</Checkbox>
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
                    <Checkbox value="carpetedFloors">Carpeted Floors</Checkbox>
                  </Col>
                  <Col xs={8}>
                    <Checkbox value="Other">Other</Checkbox>
                  </Col>
                </Row>
              </Checkbox.Group>
            </Form.Item>
          </Col>
        </Row>
      </div>
    )
  }

  const steps = [
    {
      title: 'Step 1',
      content: <StepLocation />,
    },
    {
      title: 'Step 2',
      content: <StepPropertyDetails />,
    },
    {
      title: 'Step 3',
      content: <StepBedroomDetails />,
    },
    {
      title: 'Step 4',
      content: 'Second-content',
    },
    {
      title: 'Step 5',
      content: 'Second-content',
    },
    {
      title: 'Step 6',
      content: 'Second-content',
    },
  ];

  const stepItems = steps.map((item) => ({ key: item.title, title: item.title }));

  function next() {
    setCurrent(current + 1);
  };

  function prev() {
    setCurrent(current - 1);
  };
  


  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <div className="agent-listings">
        <PageHeader title="Listings" bordered />

        <div className="page-filterbar">
          <div className="page-filterbar-left">
            <div className="searchbar-wrapper">
              <SearchBar handleChange={() => console.log('Search')}/>
            </div>
          </div>
          <div className="page-filterbar-right">   
            <Button
              className="button-tertiary"
              icon={<IconAddListings />}
              onClick={openModalAddListing}
            >
              Add Listing
            </Button>
          </div>
        </div>

        <div className="agent-listing-content">
          <div className="shs-table-card">
            <div className="shs-table">
              <Table
                columns={tableColumns}
                dataSource={tableData}
                pagination={{pageSize: 7, showTotal: (total) => <>Total: <span>{total}</span></> }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: ADD LISTING 
      ***********************************************************************************/}
      <Modal
        className="modal-add-listings"
        open={modalAddListingOpen}
        onCancel={closeModalAddListing}
        closable={false}
        footer={null}
        width="100%"
        mask={false}
        maskClosable={false}
      >
        <Form className="modal-add-listing-content" layout="vertical" name="addListing">
          <div className="modal-add-listing-body">
            <div className="add-listing-inner-content">
              <Steps
                className="add-listing-steps"
                current={current}
                items={stepItems}
                labelPlacement="vertical"
                progressDot
              />

              <div className="steps-content">
                {steps[current].content}
              </div>
            </div>
          </div>
          <div className="modal-add-listing-footer">
            <Space>
              {current < 1 &&
                <Button className="button-tertiary" ghost onClick={closeModalAddListing}>Back</Button>
              }
              {current > 0 &&
                <Button className="button-tertiary" ghost onClick={prev}>Back</Button>
              }
              <Button className="button-tertiary" ghost onClick={next}>Next</Button>
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