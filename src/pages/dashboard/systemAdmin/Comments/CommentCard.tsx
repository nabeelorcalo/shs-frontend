import { useState } from "react";
import { Row, Avatar, Col, Form } from "antd";
import { FilledLikeIcon, LikeIcon } from "../../../../assets/images";
import CreateComment from "../LogIssueModal/createComment";

const index = (props: any) => {
  const { commentId, name, image, content, time, likes, youLike, updateLike, handleReply, isNested } = props;
  const [comment, setComment] = useState('');

  const [isReply, setIsReply] = useState(false);
  const [form] = Form.useForm();
  const addReply = (values: any) => {
    const payload = {
      ...values,
      parentId: commentId,
      comment
    };
    handleReply(payload);
    form.resetFields();
    setIsReply(false);
  };
  return (
    <div>
      <Row className="gap-[10px]" align="middle">
        <Avatar src={image} alt="" size={23}>
          {name && name?.split(" ")?.[0][0]}
          {name && name?.split(" ")?.[1][0]}
        </Avatar>
        <p className="text-xs font-normal capitalize">{name}</p>
        <p className="pl-4 gray-color text-[10px]">{time}</p>
      </Row>
      <div className="pt-[10px] pb-[16px] text-xs pl-8 pr-1">{content}</div>
      <Row justify="space-between" align="middle" className="pr-2">
        <Col>
          <div className={`${isNested && "pb-4"} item-center flex`}>
            <div
              className="cursor-pointer w-6 h-6"
              onClick={() => {
                if (updateLike) updateLike(commentId, !youLike);
              }}
            >
              {youLike ? <FilledLikeIcon /> : <LikeIcon />}
            </div>
            <div className={`gray-color`}>{likes ?? 0} likes</div>
          </div>
        </Col>
        {
          !isNested &&
          <p className="gray-color cursor-pointer" onClick={() => setIsReply(!isReply)}>
            Reply
          </p>
        }
      </Row>
      {isReply && (
        <CreateComment
          handleCommentAdd={addReply}
          comment={comment}
          setComment={setComment} />
      )}
    </div>
  );
};
export default index;
