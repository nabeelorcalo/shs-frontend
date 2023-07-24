import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import {
  propertyState,
  galleryState,
  checkPropertyAvailabilityState,
  bookingRequestParamsState,
  allPaymentCardsState
} from "../../../store";


const usePropertyHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const {
    GET_PROPERTY,
    CHECK_PROPERTY_AVAILABILITY,
    SEND_BOOKING_REQUEST,
    GET_PAYMENT_CARDS,
    CREATE_PAYMENT_CARD,
    DELETE_PAYMENT_CARD,
    ADD_PROPERTY_VIEWS
  } = endpoints;
  const [propertyData, setPropertyData]:any = useRecoilState(propertyState)
  const [isPropertyAvailable, setIsPropertyAvailable] = useRecoilState(checkPropertyAvailabilityState)
  const [galleryData, setGalleryData] = useRecoilState(galleryState)
  const [bookingReqParams, setBookingReqParams]:any = useRecoilState(bookingRequestParamsState);
  const [paymentCardsData, setPaymentCardsData] = useRecoilState(allPaymentCardsState);

  const addPropertyViews = async (reqBody:any) => {
    const response = await api.post(ADD_PROPERTY_VIEWS, reqBody);
    return response;
  }

  // Get Property
  const getProperty = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setGalleryData([])
    setIsPropertyAvailable(false)
    setLoading(true);
    try {
      const {data} = await api.get(`${GET_PROPERTY}${id}`);
      addPropertyViews({propertyId: data?.id, agentId: data?.userId})
      const galleryArray = data?.attachments?.map((item:any) => {
        return {
          original: item.mediaUrl,
          thumbnail: item.mediaUrl
        }
      })
      setPropertyData(data);
      setGalleryData(galleryArray);
      setBookingReqParams({
        propertyId: data?.id,
        agentId: data?.userId,
        rent: data?.rent,
        rentDuration: data?.rentFrequency
      })
      addPropertyViews({propertyId: data?.id, agentId: data?.userId})
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Check Property Availability
  const checkPropertyAvailability = async (params:any, setLoading:any) => {
    setLoading(true);
    try {
      const response = await api.get(CHECK_PROPERTY_AVAILABILITY, params);
      setIsPropertyAvailable(response)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Send Booking Request
  const sendBookingRequest = async (params:any) => {
    const response = await api.post(SEND_BOOKING_REQUEST, params);
    return response;
  }

  // Create Payment Card
  const createPaymentCard = async (reqBody:any) => {
    const response = await api.post(CREATE_PAYMENT_CARD, reqBody)
    return response;
  }

  // Get Payment Cards
  const getPaymentCards = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    try {
      const response = await api.get(GET_PAYMENT_CARDS);
      setPaymentCardsData(response.data.data);
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Cancel Booking Request
  const deletePaymentCard = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true)
    await api.delete(`${DELETE_PAYMENT_CARD}/${id}`)
    setLoading(false)
    setPaymentCardsData(
      paymentCardsData.filter((request:any) => request.id !== id)
    )
  }


  return {
    getProperty,
    propertyData,
    galleryData,
    checkPropertyAvailability,
    isPropertyAvailable,
    sendBookingRequest,
    bookingReqParams,
    getPaymentCards,
    paymentCardsData,
    createPaymentCard,
    deletePaymentCard,
    addPropertyViews
  };
};

export default usePropertyHook;