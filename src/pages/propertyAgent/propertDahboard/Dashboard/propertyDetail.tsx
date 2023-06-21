import React, { useEffect } from "react";
import { Col, Divider, Row, Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import pf from "../../../../assets/images/profile/propertyagent/pf.svg";
import "../../style.scss";
import AppTabs from "../../../../components/Tabs";
import ListingDetails from "./propertyTabs/listingDetails";
import DocumentDetails from "./propertyTabs/documentDetails";
import {
  BackButton,
  IconEmail,
  IconLocation,
  IconPhone,
} from "../../../../assets/images";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useRecoilState } from "recoil";
import { getRecentListingState } from "../../../../store/getListingState";
import useCustomHook from "../../actionHandler";
import useCustomHook1 from '../../../accommodation/PropertyDetail/actionHandler';
import Documents from "./propertyTabs/documents";
import { propertyState } from "../../../../store";

const statuses: any = {
  published: "#3DC575",
  rejected: "#D83A52",
  pending: "#FFC15D",
};

const PropertyDetail = () => {
  let params = useParams();
  const navigate = useNavigate();
  const action = useCustomHook();
  const locate = useLocation();
  const status = location.pathname.split("/");
  const recentList = useRecoilState<any>(getRecentListingState);
  const recentlists = recentList[0].filter((item: any) => item.id == params.id);

  useEffect(() => {
    action.getRecentListing();
    
  } ,[]);

  const items = [
    {
      key: "1",
      label: "Listing Details",
      children: <ListingDetails recentList={recentlists} />,
    },
    {
      key: "2",
      label: "Documents",
      children: <Documents />,
    },
  ];

  return (
    <div className="propert-detail">
      <Row>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div>
            <Typography className="text-2xl font-semibold primary-color">
              Property Details
            </Typography>
          </div>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={24}>
          <div
            className="flex justify-end"
            style={{ textTransform: "capitalize" }}
          >
            {recentlists?.map((item: any) => {
              console.log("item", item);
              
              return (
                <Typography
                  className="text-center white-color rounded-lg"
                  style={{
                    background:statuses[item?.publicationStatus],
                    width: "82px",
                    padding: "5px 8px 8px 5px",
                  }}
                >
                  {item?.publicationStatus}
                </Typography>
              );
            })}
          </div>
        </Col>
      </Row>
      <Divider />
      <Row gutter={15}>
        <Col xxl={6} xl={6} lg={7} md={6} sm={6} xs={24}>
          <div className="white-bg-color shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] rounded-lg">
            {recentlists?.map((item: any, index: any) => {
              return (
                <>
                  <div className="flex p-2">
                    <div>
                      <BackButton
                        onClick={() => {
                          navigate(`/${ROUTES_CONSTANTS.PROPERTY_AGENT}`);
                        }}
                      />
                    </div>
                    <div className="grid mx-auto justify-items-center">
                      <img
                        src={
                          item?.user?.profileImage
                            ? `${constants.MEDIA_URL}/${item?.user?.profileImage.mediaId}.${item?.user?.profileImage.metaData.extension}`
                            : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                        }
                        alt=""
                        style={{ width: "100px", padding: "1rem" }}
                      />
                      <Typography className="primary-color text-xl font-semibold text-center">
                        {item?.user?.firstName} {item?.user?.lastName}
                      </Typography>
                      <Typography className="text-base font-medium text-secondary-color ">
                        {item?.user?.role}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                  <center className="social-info">
                    <div className="social-icon flex items-center mt-3">
                      <IconEmail />
                      <Typography className="emp-social">
                        {item?.user?.email}
                      </Typography>
                    </div>
                    <div className="social-icon flex items-center mt-3">
                      <IconPhone />
                      <Typography className="emp-social">
                        {item?.user?.phoneNumber}
                      </Typography>
                    </div>
                    <div className="social-icon flex items-center mt-3 mb-1">
                      <IconLocation />
                      <Typography className="emp-social">
                        {item?.addressTwo}
                      </Typography>
                    </div>
                  </center>
                  <div>
                    <Typography className="ml-4">Attachments</Typography>
                  </div>
                  {item?.attachments?.map((item: any, index: any) => {
                    return (
                      <>
                        <center>
                          <img
                            src={
                              item?.metaData?.mimetype
                                ? `${constants.MEDIA_URL}/${item?.mediaId}.${item?.metaData?.extension}`
                                : ""
                            }
                            alt="userImage"
                            style={{ width: item.mediaSize, padding: "1rem" }}
                          />
                        </center>
                      </>
                    );
                  })}
                </>
              );
            })}
          </div>
        </Col>
        <Col xxl={18} xl={18} lg={17} md={18} sm={18} xs={24}>
          <div className="white-bg-color shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] rounded-lg p-2">
            <AppTabs items={items} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyDetail;
function setLoading(arg0: boolean): React.Dispatch<React.SetStateAction<boolean>> {
  throw new Error("Function not implemented.");
}

