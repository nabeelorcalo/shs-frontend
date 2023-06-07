import React, { useEffect, useRef } from "react";
import { Carousel, Col, Row, Space } from 'antd';
import { Typography, Button } from "antd";
import { RightCircleFilled, LeftCircleFilled } from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";
import companyLogo from '../../../../assets/images/dashboard/studentdashboard/asset1.svg'
import useCustomHook from "../../actionHandler";
import { useRecoilState } from "recoil";
import { recentJobState } from "../../../../store/dashboard/student";
import dayjs from "dayjs";
import constants from "../../../../config/constants";

const JobSlider = () => {
  const sliderRef = useRef<CarouselRef>(null);
  const action = useCustomHook();
  const studentJobList = useRecoilState<any>(recentJobState);

  useEffect(() => {
    action.getStudentJob();
  }, []);

  return (
    <div className="recent-job">
      <div className="flex  items-center justify-between">
        <Typography className="main-title pl-5 ">Recent Jobs</Typography>
        <div className="flex gap-x-5">
          <div className=" flex justify-center items-center">
            <LeftCircleFilled
              onClick={() => {
                sliderRef?.current?.prev();
              }}
            />
          </div>
          <div className=" flex justify-center items-center ">
            <RightCircleFilled
              onClick={() => {
                sliderRef?.current?.next();
              }}
            />
          </div>
        </div>
      </div>
      <Carousel ref={sliderRef} dots={false} slidesToShow={2}>
        {
          studentJobList[0].map((item: any, index: any) => {
            return (
              <div className="job-slide m-2">
                <div className="card-head">
                  {item?.company?.attachments?.map((item: any, index: any) => {
                    return (
                      <>
                        <center>
                          <img
                            src={
                              item?.company?.attachments?.mediaId
                                ? `${constants.MEDIA_URL}/${item?.company?.attachments?.mediaId}.${item?.company?.attachments?.metaData.extension}`
                                : companyLogo
                            }
                            alt="userImage"
                            style={{ width: item?.company?.attachments?.mediaSize }}
                          />
                        </center>
                      </>
                    );
                  })}
                  <div>
                    <Typography className="c-name">
                      {item?.company?.businessName}
                    </Typography>
                    <Typography className="c-location">
                      {item?.company?.address}, {item?.company?.country}  <span>{dayjs(item?.comapany?.createdAt).format("DD-MM")}</span>
                    </Typography>
                  </div>
                </div>
                <div className="card-body">
                  <Typography className="c-title">{item?.title}</Typography>
                  <Typography className="c-description pt-2 pb-2">
                    {item?.description}
                  </Typography>
                  <div className="job-status-wrapper">
                    <div className="job-status">
                      <Typography className="status-style">{item?.internType}</Typography>
                    </div>
                    <div className="job-status">
                      <Typography className="status-style">{item?.salaryType}</Typography>
                    </div>
                    <div className="job-status">
                      <Typography className="status-style">{item?.locationType}</Typography>
                    </div>
                  </div>
                  <div className="pt-3 pb-3">
                    <Button className="btn-detail ">View Details</Button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </Carousel>
    </div>
  );
};

export default JobSlider;
