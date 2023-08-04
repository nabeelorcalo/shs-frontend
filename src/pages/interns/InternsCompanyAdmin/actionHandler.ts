/// <reference path="../../../../jspdf.d.ts" />
import { useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../../api";
import csv from '../../../helpers/csv';
import apiEndpints from "../../../config/apiEndpoints";
import { internsDataState, internsProfileDataState, signatureState } from '../../../store/interns/index';
import { certificateDetailsState, settingDepartmentState, universityDataState } from "../../../store";
import { managersState } from "../../../store";
import { cadidatesListState } from "../../../store/candidates";
import dayjs from "dayjs";
import { Notifications } from "../../../components";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";

// Chat operation and save into store
const useInternsCustomHook = () => {
  const { GET_ALL_INTERNS, SETTING_DAPARTMENT,
    GET_COMPANY_MANAGERS_LIST, GET_COMPANYADMIN_UNIVERSITES,
    UPDATE_CANDIDATE_DETAIL, MEDIA_UPLOAD, GET_INTERNS_PROFILE } = apiEndpints
  const [getAllInters, setGetAllInters] = useRecoilState(internsDataState);
  const [departmentsData, setDepartmentsData] = useRecoilState(settingDepartmentState);
  const [getAllManagers, setGetAllManagers] = useRecoilState(managersState);
  const [getAllUniversities, setGetAllUniversities] = useRecoilState(universityDataState);
  const [updateInterns, setUpdateInterns] = useRecoilState(cadidatesListState);
  const [getInternsProfile, setGetInternsProfile] = useRecoilState(internsProfileDataState);
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);
  const [signature, setSignature] = useRecoilState(signatureState)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { STUDENTPROFILE } = ROUTES_CONSTANTS

  // Get all interns data
  const getAllInternsData = async (state?: any, searchValue?: any, timeFrame?: any,
    startDate?: any, endDate?: any) => {
    const { data } = await api.get(GET_ALL_INTERNS,
      {
        userType: 'intern',
        InternStatus: state?.status === "All" ? null : state?.status,
        departmentId: state?.department === "All" ? null : state?.department,
        assignedManager: state?.manager === "All" ? null : state?.manager,
        userUniversityId: state?.university === "All" ? null : state?.university,
        currentDate: dayjs().format('YYYY-MM-DD'),
        filterType: timeFrame?.toUpperCase().replace(" ", "_"),
        startDate: timeFrame === 'DATE_RANGE' ? startDate?.replace("_", "") : null,
        endDate: timeFrame === 'DATE_RANGE' ? dayjs(endDate)?.format('YYYY-MM-DD') : null,
        search: searchValue ? searchValue : null,
      })
    setGetAllInters(data);
    setIsLoading(true);
  }

  //Get all department data
  const getAllDepartmentData = async () => {
    const { data } = await api.get(SETTING_DAPARTMENT, { page: 1, limit: 10, });
    setDepartmentsData(data)
  };

  // Get all Managers
  const getAllManagersData = async () => {
    const { data } = await api.get(GET_COMPANY_MANAGERS_LIST)
    setGetAllManagers(data);
  }

  //Get all universities data
  const getAllUniuversitiesData = async (val: any) => {
    const { data } = await api.get(GET_COMPANYADMIN_UNIVERSITES, { page: 1, limit: 100, });
    setGetAllUniversities(data)
  };

  // update candidate data 
  const updateCandidatesRecords = async (internId: any, mangerId?: any, terminateReason?: any, status?: string) => {
    const id = Number(internId)
    const params: any = {}
    if (status === 'completed') {
      params["internStatus"] = 'completed'
      params["internshipEndDate"] = dayjs()
    } else if (terminateReason) {
      params["terminationReason"] = terminateReason;
      params["internStatus"] = 'terminated';
      params["internshipEndDate"] = dayjs()
    } else {
      params["assignedManager"] = mangerId
    }

    const res: any = await api.put(`${UPDATE_CANDIDATE_DETAIL}?id=${id}`, params)
    getAllInternsData()
    if (res.message === 'Success') {
      Notifications({ title: "Success", description: "Intern updated successfully", type: "success" })
    }

  }

  //Search
  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);


  const getProfile = async (id: any) => {
    const { data } = await api.get(GET_INTERNS_PROFILE, { userId: id });
    setGetInternsProfile(data);

    const { firstName, lastName, gender, DOB, birthPlace, nationality, email,
      phoneNumber, insuranceNumber, visaStatus, aboutMe, postCode, address, city,
      country, profileImage, skills, hobbies, allergies, medicalCondition
    } = data.personalInfo;

    const { course, universityEmail, internshipStartDate, internshipEndDate,
      internshipDuration, loanDetails, workHistory, emergencyContactName, emergencyContactPhoneNumber,
      emergencyContactRelationship, emergencyContactPostCode, emergencyContactAddress, emergencyContactCity,
      emergencyContactCountry
    } = data?.general;

    if (data) {
      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        gender: gender.toLowerCase(),
        DOB: dayjs(DOB).format("DD MMMM, YYYY"),
        birthPlace: birthPlace,
        nationality: nationality,
        email: email,
        phoneNumber: phoneNumber,
        insuranceNumber: insuranceNumber,
        visaStatus: visaStatus,
        aboutMe: aboutMe,
        postCode: postCode,
        address: address,
        city: city,
        country: country,
        profileImage: profileImage,
        skills: skills,
        hobbies: hobbies,
        allergies: allergies,
        medicalCondition: medicalCondition,
        dependents: data?.dependents,
        // General tab data 
        university: data?.general?.userUniversity?.university?.name,
        course: course,
        universityEmail: universityEmail,
        universityPostcode: data?.general?.userUniversity?.university?.postCode,
        universityAddress: data?.general?.userUniversity?.university?.address,
        universityCity: data?.general?.userUniversity?.university?.city,
        universityCountry: data?.general?.userUniversity?.university?.country,
        universityContactName: data?.general?.userUniversity?.contact?.firstName,
        universityContactNo: data?.general?.userUniversity?.contact?.phoneNumber,
        internshipStartDate: internshipStartDate,
        internshipEndDate: internshipEndDate,
        internshipDuration: internshipDuration,
        loanDetails: loanDetails,
        workHistory: workHistory,
        emergencyContactName: emergencyContactName,
        emergencyContactPhoneNumber: emergencyContactPhoneNumber,
        emergencyContactRelationship: emergencyContactRelationship,
        emergencyContactPostCode: emergencyContactPostCode,
        emergencyContactAddress: emergencyContactAddress,
        emergencyContactCity: emergencyContactCity,
        emergencyContactCountry: emergencyContactCountry,
        // documents 
        docs: data?.docs

      }
      navigate(`${STUDENTPROFILE}/${data?.personalInfo?.userId}`, { state: userDetails })

    }
  }

  const urlToFile = (url: any) => {
    let arr = url.split(",");
    let mime = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];
    let dataStr = atob(data);
    let n = dataStr.length;
    let dataArr = new Uint8Array(n);
    while (n--) {
      dataArr[n] = dataStr.charCodeAt(n);
    }
    let file = new File([dataArr], `File(${new Date().toLocaleDateString("en-US")}).png`, { type: mime, });
    return file;
  };

  let headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };

  const postSignature = async (file: any) => {
    let dataURL: any = file?.getTrimmedCanvas()?.toDataURL("image/png");
    let Signaturefile = file?.isEmpty() ? null : urlToFile(dataURL);
    DrawSignature(Signaturefile)
  }
  const DrawSignature = (Signaturefile: any) => {
    const formData: any = new FormData();
    formData.append('file', Signaturefile)
    api.post(MEDIA_UPLOAD, formData, headerConfig).then((res) => {
      // setfeedbackFormData({ ...feedbackFormData, supervisorSig: data?.url })
      // setOpenModal(false)
      setSignature(res?.data?.url)
    })
  }

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "Pdf" || type === "PDF")
      pdf(`${fileName}`, header, data);
    else
      csv(`${fileName}`, header, data, true); // csv(fileName, header, data, hasAvatar)
  }

  const pdf = (fileName: string, header: any, data: any) => {
    const title = fileName;
    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const marginLeft = 40;

    const body = data.map(({ no, name, department, joining_date, date_of_birth }: any) =>
      [no, name, department, joining_date, date_of_birth]
    );

    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    doc.text(title, marginLeft, 40);

    doc.autoTable({
      head: [header],
      body: body,
      margin: { top: 50 },

      headStyles: {
        fillColor: [230, 244, 249],
        textColor: [20, 20, 42],
        fontStyle: 'normal',
        fontSize: 12,
      },

      didParseCell: async (item: any) => {
        if (item.row.section === "head")
          item.cell.styles.fillColor = [230, 244, 249];
        else
          item.cell.styles.fillColor = false;
      },

      didDrawCell: async (item: any) => {
        if (item.column.dataKey === 2 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          var dim = 20;

          // const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
          // doc.addImage(img, xPos+10, yPos, dim, dim);

          // doc.setFillColor(255, 0, 0);
          // doc.roundedRect(xPos,yPos+6, 100, 20, 5, 5, 'F'); //doc.roundedRect(xPos,yPos, width, height, radius, radius, 'F');

          // const img = new Image();
          // img.src = svg;
          // item.cell.padding('vertical', 0);
          // doc.addImage(img, 'PNG', xPos+10, yPos, 20, 20);
        }
      },
    });

    doc.save(`${fileName}.pdf`);
  };

  
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


  return {
    getAllDepartmentData,
    downloadPdfOrCsv,
    getAllInternsData,
    debouncedSearch,
    getAllManagersData,
    getAllUniuversitiesData,
    updateCandidatesRecords,
    updateInterns,
    getAllUniversities,
    getAllManagers,
    getAllInters,
    departmentsData,
    isLoading,
    postSignature,
    signature,
    certificateDetails,
    getInternsProfile,
    getProfile,
    handleUploadFile,
    handleClear,
    setFile
  };
};

export default useInternsCustomHook;