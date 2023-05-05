import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { internshipDataState, internshipDetailsState } from '../../store';
import { useLocation } from "react-router-dom";
import { debounce } from "lodash";

const useCustomHook = () => {
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState(internshipDetailsState);
  // const [deleteInternship, setdeleteInternship] = useState(internshipDetailsState);
  const { GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS, DEL_INTERNSHIP, POST_NEW_INTERNSHIP } = apiEndpints
  const { state } = useLocation()

  //get all internship data
  const getAllInternshipsData = async () => {
    const { data } = await api.get(GET_LIST_INTERNSHIP, { companyId: 1, page: 1, limit: 10 });
    setInternshipData(data)
  };
  //post new Internship
  const postNewInternshipsData = async (values:any) => {
    const internshipData = {
      "companyId": 1,
      "title": "Node JS",
      "departmentId": 1,
      "description": "Description",
      "responsibilities": "Responsibilities",
      "requirements": "Requirements",
      "internType": "PART_TIME",
      "locationType": "ONSITE",
      "locationId": 1,
      "salaryType": "PAID",
      "salaryFrequency": "MONTHLY",
      "salaryCurrency": "$",
      "salaryAmount": 200,
      "totalPositions": 10,
      "closingDate": "2023-05-12",
      "duration": "6 months",
      "status": "PENDING"
    }
    const { data } = await api.post(POST_NEW_INTERNSHIP,internshipData);
    console.log("data are " , data);
    
    setInternshipData(data)
  };
  // "companyId": 1,
  // "title": "Node JS",
  // "departmentId": 1,
  // "description": "Description",
  // "responsibilities": "Responsibilities",
  // "requirements": "Requirements",
  // "internType": "PART_TIME",
  // "locationType": "ONSITE",
  // "locationId": 1,
  // "salaryType": "PAID",
  // "salaryFrequency": "MONTHLY",
  // "salaryCurrency": "$",
  // "salaryAmount": 200,
  // "totalPositions": 10,
  // "closingDate": "2023-05-12",
  // "duration": "6 months",
  // "status": "PENDING"
  //get internship detail
  const getInternshipDetails = async () => {
    const { data } = await api.get(GET_INTERNSHIP_DETAILS, { id: state });
    setInternshipDetails(data)
  };

  //delete internship
  const deleteInternshipData = async (val: any) => {
    const { data } = await api.delete(`${DEL_INTERNSHIP}?id=${val}`);
    getAllInternshipsData()
    // setdeleteInternship(data)
    console.log(data)
  }

  //search internship
  const changeHandler = async (val: any) => {
    if (val) {
      const { data } = await api.get(GET_LIST_INTERNSHIP, { companyId: 1, page: 1, limit: 10, search: val });
      setInternshipData(data)
    }
    else {
      const { data } = await api.get(GET_LIST_INTERNSHIP, { companyId: 1, page: 1, limit: 10 });
      setInternshipData(data)
    }
  };
  const debouncedResults = useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return {
    internshipData, internshipDetails, getAllInternshipsData, getInternshipDetails, deleteInternshipData, changeHandler, postNewInternshipsData
  };
};

export default useCustomHook;