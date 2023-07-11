/// <reference path="../../../jspdf.d.ts" />
import { useState } from "react";
import { useRecoilState } from "recoil";
import { debounce } from "lodash";
import apiEndpints from "../../config/apiEndpoints";
import { internsDataState, internsProfileDataState } from '../../store/interns/index';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import api from "../../api";
import csv from '../../helpers/csv';
import { useNavigate } from "react-router-dom";
import constants, { ROUTES_CONSTANTS } from "../../config/constants";
import dayjs from "dayjs";


// Chat operation and save into store
const useCustomHook = () => {
  const { GET_ALL_INTERNS, GET_INTERNS_PROFILE } = apiEndpints
  const [getAllInterns, setGetAllInters] = useRecoilState(internsDataState);
  const [getInternsProfile, setGetInternsProfile] = useRecoilState(internsProfileDataState)
  const [isLoading, setIsLoading] = useState(false);

  // Get all inters data
  const getAllInternsData = async (searchValue: any) => {
    const { data } = await api.get(GET_ALL_INTERNS,
      {
        userType: 'intern',
        search: searchValue ? searchValue : null
      })
    setGetAllInters(data);
    setIsLoading(true);
  }

  const debouncedSearch = debounce((value, setSearchName) => {
    setSearchName(value);
  }, 500);

  // Get intern profile 
  const navigate = useNavigate();
  const { STUDENTPROFILE } = ROUTES_CONSTANTS

  const getProfile = async (id: any) => {
    const { data } = await api.get(GET_INTERNS_PROFILE, { userId: id });
    setGetInternsProfile(data)
    console.log(data);

    if (data) {
      const userDetails = {
        firstName: data?.personalInfo?.firstName,
        lastName: data?.personalInfo?.lastName,
        gender: data?.personalInfo?.gender.toLowerCase(),
        DOB: dayjs(data?.personalInfo?.DOB).format("DD MMMM, YYYY"),
        birthPlace: data?.personalInfo?.birthPlace,
        nationality: data?.personalInfo?.nationality,
        email: data?.personalInfo?.email,
        phoneNumber: data?.personalInfo?.phoneNumber,
        insuranceNumber: data?.personalInfo?.insuranceNumber,
        visaStatus: data?.personalInfo?.visaStatus,
        aboutMe: data?.personalInfo?.aboutMe,
        postCode: data?.personalInfo?.postCode,
        address: data?.personalInfo?.address,
        city: data?.personalInfo?.city,
        country: data?.personalInfo?.country,
        profileImage: data?.personalInfo?.profileImage,
        skills: data?.personalInfo?.skills,
        hobbies: data?.personalInfo?.hobbies,
        allergies: data?.personalInfo?.allergies,
        medicalCondition: data?.personalInfo?.medicalCondition,
        dependents: data?.dependents,
        // General tab data 
        university: data?.general?.userUniversity?.university?.name,
        course: data?.general?.course,
        universityEmail: data?.general?.universityEmail,
        universityPostcode: data?.general?.userUniversity?.university?.postCode,
        universityAddress: data?.general?.userUniversity?.university?.address,
        universityCity: data?.general?.userUniversity?.university?.city,
        universityCountry: data?.general?.userUniversity?.university?.country,
        universityContactName:`${data?.general?.userUniversity?.contact?.firstName}${data?.general?.userUniversity?.contact?.lastName}`,
        universityContactNo:'',
        internshipStartDate: data?.general?.internshipStartDate,
        internshipEndDate: data?.general?.internshipEndDate,
        internshipDuration: data?.general?.internshipDuration,
        loanDetails: data?.general?.loanDetails,
        workHistory: data?.general?.workHistory,

      }
      console.log(userDetails);
      navigate(`${STUDENTPROFILE}/${data?.personalInfo?.userId}`, { state: userDetails })

    }
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

  return {
    downloadPdfOrCsv,
    getAllInternsData,
    debouncedSearch,
    getAllInterns,
    isLoading,
    getProfile,
    getInternsProfile
  };
};

export default useCustomHook;