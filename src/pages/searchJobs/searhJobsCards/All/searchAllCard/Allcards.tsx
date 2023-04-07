import React from "react";
import { Button, Col, Row } from "antd";
import { BoxWrapper } from "../../../../../components";
import { AllJobsData } from "./Cards";
import "./Styles.scss";

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
  handleSaveClick?: () => void;
  handleDetailClick?: () => void;
  handleChatClick?: () => void;
}
const AllCardsTab = (props: any) => {
  const {
    maxWidth,
    coverPhoto,
    id,
    discount,
    autualPrice,
    withDiscountPrice,
    propertyAvailableFor,
    propertyType,
    totalBeds,
    totalWashRoom,
    tags = ["utility bills", "laundry", "meals", "others"],
    location,
    handleSaveClick,
    handleDetailClick,
    handleChatClick,
  } = props;
  return (
    <>
      <BoxWrapper>
        <Row gutter={[20, 20]} className="my-5" justify="space-between">
          {AllJobsData.map((data: any) => (
            <Col lg={8} md={12} sm={24} xs={24}>
              <div>
                <BoxWrapper>
                  <div className="flex">
                    <div>
                      <img src={data.coverPhoto} />
                    </div>
                    <div className="mx-5">
                      <h2 className="comp-title font-normal text-base	m-0">
                        {data.heading}
                      </h2>
                      <span className="my-3 text-secondary-color">
                        {data.location}
                      </span>
                      <span className="mx-3 text-secondary-color">
                        {data.time}
                      </span>
                    </div>
                  </div>
                  <p className="comp-title  my-3">{data.post}</p>
                  <p className="text-secondary-color">{data.description}</p>
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
                    onClick={() => {}}
                  >
                    Details
                  </Button>
                </BoxWrapper>
              </div>
            </Col>
          ))}
        </Row>
      </BoxWrapper>
    </>
  );
};

export default AllCardsTab;
