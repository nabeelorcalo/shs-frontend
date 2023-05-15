import { useEffect, useMemo, useState } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { internshipDataState, internshipDetailsState } from '../../store';
import { settingDepartmentState, settingLocationState } from "../../store/Setting"
import { internsDataState } from "../../store/interns/index"
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Notifications } from "../../components";
import { ROUTES_CONSTANTS } from "../../config/constants";

const useCustomHook = () => {
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState(internshipDetailsState);
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [locationsData, setLocationsData] = useRecoilState(settingLocationState);
  const [getAllInterns, setGetAllInters] = useRecoilState(internsDataState);
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {
    GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS,
    DEL_INTERNSHIP, POST_NEW_INTERNSHIP,
    DUPLICATE_INTERNSHIP, EDIT_INTERNSHIP,
    SETTING_DAPARTMENT, SETTING_LOCATION, GET_ALL_INTERNS } = apiEndpints
  const { state } = useLocation();

  useEffect(() => {
    debouncedResults.cancel();
  });

  //Get all internship data
  const getAllInternshipsData = async (status: any, location: any, department: any,) => {
    const params = {
      limit: 10,
      page: 1,
      status: status ? status : undefined,
      locationId: location ? location : undefined,
      departmentId: department ? department : undefined
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

  // Get all inters data
  const getAllInternsData = async () => {
    const { data } = await api.get(GET_ALL_INTERNS, { userType: 'intern' })
    setGetAllInters(data);
    setIsLoading(true);
  }

  //Post new Internship
  const postNewInternshipsData = async (values: any) => {
    const { title, description, responsibilities, requirements, typeofwork, frequency,
      amount, natureofwork, positions, closingDate, duration, salaryType } = values
    const internshipData = {
      "companyId": 1,
      "title": title,
      "departmentId": 1,
      "description": description,
      "responsibilities": responsibilities,
      "requirements": requirements,
      "internType": typeofwork,
      "locationType": natureofwork,
      "locationId": 1,
      "salaryType": salaryType,
      "salaryFrequency": frequency,
      "salaryCurrency": "$",
      "salaryAmount": Number(amount),
      "totalPositions": Number(positions),
      "closingDate": closingDate,
      "duration": duration,
      "status": "PENDING"
    }

    const { data } = await api.post(POST_NEW_INTERNSHIP, internshipData);
    if (data) {
      Notifications({ title: "Success", description: "Internship Added", type: "success" })
      navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}`)
    }


  };

  // Edit internship 
  const EditNewInternshipsData = async (values: any) => {
    const {
      title, description, responsibilities,
      requirements, typeofwork, frequency,
      amount, natureofwork, positions,
      datePicker, duration, internshipType } = values
    const internshipData = {
      "companyId": 1,
      "title": title,
      "departmentId": 1,
      "description": description,
      "responsibilities": responsibilities,
      "requirements": requirements,
      "internType": typeofwork,
      "locationType": natureofwork,
      "locationId": 1,
      "salaryType": internshipType,
      "salaryFrequency": frequency,
      "salaryCurrency": "$",
      "salaryAmount": Number(amount),
      "totalPositions": Number(positions),
      "closingDate": datePicker,
      "duration": duration,
      "status": "PENDING",
      "location": {
        "name": location
      }
    }
    await api.post(`${EDIT_INTERNSHIP}?id=${state}`, internshipData);
    console.log("edit data", state);
    // setInternshipData
    // Notifications({ title: "Success", description: "Internship Added", type: "success" })
  };

  //Duplicate internship
  const getDuplicateInternship = async (val: any) => {
    await api.post(`${DUPLICATE_INTERNSHIP}?id=${val}`);
    console.log("dublicated intership is", val);
    getAllInternshipsData(null, null, null)
    Notifications({ title: "Success", description: "Duplicate successfully", type: "success" })
  }

  const getInternshipDetails = async () => {
    const { data } = await api.get(GET_INTERNSHIP_DETAILS, { id: state });
    setInternshipDetails(data)
  };

  //Delete internship
  const deleteInternshipData = async (id: any) => {
    await api.delete(`${DEL_INTERNSHIP}?id=${id}`);
    getAllInternshipsData(null, null, null)
    Notifications({ title: "Success", description: "Internship deleted", type: "success" })
  }

  //Search internship
  const changeHandler = async (val: any) => {
    const { data } = await api.get(GET_LIST_INTERNSHIP,
      val
        ? { page: 1, limit: 10, search: val }
        : { page: 1, limit: 10 }
    );
    setInternshipData(data);
  };
  const debouncedResults = useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  return {
    postNewInternshipsData,
    EditNewInternshipsData,
    getDuplicateInternship,
    getAllDepartmentData,
    getAllInternshipsData,
    deleteInternshipData,
    getAllLocationsData,
    getInternshipDetails,
    getAllInternsData,
    changeHandler,
    departmentsData,
    internshipDetails,
    internshipData,
    locationsData,
    getAllInterns,
    isLoading,
  };
};


export default useCustomHook;