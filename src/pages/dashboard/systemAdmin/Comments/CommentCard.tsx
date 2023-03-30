import { FC, useState } from "react";
import { Row, Avatar, Col } from "antd";
import {
  AttachmentIcon,
  EmojiIcon,
  FilledLikeIcon,
  LikeIcon,
} from "../../../../assets/images";
interface ICommentCard {
  name: string;
  image: string;
  content: any;
  time: string;
  likes: number | string;
}
const CommentCard: FC<ICommentCard> = (props) => {
  const { name, image, content, time, likes } = props;
  const [isLike, setIsLike] = useState(false);
  const [isReply, setIsReply] = useState(false);

  return (
    <div>
      <Row className="gap-[10px]" align="middle">
        <Avatar src={image} alt="" size={23} />
        <p className="text-xs font-normal">{name}</p>
        <p className="pl-4 light-gray-color text-[10px]">{time}</p>
      </Row>
      <div className="pt-[10px] pb-[16px] text-xs">{content}</div>
      <Row justify="space-between" align="middle">
        <Col>
          <Row align="middle">
            <span
              className="cursor-pointer w-6 h-6"
              onClick={() => setIsLike(!isLike)}
            >
              {isLike ? <FilledLikeIcon /> : <LikeIcon />}
            </span>
            <span className="gray-color">{likes ?? 0} likes</span>
          </Row>
        </Col>
        <p
          className="gray-color cursor-pointer"
          onClick={() => setIsReply(!isReply)}
        >
          Reply
        </p>
      </Row>
      {isReply && (
        <div className="mt-2 p-2 rounded-lg border border-solid border-[#D9DBE9]">
          <textarea
            placeholder="Type here..."
            className="w-full border-0 outline-0 resize-none"
          />

          <Row
            justify="space-between"
            align="middle"
            className="off-white-bg px-[10px] py-[6px] rounded-md"
          >
            <Col>
              <Row className="gap-[10px]">
                <p className="text-[16px] font-medium leading-[14px]">B</p>
                <EmojiIcon />
                <AttachmentIcon />
              </Row>
            </Col>
            <Col>
              <button
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
      )}
    </div>
  );
};

export default CommentCard;
