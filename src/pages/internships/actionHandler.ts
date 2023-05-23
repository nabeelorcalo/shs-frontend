import { useState } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { internshipDataState, internshipDetailsState } from '../../store';
import { settingDepartmentState, settingLocationState } from "../../store/Setting"
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Notifications } from "../../components";
import { ROUTES_CONSTANTS } from "../../config/constants";

const useCustomHook = () => {
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState<any>(internshipDetailsState);
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [locationsData, setLocationsData] = useRecoilState(settingLocationState);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { state } = useLocation();

  const {
    GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS,
    DEL_INTERNSHIP, POST_NEW_INTERNSHIP,
    DUPLICATE_INTERNSHIP, EDIT_INTERNSHIP,
    SETTING_DAPARTMENT, SETTING_LOCATION } = apiEndpints;

  //Get all internship data
  const getAllInternshipsData = async (status: any = null, location: any = null, department: any = null, searchValue: any = null) => {
    const params = {
      limit: 100,
      page: 1,
      status: status ? status : undefined,
      locationId: location ? location : undefined,
      departmentId: department ? department : undefined,
      search: searchValue ? searchValue : null
    }
    let query = Object.entries(params).reduce((a: any, [k, v]) => (v ? ((a[k] = v), a) : a), {})
    const { data } = await api.get(GET_LIST_INTERNSHIP, query);
    setInternshipData(data);
    setIsLoading(true)
  };

  //Get all department data
  const getAllDepartmentData = async () => {
    const { data } = await api.get(SETTING_DAPARTMENT, { page: 1, limit: 10, });
    setDepartmentsData(data)
  };

  //Get all locations data
  const getAllLocationsData = async () => {
    const { data } = await api.get(SETTING_LOCATION, { page: 1, limit: 10 });
    setLocationsData(data)
  };

  //Post new Internship
  const postNewInternshipsData = async (values: any) => {
    const { title, description, responsibilities, requirements, typeofwork, frequency,
      amount, natureofwork, positions, closingDate, duration, salaryType, department, status, location } = values
    const internshipData = {
      "title": title,
      "departmentId": department,
      "description": description,
      "responsibilities": responsibilities,
      "requirements": requirements,
      "internType": typeofwork,
      "locationType": natureofwork,
      "locationId": location,
      "salaryType": salaryType,
      "salaryFrequency": frequency,
      "salaryCurrency": "$",
      "salaryAmount": Number(amount),
      "totalPositions": Number(positions),
      "closingDate": closingDate,
      "duration": duration,
      "status": status
    }

    const { data } = await api.post(POST_NEW_INTERNSHIP, internshipData);
    if (data) {
      Notifications({ title: "Success", description: "Internship published", type: "success" })
      navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}`)
    }


  };

  // Edit internship 
  const EditNewInternshipsData = async (values: any) => {
    const {
      title, description, responsibilities,
      requirements, typeofwork, frequency, amount, natureofwork,
      positions, closingDate, duration, internshipType, salaryAmount,
      departmentId, status, locationId, id } = values
    const internshipData = {
      "id": state?.id ? state?.id : id,
      "title": title,
      "departmentId": departmentId,
      "description": description,
      "responsibilities": responsibilities,
      "requirements": requirements,
      "internType": typeofwork,
      "locationType": natureofwork,
      "locationId": locationId,
      "salaryType": internshipType,
      "salaryFrequency": frequency,
      "salaryCurrency": salaryAmount,
      "salaryAmount": Number(amount),
      "totalPositions": Number(positions),
      "closingDate": closingDate,
      "duration": duration,
      "status": status,
    }
    await api.put(`${EDIT_INTERNSHIP}?id=${state?.id ? state?.id : id}`, internshipData);
    navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}`)
    Notifications({ title: "Success", description: "Internship edited successfully", type: "success" })
  };

  //Duplicate internship
  const getDuplicateInternship = async (val: any) => {
    await api.post(`${DUPLICATE_INTERNSHIP}?id=${val}`);
    getAllInternshipsData()
    Notifications({ title: "Success", description: "Internship duplicated", type: "success" })
  }

  //Internship details
  const getInternshipDetails = async (searchValue: any) => {
    const { data } = await api.get(GET_INTERNSHIP_DETAILS, { id: state.data.id, search: searchValue ? searchValue : null });
    setInternshipDetails(data)
  };

  //Delete internship
  const deleteInternshipData = async (id: any) => {
    await api.delete(`${DEL_INTERNSHIP}?id=${id}`);
    getAllInternshipsData()
    Notifications({ title: "Success", description: "Internship deleted", type: "success" })
  }

  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);



  return {
    postNewInternshipsData,
    EditNewInternshipsData,
    getDuplicateInternship,
    getAllDepartmentData,
    getAllInternshipsData,
    deleteInternshipData,
    getAllLocationsData,
    getInternshipDetails,
    debouncedSearch,
    departmentsData,
    internshipDetails,
    internshipData,
    locationsData,
    isLoading,
  };
};


export default useCustomHook;