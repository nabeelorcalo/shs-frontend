import { useEffect } from "react";
import { Row, Col } from "antd";
import AllCardsTab from "./searchAllCard/Allcards";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";

const SerarchTabs = () => {
  const navigate = useNavigate();
  const { searchJobsData, getSearchJob } = useCustomHook();

  return (
    <Row gutter={[20, 20]}>
      {searchJobsData?.map((data: any, i: number) => (
        <Col xl={8} lg={12} md={12} xs={24} key={i}>
          <AllCardsTab
            tags={[
              data?.internType?.toLowerCase()?.split("_"),
              data?.salaryType?.toLowerCase(),
              data?.locationType?.toLowerCase(),
            ]}
            coverPhoto={`${constants.MEDIA_URL}/${data?.company?.logo?.mediaId}.${data?.company?.logo?.metaData?.extension}`}
            heading={data?.company?.businessName}
            location={`${data?.company?.town} ${data?.company.country}`}
            time={`Posted ${dayjs(data?.createdAt)?.fromNow()}`}
            post={data?.title}
            description={data?.description}
            handleDetailClick={() =>
              // navigate({ pathname: `/${ROUTES_CONSTANTS.JOB_DETAILS}/${data.id}`})
              navigate(`/${ROUTES_CONSTANTS.JOB_DETAILS}/${data.id}`, { state: data })
            }
          />
        </Col>
      ))}
    </Row>
  );
};

export default SerarchTabs;
