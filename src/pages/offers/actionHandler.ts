import { useRecoilState } from "recoil";
import api from "../../api";
import { offerdetails } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import { useState } from "react";
import { AnyComponent } from "@fullcalendar/core/preact";

// Chat operation and save into store
const useCustomHook = () => {
  const [offersData, setOfferData] = useRecoilState(offerdetails);
  const [isLoading, setIsloading] = useState(false)
  const { GET_OFFERS, POST_OFFERS, EDIT_OFFERS } = endpoints;

  const getOffersDetails = async () => {
    setIsloading(true)
    const { data } = await api.get(GET_OFFERS);
    setOfferData(data)
    setIsloading(false)
  };

  const postOffersDetails = async (values: any = null) => {
    setIsloading(true)
    const { minStayMonths, maxStayMonths, discount, propertyId } = values;
    const sendData = {
      propertyId: propertyId,
      minStayMonths: +minStayMonths,
      maxStayMonths: +maxStayMonths,
      monthlyDiscount: discount
    }
    try {
      await api.post(POST_OFFERS, sendData)
      getOffersDetails()
      Notifications({ title: 'Success', description: 'Offer added successfully', type: 'success' })
    }
    catch (err:any) {
      console.log(err.message);
    }
    setIsloading(false)
  }

  const editOffersDetails = async (values: any) => {
    setIsloading(true)
    const { offerId, minStayMonths, maxStayMonths, discount } = values;
    const sendData = {
      offerId: offerId,
      minStayMonths: +minStayMonths,
      maxStayMonths: +maxStayMonths,
      monthlyDiscount: discount
    }
    api.patch(EDIT_OFFERS, sendData).then((res) => {
      getOffersDetails()
      Notifications({ title: 'Success', description: 'Offer edited successfully', type: 'success' })
    }).catch((err) => console.log(err))
    setIsloading(false)
  }

  return {
    isLoading,
    offersData,
    getOffersDetails,
    postOffersDetails,
    editOffersDetails
  };
};

export default useCustomHook;