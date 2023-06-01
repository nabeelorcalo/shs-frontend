import { useState } from "react";
import { Divider, Typography } from "antd";
import { EllipsisOutlined } from '@ant-design/icons';
import profile from "../../../assets/images/profile/student/profiled.svg";
import iconEmail from "../../../assets/images/profile/student/email.svg";
import iconPhone from "../../../assets/images/profile/student/Phone.svg";
import iconLocation from "../../../assets/images/profile/student/location.svg";

const profileInfo = [
  {
    profile: profile,
    name: "Maria Sanoid",
    designation: "UI UX Designer",
    role: "Design",
    iconEmail: iconEmail,
    iconPhone: iconPhone,
    iconLocation: iconLocation,
    skills: [
      {
        skill: "UI Interface Design",
      },
      {
        skill: "Documentation",
      },
      {
        skill: "UX Strategy",
      },
      {
        skill: "XD",
      },
    ],
    email: "maria@studenthelpsquad.com",
    phone: "+44 7700 900077",
    location: "263 Eversholt St, London NW11NB, UK",
  },
];
const ProfileSideBar = (props: any) => {
  const { showSideViewType, setShowSideViewType } = props;
  const [actionBox, setActionBox] = useState(false);
  return (
    <div >
      <div className="h-[70vh] student-side-bar">
        <div className="main-student-side-bar">
          {profileInfo.map((item: any, index: any) => {
            return (
              <>
                <div className="profile-main-detail">
                  <div className="flex justify-end relative">
                    <EllipsisOutlined className="pt-5 pr-5 cursor-pointer text-3xl"
                      onClick={() => {
                        setActionBox(true);
                      }}
                    />
                    {actionBox && (
                      <div className="upload-box">
                        <p className="pt-2 pb-2 cursor-pointer text-base font-normal text-secondary-color"
                          onClick={() => {
                            setActionBox(false);
                          }}>
                          Upload Image
                        </p>
                        <p className="pb-2 cursor-pointer text-base font-normal text-secondary-color"
                          onClick={() => {
                            setActionBox(false);
                          }}>
                          Delete Image
                        </p>
                      </div>
                    )}
                  </div>
                  <center>
                    <img src={item.profile} alt="" />
                    <div>
                      <Typography className="emp-name">{item.name}</Typography>
                      <Typography className="emp-desgination">
                        {item.designation}
                      </Typography>
                      <Typography className="emp-role">{item.role}</Typography>
                    </div>
                  </center>
                </div>
                <Divider />
                <div className="social-info">
                  <div className="social-icon flex items-center mt-3">
                    <img src={item.iconEmail} alt="" />
                    <Typography className="emp-social">{item.email}</Typography>
                  </div>
                  <div className="social-icon flex items-center mt-3">
                    <img src={item.iconPhone} alt="" />
                    <Typography className="emp-social">{item.phone}</Typography>
                  </div>
                  <div className="social-icon flex items-center mt-3 mb-1">
                    <img src={item.iconLocation} alt="" />
                    <Typography className="emp-social">
                      {item.location}
                    </Typography>
                  </div>
                </div>
                <Divider />
                <p className="a-tag-side pb-3 cursor-pointer"
                  onClick={() => { setShowSideViewType(true) }}
                >
                  Change Password
                </p>
              </>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default ProfileSideBar