import { useEffect } from "react";
import { useRecoilState} from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { internshipDataState,internshipDetailsState } from '../../store';

// Chat operation and save into store
const useCustomHook = () => {
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState(internshipDetailsState);
  const { GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS } = apiEndpints
  const getAllInternshipsData = async () => {
    const { data } = await api.get(GET_LIST_INTERNSHIP,{ companyId: 1 , page: 1, limit: 10 });
    setInternshipData(data)
  };
  const getInternshipDetails = async () => {
    const { data } = await api.get( GET_INTERNSHIP_DETAILS ,{ id: 1 });
    setInternshipDetails(data)
  };
  useEffect(()=>{
    getAllInternshipsData();
    getInternshipDetails();
  },[])
  return {
    internshipData,internshipDetails
  };
};

export default useCustomHook;