import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import api from "../../api";
import apiEndpints from "../../config/apiEndpoints";
import { cadidatesInterviewListState, cadidatesListState, currentUserState, internshipDataState, internshipDetailsState, selectedCandidateState } from '../../store';
import { settingDepartmentState, settingLocationState } from "../../store/Setting"
import { useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";
import { Notifications } from "../../components";
import { ROUTES_CONSTANTS } from "../../config/constants";

const useCustomHook = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const [internshipData, setInternshipData] = useRecoilState(internshipDataState);
  const [internshipDetails, setInternshipDetails] = useRecoilState<any>(internshipDetailsState);
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [locationsData, setLocationsData] = useRecoilState(settingLocationState);
  const [isLoading, setIsLoading] = useState(false);

  // pipe line states start here 

  const [cadidatesList, setCadidatesList] = useRecoilState<any>(cadidatesListState);
  const [studentDetails, setStudentDetails] = useState<any>();
  const [selectedCandidate, setSelectedCandidate] = useRecoilState<any>(selectedCandidateState);
  // company manager list 
  const [companyManagerList, setCompanyManagerList] = useState<any>([]);
  //interview event list
  const [interviewList, setInterviewList] = useRecoilState<any>(cadidatesInterviewListState);
  //interview event list
  const [templateList, setTemplateList] = useState<any>([]);


  // pipe line states end here 

  const {
    GET_LIST_INTERNSHIP, GET_INTERNSHIP_DETAILS,
    DEL_INTERNSHIP, POST_NEW_INTERNSHIP,
    DUPLICATE_INTERNSHIP, EDIT_INTERNSHIP,
    SETTING_DAPARTMENT, SETTING_LOCATION,
    ADMIN_MEETING_LIST, DELETE_MEETING, GET_ALL_TEMPLATES,
    GET_SINGLE_COMPANY_MANAGER_LIST, UPDATE_MEETING,
    CREATE_MEETING, STUDENT_PROFILE, UPDATE_CANDIDATE_DETAIL } = apiEndpints;

  // geting current logged-in user company
  const { company: { id: companyId } } = useRecoilValue<any>(currentUserState);

  // get student details
  const getStudentDetails = async (userId: any) => {
    await api.get(STUDENT_PROFILE, { userId }).then(({ data }: any) => {
      setStudentDetails(data)
    })
  }

  //Get all internship data
  const getAllInternshipsData = async (state: any = null, searchValue: any = null) => {
    let params: any = {
      limit: 100,
      page: 1,
      status: state?.status === "All" ? null : state?.status,
      locationId: state?.location === "All" ? null : state?.location,
      departmentId: state?.department === "All" ? null : state?.department,
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
      amount, natureofwork, positions, closingDate, duration, amountType, salaryType,
      department, status, location, currencyType } = values
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
      "salaryCurrency": currencyType,
      "salaryAmount": amount ? Number(amount) : undefined,
      "totalPositions": positions ? Number(positions) : undefined,
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
  const EditNewInternshipsData = async (values: any, updateStatus?: string) => {
    const {
      title, description, responsibilities,
      requirements, typeofwork, frequency, amount, natureofwork,
      positions, closingDate, duration, internshipType, salaryAmount,
      department, status, locationId, id } = values
    const internshipData = {
      "id": state?.id ? state?.id : id,
      "title": title,
      "departmentId": Number(department),
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
    getAllInternshipsData()
    navigate(`/${ROUTES_CONSTANTS.INTERNSHIPS}`)
    Notifications({ title: "Success", description: `Internship ${updateStatus ? updateStatus?.toLowerCase() : 'edited'}`, type: "success" })
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
    getAllInternshipsData();
    Notifications({ title: "Success", description: "Internship deleted", type: "success" })
  }

  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  // pipeline code start here 

  // funtion for update rating
  const handleRating = async (selectedId: string | number, rating: string | number) => {
    // await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${selectedId ? selectedId : id}`, { rating }, { id }).then((res: any) => {
    //   setSelectedCandidate({ ...selectedCandidate, rating: res?.data?.rating })
    //   Notifications({ title: "Rating", description: "Rating updated successfully" });
    //   setCadidatesList((prev: any) => ({
    //     ...prev,
    //     data: cadidatesList?.data?.map((item: any) => (item?.id === id ? { ...item, rating: res?.data?.rating } : item))
    //   }));
    // });
  };

  // get schedule interview list
  const getScheduleInterviews = async (userId: string | number) => {
    setIsLoading(true)
    let params: any = {
      userId,
    }
    await api.get(`${ADMIN_MEETING_LIST}/${userId}`, params).then((res: any) => {
      setInterviewList(res?.data)
    })
    setIsLoading(false)
  }

  const interviewStaticBodyData = {
    companyId: companyId,
    title: "interview",
    recurrence: "DOES_NOT_REPEAT",
    reapeatDay: 0,
    address: "",
    eventType: "INTERVIEW",
  }

  // schedule interview
  const scheduleInterview = async (values: any) => {
    setIsLoading(true)
    await api.post(CREATE_MEETING, { ...interviewStaticBodyData, ...values }).then(({ data }: any) => {
      setInterviewList([...interviewList, data])
      Notifications({ title: "Interview Schedule", description: "Interview Schedule successfully" })
    })
    setIsLoading(false)
  }
  // UPDATE interview
  const handleUpdateInterview = async (candidateId: string | number, meetingId: string | number, values: any) => {
    await api.put(`${UPDATE_MEETING}/${meetingId}`, { ...interviewStaticBodyData, ...values }).then(({ data }: any) => {
      setInterviewList(interviewList?.map((obj: any) => (obj?.id !== meetingId) ? data : obj))
      getScheduleInterviews(candidateId)
      Notifications({ title: "Interview", description: "Interview meeting updated!" })
    })
  }

  // delete interview
  const deleteInterview = async (meetingId: string | number) => {
    await api.delete(`${DELETE_MEETING}/${meetingId}`).then(() => {
      setInterviewList(interviewList?.filter(({ id }: any) => id !== meetingId))
      Notifications({ title: "Interview", description: "Interview meeting deleted!" })
    });
  }

  // get templates
  const getTemplates = async (query: string) => {
    let params: any = {
      page: 1,
      limit: 0
    }
    query && (params.searchByType = query)
    await api.get(GET_ALL_TEMPLATES, params).then((res: any) => { setTemplateList(res?.data) })
  }


  // get company manager list for schedule interview form attendees
  const getCompanyManagerList: any = async (search?: string) => {
    setIsLoading(true)
    await api.get(GET_SINGLE_COMPANY_MANAGER_LIST, { search })
      .then((res: any) => {
        setCompanyManagerList(res?.data?.map((res: any) => (res)))
      })
    setIsLoading(false)
  }



  // pipeline code ends here 


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
    // pipeline start 
    interviewList,
    getScheduleInterviews,
    deleteInterview,
    getCompanyManagerList,
    companyManagerList,
    handleUpdateInterview,
    scheduleInterview,
    templateList,
    getTemplates,
    studentDetails,
    getStudentDetails,
    handleRating
    // pipeline end 
  };
};


export default useCustomHook;