import { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { internshipDataState, internshipDetailsState, dublicateInternshipState } from '../../store';
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Notifications } from "../../components";

const useCustomHook = () => {
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState(internshipDetailsState);
  // const [dublicateInternship, setDublicateInternship] = useRecoilState(dublicateInternshipState);
  const { GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS,
    DEL_INTERNSHIP, POST_NEW_INTERNSHIP, DUBLICATE_INTERNSHIP } = apiEndpints
  const { state } = useLocation();
  const navigate = useNavigate()

  useEffect(() => {
    debouncedResults.cancel();
  });
  //get all internship data
  const getAllInternshipsData = async () => {
    const { data } = await api.get(GET_LIST_INTERNSHIP, { companyId: 1, page: 1, limit: 10 });
    setInternshipData(data);
  };
  //post new Internship
  const postNewInternshipsData = async (values: any) => {
    const {
      title, description, responsibilities,
      requirements, typeofwork, frequency,
      amount, natureofwork, location, positions, datePicker, duration } = values
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
      "salaryType": "PAID",
      "salaryFrequency": frequency,
      "salaryCurrency": "$",
      "salaryAmount": Number(amount),
      "totalPositions": Number(positions),
      "closingDate": datePicker,
      "duration": duration,
      "status": "PENDING",
      "location":{
        "name":location
      }
    }
    await api.post(POST_NEW_INTERNSHIP, internshipData);
    console.log("data are ", values);
    getAllInternshipsData()
    Notifications({ title: "Success", description: "Internship Added", type: "success" })
    navigate('/internships')
  };

  //dublicate internship
  const getDublicateInternship = async (val: any) => {
    await api.post(`${DUBLICATE_INTERNSHIP}?id=${val}`);
    console.log("dublicated intership is", val);
    getAllInternshipsData()
    Notifications({ title: "Success", description: "Internship Dublicated", type: "success" })
  }

  const getInternshipDetails = async () => {
    const { data } = await api.get(GET_INTERNSHIP_DETAILS, { id: state });
    setInternshipDetails(data)
  };

  //delete internship
  const deleteInternshipData = async (val: any) => {
    await api.delete(`${DEL_INTERNSHIP}?id=${val}`);
    getAllInternshipsData()
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
    internshipData,
    internshipDetails,
    getAllInternshipsData,
    getInternshipDetails,
    deleteInternshipData,
    changeHandler,
    postNewInternshipsData,
    getDublicateInternship
  };
};


export default useCustomHook;