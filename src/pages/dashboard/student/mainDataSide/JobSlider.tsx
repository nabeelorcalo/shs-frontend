import React, { useRef } from "react";
import { Carousel } from "antd";
import { Typography, Button } from "antd";
import {
    RightCircleFilled, LeftCircleFilled,
} from "@ant-design/icons";
import { CarouselRef } from "antd/lib/carousel";
import { CompanyLogoOne } from "../../../../assets/images";


const JobSlider = () => {
    const sliderRef = useRef<CarouselRef>(null);
    return (
        <div className="recent-job ">
            <div className='flex  items-center justify-between'>
                <Typography className='main-title pl-5 '>Recent Jobs</Typography>
                <div className="flex gap-x-5">
                    <div className="  flex justify-center items-center  ">
                        <LeftCircleFilled
                            onClick={() => {
                                sliderRef?.current?.prev();
                            }}
                        />
                    </div>
                    <div className="  flex justify-center items-center ">
                        <RightCircleFilled
                            onClick={() => {
                                sliderRef?.current?.next();
                            }}
                        />
                    </div>
                </div>
            </div>
            <div >
                <div >
                    <Carousel ref={sliderRef} dots={false}>
                        <div style={{ backgroundColor: 'yellow' }}  >
                            <div className="job-slide w-[45%] m-2" >
                                <div className="card-head">
                                    <CompanyLogoOne />
                                    <div>
                                        <Typography className="c-name">Power Source</Typography>
                                        <Typography className="c-location">London, UK <span>Posted 45 mins ago</span></Typography>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Typography className="c-title">Frontend Developer</Typography>
                                    <Typography className="c-description pt-2 pb-2">
                                        In this role, you will Write high quality, maintainable, reusable code following solid principles,
                                        Independently clarify technical requirements, develop coding estimates ...</Typography>
                                    <div className="job-status-wrapper">
                                        <div className="job-status">
                                            <Typography>Full Time</Typography>
                                        </div>
                                        <div className="job-status">

                                            <Typography>Paid</Typography>
                                        </div>
                                        <div className="job-status">
                                            <Typography>On-Site</Typography>
                                        </div>
                                    </div>
                                    <div className="pt-3 pb-3">

                                        <Button className="btn-detail ">View Details</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="job-slide w-[45%] m-2" >
                                <div className="card-head">
                                    <CompanyLogoOne />
                                    <div>

                                        <Typography className="c-name">Data Center</Typography>
                                        <Typography className="c-location">Oxford, UK<span>Posted 1 hr ago</span></Typography>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Typography className="c-title">Data Analyst</Typography>
                                    <Typography className="c-description pt-2 pb-2">
                                        Responsibilities include conducting full lifecycle analysis to include requirements,
                                        activities and design. Data analysts will develop analysis and reporting capabilitie...</Typography>
                                    <div className="job-status-wrapper">
                                        <div className="job-status">
                                            <Typography className="status-style">Full Time</Typography>
                                        </div>
                                        <div className="job-status">
                                            <Typography className="status-style">Paid</Typography>
                                        </div>
                                        <div className="job-status">
                                            <Typography className="status-style">On-Site</Typography>
                                        </div>
                                    </div>
                                    <div className="pt-3 pb-1">

                                        <Button className="btn-detail ">View Details</Button>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div >
                            <div className="job-slide w-[45%] m-2" >
                                <div className="card-head">
                                    <CompanyLogoOne />
                                    <div>
                                        <Typography className="c-name">Power Source</Typography>
                                        <Typography className="c-location">London, UK <span>Posted 45 mins ago</span></Typography>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Typography className="c-title">Frontend Developer</Typography>
                                    <Typography className="c-description pt-2 pb-2">
                                        In this role, you will Write high quality, maintainable, reusable code following solid principles,
                                        Independently clarify technical requirements, develop coding estimates ...</Typography>
                                    <div className="job-status-wrapper">
                                        <div className="job-status">
                                            <Typography>Full Time</Typography>
                                        </div>
                                        <div className="job-status">

                                            <Typography>Paid</Typography>
                                        </div>
                                        <div className="job-status">
                                            <Typography>On-Site</Typography>
                                        </div>
                                    </div>
                                    <div className="pt-3 pb-3">

                                        <Button className="btn-detail ">View Details</Button>
                                    </div>
                                </div>
                            </div>
                            <div className="job-slide w-[45%] m-2" >
                                <div className="card-head">
                                    <CompanyLogoOne />
                                    <div>

                                        <Typography className="c-name">Data Center</Typography>
                                        <Typography className="c-location">Oxford, UK<span>Posted 1 hr ago</span></Typography>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Typography className="c-title">Data Analyst</Typography>
                                    <Typography className="c-description pt-2 pb-2">
                                        Responsibilities include conducting full lifecycle analysis to include requirements,
                                        activities and design. Data analysts will develop analysis and reporting capabilitie...</Typography>
                                    <div className="job-status-wrapper">
                                        <div className="job-status">
                                            <Typography className="status-style">Full Time</Typography>
                                        </div>
                                        <div className="job-status">
                                            <Typography className="status-style">Paid</Typography>
                                        </div>
                                        <div className="job-status">
                                            <Typography className="status-style">On-Site</Typography>
                                        </div>
                                    </div>
                                    <div className="pt-3 pb-1">

                                        <Button className="btn-detail ">View Details</Button>
                                    </div>
                                </div>
                            </div>
                        </div>


                    </Carousel>
                </div>

            </div>
        </div>

    )
}

export default JobSlider