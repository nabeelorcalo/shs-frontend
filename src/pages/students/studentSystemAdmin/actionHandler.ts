/// <reference path="../../../../jspdf.d.ts" />
import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";

import jsPDF from "jspdf";
import "jspdf-autotable";
import api from "../../../api";
import csv from "../../../helpers/csv";
import constants from "../../../config/constants";
import { useRecoilState } from "recoil";
import apiEndPoints from "../../../config/apiEndpoints";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../config/constants";
import dayjs from "dayjs";
import { internsProfileDataState,studentSystemAdminState } from "../../../store";

// Chat operation and save into store
const useCustomHook = () => {
  const navigate = useNavigate();
  const { STUDENTPROFILE } = ROUTES_CONSTANTS;
  const [subAdminStudent, setSubAdminStudent] = useRecoilState(
    studentSystemAdminState
  );
  const [getInternsProfile, setGetInternsProfile] = useRecoilState(
    internsProfileDataState
  );

  const {
    STUDENT_SYSTEM_ADMIN,
    FORGOTPASSWORD,
    GET_INTERNS_PROFILE,
    BLOCK_PROPERTY_ACCESS,
    UNBLOCK_PROPERTY_ACCESS
  } = apiEndPoints;

  const getSubAdminStudent = async (param: any) => {
    const { data } = await api.get(STUDENT_SYSTEM_ADMIN, param);
    setSubAdminStudent(data);
  };

  const studentAccess = async ( values: any, onSuccess?: () => void) => {
    const url  = `${values?.access === "block"? BLOCK_PROPERTY_ACCESS : UNBLOCK_PROPERTY_ACCESS}?email=${values.email}`
    const response = await api.patch(url);
    if (onSuccess) onSuccess();
    return response;
  };

  const getProfile = async (id: any) => {
    const { data } = await api.get(GET_INTERNS_PROFILE, { userId: id });
    setGetInternsProfile(data);

    const {
      firstName,
      lastName,
      gender,
      DOB,
      birthPlace,
      nationality,
      email,
      phoneNumber,
      insuranceNumber,
      visaStatus,
      aboutMe,
      postCode,
      address,
      city,
      country,
      profileImage,
      skills,
      hobbies,
      allergies,
      medicalCondition,
    } = data.personalInfo;

    const {
      course,
      universityEmail,
      internshipStartDate,
      internshipEndDate,
      internshipDuration,
      loanDetails,
      workHistory,
      emergencyContactName,
      emergencyContactPhoneNumber,
      emergencyContactRelationship,
      emergencyContactPostCode,
      emergencyContactAddress,
      emergencyContactCity,
      emergencyContactCountry,
    } = data?.general;

    const userInfo = data?.general?.userUniversity;

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
        university: userInfo?.university?.name,
        course: course,
        universityEmail: universityEmail,
        universityPostcode: userInfo?.university?.postCode,
        universityAddress: userInfo?.university?.address,
        universityCity: userInfo?.university?.city,
        universityCountry: userInfo?.university?.country,
        universityContactName: userInfo?.contact?.firstName,
        universityContactNo: userInfo?.contact?.phoneNumber,
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
        docs: data?.docs,
      };
      navigate(`${STUDENTPROFILE}/${data?.personalInfo?.userId}`, {
        state: userDetails,
      });
    }
  };

  const didParseCell = async (item: any) => {
    if (item.row.section === "head")
      item.cell.styles.fillColor = [230, 244, 249];
    else item.cell.styles.fillColor = false;
  };
  const didDrawCell = async (item: any) => {
    if (item.column.dataKey === 2 && item.section === "body") {
      const xPos = item.cell.x;
      const yPos = item.cell.y;
      var dim = 20;
    }
  };

  const downloadPdfOrCsv = (
    event: any,
    header: any,
    data: any,
    fileName: any,
    body: any
  ) => {
    if (event === "pdf" || event === "Pdf")
      pdf(`${fileName}`, header, data, body);
    else csv(`${fileName}`, header, data, false);
  };

  const pdf = (fileName: string, header: any, data: any, body: any) => {
    const title = fileName;
    const unit = "pt";
    const size = "A4";
    const orientation = "landscape";
    const marginLeft = 40;
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
        fontStyle: "normal",
        fontSize: 12,
      },
      didParseCell: didParseCell,
      didDrawCell: didDrawCell,
    });

    doc.save(`${fileName}.pdf`);
  };

  const forgotpassword = async (body: any): Promise<any> => {
    const { data } = await api.post(FORGOTPASSWORD, body);
    return data;
  };

  return {
    downloadPdfOrCsv,
    getSubAdminStudent,
    forgotpassword,
    getProfile,
    studentAccess
  };
};

export default useCustomHook;
