import React, { FC, ReactElement } from "react";

const UniversityLogo: FC<{ logo: any }> = (props) => {
  return (
    <div className="w-[70px] h-[70px] flex justify-center items-center bg-white rounded-full">
      <img src={props.logo} alt="uni logo" />
    </div>
  );
};

export default UniversityLogo;
