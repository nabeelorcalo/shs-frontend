import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { propertyState, galleryState, checkPropertyAvailabilityState } from "../../../store";


const usePropertyHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_PROPERTY, CHECK_PROPERTY_AVAILABILITY } = endpoints;
  const [property, setProperty] = useRecoilState(propertyState)
  const [checkProperty, setCheckProperty] = useRecoilState(checkPropertyAvailabilityState)
  const [gallery, setGallery] = useRecoilState(galleryState)


  // Get Property
  const getProperty = async (id:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setGallery([])
    setLoading(true);
    const {data} = await api.get(`${GET_PROPERTY}${id}`);
    const galleryArray = data?.attachments?.map((item:any) => {
      return {
        original: item.mediaUrl,
        thumbnail: item.mediaUrl
      }
    })
    setProperty(data)
    setGallery(galleryArray)
    setLoading(false);
  }

  // Get Property
  const checkPropertyAvailability = async (params:any, setLoading:React.Dispatch<React.SetStateAction<boolean>>) => {
    setLoading(true);
    const response = await api.get(CHECK_PROPERTY_AVAILABILITY, params);
    setCheckProperty(response)
    setLoading(false);
  }

  return {
    getProperty,
    checkPropertyAvailability
  };
};

export default usePropertyHook;