import { Col, Form, Row, Upload, List, Divider } from 'antd';
import { AttachmentIcon } from '../../../../assets/images';
import { useRef } from 'react';
import { CustomEmojiPicker, Notifications } from '../../../../components';
import type { UploadProps } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
const CreateComment = (props: any) => {
  const { handleCommentAdd,
    comment, setComment, fileList, setFileList
  } = props;
  const [commentForm] = Form.useForm();
  const commentRef: any = useRef();
  const uploadData: UploadProps = {
    multiple: true,
    beforeUpload: (file) => {
      setFileList((prev: any) => [...prev, file]);
      return false;
    },
  };

  const handleRemove = (file: any) => {
    const updatedFileList = fileList.filter((item: any) => item.uid !== file.uid);
    setFileList(updatedFileList);
  };

  return (
    <Form form={commentForm} onFinish={() =>
      comment ?
        handleCommentAdd() :
        Notifications({ title: "Valiation Error", description: "Comment can't be empty", type: "error" })
    }>
      <div className=" mt-2 p-2 rounded-lg light-gray-border">
        <div className="comment-container">
          <div className="comment-wrapper custom-scrollbar">
            <ReactQuill
              ref={commentRef}
              value={comment}
              onChange={setComment}
              modules={{ toolbar: [['bold']] }}
              placeholder='Type here...'
            />
            {
              fileList?.length > 0 && <>
                <Divider className='m-0' />
                <List
                  dataSource={fileList}
                  renderItem={(item: any) => (
                    <List.Item key={item.uid} className=''>
                      <span className='text-[10px]'>{item.name}</span>
                      <span onClick={() => handleRemove(item)}
                      ><DeleteOutlined className='w-[20px] h-[20px] text-[14px] cursor-pointer' /></span>
                    </List.Item>
                  )}
                />
              </>
            }
          </div>
          <Row justify="space-between" align="middle" className="off-white-bg px-[10px] py-[6px] rounded-md">
            <Col>
              <div className="gap-[10px] flex items-center ml-5">
                <CustomEmojiPicker text={comment} setText={setComment} textRef={commentRef} />
                <Upload accept={".png,.jpg,.jpeg"} showUploadList={false} fileList={fileList} className='cursor-pointer -mt-1' {...uploadData}>
                  <AttachmentIcon />
                </Upload>
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
      </div>
    </Form>
  )
}

export default CreateComment