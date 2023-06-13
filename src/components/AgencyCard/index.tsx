import { Row } from "antd";
import { FC } from "react";
import { gutter } from "../../pages/dashboard";
import Card from "./Card";
import { NoDataFound } from "../NoData";
import { BoxWrapper } from "../BoxWrapper";

interface IAgencyCard {
  agnecyList: any[];
}
const AgencyCard: FC<IAgencyCard> = (props) => {
  const { agnecyList } = props;
  console.log("agnecyList",agnecyList);
  
  return (
    <div className="px-5 flex w-full pr-0">
      <Row gutter={gutter} className="flex-col p-0 w-full">
        {agnecyList?.length > 0 ? (
          agnecyList?.map(({ logo, title, agency, peopleList }) => (
            <Card logo={logo} title={title} agency={agency} usersList={peopleList} />
          ))
        ) : (
          <BoxWrapper className=" grow p-0 w-full wrapper-shadow">
            <NoDataFound isNoBorder />
          </BoxWrapper>
        )}
      </Row>
    </div>
  );
};

export default AgencyCard;
