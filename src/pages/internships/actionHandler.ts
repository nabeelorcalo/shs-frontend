import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { internshipDataState, internshipDetailsState } from '../../store';
import { settingDepartmentState,settingLocationState } from "../../store/Setting"
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Notifications } from "../../components";
import { ROUTES_CONSTANTS } from "../../config/constants";

const useCustomHook = () => {
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState(internshipDetailsState);
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [locationsData, setLocationsData] = useRecoilState(settingLocationState);
  const navigate = useNavigate()
  const {
    GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS,
    DEL_INTERNSHIP, POST_NEW_INTERNSHIP,
    DUPLICATE_INTERNSHIP, EDIT_INTERNSHIP,
    SETTING_DAPARTMENT,SETTING_LOCATION} = apiEndpints
  const { state } = useLocation();

  useEffect(() => {
    debouncedResults.cancel();
  });

  //get all internship data
  const getAllInternshipsData = async (event: any) => {
    const { data } = await api.get(GET_LIST_INTERNSHIP, { companyId: 1, page: 1, limit: 10, status: event ? event : null });
    setInternshipData(data);
  };

  //get all department data
  const getAllDepartmentData = async () => {
    const { data } = await api.get(SETTING_DAPARTMENT, { page: 1, limit: 10 });
    setDepartmentsData(data)
  };

  //get all locations data
  const getAllLocationsData = async () => {
    const { data } = await api.get(SETTING_LOCATION, { page: 1, limit: 10 });
    setLocationsData(data)
  };

  //post new Internship
  const postNewInternshipsData = async (values: any) => {
    const { title, description, responsibilities, requirements, typeofwork, frequency,
      amount, natureofwork, positions, closingDate, duration, internshiptype } = values
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
      "salaryType": internshiptype,
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
  // edit internship 
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
      "status": "PENDING"
    }
    await api.post(`${EDIT_INTERNSHIP}?id=${state}`, internshipData);
    console.log("edit data", state);
    // setInternshipData
    // Notifications({ title: "Success", description: "Internship Added", type: "success" })
  };
  //duplicate internship
  const getDuplicateInternship = async (val: any) => {
    await api.post(`${DUPLICATE_INTERNSHIP}?id=${val}`);
    console.log("dublicated intership is", val);
    getAllInternshipsData
  }

  const getInternshipDetails = async () => {
    const { data } = await api.get(GET_INTERNSHIP_DETAILS, { id: state });
    setInternshipDetails(data)
  };

  //delete internship
  const deleteInternshipData = async (id: any,) => {
    await api.delete(`${DEL_INTERNSHIP}?id=${id}`);
    getAllInternshipsData(null)
    Notifications({ title: "Success", description: "Internship deleted", type: "success" })
  }

  //search internship
  const changeHandler = async (val: any) => {
    const { data } = await api.get(
      GET_LIST_INTERNSHIP,
      val
        ? { companyId: 1, page: 1, limit: 10, search: val }
        : { companyId: 1, page: 1, limit: 10 }
    );
    setInternshipData(data);
  };
  const debouncedResults = useMemo(() => {
    return debounce(changeHandler, 500);
  }, []);

  return {
    departmentsData,
    locationsData,
    internshipData,
    internshipDetails,
    getAllInternshipsData,
    getInternshipDetails,
    deleteInternshipData,
    changeHandler,
    postNewInternshipsData,
    getDuplicateInternship,
    EditNewInternshipsData,
    getAllDepartmentData,
    getAllLocationsData
  };
};

export default useCustomHook;