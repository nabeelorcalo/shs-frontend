import { useRecoilState } from "recoil";
import api from "../../api";
import { offerdetails } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { constant } from "lodash";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const [offersData, setOfferData] = useRecoilState(offerdetails);
  const { GET_OFFERS, POST_OFFERS, EDIT_OFFERS } = endpoints;

  const getOffersDetails = async () => {
    const { data } = await api.get(GET_OFFERS);
    setOfferData(data)
  };
  const postOffersDetails = async (values: any) => {
    const { minStayMonths, maxStayMonths, discount } = values;
    const sendData = {
      propertyId: 26,
      minStayMonths: +minStayMonths,
      maxStayMonths: +maxStayMonths,
      monthlyDiscount: discount
    }
    api.post(POST_OFFERS, sendData);
    getOffersDetails()
    Notifications({ title: 'Success', description: 'Offer added successfully', type: 'success' })
  }

  const editOffersDetails = async (values: any) => {
    const { offerId, minStayMonths, maxStayMonths, discount } = values;
    const sendData = {
      offerId: offerId,
      minStayMonths: +minStayMonths,
      maxStayMonths: +maxStayMonths,
      monthlyDiscount: discount
    }
    api.patch(EDIT_OFFERS, sendData);
    getOffersDetails()
  }

  return {
    offersData,
    getOffersDetails,
    postOffersDetails,
    editOffersDetails
  };
};

export default useCustomHook;