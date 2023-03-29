import { FC } from "react";
import { Row, Col } from "antd";
import "./style.scss";
import { ShareIcon } from "../../assets/images";
interface IGreetingCard {
  name?: string;
  greetingText?: string;
  referenceNumber?: string | number;
  handleShareModal?:()=>void
}
export const GreetingCard: FC<IGreetingCard> = (props) => {
  const { name, greetingText, referenceNumber,handleShareModal } = props;
  return (
    <Row
      align="middle" justify='space-between'
      className="bg-[#4A9D77] wrapper-shadow rounded-2xl greating-card gap-4"
    >
      <Row
        align="middle"
        className={`greeting-card-wrapper xs:gap-[8px] sm:gap-[16px] lg:gap-[20px] xl:gap-[30px] px-[37px] h-[106px] bg-white rounded-2xl wrapper-shadow`}
      >
        <Col className={`flex-1`}>
          <span className="">
            {greetingText ? greetingText : "Welcome Back, "}
          </span>
          <span className="secondary-color"> {name}!</span>
        </Col>
        <Col className={`flex-1`}>
          <span className="">
            {greetingText ? greetingText : "Reference Number: "}
          </span>
          <span className="light-orange-color"> {referenceNumber}</span>
        </Col>
      </Row>
      <Row className="share-wrapper gap-2 pr-5">
        <p className="font-medium text-white text-base">Share</p>
        <div className="cursor-pointer" onClick={handleShareModal}>
          <ShareIcon />
        </div>
      </Row>
    </Row>
  );
};
