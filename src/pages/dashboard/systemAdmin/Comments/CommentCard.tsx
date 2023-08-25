import { useState } from "react";
import { Row, Avatar, Col, Form, UploadFile, Image } from "antd";
import { FilledLikeIcon, LikeIcon } from "../../../../assets/images";
import CreateComment from "../LogIssueModal/createComment";
import constants from "../../../../config/constants";

const index = (props: any) => {
  const { commentId, name, image, content, attachments, time, likes, youLike, updateLike, handleReply, isNested } = props;
  const [comment, setComment] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isReply, setIsReply] = useState(false);
  const [form] = Form.useForm();
  const addReply = (values: any) => {
    const payload = {
      ...values,
      parentId: commentId,
      comment
    };
    fileList?.length > 0 && (payload.media = fileList)
    handleReply(payload);
    form.resetFields();
    setIsReply(false);
    setComment("")
    setFileList([])
  };

  const HTMLRenderer = ({ content }: any) => {
    return <div dangerouslySetInnerHTML={{ __html: content }} />;
  };

  return (
    <div
    >
      <Row className="gap-[10px]" align="middle">
        <Avatar src={image} alt="" size={23}>
          {name && name?.split(" ")?.[0][0]}
          {name && name?.split(" ")?.[1][0]}
        </Avatar>
        <p className="text-xs font-normal capitalize">{name}</p>
        <p className="pl-4 gray-color text-[10px]">{time}</p>
      </Row>
      <div className="pt-[10px] pb-[16px] text-xs pl-8 pr-1" >
        <HTMLRenderer content={content} />
        <div className={`flex ${isNested ? "mt-1" : "mt-2"} flex-wrap gap-2`}>
          {
            attachments?.length > 0 && attachments?.map(({ mediaId, metaData: { extension } }: any) =>
              <Image
                className="flex-1"
                src={`${constants.MEDIA_URL}/${mediaId}.${extension}`}
                height={attachments?.length > 1 ? isNested ? 60 : 90 : "100%"}
                width={attachments?.length > 1 ? isNested ? 60 : 90 : "100%"}
              />
            )
          }
        </div>
      </div>
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
          setComment={setComment}
          fileList={fileList}
          setFileList={setFileList}
        />
      )}
    </div>
  );
};
export default index;
