import { Mail, Call, Intro, LocationIconNew, PlayBtn } from "../../../../../assets/images";
import { Avatar, Divider } from "antd";
import { BoxWrapper } from "../../../../../components";
import constants from "../../../../../config/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, getProfileImage, studentProfileState } from "../../../../../store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCustomHook from "../../../actionHandler";
import { getManagerDetailState } from "../../../../../store/managerCompanyAdmin";
import './Styles.scss'
const StudentProfileSideBar = (props: any) => {
  const { data } = props;
  const { email, phoneNumber, address, skills, profileImage, firstName, lastName, Department } = data

  // const {
  //     id,
  //     userDetail: { firstName, lastName, avatar, phoneNumber, email, address },
  //     rating: ratingCount,
  //     stage,
  //     internshipTitle,
  //     internType,
  //     AplliedDate,
  // } = props;
  // const { rating, setRating, handleRating } = actionHandler();

  const userinfoData = [
    { img: Mail, title: email ?? "N/A", },
    { img: Call, title: phoneNumber ?? "N/A" },
    { img: LocationIconNew, title: address ?? "N/A" },
  ];

  // useEffect(() => {
  //   action.getStudentProfile(params?.id);
  // }, [])

  // useEffect(() => setRating(ratingCount), []);

  return (
    <BoxWrapper>
      <div className="details-sidebar-wrapper p-[5px] pr-[25px]">
        <div className="user-info-main">
          <div className="user-info flex flex-col items-center">
            <Avatar className="h-[80px] w-[80px] rounded-full object-cover relative"
              src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData?.extension}`}>
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </Avatar>
            <div className="py-4 text-center">
              <p className="text-xl font-semibold text-primary-color">
                {firstName} {lastName}
              </p>
              <p className="text-secondary-color font-medium text-base">{Department}</p>
              {/* <p className="text-secondary-color font-medium text-base">{data?.internship?.department?.description}</p> */}
            </div>
          </div>

          {/* <Divider /> */}
        </div>
        <div className="contact pt-4">
          {userinfoData?.map((info, i) => (
            <div className="message  text-secondary-color flex items-center gap-5 my-5" key={i}>
              <div> <info.img width={24} /></div>
              <p className="m-0 flex flex-wrap">{info.title}</p>
            </div>))}
        </div>

        {/* <Divider /> */}
        <div className="skills-main">
          <p className="text-primary-color font-semibold text-xl mt-8 mb-4">Skills</p>
          {skills?.length === 0 ? "No skills found" : <div className="skills flex items-center flex-wrap gap-2 ">
            {skills?.map((skill: any, i: number) => (
              <p key={i} className="rounded-[14px] py-[5px] px-[18px] skill-text">
                {skill}
              </p>
            ))}
            {data?.skills?.length >= 9 &&
              <p className="plus rounded-[14px] py-[2px] px-[12px]">+{data?.skills?.length - 8}</p>}
          </div>}
        </div>
        {/* <Divider /> */}
        <div className="intro">
          <p className="heading mt-8 font-semibold">Intro</p>
          <div className="main-div relative">
            <div className=" intro-bar absolute cursor-pointer">
              <PlayBtn  className="icon" />
            </div>
            <div className="image mt-[10px]">
              <Intro />
            </div>
          </div>
        </div>
      </div>
    </BoxWrapper>
  )
}

export default StudentProfileSideBar