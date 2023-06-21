import { useRecoilState } from "recoil";
import { certificatesListData } from "../../store";
import { cadidatesListState } from "../../store/candidates";
import endpoints from "../../config/apiEndpoints";
import api from "../../api";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CERTIFICATES, CANDIDATE_LIST } = endpoints;
  const [certificatesList, setCertificatesList] = useRecoilState(certificatesListData);
  const [candidateList, setCandidateList] = useRecoilState(cadidatesListState);

  const getCadidatesData = async () => {
    const { data } = await api.get(CANDIDATE_LIST, { userType: 'intern' })
    setCandidateList(data)
  };

  // CONTRACT DASHBOARD
  const getCertificates = async () => {
    const { data } = await api.get(GET_CERTIFICATES);
    setCertificatesList(data)
  }

  // //delete contracts
  // const deleteContractHandler = async (val: any) => {
  //   setLoading(true)
  //   await api.delete(`${DEL_CONTRACT}/${val}`);
  //   setLoading(false)
  //   getContractList()
  //   Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  // }

  return {
    candidateList,
    getCadidatesData
  };
};

export default useCustomHook;