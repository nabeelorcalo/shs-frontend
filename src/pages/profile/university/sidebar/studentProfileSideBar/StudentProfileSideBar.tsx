import { Mail, Call, LocationIconNew, PlayBtn, Thumbnail } from "../../../../../assets/images";
import { Avatar } from "antd";
import { BoxWrapper } from "../../../../../components";
import constants from "../../../../../config/constants";
import './Styles.scss'

const StudentProfileSideBar = (props: any) => {
  const { data } = props;
  const { email, phoneNumber, address, skills, profileImage, firstName, lastName, Department, title } = data

  const userinfoData = [
    { img: Mail, title: email ?? "N/A", },
    { img: Call, title: phoneNumber ?? "N/A" },
    { img: LocationIconNew, title: address ?? "N/A" },
  ];

  return (
    <BoxWrapper>
      <div className="details-sidebar-wrapper p-[5px] pr-[25px]">
        <div className="user-info-main">
          <div className="user-info flex flex-col items-center">
            <Avatar size={80} className="rounded-full object-cover relative"
              src={`${constants.MEDIA_URL}/${profileImage?.mediaId}.${profileImage?.metaData?.extension}`}>
              {firstName?.charAt(0)}
              {lastName?.charAt(0)}
            </Avatar>
            <div className="py-4 text-center">
              <p className="text-xl font-semibold text-primary-color">
                {firstName || 'N/A'} {lastName || 'N/A'}
              </p>
              <p className="text-secondary-color font-medium text-base">{title || 'N/A'}</p>
              <p className="text-secondary-color font-medium text-base">{Department || 'N/A'}</p>
              {/* <p className="text-secondary-color font-medium text-base">{data?.internship?.department?.description}</p> */}
            </div>
          </div>
        </div>
        <div className="contact pt-4">
          {userinfoData?.map((info, i) => (
            <div className="message  text-secondary-color flex items-center gap-5 my-5" key={i}>
              <div> <info.img width={24} /></div>
              <p className="m-0 flex flex-wrap">{info.title || 'N/A'}</p>
            </div>))}
        </div>
        <div className="skills-main">
          <p className="text-primary-color font-semibold text-xl mt-8 mb-4">Skills</p>
          {skills?.length === 0 ? "No skills found" :
            <div className="skills flex items-center flex-wrap gap-2 ">
            {skills?.map((skill: any, i: number) => (
              <p key={i} className="rounded-[14px] py-[5px] px-[18px] skill-text text-input-bg-color">
                {skill || 'N/A'}
              </p>
            ))}
            {data?.skills?.length >= 9 &&
              <p className="plus rounded-[14px] py-[2px] px-[12px]">+{data?.skills?.length - 8}</p>}
          </div>}
        </div>
        <div className="intro">
          <p className="heading mt-8 font-semibold">Intro</p>
          <div className="main-div flex justify-start">
            <div className="image mt-[10px] flex justify-center items-center">
              <img src={Thumbnail} alt="thumbnail" />
              <div className=" intro-bar absolute cursor-pointer">
                <PlayBtn className="icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </BoxWrapper>
  )
}

export default StudentProfileSideBar