import { useRecoilState } from "recoil";
import api from "../../api";
import { offerdetails } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import { useState } from "react";

// Chat operation and save into store
const useCustomHook = () => {
  const [offersData, setOfferData] = useRecoilState(offerdetails);
  const [isLoading, setIsloading] = useState(false)
  const { GET_OFFERS, POST_OFFERS, EDIT_OFFERS, DELETE_OFFERS } = endpoints;

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
    const { data } = await api.post(POST_OFFERS, sendData)
    getOffersDetails()
    data && Notifications({ title: 'Success', description: 'Offer added successfully', type: 'success' })
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
    api.patch(EDIT_OFFERS, sendData).then(() => {
      getOffersDetails()
      Notifications({ title: 'Success', description: 'Offer edited successfully', type: 'success' })
    }).catch((err) => console.log(err))
    setIsloading(false)
  }

  const deleteOffersDetails = async (id: any) => {

    api.patch(`${DELETE_OFFERS}?offerId=${id}`).then(() => {
      getOffersDetails()
      Notifications({ title: 'Success', description: 'Offer deleted successfully', type: 'success' })
    })
  }

  return {
    isLoading,
    offersData,
    getOffersDetails,
    postOffersDetails,
    editOffersDetails,
    deleteOffersDetails
  };
};

export default useCustomHook;