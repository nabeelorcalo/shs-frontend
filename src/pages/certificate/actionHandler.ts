import { useRecoilState, useResetRecoilState } from "recoil";
import { certificatesListData, performanceEvaulationData, leavesData, cadidatesListState, certificateDetailsState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import api from "../../api";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CERTIFICATES, CANDIDATE_LIST,
    GET_PERFORMANCE_EVALUATION,
    DASHBOARD_LEAVES_COUNT, ISSUE_CERTIFICATE } = endpoints;
  const [certificatesList, setCertificatesList] = useRecoilState(certificatesListData);
  const [candidateList, setCandidateList] = useRecoilState(cadidatesListState);
  const [perfromanceData, setPerformanceData] = useRecoilState(performanceEvaulationData);
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);
  const [internLeaves, setInternLeaves] = useRecoilState(leavesData);
  let uploadFile: any;

  const getCadidatesData = async (search?: any, department?: any) => {
    const params = {
      userType: 'intern',
      search: search ? search : null,
      departmentId: department === 'All' ? null : department
    }
    const { data } = await api.get(CANDIDATE_LIST, params) || {};
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

  const setFile = async (value: any) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const dataURL = reader.result;
      setCertificateDetails((pre: any) => ({
        ...pre,
        file: value,
        fileURL: dataURL,
        signatureType: 'UPLOAD',
      }));
    };

    if (value)
      reader.readAsDataURL(value);
    else
      setCertificateDetails((pre: any) => ({
        ...pre,
        file: value,
        fileURL: '',
        signatureType: 'UPLOAD',
      }));
  }

  // get upload file form data
  const handleUploadFile = async (value: any) => {
    const reader = new FileReader();

    reader.onload = async () => {
      const dataURL = reader.result;
      setCertificateDetails((pre: any) => ({
        ...pre,
        file: value,
        fileURL: dataURL,
        signatureType: 'UPLOAD',
      }));
    };

    reader.readAsDataURL(value);
  }

  const handleClear = () => {
    setCertificateDetails((pre: any) => ({
      ...pre,
      signatureType: '',
      imgSignature: '',
      fontFamily: "roboto",
      txtSignature: '',
      file: '',
      fileURL: '',
    }));
  }

  const issueCertificate = async (params: any) => {
    const config = {headers: { "Content-Type": "multipart/form-data" }};
    const { data, error, message } = await api.post(ISSUE_CERTIFICATE, params, config);
    if(!error){
      Notifications({
        title: "Success",
        description: "Certificate issued",
        type: "success",
      });
    }else{
      Notifications({
        title: "Error",
        description: message,
        type: "error",
      });
    }
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
    setFile, handleUploadFile,
    handleClear,
    issueCertificate
  };
};

export default useCustomHook;