import { Col, Form, Row } from 'antd';
import { AttachmentIcon } from '../../../../assets/images';
import { useRef } from 'react';
import { CustomEmojiPicker, Notifications } from '../../../../components';

const CreateComment = (props: any) => {
  const { handleCommentAdd, comment, setComment } = props;
  const [commentForm] = Form.useForm();
  const commentRef: any = useRef();


  const handleInputChange = (event: any) => {
    setComment(event.target.value);
  };

  return (
    <Form form={commentForm} onFinish={() =>
      comment ?
        handleCommentAdd() :
        Notifications({ title: "Valiation Error", description: "Comment can't be empty", type: "error" })
    }>
      <div className=" mt-2 p-2 rounded-lg light-gray-border">
        <textarea
          ref={commentRef}
          value={comment}
          onChange={handleInputChange}
          placeholder="Type here..." className="w-full h-24 border-0 outline-0 resize-none"
        />
        <Row justify="space-between" align="middle" className="off-white-bg px-[10px] py-[6px] rounded-md">
          <Col>
            <div className="gap-[10px] flex items-center">
              <p className="text-[16px] font-medium leading-[14px]">B</p>
              <CustomEmojiPicker text={comment} setText={setComment} textRef={commentRef} />
              <AttachmentIcon />
            </div>
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
  )
}

export default CreateComment