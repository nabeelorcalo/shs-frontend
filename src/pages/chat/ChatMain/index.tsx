import React, { useState } from "react";
import "./style.scss";
import { Row, Col, Divider, Input, Image, Button, Upload } from "antd";
import { BoxWrapper } from "../../../components";
import { SearchBar } from "../../../components";
import { UploadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { UploadFile } from 'antd/es/upload/interface';
import {
  Filter,
  AvatarIcon,
  Userimg,
  EmailIcon,
  Phone,
  Location,
  Moreicon,
  DocIcon,
  DocImg1,
  DocImg2,
  Audio,
  ShapAudio,
  PlayIcon,
  DoubleTik,
  SendIcon,
  PlusIcon,
  Addatech,
  AudioPlayer,
  SeeAll,
} from "../../../assets/images";

// import "./styles.css";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  Theme,
  Categories,
  EmojiClickData,
  Emoji,
  SuggestionMode,
  SkinTonePickerLocation
} from "emoji-picker-react";
const { TextArea } = Input;

const inboxMessage = [
  {
    id: "1",
    img: AvatarIcon,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    unReadMsg: "2",
    isAvctive: true,
    designation: "react developer",
    department: "developer",
    email: "maria@squad.com",
    phoneNumber: "+92 3422223333",
    location: "ldsfslflsfdsf;dslf;lsd",
    messages: [
      { id: 1, msg: "sndckds", time: "00:20" },
      { id: 2, msg: "sndckds", time: "00:20" },
      { id: 3, msg: "sndckds", time: "00:20" },
    ]
  },
  {
    id: "2",
    img: AvatarIcon,
    name: "Jone Leo",
    time: "2m",
    text: " I need to solve my life",
    unReadMsg: "3",
    isAvctive: false,
    designation: "java developer",
    department: "developer",
    email: "maria@squad.com",
    phoneNumber: "+92 3422223333",
    location: "ldsfslflsfdsf;dslf;lsd",

    messages: [
      { id: 1, msg: "shayan is my best friend", time: "00:20" },
      { id: 2, msg: "sndckds", time: "00:20" },
    ]
  },
  {
    id: "3",
    img: AvatarIcon,
    name: "Jhon Doe",
    time: "2m",
    text: " I need to solve my life",
    unReadMsg: "1",
    isAvctive: false,
    designation: "ui/ux developer",
    department: "designer",
    email: "maria@squad.com",
    phoneNumber: "+92 3422223333",
    location: "ldsfslflsfdsf;dslf;lsd",

    messages: [
      { id: 1, msg: "sndckds", time: "00:20" },
      { id: 2, msg: "sndckds", time: "00:20" },
    ]

  },
  {
    id: "4",
    img: AvatarIcon,
    name: "mark",
    time: "2m",
    text: " I need to solve my life",
    unReadMsg: "7",
    isAvctive: false,
    designation: "react developer",
    department: "developer",
    email: "maria@squad.com",
    phoneNumber: "+92 3422223333",
    location: "ldsfslflsfdsf;dslf;lsd",
    messages: [
      { id: 1, msg: "sndckds", time: "00:20" },
    ]

  },
];

const DocData = [
  {
    id: "1",
    img: DocIcon,
    docName: "My tax claim",
    docSize: "197 kb",
  },
  {
    id: "2",
    img: DocIcon,
    docName: "My tax claim",
    docSize: "197 kb",
  },
];

// const incomigMsg = [
//   {
//     id: "1",
//     text: "Yeah, your Student help squad is very awesome \n and useful for my carrier. Great job! .",
//     time: "12:46 PM",
//   },
//   {
//     id: "2",
//     text: "By the way, can you please show me \n the preview of your new product?",
//     time: "12:46 PM",
//   },
// ];

// const outgoingMsg = [
//   {
//     id: "1",
//     text: "By the way, can you please show me \n the preview of your new product?",
//     time: "12:46 PM",
//     img1: Userimg,
//     img2: Userimg,
//   },
// ];

const index = (props: any) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>("EMOJIS");
  const { userList = inboxMessage, } = props
  const [visible, setVisible] = useState(false);
  const [sendMessages, setSendMessages] = useState<any>({
    msg: "",
    time: "",
    isSender: false,
    id: ''
  })
  const [chatData, setChatData] = useState(userList);
  // const [value, setValue] = useState("");
  const [selectedUser, setSelectedUser] = useState(userList[0])
  const [showEmojis, setShowEmojis] = useState(false)
  const [fileList, setFileList] = useState<any>([
    {
      uid: '-1',
      name: '',
      status: 'done',
      url: '',
    },
  ]);
  console.log(selectedUser, "selectedUser");


  const HandleSubmitMessage = () => {
    let newArr = [...inboxMessage];
    const index = userList.findIndex((user: any) => user.id === selectedUser.id);
    if (index !== -1) {
      setSendMessages({
        ...sendMessages, isSender: true, time: new Date().getTime().toString()
      });
      newArr[index].messages.push({
        id: newArr[index].messages.length + 1,
        msg: sendMessages.msg,
        time: sendMessages.time,
        // isSender:true
      });
      setChatData(newArr);
    } else {
    }
  }
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.unified);
  }
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const uploadData = {
    // action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: handleChange,
    multiple: true,
  };



  return (
    <div className="chat-main">
      <Row gutter={[20, 20]}>
        <Col xxl={5} xl={6} lg={8} md={24} sm={12} xs={24}>
          <div className="inbox-main">
            <div>
              <div>
                <span className="text-secondary-color text-2xl font-semibold mr-2">
                  Inbox
                </span>

                <span className="text-sm text-teriary-color">
                  (<span className="mr-1">98</span> message)
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="">
                  <SearchBar handleChange={() => { }} />
                </div>

                <div className="flex items-center cursor-pointer justify-center w-[60px] h-[48px] bg-[#E6F4F9] rounded-lg ml-2">
                  <img src={Filter} alt="filterIcon" />
                </div>
              </div>

              {chatData.map((item: any) => {
                return (
                  <div
                    onClick={() => setSelectedUser(item)}
                    key={item.id}
                    style={{ backgroundColor: item.id === selectedUser.id ? '#E6F4F9' : '' }}
                    className="flex cursor-pointer items-center justify-between mt-4 mb-4 hover:bg-[#E6F4F9] p-2 rounded-[5px]"
                  >
                    <div className="flex items-center">
                      <div className="mr-4 relative">
                        <img src={item.img} alt="avatar" />
                        <p className="absolute bottom-1 -right-6 h-[10px] w-[10px] z-10 list-item" style={{ color: item.isActive ? "#78DAAC" : "#78DAAC" }}></p>
                      </div>

                      <div>
                        <div className="text-secondary-color text-base font-semibold">
                          {item.name}
                        </div>
                        <div className="text-base text-teriary-color w-[11rem] text-ellipsis truncate">
                          {item.text}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="">
                        <div className="mb-2 text-sm font-normal light-grey-color">
                          {item.time}
                        </div>
                        <div className="flex text-xs font-normal items-center  rounded-[15px] text-teriary-bg-color p-2 h-[23px] white-color">
                          {item.unReadMsg}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Col>
        <Col xxl={14} xl={12} lg={16} md={24} sm={12} xs={24}>
          <BoxWrapper>
            <div className="">
              <div className="flex items-center relative">
                <img src={selectedUser.img} alt="userIcon" width="40px" height="40px" />
                <p className="absolute bottom-1.5 left-[48px] h-[10px] w-[10px] z-10 list-item" style={{ color: selectedUser.isActive ? "#78DAAC" : "#78DAAC" }}></p>

                <span className="ml-4 primary-color font-semibold text-lg">
                  {selectedUser.name}
                </span>
              </div>

              <Divider />

              <Row className="mb-12">
                <Col xs={24}>
                  <div className={`incoming mb-4 ${sendMessages.isSender ? "ml-auto" : ""}`}>
                    {selectedUser.messages.map((item: any) => {
                      return (
                        <div className="mb-4" key={item.id}>
                          <div className="incoming-message text-base text-secondary-color mb-2">
                            {item.msg}
                          </div>
                          <div className="font-normal text-sm light-grey-color mix-blend-normal">
                            {item.time}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row>

              {/* <Row justify="end">
                <Col>
                  <div className="outgoing">
                    {outgoingMsg.map((item) => {
                      return (
                        <div key={item.id} className="mb-4">
                          <div className="outgoing-message  mb-2">
                            <p className="text-base text-secondary-color mb-4">
                              {item.text}
                            </p>
                            {item.img2 && (
                              <div className="flex justify-center">
                                <div className="mr-2">
                                  <img src={item.img1} />
                                </div>

                                <div>
                                  <img src={item.img2} />
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex items-center">
                            <p className="font-normal text-sm light-grey-color mix-blend-normal ">
                              {item.time}
                              <span className="ml-2">
                                <img src={DoubleTik} alt="bluetik" />
                              </span>
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </Col>
              </Row> */}

              <div className="border-1 border-solid border-[#E6F4F9] rounded-[12px] p-3">
                <div>
                  <TextArea
                    className="chat-textarea"
                    bordered={false}
                    value={sendMessages.msg}
                    onChange={(e) => setSendMessages({ ...sendMessages, msg: e.target.value })}
                    placeholder="Type a messages…"
                    autoSize={{ minRows: 4, maxRows: 6 }}
                  ></TextArea>
                </div>

                <div className="textarea-icon items-center bottom-[14px]  flex justify-between">
                  <div className="flex ml-4">
                    <div className="mr-4 cursor-pointer">
                      {/* <Button icon={<UploadOutlined />}>Upload</Button> */}
                      <Upload {...uploadData} fileList={fileList} >
                        <img src={Addatech} alt="sendicon" />
                      </Upload>
                    </div>
                    <div className="absolute top-28">
                      {showEmojis && (
                        <>
                          <Emoji
                            unified={selectedEmoji}
                            emojiStyle={EmojiStyle.APPLE}
                            size={22}
                          />
                          <EmojiPicker
                            onEmojiClick={onClick}
                            autoFocusSearch={false}
                            emojiStyle={EmojiStyle.NATIVE}
                          />
                        </>
                      )}
                    </div>

                    <div className="cursor-pointer">
                      <img src={PlusIcon} className="relative" alt="sendicon" onClick={() => setShowEmojis(!showEmojis)} />
                    </div>
                  </div>

                  <div className="mr-4 cursor-pointer">
                    <img src={SendIcon} alt="sendicon" onClick={HandleSubmitMessage} />
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Col>

        <Col xxl={5} xl={6} lg={24} md={24} sm={12} xs={24}>
          <BoxWrapper>
            <div className="text-center">
              <div className="relative w-[36px] h-[36px] m-auto">
                <img src={selectedUser.img} alt="userimg" />
                <p className="absolute top-5 right-[-8px] z-10 list-item" style={{ color: selectedUser.isActive ? "#78DAAC" : "#78DAAC" }}></p>
              </div>
              <div className="text-primary-color text-xl font-semibold capitalize">
                {selectedUser.name}
              </div>
              <div className="text-primary-color font-medium text-base capitalize">
                {selectedUser.designation}
              </div>
              <div className="font-normal text-primary-color text-base capitalize">
                {selectedUser.department}
              </div>
            </div>
            <Divider />
            <div>
              <div className="mb-4">
                <img src={EmailIcon} />
                <span className="ml-4 text-sm">{selectedUser.email}</span>
              </div>
              <div className="mb-4">
                <img src={Phone} />
                <span className="ml-4 text-sm">{selectedUser.phoneNumber}</span>
              </div>
              <div className="mb-4">
                <img src={Location} />
                <span className="ml-4 text-sm">
                  {selectedUser.location}
                </span>
              </div>
            </div>
            <Divider />
            <div>
              <div className="flex justify-between">
                <div className="light-grey-color text-sm font-medium">
                  Media Files
                </div>
                <div>
                  <img src={Moreicon} alt="moreIcon" />
                </div>
              </div>

              <div className="mt-1 p-2">
                <Row justify="center" gutter={[12, 12]}>
                  <Col
                    xxl={9}
                    xl={12}
                    lg={10}
                    className="flex  lg:justify-end"
                  >
                    {/* <img src={DocImg1} alt="imgicon" /> */}
                    <div>
                      <Image
                        preview={{ visible: false }}
                        width={75}
                        height={65}
                        src={DocImg1}
                        onClick={() => setVisible(true)}
                      />
                      <div style={{ display: 'none' }}>
                        <Image.PreviewGroup preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}>
                          <Image src={DocImg1} className="w-[700px]" />
                          <Image src={AudioPlayer} />
                          <Image src={DocImg2} />
                          <Image src={SeeAll} />
                        </Image.PreviewGroup>
                      </div>
                    </div>
                  </Col>
                  <Col
                    xxl={9}
                    xl={12}
                    lg={10}
                    className="flex lg:justify-start"
                  >
                    <img src={AudioPlayer} alt="imgicon" />
                  </Col>

                  <Col
                    xxl={9}
                    xl={12}
                    lg={10}
                    className="flex  lg:justify-end"
                  >
                    <img src={DocImg2} alt="imgicon" />
                  </Col>

                  <Col
                    xxl={9}
                    xl={12}
                    lg={10}
                    className="flex lg:justify-start"
                  >
                    <img src={SeeAll} alt="imgicon" />
                  </Col>
                </Row>
              </div>
              <Divider />
              <div className="flex justify-between mb-4">
                <div className="light-grey-color text-sm font-medium">
                  Documents
                </div>
                <div className="text-teriary-color font-normal text-base">
                  Show all
                </div>
              </div>

              {DocData.map((item) => {
                return (
                  <div key={item.id} className="flex h-[34px] mb-4">
                    <div className="flex justify-center items-center primary-bg-color p-2 rounded-[20px]">
                      <img src={item.img} alt="fileIcon" />
                    </div>
                    <div className="ml-4">
                      <div className="text-secondary-color text-sm font-medium">
                        {item.docName}
                      </div>
                      <div className="light-grey-color text-sm font-light">
                        {item.docSize}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div >
  );
};

export default index;
