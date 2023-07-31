import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { PageHeader } from '../../../components';
import useListingsHook from "../actionHandler";
import TabLabel from "./TabLabel";
import LocationForm from "./LocationForm";
import PropertyForm from "./PropertyForm";
import BedroomForm from "./BedroomForm";
import RentBillingForm from "./RentBillingForm";
import RulesReferencesForm from "./RulesReferencesForm";
import RentalConditionsForm from "./RentalConditionsForm";
import {useRecoilValue} from 'recoil';
import {Tabs} from 'antd';
import { 
  IconLocations,
  IconPropertyDetail,
  IconBedroomDetail,
  IconRentBilling,
  IconRulesRef,
  IconRentalConditon,
} from '../../../assets/images'
import "./style.scss";



const ListingUpdate = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {listingId} = useParams();
  const [tabKey, setTabKey] = useState('locations')
  const { getListing, singleListing } = useListingsHook();
  const [loading, setLoading] = useState(false);
  

  /* EVENT LISTENERS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    getListing(listingId, setLoading);
  }, [tabKey])



  /* ASYNC FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/
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
          <Tabs 
            tabPosition="left"
            onChange={onTabChange}
            items={[
              {
                key: 'locations',
                label: <TabLabel icon={<IconLocations />} title="Locations" desc="Please enter the location you are interested in renting" />,
                children: <LocationForm spin={loading} initValues={singleListing} listingId={listingId} />
              },
              {
                key: 'propertyDetails',
                label: <TabLabel icon={<IconPropertyDetail />} title="Property Details" desc="Describe the property details, such as what type of property you want to rent out." />,
                children: <PropertyForm spin={loading} initValues={singleListing} listingId={listingId} />
              },
              {
                key: 'bedroomDetails',
                label: <TabLabel icon={<IconBedroomDetail />} title="Bedroom Details" desc="Describe the bedroom in detail, such as what type of bed is available, No. of people are allowed to stay." />,
                children: <BedroomForm spin={loading} initValues={singleListing} listingId={listingId} />
              },
              {
                key: 'rentBillings',
                label: <TabLabel icon={<IconRentBilling />} title="Rent & Billing" desc="Provide information about the monthly rental and preferred method of payment " />,
                children: <RentBillingForm spin={loading} initValues={singleListing} listingId={listingId} />
              },
              {
                key: 'rulesReferences',
                label: <TabLabel icon={<IconRulesRef />} title="Rules & Preferences" desc="Provide details about any specific rules/preferences  for the rental property" />,
                children: <RulesReferencesForm spin={loading} initValues={singleListing} listingId={listingId} />
              },
              {
                key: 'rentalConditions',
                label: <TabLabel icon={<IconRentalConditon />} title="Rental Conditions" desc="Describe the rental conditions, such as the type of contract and cancellation policy" />,
                children: <RentalConditionsForm spin={loading} initValues={singleListing} listingId={listingId} />
              },
            ]}
          />
        </div>
      </div>
    </>
  )
}

export default ListingUpdate