import { Row, Col, Form, Input as AntInput } from "antd";
import { FC, useState } from "react";
import { DocumentCopyIcon, FacebookIcon, TwitterIcon, WhatsAppIcon } from "../../assets/images";
import { Input } from "../Input/input";
import { PopUpModal } from "../Model";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../config/validationMessages";

// gutter for spacing in dashboard items
const gutter: any = [
  { xs: 8, sm: 16, lg: 20 },
  { xs: 8, sm: 16, lg: 20 },
];
type ShareType = "whatsapp" | "facebook" | "twitter";

const ShareModal: FC<{
  isShowModal: boolean;
  close: () => void;
  handleInvitation: (delegateRef: string, email: string) => void;
  delegateLink?: string;
}> = (props) => {
  const { isShowModal, close, handleInvitation, delegateLink } = props;
  const [isCopies, setIsCopid] = useState(false);
  const [email, setEmail] = useState("");

  const handleCopy = () => {
    navigator?.clipboard?.writeText(delegateLink ?? "https://www.figma.com/file/").then(() => setIsCopid(true));
  };
  const handleFinish = () => {
    close();
    handleInvitation(delegateLink ?? "https://www.figma.com/file/", email);
    setEmail("");
  };

  const shareLink = (shareType: ShareType) => {
    const shareUrls: Record<ShareType, string> = {
      whatsapp: `https://wa.me/?text=`,
      facebook: `https://www.facebook.com/dialog/share?app_id=&redirect_uri=&href=${encodeURIComponent(window.location.href)}&quote=`,
      twitter: `https://twitter.com/messages/compose?text=`,
    };
    const url = `${shareUrls[shareType]}${encodeURIComponent(delegateLink ?? "")}`;
    window.open(url, "_blank");
  };

  return (
    <PopUpModal cancelBtntxt="Cancel" okBtntxt="Invite" open={isShowModal} title="" width={560} close={close} footer={false}>
      <p className="font-medium text-base text-black text-center pt-2 pb-[30px]">Share Link</p>
      <Form onFinish={handleFinish} layout="vertical" validateMessages={DEFAULT_VALIDATIONS_MESSAGES}>
        <Row gutter={gutter}>
          <Col xs={24}>
            <Input
              label="Delegate Link"
              type="url"
              handleChange={() => {}}
              placeholder=""
              value={delegateLink ?? "https://www.figma.com/file/"}
              suffix={
                <span className="cursor-pointer" onClick={handleCopy}>
                  <DocumentCopyIcon />
                </span>
              }
            />
          </Col>
          {isCopies && <p className="font-medium text-base text-black text-center w-full">Linked Copied</p>}
          <Col xs={24}>
            <Row gutter={gutter} align="middle" justify="space-between">
              <Col xs={24} xl={16}>
                <Form.Item name="email" label="Email" rules={[{ required: true }, { type: "email" }]}>
                  <AntInput name="email" type="email" onChange={(e: any) => setEmail(e.target.value)} placeholder="Email" value={email} />
                </Form.Item>
              </Col>
              <Col xs={24} xl={8}>
                <button
                  type="submit"
                  className="px-[55px] py-3 cursor-pointer text-white bg-[#4A9D77] rounded-lg border-none text-base font-semibold mt-8"
                >
                  Invite
                </button>
              </Col>
            </Row>
          </Col>
          <Col xs={24}>
            <p className="font-medium text-base text-black text-center w-full pb-3">OR</p>
            <p className="font-medium text-base text-black text-center w-full">Share this link via:</p>
          </Col>
          <Col xs={24}>
            <Row align="middle" justify="center" className="gap-[18px]">
              <FacebookIcon onClick={() => shareLink("facebook")} className="cursor-pointer" />
              <TwitterIcon onClick={() => shareLink("twitter")} className="cursor-pointer" />
              <WhatsAppIcon onClick={() => shareLink("whatsapp")} className="cursor-pointer" />
            </Row>
          </Col>
        </Row>
      </Form>
    </PopUpModal>
  );
};

export default ShareModal;
