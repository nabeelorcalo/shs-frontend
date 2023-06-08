import { useEffect } from "react";
import { Button, Col, Divider, Row } from "antd";
import { BoxWrapper } from "../../../components";
import "./Styles.scss";
import { useNavigate, useParams } from "react-router-dom";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";

const JobDetails = () => {
  const { id } = useParams()
  const { getDetailsJob, detailsJobsData }: any = useCustomHook();

  useEffect(() => {
    getDetailsJob(id)
  }, [])
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
      <BoxWrapper boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="mt-2">
        <div className="p-7">
          <Row className="card-wrapper flex justify-between  flex-wrap" gutter={[20, 20]}>
            <Col
              md={18}
              sm={24}
              xs={24}
              className="flex align-middle flex-wrap"
            >
              <div className="image-logo">
              </div>
              <div className="mx-5 my-5">
                <h2 className="comp-title font-medium text-xl m-0 capitalize">
                  {detailsJobsData?.title ?? " --"}
                </h2>
                <span className="my-3 text-secondary-color text-base ">
                  {detailsJobsData?.company?.country ?? " --"}
                  <span className="mx-3 text-secondary-color ">{`${dayjs(detailsJobsData?.company?.createdAt).fromNow()}` ?? "--"}</span>
                </span>
                <div className="tags flex items-center gap-[10px] my-5 flex-wrap">
                  <p className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                    {detailsJobsData?.internType?.toLowerCase()?.split("_",) ?? " --"}
                  </p>
                  <p className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                    {detailsJobsData?.salaryType?.toLowerCase()?.split("_",) ?? " --"}
                  </p>
                  <p className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                    {detailsJobsData?.locationType?.toLowerCase()?.split("_",) ?? " --"}
                  </p>
                </div>
              </div>
            </Col>
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
              {detailsJobsData?.description ?? " --"}
            </p>
            <p className="text-primary-color text-lg font-semibold">
              Responsibilities
            </p>
            <p>{detailsJobsData?.responsibilities ?? " --"}</p>
            <p className=" my-2 text-primary-color text-lg font-semibold ">
              Requirements
            </p>
            <span>{detailsJobsData?.requirements ?? "--"}</span>
          </div>
          <Row gutter={[20, 20]} className="my-11">
            <Col lg={6} >
              <span className="mx-2 my-7 font-medium text-primary-color">
                Internship Type:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {detailsJobsData?.internType?.toLowerCase()?.split("_",)}
                </span>
              </span>
              <p className="font-medium mx-2 my-3 text-primary-color">
                nature of work:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">{detailsJobsData?.locationType?.toLowerCase()?.split("_",) ?? "--"}</span>
              </p>
              <p className="mx-2 font-medium text-primary-color">
                Total Positions:
                <span className="ml-2">{detailsJobsData?.totalPositions ?? ' --'}</span>
              </p>
              <p className="mx-2 font-medium my-3 text-primary-color">
                Expected Closing Date:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {`${dayjs(detailsJobsData?.closingDate).format("YYYY-MM-DD")}`}
                </span>
              </p>
              <p className="mx-2 font-medium my-3 text-primary-color">
                intership duration:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {detailsJobsData?.duration ?? " --"}
                </span>
              </p>
            </Col>
            <Col lg={6}>
              <p className="mx-2 font-medium my-3 text-primary-color">
                Frequency:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {`${detailsJobsData?.salaryFrequency?.toLowerCase()}/${detailsJobsData?.salaryCurrency?.toLowerCase()}` ?? " --"}
                </span>
              </p>
              <p className="mx-2 font-medium text-primary-color">
                Location:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {detailsJobsData?.company?.country?.toLowerCase() ?? " --"}
                </span>
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
