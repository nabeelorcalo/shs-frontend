import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { propertyState, galleryState, checkPropertyAvailabilityState } from "../../../store";


const usePropertyHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_PROPERTY, CHECK_PROPERTY_AVAILABILITY, SEND_BOOKING_REQUEST } = endpoints;
  const [propertyData, setPropertyData]:any = useRecoilState(propertyState)
  const [isPropertyAvailable, setIsPropertyAvailable] = useRecoilState(checkPropertyAvailabilityState)
  const [galleryData, setGalleryData] = useRecoilState(galleryState)


  // Get Property
  const getProperty = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setGalleryData([])
    setLoading(true);
    try {
      const {data} = await api.get(`${GET_PROPERTY}${id}`);
      const galleryArray = data?.attachments?.map((item:any) => {
        return {
          original: item.mediaUrl,
          thumbnail: item.mediaUrl
        }
      })
      setPropertyData(data)
      setGalleryData(galleryArray)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  // Check Property Availability
  const checkPropertyAvailability = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
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

  // Get Property
  const sendBookingRequest = async (params:any) => {
    const response = await api.get(SEND_BOOKING_REQUEST, params);
    return response;
  }

  return {
    getProperty,
    propertyData,
    galleryData,
    checkPropertyAvailability,
    isPropertyAvailable,
    sendBookingRequest
  };
};

export default usePropertyHook;