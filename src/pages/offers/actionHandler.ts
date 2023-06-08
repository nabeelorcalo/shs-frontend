import { useRecoilState } from "recoil";
import api from "../../api";
import { offerdetails } from "../../store";
import endpoints from "../../config/apiEndpoints";
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
    const { minStayMonths, maxStayMonths, discount, propertyId } = values;
    const sendData = {
      propertyId: propertyId,
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
    Notifications({ title: 'Success', description: 'Offer edited successfully', type: 'success' })
  }

  return {
    offersData,
    getOffersDetails,
    postOffersDetails,
    editOffersDetails
  };
};

export default useCustomHook;