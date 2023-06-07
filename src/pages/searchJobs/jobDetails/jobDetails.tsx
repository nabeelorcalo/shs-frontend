import React, { useEffect } from "react";
import { Button, Col, Divider, Row } from "antd";
import { BoxWrapper } from "../../../components";
import { jobDetailsData, typesDetails } from "./jobDetailsData";
import "./Styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";

const JobDetails = (props: any) => {
  const { id } = useParams()
  console.log(id, "state");
  const { getDetailsJob, detailsJobsData }: any = useCustomHook();

  useEffect(() => {
    getDetailsJob(id)
  }, [])
  console.log(detailsJobsData, "detailsJobsData");



  const { tags = ["utility bills", "laundry", "meals", "others"] } = props;
  const navigate = useNavigate();
  return (
    <div className="job-details-wrapper">
      <div className="flex">
        <div className="details-heading">
          <p className="font-semibold text-2xl mx-2">Job Details</p>
        </div>
        <p className="text-base font-medium mt-1 mx-3">Search Jobs</p>
      </div>
      <Divider />
      <BoxWrapper
        boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)"
        className="mt-2"
      >
        <div className="p-7">
          <Row
            className="card-wrapper flex justify-between  flex-wrap"
            gutter={[20, 20]}
          >
            {/* {jobDetailsData.map((data: any, i: any) => ( */}
            <Col
              // key={i}
              md={18}
              sm={24}
              xs={24}
              className="flex align-middle flex-wrap"
            >
              <div className="image-logo">
                {/* <img src={data.img} /> */}
              </div>
              <div className="mx-5 my-5">
                <h2 className="comp-title font-normal text-base m-0">
                  {detailsJobsData?.title}
                </h2>
                <span className="my-3 text-secondary-color">
                  {detailsJobsData?.company?.country}
                </span>
                <span className="mx-3 text-secondary-color">{`${dayjs(detailsJobsData?.company?.createdAt).fromNow()}`}</span>

                <div className="tags flex items-center gap-[10px] my-5 flex-wrap">
                  {/* {tags.map((tags: any | string, i: number) => ( */}
                  <p
                    // key={i}
                    className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag"
                  >
                    {detailsJobsData?.internType?.toLowerCase()?.split("_",)}
                  </p>
                  <p
                    // key={i}
                    className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag"
                  >
                    {detailsJobsData?.salaryType?.toLowerCase()?.split("_",)}
                  </p>
                  <p
                    // key={i}
                    className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag"
                  >
                    {detailsJobsData?.locationType?.toLowerCase()?.split("_",)}
                  </p>
                  {/* ))} */}
                </div>
              </div>
            </Col>
            {/* ))} */}
            <Col className="flex justify-end">
              <Button
                className="font-semibold rounded-lg accommodation-badger white-color teriary-bg-color apply-btn"
                onClick={() => navigate("/search-jobs")}
              >
                Apply
              </Button>
            </Col>
          </Row>
          <div>
            <p className="text-primary-color text-lg font-semibold my-3">
              Description
            </p>
            <p className="my-3">
              We're currently recruiting for a Frontend Engineer on behalf of an
              extremely well-funded SAAS organisation that specializes in
              state-of-the-art EPOS system providers that have clientele across
              all 50 states and over 200 employees. The Software Engineering
              Team is currently in the next stage of growth, with 5 roles
              available - this role is seeking experts in React & Javascript. As
              part of the Frontend team, you will participate in shaping
              services, driving performance and managing activity for customers.
              As they continue to grow, add products and services you will be
              key to helping define, design, and develop that vision.
            </p>
            <p className="text-primary-color text-lg font-semibold">
              Responsibilities
            </p>
            <ul className="my-3">
              <li>
                Practice disciplined software engineering through beautiful,
                pragmatic code, code reviews, and automated testing with proper
                documentation.
                <li>
                  Deliver high-quality, scalable and heavily tested software
                  that is modular, secure, reliable and usable.
                </li>
                <li>
                  Take ownership of our product stacks and make continuous
                  improvements and provide necessary operational support
                  whenever needed.
                </li>
              </li>
            </ul>
            <p className=" my-2 text-primary-color text-lg font-semibold ">
              Requirements
            </p>
            <ul>
              <li>
                Minimum BS in Computer Science, with software development as a
                focus.
              </li>
              <li>
                3+ years of industry experience in internet-related software
                development at scale or with an MS or above degree in CS
              </li>
              <li>
                {" "}
                Experiences in handling structured, semi-structured and
                unstructured data.
              </li>
              <li>
                Experiences in web frontend technologies, including
                XHTML/XML/CSS/JSON
              </li>
              <li>
                Experiences in Javascript and frontend frameworks such as React.
                Able to use ES6 and beyond for reusable code development. Strong
                industry experience with web development
              </li>
              <li>
                practices and tools, including SQL databases, caching
                strategies, backend APIs, Node.js, MongoDB, and JSON
              </li>
              <li>
                Strong competencies in system design, data structures,
                algorithms and problem-solving.
              </li>
              <li>Strong communication and documentation skills</li>
              <li>
                Motivated, self-starter that is able to work both independently
                and in cooperation with a larger team
              </li>
            </ul>
          </div>

          <Row gutter={[20, 20]} className="my-11">
            <Col lg={6} >
              <span className="mx-2 my-7 font-medium text-primary-color">
                Internship Type:  {detailsJobsData?.internType?.toLowerCase()?.split("_",)}
              </span>
              <p className="font-medium mx-2 my-3 text-primary-color">nature of work: {detailsJobsData?.locationType?.toLowerCase()?.split("_",)}</p>
              <p className="mx-2 font-medium text-primary-color">
                totalPositions: {detailsJobsData?.totalPositions}
              </p>
              <p className="mx-2 font-medium my-3 text-primary-color">
                Expected Closing Date: {`${dayjs(detailsJobsData?.closingDate).format("YYYY-MM-DD")}`}
              </p>
              <p className="mx-2 font-medium my-3 text-primary-color">
                intership duration: {detailsJobsData?.duration}
              </p>
            </Col>
            <Col lg={6}>
              <p className="mx-2 font-medium text-primary-color">
                Location: {detailsJobsData?.company?.country}
              </p>
            </Col>
            <Col />

          </Row>
        </div>
      </BoxWrapper>
    </div>
  );
};

export default JobDetails;
