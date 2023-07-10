import {
  Mail, Call, Intro, LocationIconNew, PlayIconNew
} from "../../../../../assets/images";
import { Avatar, Divider } from "antd";
import { BoxWrapper } from "../../../../../components";
import "./Styles.scss";
import constants from "../../../../../config/constants";

const StudentProfileSideBar = (props: any) => {
  const { data } = props
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

  const skillsData = [
    "User Interface Design",
    "Illustrator",
    "Documentation",
    "Visual Design",
    "Sketch",
    "UX Strategy",
    "Web Design",
  ];
  const newSkillData = skillsData.slice(0, 6);

  const userinfoData = [
    { img: Mail, title: data?.userDetail?.email ? data?.userDetail?.email : "N/A", },
    { img: Call, title: data?.userDetail?.phoneNumber ? data?.userDetail?.phoneNumber : "N/A" },
    { img: LocationIconNew, title: data?.userDetail?.address ? data?.userDetail?.address : "N/A" },
  ];

  // const dropdownData = [
  //   { heading: "Current Stage" },
  //   { title: "stage", color: "#363565" },
  //   { heading: "Move to" },
  //   { title: "Interviewed", color: "#5879CE" },
  //   { title: "Recommended", color: "#CC7FD4" },
  //   { title: "OfferLetter", color: "#C0ACFF" },
  //   { title: "Contract", color: "#4A9D77" },
  //   { title: "Rejected", color: "#E94E5D" },
  // ];

  // useEffect(() => setRating(ratingCount), []);
  return (
    <BoxWrapper>
      <div className="details-wrapper p-[5px] pr-[25px]">
        <div className="user-info-main">
          <div className="user-info flex flex-col items-center">
            <Avatar className="h-[80px] w-[80px] rounded-full object-cover relative"
              src={`${constants.MEDIA_URL}/${data?.userDetail?.profileImage?.mediaId}.${data?.userDetail?.profileImage?.metaData?.extension}`}
              icon={
                <span className="uppercase text-[36px] leading-[48px] absolute 
                top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                  {data?.userDetail?.firstName?.charAt(0)}
                  {data?.userDetail?.lastName?.charAt(0)}
                </span>
              }>
              {data?.userDetail?.firstName?.charAt(0)}
              {data?.userDetail?.lastName?.charAt(0)}

            </Avatar>

            {/* <p className="user-name capitalize">{`${"firstName"} ${"lastName"}`}</p> */}
            <div className="py-4 text-center">
              <p className="text-xl font-semibold text-primary-color">
                {data?.userDetail?.firstName} {data?.userDetail?.lastName}
              </p>
              <p className="text-secondary-color font-medium text-base">{data?.internship?.department?.name}</p>
              <p className="text-secondary-color font-medium text-base">{data?.internship?.department?.description}</p>
            </div>
          </div>
          <Divider />

          {/* <div className="dropdown-wrapper flex flex-wrap gap-3 md:justify-start justify-center"> */}
          {/* <div className="flex advance-dropdown ">
                            <DropDownNew
                                items={[
                                    {
                                        label: (
                                            <div className="flex gap-4">
                                                {[1, 2, 3, 4, 5].map((val) => (
                                                    <span onClick={() => { }}>
                                                        {val <= +1 ? <StarFilledIcon key={val} /> : <StarOutlinedIcon key={val} />}
                                                    </span>
                                                ))}
                                            </div>
                                        ),
                                        key: "",
                                    },
                                ]}
                            >
                                <div className="flex justify-center gap-2 items-center dropdown-inpp cursor-pointer">
                                    <StarFilledIcon />
                                    <p>{""}:0</p>
                                    <ArrowDownDark />
                                </div>
                            </DropDownNew>
                        </div> */}
          {/* <div className="flex advance-dropdown ">
                            <DropDownNew
                                items={[
                                    {
                                        label: (
                                            <div>
                                                {dropdownData.map((data, i) => (
                                                    <div key={i}>
                                                        {data.heading ? (
                                                            <p className="heading">{data.heading}</p>
                                                        ) : (
                                                            <p className="flex flex-wrap gap-5 h-10 mt-3">
                                                                <span
                                                                    style={{ backgroundColor: data?.color }}
                                                                    className="w-[10px] h-[10px] mt-2 rounded-full"
                                                                ></span>
                                                                <span className="flex mt-0">{data.title}</span>
                                                            </p>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        ),
                                        key: "",
                                    },
                                ]}
                            >
                                <div className="flex justify-center items-center advance-inp cursor-pointer gap-3">
                                    <span>Advance</span>
                                    <ArrowDownDark />
                                </div>
                            </DropDownNew>
                        </div> */}
          {/* </div> */}
        </div>

        {/* <div className="apllied-for">
                    <p className="heading">Apllied For</p>
                    <div className="details">
                        <p className="p">{"internshipTitle"}</p>
                        <p className="p1 capitalize">
                            {internType.replace("_", " ").toLowerCase()} <Dot /> {dayjs("").format("DD MMM YYYY")}
                        </p>
                    </div>
                </div> */}

        {/* <div className="stage-main">
                    <p className="capitalize stage-para">Stage</p>
                    <div className="flex 2xl:gap-0 gap-1  flex-wrap 2xl:flex-nowrap items-center justify-center rounded-full ">
                        {[1, 2, 3, 4, 5, 6].map((val) => (
                            <p key={val} className={`stage-apply ${"stage"} flex  items-center justify-center`}>
                                {val}
                            </p>
                        ))}
                    </div>
                </div> */}

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
            {newSkillData.map((skill, i) => (
              <p key={i} className="rounded-[14px] py-[5px] px-[18px] skill-text">
                {skill}
              </p>
            ))}
            {<p className="plus rounded-[14px] py-[2px] px-[12px]">+{skillsData.length - newSkillData.length}</p>}
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