import { useEffect, useRef, useState } from "react";
import "./style.scss";
import { Row, Col, Divider, Input, Image, Upload, UploadFile, Typography, Space } from "antd";
import { BoxWrapper } from "../../../components";
import { SearchBar } from "../../../components";
import type { UploadProps } from 'antd';
import {
  Filter,
  AvatarIcon,
  EmailIcon,
  Phone,
  Location,
  Moreicon,
  DocIcon,
  DocImg1,
  DocImg2,
  SendIcon,
  PlusIcon,
  Addatech,

} from "../../../assets/images";
// import "./styles.css";
import EmojiPicker, { EmojiStyle, EmojiClickData, } from "emoji-picker-react";
import { socket } from "../../../socket";
import { useRecoilState, useRecoilValue } from "recoil";
import { ExternalChatUser, PersonalChatListState, PersonalChatMediaListState, PersonalChatMsgxState, currentUserState } from "../../../store";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import constants from "../../../config/constants";
import CustomAutoComplete from "./CustomAutoComplete";

// import "./styles.css";
const { TextArea } = Input;

const imageFormats = ['jpg', 'jpeg', 'png', 'gif']

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
  {
    id: "3",
    img: DocIcon,
    docName: "My tax claim",
    docSize: "197 kb",
  },
  {
    id: "4",
    img: DocIcon,
    docName: "My tax claim",
    docSize: "197 kb",
  },
];
const previewImages = [
  {
    id: "1",
    img: DocImg1,
  },
  {
    id: "2",
    img: DocImg2,
  },
  {
    id: "3",
    img: DocImg1,
  },
  {
    id: "4",
    img: DocImg2,
  },
  {
    id: "5",
    img: DocImg1,
  },
  {
    id: "6",
    img: DocImg2,
  },
  {
    id: "7",
    img: DocImg1,
  },
  {
    id: "8",
    img: DocImg2,
  },
  {
    id: "9",
    img: DocImg1,
  },
  {
    id: "10",
    img: DocImg2,
  },
  {
    id: "11",
    img: DocImg1,
  },
]



const index = (props: any) => {
  const user = useRecoilValue(currentUserState)
  const [convoList, setConvoList] = useRecoilState<any>(PersonalChatListState)
  const [mediaList, setMediaList] = useRecoilState<any>(PersonalChatMediaListState)
  const [msgList, setMsgList] = useRecoilState<any>(PersonalChatMsgxState)
  const { getData, getMessages, sendMessage, getMedia, getUsersList } = useCustomHook()
  const [toggleHide, setToggleHide] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("EMOJIS");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const initUser = useRecoilValue(ExternalChatUser)

  const { userList = inboxMessage, externalUser } = props
  const [sendMessages, setSendMessages] = useState<any>({
    msg: "",
    time: "",
    isSender: false,
    id: '',
    fileList
  })
  const [content, setContent] = useState<any>('')
  const [chatData, setChatData] = useState(userList);
  const [selectedUser, setSelectedUser] = useState<any>({})
  const [showEmojis, setShowEmojis] = useState(false)

  useEffect(() => {
    autoSelectLatestChat()

    socket.on('onMessage', (data: any) => {
      console.log('MSG', data)

      setMsgList((currState: any) => [
        ...currState,
        data
      ])
    })

    return () => {
      socket.off('onMessage')
      setConvoList([])
      setMediaList([])
      setMsgList([])
    }
  }, [])

  const handleNewChatSelect = (recipient: any, list?: any) => {
    const chatList = list ? list : convoList
    const foundChat = chatList.find((a: any) => a.creator.id == recipient.id || a.recipient.id == recipient.id)
    console.log(foundChat)
    let tmpList
    if (foundChat) {
      tmpList = chatList
      handleChatSelect({ convoId: foundChat.id, user: foundChat.creator.id == user.id ? foundChat.recipient : foundChat.creator })
    } else {
      tmpList = [{ id: -1, creator: user, recipient }, ...chatList]
      setConvoList(tmpList)
      setMsgList([])
      setMediaList([])
      setSelectedUser(recipient)
    }
  }

  async function handleChatSelect({ convoId, user }: any) {
    setSelectedUser(user)
    let tmpList = [...convoList].map((item: any) => {
      if(item.id == convoId) return {...item, unreadCount: 0 }
      else return item
    })

    // auto select not working fix it later
    if(convoList.length > 0) {
      console.log('HERE2')
      setConvoList(tmpList)
      await getMessages(convoId)
      await getMedia(convoId)
    }
  }

  async function autoSelectLatestChat() {
    const conversationList = await getData(user?.id)
    if (Object.keys(initUser).length > 0) {
      handleNewChatSelect(initUser, conversationList)
      return
    }
    console.log('POST API', conversationList)
      const convo: any = conversationList[0]
      if (convo) {
        console.log('HERE')
        handleChatSelect({ convoId: convo.id, user: convo.creator.id == user.id ? convo.recipient : convo.creator })
      }
  }

  const HandleSubmitMessage = async () => {

    // fix this condition with file upload
    if (content.length > 0 || fileList.length > 0) {
      const chatFormPayload = new FormData();
      chatFormPayload.append('sender', user.id)
      chatFormPayload.append('recipient', selectedUser.id)
      chatFormPayload.append('content', content)

      if (fileList.length > 0) {
        fileList.forEach((file: any) => {
          chatFormPayload.append('media', file);
        });
      }
      const response = await sendMessage(chatFormPayload)
      const foundChat = convoList.find((a: any) => a.creator.id == selectedUser.id || a.recipient.id == selectedUser.id)
      if (foundChat.id == -1) {
        let tmpList = [...convoList].map((item: any) => {
          if (item.id == -1) return { ...item, id: response.conversationId }
          else return item
        })
        setConvoList(tmpList)
      }
      setContent('')
      setFileList([])
    } else {
    }
  }
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.emoji);
    setContent((currValue: any) => currValue + "".concat(emojiData.emoji))
  }

  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-2);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });
    setFileList(newFileList);
  };

  const uploadData: UploadProps = {
    multiple: true,
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      console.log('MEDIA', file)
      setFileList((prev) => [...prev, file]);

      return false;
    },
  };

  const ExpandedImagesList = !isExpanded ? previewImages?.slice(0, 4) : previewImages;
  const expandDocumentList = !toggleHide ? DocData?.slice(0, 2) : DocData
  return (
    <div className="chat-main">
      <Row gutter={[20, 20]}>
        <Col xxl={5} xl={6} lg={8} md={24} sm={12} xs={24}>
          <div className="inbox-main min-height-[500px] overflow-y-auto">
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
                  {/* <SearchBar handleChange={(e: any) => console.log(e)} /> */}
                  <CustomAutoComplete fetchData={getUsersList} selectUser={handleNewChatSelect} />
                </div>

                <div className="flex items-center cursor-pointer justify-center w-[60px] h-[48px] bg-[#E6F4F9] rounded-lg ml-2">
                  <img src={Filter} alt="filterIcon" />
                </div>
              </div>

              {convoList.length > 0 ? (
                <>
                  {convoList.map((item: any, index: any) => {
                    return (
                      <div
                        onClick={() => handleChatSelect({ index, convoId: item.id, user: item.creator.id == user.id ? item.recipient : item.creator })}
                        key={item.id}
                        style={{ backgroundColor: (item.creator.id == user.id ? item.recipient.id : item.creator.id) === selectedUser.id ? '#E6F4F9' : '' }}
                        className="flex cursor-pointer items-center justify-between mt-4 mb-4 hover:bg-[#E6F4F9] p-2 rounded-[5px]"
                      >
                        <div className="flex items-center">
                          <div className="mr-4 relative">
                            <img src={getUserAvatar(item.creator.id == user.id ? item.recipient : item.creator)} alt="avatar" />
                            <p className="absolute bottom-1 -right-6 h-[10px] w-[10px] z-10 list-item" style={{ color: item.isActive ? "#78DAAC" : "#78DAAC" }}></p>
                          </div>

                          <div>
                            <div className="text-secondary-color text-base font-semibold">
                              {getConvoName({ item, id: user.id })}
                            </div>
                            <div className="text-base text-teriary-color w-[11rem] text-ellipsis truncate">
                              {item?.lastMessage?.content || ''}
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="">
                            <div className="mb-2 text-sm font-normal light-grey-color">
                              {getTime(item?.updatedAt) || ''}
                            </div>
                            {item.unreadCount ? (
                              <div className="flex text-xs font-normal items-center  rounded-[15px] text-teriary-bg-color p-2 h-[23px] white-color">
                                {item.unreadCount || 0}
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : <div className="h-96"> </div>}

            </div>
          </div>
        </Col>
        {convoList.length > 0 ? (
          <>
            <Col xxl={14} xl={12} lg={16} md={24} sm={12} xs={24}>
              <BoxWrapper className="message-box-container">
                <div className="flex items-center relative">
                  <img src={getUserAvatar(selectedUser)} alt="userIcon" width="40px" height="40px" />
                  <p className="absolute bottom-1.5 left-[48px] h-[10px] w-[10px] z-10 list-item" style={{ color: selectedUser.isActive ? "#78DAAC" : "#78DAAC" }}></p>

                  <span className="ml-4 primary-color font-semibold text-lg">
                    {`${selectedUser.firstName} ${selectedUser.lastName}`}
                  </span>
                </div>

                <Divider />
                <Row className="mb-12 max-h-[400px] min-h-[500px] overflow-y-auto">
                  <Col xs={24}>
                    {msgList.map((item: any) => {
                      return (
                        <div key={item.id}>
                          {item?.content?.length > 0 || item?.media?.length > 0 ? (
                            <div key={item.id} className={`incoming mb-4 ${item.authorId == user.id ? "ml-auto" : ""}`}>
                              <div className="mb-4" key={item.id}>
                                <div className="incoming-message text-base text-secondary-color mb-2">
                                  {item.content}
                                  {('media' in item) && item.media.length > 0 ? (
                                    <>
                                      {item.media.map((file: any) => (
                                        <div>
                                          {imageFormats.includes(file?.mediaType?.toLowerCase()) ? (
                                            <Image src={getMessageMediaUrl(file.url)} height={110} />
                                          ) : (
                                            <>
                                              <div key={file.id} className="flex h-[34px] mb-4">
                                                <div className="flex justify-center items-center primary-bg-color p-2 rounded-[20px]">
                                                  <img src={DocIcon} alt="fileIcon" />
                                                </div>
                                                <div className="ml-4">
                                                  <div className="text-secondary-color text-sm font-medium">
                                                    {file.name}
                                                  </div>
                                                  <div className="light-grey-color text-sm font-light">
                                                    {byteToHuman(file.size)}
                                                  </div>
                                                </div>
                                              </div>
                                            </>
                                          )}
                                        </div>
                                      ))}
                                    </>
                                  ) : null}
                                </div>
                                <div className="font-normal text-sm light-grey-color mix-blend-normal">
                                  {getMessageTime(item.createdAt)}
                                </div>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      );
                    })}
                  </Col>
                </Row>

                <div className="border-1 border-solid border-[#E6F4F9] rounded-[12px] p-3">
                  <div className="flex items-end " >
                    <TextArea
                      className="chat-textarea"
                      bordered={false}
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Type a messages…"
                      autoSize={{ minRows: 4, maxRows: 6 }}
                    >
                    </TextArea>
                  </div>
                  <div className="textarea-icon items-center bottom-[14px]  flex justify-between">
                    <div className="flex ml-4">
                      <div className="mr-4 cursor-pointer">
                        <Upload {...uploadData}>
                          <img src={Addatech} alt="sendicon" />
                        </Upload>
                      </div>
                      <div className="absolute top-60">
                        {showEmojis && (
                          <>
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
              </BoxWrapper>
            </Col>
            <Col xxl={5} xl={6} lg={24} md={24} sm={12} xs={24}>
              <BoxWrapper className=" min-height-[500px]">
                <div className="text-center">
                  <div className="relative w-[36px] h-[36px] m-auto">
                    <img src={getUserAvatar(selectedUser)} alt="userimg" />
                    <p className="absolute top-5 right-[-8px] z-10 list-item" style={{ color: selectedUser.isActive ? "#78DAAC" : "#78DAAC" }}></p>
                  </div>
                  <div className="text-primary-color text-xl font-semibold capitalize">
                    {`${selectedUser.firstName} ${selectedUser.lastName}`}
                  </div>
                  <div className="text-primary-color font-medium text-base capitalize">
                    {selectedUser?.designation ? selectedUser?.designation : null}
                  </div>
                  <div className="font-normal text-primary-color text-base capitalize">
                    {selectedUser?.department ? selectedUser?.department : null}
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
                      {selectedUser.address}
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
                    <Row justify="center" gutter={[12, 12]} style={{ maxHeight: (isExpanded && previewImages?.length > 4) ? "280px" : "240px", overflowY: "auto" }}>
                      {mediaList.filter((item: any) => imageFormats.includes(item.mediaType.toLowerCase()))?.map((item: any) => (
                        <Col
                          xxl={12}
                          xl={12}
                          lg={12}
                          className="flex lg:justify-start"
                        >
                          <Image src={`${constants.MEDIA_URL}${item.url}`} width={110} height={110} />
                        </Col>
                      ))}
                    </Row>
                    <p className="my-3 float-right p-0 cursor-pointer px-2 " onClick={() => setIsExpanded(!isExpanded)}>{
                      isExpanded ? "Hide" : "Show All"
                    }</p>
                  </div>
                  <Divider />
                  <div className="flex justify-between mb-4">
                    <div className="light-grey-color text-sm font-medium">
                      Documents
                    </div>

                  </div>
                  <div style={{ maxHeight: (toggleHide && DocData?.length) ? "150px" : "150px", overflowY: "auto" }}>
                    {mediaList.filter((item: any) => !imageFormats.includes(item.mediaType.toLowerCase()))?.map((item: any) => {
                      return (
                        <div key={item.id} className="flex h-[34px] mb-4">
                          <div className="flex justify-center items-center primary-bg-color p-2 rounded-[20px]">
                            <img src={DocIcon} alt="fileIcon" />
                          </div>
                          <div className="ml-4">
                            <div className="text-secondary-color text-sm font-medium">
                              {item.name}
                            </div>
                            <div className="light-grey-color text-sm font-light">
                              {byteToHuman(item.size)}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <p className="text-teriary-color font-normal text-base" onClick={() => setToggleHide(!toggleHide)}>
                    {toggleHide ? "Hide" : "Show All"}
                  </p>
                </div>
              </BoxWrapper>
            </Col>
          </>) :
          <>
            <Col xxl={14} xl={12} lg={16} md={24} sm={12} xs={24}>

            <Space direction="horizontal" className="mt-10 w-full justify-center">
              <Typography.Title level={1} style={{ margin: 0 }}>
                Inbox is empty..
              </Typography.Title>
            </Space>
            </Col>
          </>
        }
      </Row>
    </div>
  );
};
export default index;


function getConvoAvatar({ item, id }: any) {
  return item.creator.id == id
    ? `${constants.MEDIA_URL}/${item?.recipient?.profileImage?.mediaId}.${item?.recipient?.profileImage?.metaData?.extension}`
    : `${constants.MEDIA_URL}/${item?.creator?.profileImage?.mediaId}.${item?.creator?.profileImage?.metaData?.extension}`
}

function getUserAvatar(item: any) {
  return item.profileImage
    ? `${constants.MEDIA_URL}/${item?.profileImage?.mediaId}.${item?.profileImage?.metaData?.extension}`
    : `https://eu.ui-avatars.com/api/?name=${item?.firstName} ${item?.lastName}&size=250`
}

function getMessageMediaUrl(url: any) {
  return url ? `${constants.MEDIA_URL}${url}` : ''
}

function getConvoName({ item, id }: any) {
  return item.creator.id == id
    ? `${item?.recipient?.firstName} ${item?.recipient?.lastName}`
    : `${item?.creator?.firstName} ${item?.creator?.lastName}`
}

function getTime(date: string) {
  return dayjs(date).fromNow(true)
}

function getMessageTime(date: string) {
  return dayjs(date).format('hh:mm A')
}

function byteToHuman(bytes: any, decimals = 2) {
  let units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB']

  let i = 0

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return parseFloat(bytes.toFixed(decimals)) + ' ' + units[i]
}

function positionSwap(arr: any, fromIndex: any, toIndex: any) {
  var element = arr[fromIndex];
  arr.splice(fromIndex, 1);
  arr.splice(toIndex, 0, element);
  return arr
};