import { Row } from "antd";
import { FC } from "react";
import { gutter } from "../../pages/dashboard";
import Card from "./Card";

interface IAgencyCard {
  agnecyList: any[];
}
const AgencyCard: FC<IAgencyCard> = (props) => {
  const { agnecyList } = props;
  return (
    <div className="px-5">
      <Row gutter={gutter} className="flex-col">
        {agnecyList?.map(({ logo, title, agency, peopleList }) => (
          <Card
            logo={logo}
            title={title}
            agency={agency}
            usersList={peopleList}
          />
        ))}
      </Row>
    </div>
  );
};

export default AgencyCard;
