import { Row, Col } from "antd";
import AllCardsTab from "./searchAllCard/Allcards";
import { useNavigate } from "react-router-dom";

const SerarchTabs = () => {
  const navigate = useNavigate();

  return (
    <Row gutter={[20, 20]}>
      {[1, 2, 3, 4, 5, 6].map((data: any, i: number) => (
        <Col xl={8} lg={12} md={12} xs={24} key={i}>
          <AllCardsTab
            handleDetailClick={() =>
              navigate(`/search-jobs/job-details/${data}`)
            }
          />
        </Col>
      ))}
    </Row>
  );
};

export default SerarchTabs;
