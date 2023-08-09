import { useEffect, useState } from "react";
import { Button, Col, Divider, Row, Avatar } from "antd";
import { BoxWrapper } from "../../../components";
import "./Styles.scss";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import constants, { ROUTES_CONSTANTS } from "../../../config/constants";

const JobDetails = () => {
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const { state } = useLocation();
  const { id } = useParams();
  const { getDetailsJob, detailsJobsData, jobsApplicationApply }: any = useCustomHook();

  useEffect(() => {
    getDetailsJob(id)
  }, [])

  const navigate = useNavigate();

  const handleApplyBtn = () => {
    navigate(`/${ROUTES_CONSTANTS?.SEARCH_JOBS}`)
    jobsApplicationApply(state.companyId, state.id)
    setButtonDisabled(true);
  }
  return (
    <div className="job-details-wrapper">
      <div className="flex">
        <div className="details-heading">
          <p className="text-2xl font-semibold  mx-2 primary-color text-secondary-color">Job Details</p>
        </div>
        <p className="text-base font-medium mt-1 mx-3 ">Search Jobs</p>
      </div>
      <Divider />
      <BoxWrapper boxShadow="0px 0px 8px 1px rgba(9, 161, 218, 0.1)" className="mt-2">
        <div className="p-7">
          <Row className="card-wrapper flex justify-between flex-wrap" gutter={[20, 20]}>
            <Col
              md={18}
              sm={24}
              xs={24}
              className="flex align-middle flex-wrap"
            >
              <div className="image-logo">
                {
                  detailsJobsData?.company?.logo?.mediaId ? <img src={`${constants.MEDIA_URL}/${detailsJobsData?.company?.logo?.mediaId}.${detailsJobsData?.company?.logo?.metaData?.extension}`} alt="jobs Image" /> :
                    <div className="static-avatar">
                      <p >{detailsJobsData?.company?.businessName?.charAt(0)}</p>
                    </div>
                }
              </div>
              <div className="mx-5 my-5">
                <h2 className="comp-title font-medium text-xl m-0 capitalize">
                  {detailsJobsData?.title ?? " N/A"}
                </h2>

                <span className="my-3 flex text-secondary-color text-base capitalize">
                  {detailsJobsData?.locationType === "VIRTUAL" ? `${detailsJobsData?.company?.town}${detailsJobsData?.company?.country}` :
                    `${detailsJobsData?.location?.name ?? "N/A"} ${detailsJobsData?.location?.country ?? "N/A"}`
                  }

                  <span className="mx-3 text-secondary-color flex">
                    <li></li>
                    {`${dayjs(detailsJobsData?.createdAt).fromNow()}` ?? "N/A"}</span>

                </span>

                <div className="tags flex items-center gap-[10px] my-5 flex-wrap">
                  <p className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                    {detailsJobsData?.internType?.toLowerCase()?.split("_",) ?? " N/A"}
                  </p>
                  <p className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                    {detailsJobsData?.salaryType?.toLowerCase()?.split("_",) ?? " N/A"}
                  </p>
                  <p className="rounded-[4px] tag py-[2px] px-[12px] capitalize accommodation-tag-bg accommodation-tag">
                    {detailsJobsData?.locationType?.toLowerCase()?.split("_",) ?? " N/A"}
                  </p>
                </div>
              </div>
            </Col>
            <Col className="flex justify-end">
              <Button
                className="font-semibold rounded-lg accommodation-badger white-color teriary-bg-color apply-btn"
                onClick={handleApplyBtn}
                disabled={detailsJobsData?.applied && true}
              >
                {detailsJobsData?.applied ? 'Applied' : 'Apply'}
              </Button>
            </Col>
          </Row>

          <ul>
            <p className="text-primary-color text-lg font-semibold my-3">
              Description
            </p>
            <p className="my-3 ">
              {detailsJobsData?.description ?? " N/A"}
            </p>
            <p className="text-primary-color text-lg font-semibold">
              Responsibilities
            </p>
            <li>{detailsJobsData?.responsibilities ?? " N/A"}</li>
            <p className=" my-2 text-primary-color text-lg font-semibold ">
              Requirements
            </p>
            <li>{detailsJobsData?.requirements ?? "N/A"}</li>
          </ul>

          <Row gutter={[20, 20]} className="my-11">
            <Col lg={6} >
              <span className="mx-2 my-7 font-medium text-primary-color">
                Internship Type:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {detailsJobsData?.internType?.toLowerCase()?.split("_",) ? detailsJobsData?.internType?.toLowerCase()?.split("_",) : "N/A"}
                </span>
              </span>
              <p className="font-medium mx-2 my-3 text-primary-color">
                Nature of work:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">{detailsJobsData?.locationType?.toLowerCase()?.split("_",) ?? "N/A"}</span>
              </p>
              <p className="mx-2 font-medium text-primary-color">
                Total Positions:
                <span className="ml-2">{detailsJobsData?.totalPositions ?? ' N/A'}</span>
              </p>
              <p className="mx-2 font-medium my-3 text-primary-color">
                Expected Closing Date:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {`${dayjs(detailsJobsData?.closingDate).format("YYYY-MM-DD") ?? "N/A"}`}
                </span>
              </p>
              <p className="mx-2 font-medium my-3 text-primary-color">
                Intership Duration:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {detailsJobsData?.duration ?? " N/A"}
                </span>
              </p>
            </Col>
            <Col lg={6}>
              {detailsJobsData?.salaryType !== "UNPAID" ? < p className="mx-2 font-medium my-3 text-primary-color">
                Frequency:
                <span className="ml-2 comp-title font-normal text-base m-0 capitalize">
                  {`${detailsJobsData?.salaryCurrency?.toLowerCase() ?? "N/A"}
                     ${detailsJobsData?.salaryAmount}/${detailsJobsData?.salaryFrequency?.toLowerCase()}
                     ` ?? " N/A"}
                </span>
              </p> : ""}
              {detailsJobsData?.locationType !== "VIRTUAL" ?
                <>
                  < span className="mx-2 font-medium text-primary-color">
                    Location:
                  </span>
                  <span className="comp-title font-normal text-base">
                    {`${detailsJobsData?.location?.name ?? "N/A"} ${detailsJobsData?.location?.country ?? "N/A"}`}
                  </span>
                </>
                :
                ""
              }
            </Col>
            <Col />
          </Row>
        </div>
      </BoxWrapper >
    </div >
  );
};

export default JobDetails;
