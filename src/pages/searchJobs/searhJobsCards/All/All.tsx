import { Row, Col } from "antd";
import AllCardsTab from "./searchAllCard/Allcards";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../../actionHandler";
import dayjs from "dayjs";
import constants, { ROUTES_CONSTANTS } from "../../../../config/constants";
import { NoDataFound } from "../../../../components";

const SerarchTabs = () => {
  const navigate = useNavigate();
  const { searchJobsData, } = useCustomHook();
  return (
    <Row gutter={[20, 20]}>
      {searchJobsData.length > 0 ? searchJobsData?.map((data: any, i: number) => (
        <Col xl={8} lg={12} md={12} xs={24} key={i}>
          <AllCardsTab
            tags={[
              data?.internType?.toLowerCase()?.split("_") ?? "N/A",
              data?.salaryType?.toLowerCase() ?? "N/A",
              data?.locationType?.toLowerCase() ?? "N/A",
            ]}
            coverPhoto={`${constants.MEDIA_URL}/${data?.company?.logo?.mediaId}.${data?.company?.logo?.metaData?.extension}`}
            para={data?.company?.businessName?.charAt()}
            heading={data?.company?.businessName ?? "N/A"}

            location={data?.locationType === "VIRTUAL" ? `${data?.company?.town}${data?.company?.country}` :
              `${data?.location?.name ?? "N/A"} ${data?.location?.country ?? "N/A"}`
            }

            time={`Posted ${dayjs(data?.createdAt)?.fromNow() ?? "N/A"}`}
            post={data?.title ?? "N/A"}
            description={data?.description ?? "N/A"}
            handleDetailClick={() =>
              navigate(`/${ROUTES_CONSTANTS.JOB_DETAILS}/${data.id}`, { state: data })
            }
          />
        </Col>
      )) :
        <NoDataFound isNoBorder />
      }

    </Row>
  );
};

export default SerarchTabs;
