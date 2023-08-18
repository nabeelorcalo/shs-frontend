/// <reference path="../../../jspdf.d.ts" />
import { useRecoilState } from "recoil";
import apiEndpints from "../../config/apiEndpoints";
import { internPaginationState, internsDataState, internsProfileDataState } from '../../store/interns/index';
import { ROUTES_CONSTANTS } from "../../config/constants";
import { useNavigate } from "react-router-dom";
import csv from '../../helpers/csv';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import dayjs from "dayjs";
import api from "../../api";


// Chat operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const { STUDENTPROFILE } = ROUTES_CONSTANTS;
  const { GET_ALL_INTERNS, GET_INTERNS_PROFILE } = apiEndpints
  const [allInternsData, setAllInternsData] = useRecoilState(internsDataState);
  const [getInternsProfile, setGetInternsProfile] = useRecoilState(internsProfileDataState)
  const [tableParams, setTableParams]: any = useRecoilState(internPaginationState);

  const getAllInternsData = async (args: any = null, setLoading: any = null, id: any = null) => {
    args.userUniversityId = id
    await api.get(GET_ALL_INTERNS, args).then((res) => {
      setAllInternsData(res);
      setLoading(true);
      const { pagination } = res
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: pagination?.totalResult,
        },
      });
      setLoading(false)
    })
  }

  // Get intern profile 
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
    // debouncedSearch,
    getInternsProfile,
    allInternsData,
    getProfile,
  };
};

export default useCustomHook;