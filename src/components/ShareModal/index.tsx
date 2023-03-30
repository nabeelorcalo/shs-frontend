import { Row, Col } from "antd";
import { FC, useState } from "react";
import {
  DocumentCopyIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsAppIcon,
} from "../../assets/images";
import { Input } from "../Input/input";
import { PopUpModal } from "../Model";

// gutter for spacing in dashboard items
const gutter: any = [
  { xs: 8, sm: 16, lg: 20 },
  { xs: 8, sm: 16, lg: 20 },
];

const ShareModal: FC<{
  isShowModal: boolean;
  close: () => void;
  handleInvitation: () => void;
}> = (props) => {
  const { isShowModal, close, handleInvitation } = props;
  const [isCopies, setIsCopid] = useState(false);
  return (
    <PopUpModal
      cancelBtntxt="Cancel"
      okBtntxt="Invite"
      open={isShowModal}
      title=""
      width={560}
      close={close}
      footer={false}
    >
      <p className="font-medium text-base text-black text-center pt-2 pb-[30px]">
        Share Link
      </p>
      <Row gutter={gutter}>
        <Col xs={24}>
          <Input
            label="Delegate Link"
            type="url"
            handleChange={() => {}}
            placeholder=""
            value="https://www.figma.com/file/"
            suffix={
              <span className="cursor-pointer" onClick={() => setIsCopid(true)}>
                <DocumentCopyIcon />
              </span>
            }
          />
        </Col>
        {isCopies && (
          <p className="font-medium text-base text-black text-center w-full">
            Linked Copied
          </p>
        )}
        <Col xs={24}>
          <Row gutter={gutter} align="middle" justify="space-between">
            <Col xs={24} xl={16}>
              <Input
                label="Email"
                type="text"
                handleChange={() => {}}
                placeholder="Email"
                value=""
              />
            </Col>
            <Col xs={24} xl={8}>
              <button onClick={()=>{close();handleInvitation()}} className="px-[55px] py-3 cursor-pointer text-white bg-[#4A9D77] rounded-lg border-none text-base font-semibold mt-8">
                Invite
              </button>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <p className="font-medium text-base text-black text-center w-full pb-3">
            OR
          </p>
          <p className="font-medium text-base text-black text-center w-full">
            Share this link via:
          </p>
        </Col>
        <Col xs={24}>
          <Row align="middle" justify="center" className="gap-[18px]">
            <FacebookIcon />
            <TwitterIcon />
            <WhatsAppIcon />
          </Row>
        </Col>
      </Row>
    </PopUpModal>
  );
};

export default ShareModal;
