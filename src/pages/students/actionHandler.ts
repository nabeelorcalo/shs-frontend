/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from "../../helpers/csv";
import endpoints from "../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { universityIntersDataState } from "../../store";
import { debounce } from "lodash";
import dayjs from 'dayjs';
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../config/constants";
import { internsProfileDataState, universityCompanies } from "../../store/interns";

// Chat operation and save into store
const useStudentsCustomHook = () => {
  const { STUDENTPROFILE } = ROUTES_CONSTANTS;
  const navigate = useNavigate();
  const { GET_UNIVERSITYINTERNS, GET_INTERNS_PROFILE, GET_ALL_COMAPANIES } = endpoints;
  const [universityIntersData, setUniversityIntersData] = useRecoilState(universityIntersDataState);
  const [getInternsProfile, setGetInternsProfile] = useRecoilState(internsProfileDataState);
  const [uniCompaniesData, setUniCompaniesData] = useRecoilState(universityCompanies)
  const [isLoading, setIsLoading] = useState(false)

  const getUniIntersTableData = async (id: any, searchValue: any, states: any) => {
    const params = {
      userUniversityId: id,
      page: 1,
      limit: 10,
      companyId: states.company === "All" ? null : states.company,
      joiningDate: states.joiningDate ? dayjs(states.joiningDate).format('YYYY-MM-DD') : null,
      search: searchValue
    }
    setIsLoading(true);
    const { data } = await api.get(GET_UNIVERSITYINTERNS, params);
    setUniversityIntersData(data);
    setIsLoading(false);
  };

  const debouncedSearch = debounce((value: any, setSearchName: any) => {
    setSearchName(value);
  }, 500);

  // get all companies 
  const getCompaniesData = async (userUniversityId: number) => {
    const params = {
      userUniversityId,
      limit: 100,
      page: 1,
    }
    setIsLoading(true);
    const { data } = await api.get(GET_ALL_COMAPANIES, params);
    if (data) {
      setIsLoading(false)
      setUniCompaniesData(data)
    }
  };


  // Get intern profile 
  const getProfile = async (id: any) => {
    const { data } = await api.get(GET_INTERNS_PROFILE, { userId: id });

    const { firstName, lastName, gender, DOB, birthPlace, nationality, email,
      phoneNumber, insuranceNumber, visaStatus, aboutMe, postCode, address, city,
      country, profileImage, skills, hobbies, allergies, medicalCondition, dependents
    } = data.personalInfo;

    const { course, universityEmail, internshipStartDate, internshipEndDate,
      internshipDuration, loanDetails, workHistory, emergencyContactName, emergencyContactPhoneNumber,
      emergencyContactRelationship, emergencyContactPostCode, emergencyContactAddress, emergencyContactCity,
      emergencyContactCountry
    } = data?.general;

    setGetInternsProfile(data);

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
        dependents,
        Hiring: data?.work?.Hiring,
        title: data?.work?.title,
        Department: data?.work?.Department,


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
      navigate(`${STUDENTPROFILE}/${id}`, { state: userDetails })
      console.log(data, 'data');

    }
  }

  const downloadPdfOrCsv = (event: any, header: any, data: any, fileName: any) => {
    const type = event?.target?.innerText;

    if (type === "PDF" || type === "Pdf")
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
    const body = data.map(({ id, name, title, companyrep, company, date_of_joining }: any) =>
      [id, name, title, companyrep, company, date_of_joining]
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
        if (item.column.dataKey === 1 && item.section === "body") {
          const xPos = item.cell.x;
          const yPos = item.cell.y;
          var dim = 20;

          // const img = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gKgSUNDX1BST0ZJTEUAAQEAAAKQbGNtcwQwAABtbnRyUkdCIFhZWiAH3QAIAA4AFgAoAB1hY3NwQVBQTAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA9tYAAQAAAADTLWxjbXMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAtkZXNjAAABCAAAADhjcHJ0AAABQAAAAE53dHB0AAABkAAAABRjaGFkAAABpAAAACxyWFlaAAAB0AAAABRiWFlaAAAB5AAAABRnWFlaAAAB+AAAABRyVFJDAAACDAAAACBnVFJDAAACLAAAACBiVFJDAAACTAAAACBjaHJtAAACbAAAACRtbHVjAAAAAAAAAAEAAAAMZW5VUwAAABwAAAAcAHMAUgBHAEIAIABiAHUAaQBsAHQALQBpAG4AAG1sdWMAAAAAAAAAAQAAAAxlblVTAAAAMgAAABwATgBvACAAYwBvAHAAeQByAGkAZwBoAHQALAAgAHUAcwBlACAAZgByAGUAZQBsAHkAAAAAWFlaIAAAAAAAAPbWAAEAAAAA0y1zZjMyAAAAAAABDEoAAAXj///zKgAAB5sAAP2H///7ov///aMAAAPYAADAlFhZWiAAAAAAAABvlAAAOO4AAAOQWFlaIAAAAAAAACSdAAAPgwAAtr5YWVogAAAAAAAAYqUAALeQAAAY3nBhcmEAAAAAAAMAAAACZmYAAPKnAAANWQAAE9AAAApbcGFyYQAAAAAAAwAAAAJmZgAA8qcAAA1ZAAAT0AAACltwYXJhAAAAAAADAAAAAmZmAADypwAADVkAABPQAAAKW2Nocm0AAAAAAAMAAAAAo9cAAFR7AABMzQAAmZoAACZmAAAPXP/bAEMABQMEBAQDBQQEBAUFBQYHDAgHBwcHDwsLCQwRDxISEQ8RERMWHBcTFBoVEREYIRgaHR0fHx8TFyIkIh4kHB4fHv/bAEMBBQUFBwYHDggIDh4UERQeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHv/AABEIABgAGAMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAABwYI/8QAJxAAAQMEAQMDBQAAAAAAAAAAAQIDBAAFBhEhEiIxBxNBFjJRYXH/xAAZAQACAwEAAAAAAAAAAAAAAAAAAwEEBQb/xAAjEQABAwMDBQEAAAAAAAAAAAABAAIDBAUREjHBITJBUWHR/9oADAMBAAIRAxEAPwDbTM5x+0YE5lYlx7hEZ6W1JhyEOkvK8NbBICufn4BNS+7et31DZJlonW6Lbo01Pt+83KJcbTvfIOgeBo615qNYplFvhTDCessNmySnEiWw2pXU5pCkpWVkk7T1E8Ac7/NVbJIuGW7DlS4NsTCQ5BLSAqO2tEpSk9ijvvQrz3A62N6oqbjI7DCN1bp7fGdUgcOiy8eEJLYmwVbbcOkFKu0jyRz92tUpiubWGBbXrbd8MiSYpTpo2+c7HU0oAd/QSpClk8lSgfNKNZyoGMbKRpRw4jWlAbT+q6Q9EfTy85RhMJN7aadQ06JVvZkOnpcaI0UqPI6SeQn+71ulKWWhz2tPn8KZTjuPocrO5xYo87KH3I9si2dMhKBHaRFUlKhyknpA7TxsnQApSlZVRVyQENaustVvpauMulYMj6Rzhf/Z";
          // doc.addImage(img, xPos + 10, yPos, dim, dim);

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


  return {
    setUniversityIntersData,
    getUniIntersTableData,
    universityIntersData,
    uniCompaniesData,
    downloadPdfOrCsv,
    getCompaniesData,
    debouncedSearch,
    getProfile,
    isLoading,
  };
};

export default useStudentsCustomHook;