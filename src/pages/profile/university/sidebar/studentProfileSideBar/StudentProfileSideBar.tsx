import { Mail, Call, Intro, LocationIconNew, PlayIconNew } from "../../../../../assets/images";
import { Avatar, Divider } from "antd";
import { BoxWrapper } from "../../../../../components";
import constants from "../../../../../config/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { currentUserState, getProfileImage, studentProfileState } from "../../../../../store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import useCustomHook from "../../../actionHandler";
import { getManagerDetailState } from "../../../../../store/managerCompanyAdmin";

const StudentProfileSideBar = (props: any) => {
  const { data } = props
  let params = useParams()
  const action = useCustomHook();
  // const { firstName, lastName, avatar } = useRecoilValue(currentUserState);
  const personalInformation = useRecoilState<any>(studentProfileState);

  const {
    work: {
      title = ''  ,
      Department = '',
    } = {},
    personalInfo: {
      firstName = '',
      lastName = '',
      personalEmail = '',
      phoneCode = '',
      phoneNumber = '',
      address='',
      profileImage: { mediaId, metaData: { extension } = '' } = '',
    } = {}
  } = personalInformation[0] || {};

  const userinfoData = [
    { img: Mail, title: personalEmail },
    { img: Call, title: phoneNumber },
    { img: LocationIconNew, title: address },
  ];

  useEffect(() => {
    action.getStudentProfile(params?.id);
  }, [])

  return (
    <BoxWrapper>
      <div className="details-wrapper p-[5px] pr-[25px]">
        <div className="user-info-main">
          <div className="user-info flex flex-col items-center">
            {personalInformation[0]?.personalInfo?.profileImage?.mediaId ?
              <img
                src={`${constants.MEDIA_URL}/${mediaId}.${extension}`}
                alt="User Image"
                width={100}
                className="rounded-[50%]"
              />
              :
              <Avatar size={48} src={`${constants.MEDIA_URL}/${mediaId}.${extension}`}>
                {firstName.charAt(0)}{lastName.charAt(0)}
              </Avatar>
            }
            <div className="py-4 text-center">
              <p className="text-xl font-semibold text-primary-color">
              {`${firstName} ${lastName}`}
              </p>
              <p className="text-secondary-color font-medium text-base">{title}</p>
              <p className="text-secondary-color font-medium text-base">{Department}</p>
            </div>
          </div>
          <Divider />
        </div>
        <div className="contact pt-4">
          {userinfoData.map((info, i) => (
            <div className="message  text-secondary-color flex items-center gap-5 my-5" key={i}>
              <div>
                <info.img width={24} />
              </div>
              <p className="m-0 flex flex-wrap">{info.title}</p>
            </div>
          ))}
        </div>
        <Divider />
        <div className="skills-main">
          <p className="text-primary-color font-semibold text-xl mt-8 mb-4">Skills</p>
          <div className="skills flex items-center flex-wrap gap-2 ">
            {personalInformation[0]?.personalInfo?.skills?.map((skill: any, i: any) => (
              <p key={i} className="rounded-[14px] py-[5px] px-[18px] skill-text">
                {skill}
              </p>
            ))}
          </div>
        </div>
        <Divider />
        <div className="intro">
          <p className="heading mt-8 font-semibold">Intro</p>
          <div className="main-div relative">
            <div className="absolute intro-bar">
              <PlayIconNew />
            </div>
            <div className="image mt-[10px] relative">
              <Intro />
            </div>
          </div>
        </div>
      </div>
    </BoxWrapper>
  )
}

export default StudentProfileSideBar