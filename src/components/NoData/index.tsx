import { FC } from "react";
import { NoData } from "../../assets/images";
import "./style.scss";

export const NoDataFound = (props: any) => {
  return (
    <div
      className={`text-center ${
        props?.isNoBorder ? "no-data" : "no-data-border"
      } flex justify-center items-center flex-col mt-4`}
    >
      <NoData width={50} height={50} fill="rgba(0, 0, 0, 0.25)" />
      <p className="text-normal text-center mt-4 font-medium">No data</p>
    </div>
  );
};
