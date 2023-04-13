import { useState } from "react";
import { Outlet } from "react-router-dom";
import "../style.scss";
import { Page_404, Page404 } from "../../../assets/images"
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate()
  const handlClick = () => {
    navigate("/")
  }

  return <div className="error-page p-16">
    <center>
      {/* <Page404 /> */}
      <img src={Page_404} alt="404" />
      <p className="text-3xl lg:text-5xl font-medium primary-color pb-16 pt-2">Page Not Found</p>
      <div className="">
        <Button
          className="primary-bg-color white-color rounded-lg font-semibold text-base" onClick={handlClick}>
          Back to Home
        </Button>
      </div>
    </center>
  </div>
};

export default NotFound;
