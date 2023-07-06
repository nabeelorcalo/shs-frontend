import { useState } from "react";
import { Row, Avatar, Col, Form } from "antd";
import { AttachmentIcon, EmojiIcon, FilledLikeIcon, LikeIcon } from "../../../../assets/images";

const index = (props: any) => {
  const { commentId, name, image, content, time, likes, youLike, updateLike, handleReply } = props;
  // const [isLike, setIsLike] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [form] = Form.useForm();
  const addReply = (values: any) => {
    const payload = {
      ...values,
      parentId: commentId,
    };
    handleReply(payload);
    form.resetFields();
    setIsReply(false);
  };
  return (
    <div>
      <Row className="gap-[10px]" align="middle">
        <Avatar src={image} alt="" size={23} />
        <p className="text-xs font-normal">{name}</p>
        <p className="pl-4 gray-color text-[10px]">{time}</p>
      </Row>
      <div className="pt-[10px] pb-[16px] text-xs">{content}</div>
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle">
            <span
              className="cursor-pointer w-6 h-6"
              onClick={() => {
                if (updateLike) updateLike(commentId, !youLike);
              }}
            >
              {youLike ? <FilledLikeIcon /> : <LikeIcon />}
            </span>
            <span className="gray-color">{likes ?? 0} likes</span>
          </Row>
        </Col>
        <p className="gray-color cursor-pointer" onClick={() => setIsReply(!isReply)}>
          Reply
        </p>
      </Row>
      {isReply && (
        <Form form={form} onFinish={addReply}>
          <div className="mt-2 p-2 rounded-lg border border-solid border-[#D9DBE9]">
            <Form.Item name="comment" rules={[{ required: true }]}>
              <textarea placeholder="Type here..." className="w-full border-0 outline-0 resize-none" />
            </Form.Item>
            <Row justify="space-between" align="middle" className="off-white-bg px-[10px] py-[6px] rounded-md">
              <Col>
                <Row className="gap-[10px]">
                  <p className="text-[16px] font-medium leading-[14px]">B</p>
                  <EmojiIcon />
                  <AttachmentIcon />
                </Row>
              </Col>
              <Col>
                <button
                  type="submit"
                  className="
                teriary-bg-color 
                cursor-pointer
                text-white 
                capitalize 
                font-normal 
                p-0 text-xs 
                h-[27px] 
                min-w-[67px] 
                rounded-lg 
                border-0 
                outline-0"
                >
                  send
                </button>
              </Col>
            </Row>
          </div>
        </Form>
      )}
    </div>
  );
};
export default index;
