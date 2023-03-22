import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { ColumnsType } from 'antd/es/table'
import type { MenuProps } from 'antd'
import { Button, Table, Dropdown, Modal, Space, Steps } from 'antd'
import { PageHeader, SearchBar } from '../../components'
import { IconAddListings, Documentcard, IconMore } from '../../assets/images'
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


  /* STEPS
  -------------------------------------------------------------------------------------*/
  const steps = [
    {
      title: 'Step 1',
      content: 'First-content',
    },
    {
      title: 'Step 2',
      content: 'Second-content',
    },
    {
      title: 'Step 3',
      content: 'Last-content',
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
        <div className="modal-add-listing-content">
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
        </div>
      </Modal>

      {/* ENDS MODAL: ADD LISTING 
      ***********************************************************************************/}
    </>
  )
}

export default Listings