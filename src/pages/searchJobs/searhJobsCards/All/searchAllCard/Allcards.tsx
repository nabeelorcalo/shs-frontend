import React, { useState } from "react";
import { Button } from "antd";
import { BoxWrapper } from "../../../../../components"; 
import "./Styles.scss";
import { useParams } from "react-router-dom";
import CoverPhoto from "../../../../../assets/images/serachJobs/logo.png";

interface Props {
  maxWidth?: string;
  id?: string;
  coverPhoto?: string;
  discount?: string;
  autualPrice?: string;
  withDiscountPrice?: string;
  propertyAvailableFor?: string;
  propertyType?: string;
  totalBeds?: string;
  totalWashRoom?: string;
  tags?: string[];
  location?: string;
  handleDetailClick?: () => void;
}

const AllCardsTab = (props: any) => {
  const { data } = useParams();
  console.log(data, "id");

  const {
    tags = ["Full Time ", "Paid", "On-Site"],
    coverPhoto = CoverPhoto,
    heading = "Power Source",
    location = "London, UK",
    time = "Posted 45 mins ago",
    post = "Frontend Developer",
    description = "In this role, you will Write high quality, maintainable, reusable code following solid principles, Independently clarify technical requirements, develop coding estimates and apply a broad...",
    handleDetailClick,
  } = props;
  return (
    <>
      <BoxWrapper>
        <div className="card-wrapper">
          <div className="flex">
            <div>
              <img src={coverPhoto} />
            </div>
            <div className="mx-5">
              <h2 className="comp-title font-normal text-base	m-0">{heading}</h2>
              <span className="my-3 text-secondary-color">{location}</span>
              <span className="mx-3 text-secondary-color">{time}</span>
            </div>
          </div>
          <p className="comp-title font-medium text-xl my-3">{post}</p>
          <p className="text-secondary-color">{description}</p>
          <div className="tags flex items-center gap-[10px] my-5 flex-wrap">
            {tags.map((tags: any | string, i: number) => (
              <p
                key={i}
                className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag"
              >
                {tags}
              </p>
            ))}
          </div>
          <Button
            className="my-7 font-semibold flex-1 card-btn detail-btn rounded-lg accommodation-badger white-color"
            onClick={handleDetailClick}
          >
            Details
          </Button>
        </div>
      </BoxWrapper>
    </>
  );
};

export default AllCardsTab;
