import { useRecoilState, useResetRecoilState } from "recoil";
import { certificatesListData, performanceEvaulationData, leavesData } from "../../store";
import { cadidatesListState } from "../../store/candidates";
import endpoints from "../../config/apiEndpoints";
import api from "../../api";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CERTIFICATES, CANDIDATE_LIST, GET_PERFORMANCE_EVALUATION, DASHBOARD_LEAVES_COUNT } = endpoints;
  const [certificatesList, setCertificatesList] = useRecoilState(certificatesListData);
  const [candidateList, setCandidateList] = useRecoilState(cadidatesListState);
  const [perfromanceData, setPerformanceData] = useRecoilState(performanceEvaulationData)
  const [internLeaves, setInternLeaves] = useRecoilState(leavesData)

  const getCadidatesData = async (search: any, department: any) => {
    const params = {
      userType: 'intern',
      search: search ? search : null,
      departmentId: department === 'All' ? null : department
    }
    const { data } = await api.get(CANDIDATE_LIST, params)
    setCandidateList(data)
  };

  const getPerformnaceEvaluation = async (id: any) => {
    const { data } = await api.get(`${GET_PERFORMANCE_EVALUATION}/${id}`);
    setPerformanceData(data)
  }

  // get certificates
  const getInternLeaves = async (id: any) => {
    const { data } = await api.get(DASHBOARD_LEAVES_COUNT, { internId: id });
    setInternLeaves(data)
  }

  // get certificates
  const getCertificates = async (id: any) => {
    const { data } = await api.get(GET_CERTIFICATES, { internId: id });
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
    certificatesList,
    perfromanceData,
    internLeaves,
    getCadidatesData,
    getInternLeaves,
    getCertificates,
    getPerformnaceEvaluation,
  };
};

export default useCustomHook;