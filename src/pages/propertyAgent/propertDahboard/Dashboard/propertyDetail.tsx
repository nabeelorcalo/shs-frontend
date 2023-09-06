import React, { useEffect, useState } from "react";
import { Avatar, Col, Divider, Row, Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "../../style.scss";
import AppTabs from "../../../../components/Tabs";
import ListingDetails from "./propertyTabs/listingDetails";
import {
  BackButton,
  IconEmail,
  IconLocation,
  IconPhone,
} from "../../../../assets/images";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useRecoilState } from "recoil";
import { getAllListingState, getRecentListingState } from "../../../../store/getListingState";
import useCustomHook from "../../actionHandler";
import Documents from "./propertyTabs/documents";
import { BoxWrapper } from "../../../../components";

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
  const [recentAllList, setRecentAllList] = useRecoilState<any>(getAllListingState);
  const [recentlists, setRecentLists] = useState<any>([]);

  useEffect(() => {
    setRecentLists(recentAllList?.filter((item: any) => item?.id == params.id))
  },[recentAllList])

  useEffect(() => {
    action.getAllListingData({});
  }, []);

  const items = [
    {
      key: "1",
      label: "Listing Details",
      children: <ListingDetails recentList={recentlists} />,
    },
    {
      key: "2",
      label: "Documents",
      children: <Documents  recentList={recentlists}/>,
    },
  ];

  return (
    <div className="propert-detail">
      <div className="flex item justify-between flex-wrap md:flex-nowrap flex-column lg:flex-row gap-y-2">
        <div className="flex justify-center lg:justify-start ">
          <Typography className="text-2xl font-semibold primary-color">
            Property Details
          </Typography>
        </div>
        <div className="flex items-center  xl:gap-x-[26rem]  gap-y-3 flex-wrap md:flex-nowrap flex-column lg:flex-row ">
          <div className="flex justify-center lg:justify-start ">
            {recentlists[0]?.publicationStatus === 'rejected' &&
              (
                <div className="rounded-lg dark-red-opacity-ten p-2">
                  <Typography className="text-error-color font-normal text-lg">
                    Property don’t have their own parking and Tenants have not access to balcony
                  </Typography>
                </div>
              )
            }
          </div>
          <div
            className="flex justify-end"
            style={{ textTransform: "capitalize" }}
          >
            {recentlists?.map((item: any, index: any) => {
              return (
                <Typography
                  key={index}
                  className="text-center white-color rounded-lg"
                  style={{
                    background: statuses[item?.publicationStatus],
                    width: "82px",
                    padding: "5px 8px 8px 5px",
                  }}
                >
                  {item?.publicationStatus}
                </Typography>
              );
            })}
          </div>
        </div>
      </div>
      <Divider />
      <Row gutter={20}>
        <Col xxl={4.5} xl={6} lg={7} md={6} sm={6} xs={24}>
          <BoxWrapper>
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
                      <Avatar
                        size={80}
                        // src={`${constants.MEDIA_URL}/${item?.user?.profileImage.mediaId}.${item?.user?.profileImage.metaData.extension}`}
                      >
                        {item?.user?.firstName?.charAt(0)}
                        {item?.user?.lastName?.charAt(0)}
                      </Avatar>
                      <Typography className="primary-color text-xl font-semibold text-center">
                        {item?.user?.firstName ? item?.user?.firstName : "N/A"} {item?.user?.lastName ? item?.user?.lastName : "N/A"}
                      </Typography>
                      <Typography className="text-base font-medium text-secondary-color ">
                        {item?.user?.role ? item?.user?.role : 'N/A'}
                      </Typography>
                    </div>
                  </div>
                  <Divider />
                  <center className="social-info">
                    <div className="social-icon flex items-center mt-3">
                      <IconEmail />
                      <Typography className="emp-social">
                        {item?.user?.email ? item?.user?.email : 'N/A'}
                      </Typography>
                    </div>
                    <div className="social-icon flex items-center mt-3">
                      <IconPhone />
                      <Typography className="emp-social">
                        {item?.user?.phoneNumber ? item?.user?.phoneNumber : 'N/A'}
                      </Typography>
                    </div>
                    <div className="social-icon flex items-center mt-3 mb-1">
                      <IconLocation />
                      <Typography className="emp-social">
                        {item?.addressTwo ? item?.addressTwo : 'N/A'}
                      </Typography>
                    </div>
                  </center>
                  <div>
                    <Typography className="ml-4">Attachments</Typography>
                  </div>
                  <center>
                    <img
                      src={`${constants.MEDIA_URL}/${item?.coverImageData?.mediaId}.${item?.coverImageData?.metaData?.extension}`}
                      alt="N/A"
                      style={{ width: item?.coverImageData?.mediaSize, padding: "1rem" }}
                    />
                  </center>
                </>
              );
            })}
          </BoxWrapper>
        </Col>
        <Col xxl={18.5} xl={18} lg={17} md={18} sm={18} xs={24}>
          <BoxWrapper className="px-3 py-3">
            <AppTabs items={items} />
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default PropertyDetail;

