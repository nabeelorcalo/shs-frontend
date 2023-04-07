import { FC } from "react";
import { Row, Col } from "antd";
import { ShareIcon } from "../../assets/images";
import "./style.scss";
interface IGreetingCard {
  name?: string;
  greetingText?: string;
  referenceNumber?: string | number;
  handleShareModal?: () => void;
}
export const GreetingCard: FC<IGreetingCard> = (props) => {
  const { name, greetingText, referenceNumber, handleShareModal } = props;
  return (
    <Row align="middle" className="card-share-wrapper p-5">
      <div className="card-share" onClick={handleShareModal}>
        <Row align="middle" className="gap-[10px]">
          <p>Share</p>
          <ShareIcon />
        </Row>
      </div>
      <div className="card-user-welcome">
        <Row gutter={[16,16]} align="middle">
          <Col flex={1}>
            <p className="text-[18px] leading-7">
              {greetingText ?? "Welcome Back"},
              <span className="secondary-color">{name ?? "Stephen"}!</span>
            </p>
          </Col>
          <Col flex={1}>
            <p className="text-[14px]">
              Reference Number:
              <span className="light-orange-color">
                {referenceNumber ?? " DF41331056"}
              </span>
            </p>
          </Col>
        </Row>
      </div>
    </Row>
  );
};
