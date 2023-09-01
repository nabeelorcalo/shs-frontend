import { useEffect, useRef, useState } from "react";
import "./style.scss";
import {
  Row,
  Col,
  Divider,
  Input,
  Image,
  Upload,
  UploadFile,
  Typography,
  Space,
  Button,
  Avatar,
  Badge,
  Popover,
} from "antd";
import {
  BoxWrapper,
  ButtonThemePrimary,
  Notifications,
} from "../../../components";
import type { UploadProps } from "antd";
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
import EmojiPicker, { EmojiStyle, EmojiClickData } from "emoji-picker-react";
import { socket } from "../../../socket";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  ExternalChatUser,
  PersonalChatListState,
  PersonalChatMediaListState,
  PersonalChatMsgxState,
  currentUserState,
} from "../../../store";
import useCustomHook from "../actionHandler";
import dayjs from "dayjs";
import constants from "../../../config/constants";
import CustomAutoComplete from "./CustomAutoComplete";
import { QuestionCircleFilled } from "@ant-design/icons";
import CustomSuportModal from "./CustomSupportModal";
import { byteToHumanSize } from "../../../helpers";

// import "./styles.css";
const { TextArea } = Input;

const imageFormats = ["jpg", "jpeg", "png", "gif"];
``;
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
];

const StatusAvatar = ({ image, chatUser }: any) => {
  const [isOnline, setIsOnline] = useState<boolean>(
    chatUser?.isOnline ? chatUser?.isOnline : false
  );

  useEffect(() => {
    socket.on("onStatusChange", (data: any) => {
      if (data.id === chatUser.id) {
        setIsOnline(data.action == "ONLINE" ? true : false);
      }
    });

    return () => {
      socket.off("onStatusChange");
    };
  }, []);

  return (
    <>
      <Badge dot offset={[-5, 32]} status={isOnline ? "success" : "error"}>
        <Avatar src={image} shape="circle" size={36}>
          {chatUser?.firstName?.slice(0, 1)}
          {chatUser?.lastName?.slice(0, 1)}
        </Avatar>
      </Badge>
    </>
  );
};

const index = (props: any) => {
  const user = useRecoilValue(currentUserState);
  const [convoList, setConvoList] = useRecoilState<any>(PersonalChatListState);
  const [mediaList, setMediaList] = useRecoilState<any>(
    PersonalChatMediaListState
  );
  const [msgList, setMsgList] = useRecoilState<any>(PersonalChatMsgxState);
  const {
    getData,
    getMessages,
    sendMessage,
    getMedia,
    getUsersList,
    getCount,
  } = useCustomHook();
  const [toggleHide, setToggleHide] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("EMOJIS");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [isSuportModal, setIsSuportModal] = useState(false);
  const initUser = useRecoilValue(ExternalChatUser);

  const { externalUser } = props;
  const [sendMessages, setSendMessages] = useState<any>({
    msg: "",
    time: "",
    isSender: false,
    id: "",
    fileList,
  });
  const [content, setContent] = useState<any>("");
  const [selectedUser, setSelectedUser] = useState<any>({});
  const [selectedChat, setSelectedChat] = useState<any>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [count, setCount] = useState(0);
  const messagesEndRef = useRef<any>();
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [msgList]);

  useEffect(() => {
    autoSelectLatestChat();
    getChatCount();

    socket.on("onMessage", (data: any) => {
      console.log("MSG", data, convoList);

      setMsgList((oldVal: any) => {
        if (oldVal[0].conversationId == data.conversationId) {
          return [...oldVal, data];
        } else {
          return oldVal;
        }
      });

      setConvoList((list: any) => {
        const resetVal = JSON.parse(JSON.stringify(list));
        let index = resetVal.findIndex((i: any) => i.id == data.conversationId);
        resetVal[index].lastMessage = { ...data };
        if (selectedChat != resetVal[index].id) {
          console.log(selectedChat, resetVal[index].id);
          resetVal[index].unreadCount += 1;
        }
        resetVal[index].updatedAt = dayjs();
        return resetVal;
      });
    });

    socket.on("onConversation", (data: any) => {
      console.log("newConvo", data);
      setConvoList((list: any) => {
        let newConvo = { ...data, unreadCount: 1 };
        return [newConvo, ...list];
      });
    });

    return () => {
      socket.off("onMessage");
      socket.off("onConversation");
      setConvoList([]);
      setMediaList([]);
      setMsgList([]);
    };
  }, []);

  function incomingChat(data: any) {
    console.log(data, selectedUser);
  }

  const getChatCount = async () => {
    let count: any;
    try {
      count = await getCount(user.id);
    } catch (error) {
      console.log(error);
    } finally {
      setCount(count);
    }
  };

  const handleNewChatSelect = (recipient: any, list?: any) => {
    const chatList = list ? list : convoList;
    const foundChat = chatList.find(
      (a: any) => a.creator.id == recipient.id || a.recipient.id == recipient.id
    );
    console.log(foundChat);
    let tmpList;
    if (foundChat) {
      tmpList = chatList;
      handleChatSelect({
        convoId: foundChat.id,
        user:
          foundChat.creator.id == user.id
            ? foundChat.recipient
            : foundChat.creator,
      });
    } else {
      tmpList = [{ id: -1, creator: user, recipient }, ...chatList];
      setConvoList(tmpList);
      setMsgList([]);
      setMediaList([]);
      setSelectedUser(recipient);
    }
  };

  async function handleChatSelect({ convoId, user, newChatList }: any) {
    setSelectedUser(user);
    let userChatList = newChatList ? newChatList : convoList;
    let tmpList = userChatList.map((item: any) => {
      if (item.id == convoId) return { ...item, unreadCount: 0, isNew: false };
      else return item;
    });

    // console.log(selectedUser, tmpList, convoId, user);

    if (tmpList.length > 0) {
      // console.log("HERE2");
      setConvoList(tmpList);
      console.log("convoId", convoId);
      setSelectedChat(convoId);
      await getMessages(convoId);
      await getMedia(convoId);
    }
  }

  async function autoSelectLatestChat() {
    const conversationList = await getData(user?.id);
    if (Object.keys(initUser).length > 0) {
      handleNewChatSelect(initUser, conversationList);
      return;
    }
    const convo: any = conversationList[0];
    if (convo) {
      console.log("HERE");
      handleChatSelect({
        convoId: convo.id,
        user: convo.creator.id == user.id ? convo.recipient : convo.creator,
        newChatList: conversationList,
      });
    }
  }

  const HandleSubmitMessage = async () => {
    // fix this condition with file upload
    let msgContent = content.trim();

    if (msgContent.length > 0 || fileList.length > 0) {
      const chatFormPayload = new FormData();
      chatFormPayload.append("sender", user.id);
      chatFormPayload.append("recipient", selectedUser.id);
      chatFormPayload.append("content", msgContent);

      if (fileList.length > 0) {
        fileList.forEach((file: any) => {
          chatFormPayload.append("media", file);
        });
      }
      const response = await sendMessage(chatFormPayload);

      if (!response) {
        setContent("");
        setFileList([]);
        Notifications({
          title: "Error",
          description: "Failed to send message",
          type: "error",
        });
        return;
      }

      setMsgList((oldVal: any) => [...oldVal, response]);

      if (response.media && response.media.length > 0) {
        setMediaList((prev: any) => [...response.media, ...prev]);
      }

      const foundChat = convoList.find(
        (a: any) =>
          a.creator.id == selectedUser.id || a.recipient.id == selectedUser.id
      );
      if (foundChat.id == -1) {
        let tmpList = [...convoList].map((item: any) => {
          if (item.id == -1) return { ...item, id: response.conversationId };
          else return item;
        });
        setConvoList(tmpList);
      }
      setContent("");
      setFileList([]);
    } else {
    }
  };
  function onClick(emojiData: EmojiClickData, event: MouseEvent) {
    setSelectedEmoji(emojiData.emoji);
    setContent((currValue: any) => currValue + "".concat(emojiData.emoji));
  }

  const handleChange: UploadProps["onChange"] = (info) => {
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
      console.log("MEDIA", file);
      setFileList((prev) => [...prev, file]);

      return false;
    },
  };

  const ExpandedImagesList = !isExpanded
    ? previewImages?.slice(0, 4)
    : previewImages;
  const expandDocumentList = !toggleHide ? DocData?.slice(0, 2) : DocData;
  return (
    <div className="chat-main">
      <Row className="chat-main-row" gutter={[20, 20]}>
        <Col
          className="chat-main-col"
          xxl={5}
          xl={6}
          lg={8}
          md={24}
          sm={12}
          xs={24}
        >
          <div className="inbox-main h-full relative">
            <div className="inbox-main-header">
              <div className="inbox-main-title">
                <span className="text-secondary-color text-2xl font-semibold mr-2">
                  Inbox
                </span>
                <span className="text-sm text-teriary-color">
                  (<span className="mr-1">{count}</span> message)
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="inbox-autocomplete flex-1">
                  <CustomAutoComplete
                    fetchData={getUsersList}
                    selectUser={handleNewChatSelect}
                  />
                </div>

                <div className="flex items-center cursor-pointer justify-center w-[60px] h-[48px] bg-[#E6F4F9] rounded-lg ml-2">
                  <img src={Filter} alt="filterIcon" />
                </div>
              </div>
            </div>
            <div className="absolute top-[126px] bottom-0 right-0 left-0 overflow-y-auto">
              {convoList.length > 0 ? (
                <>
                  {[
                    ...new Map(
                      convoList.map((a: any) => [a["id"], a])
                    ).values(),
                  ].map((item: any, index: any) => {
                    return (
                      <div
                        onClick={() =>
                          handleChatSelect({
                            index,
                            convoId: item.id,
                            user:
                              item.creator.id == user.id
                                ? item.recipient
                                : item.creator,
                          })
                        }
                        key={item.id}
                        style={{
                          backgroundColor:
                            (item.creator.id == user.id
                              ? item.recipient.id
                              : item.creator.id) === selectedUser.id
                              ? "#E6F4F9"
                              : "",
                        }}
                        className="flex cursor-pointer items-center hover:bg-[#E6F4F9] px-[20px] py-[16px]"
                      >
                        <div className="flex-1 flex items-center overflow-hidden">
                          <div className="mr-[10px]">
                            <StatusAvatar
                              image={getUserAvatar(
                                item.creator.id == user.id
                                  ? item.recipient
                                  : item.creator
                              )}
                              chatUser={
                                item.creator.id == user.id
                                  ? item.recipient
                                  : item.creator
                              }
                            />
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="text-secondary-color text-base font-semibold truncate">
                              {getConvoName({ item, id: user.id })}
                            </div>
                            <div
                              className={`text-base text-bold text-teriary-color truncate ${
                                item.unreadCount > 0
                                  ? "font-bold text-black"
                                  : null
                              }`}
                            >
                              {item?.lastMessage?.content || ""}
                            </div>
                          </div>
                        </div>

                        <div className="last-msg-time">
                          <div className="mb-2 text-sm font-normal light-grey-color">
                            {getTime(item?.updatedAt) || ""}
                          </div>
                          {item.unreadCount &&
                          item?.lastMessage?.authorId != user.id ? (
                            <div className="flex text-xs font-normal items-center  rounded-[15px] text-teriary-bg-color p-2 h-[23px] white-color">
                              {item.unreadCount || 0}
                            </div>
                          ) : null}
                        </div>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="h-96"> </div>
              )}
            </div>
          </div>
        </Col>
        {convoList.length > 0 ? (
          <>
            <Col
              className="chat-main-col"
              xxl={14}
              xl={12}
              lg={16}
              md={24}
              sm={12}
              xs={24}
            >
              <div className="flex justify-end mb-3">
                <ButtonThemePrimary
                  className="green-graph-tooltip-bg white-color flex items-center"
                  onClick={() => setIsSuportModal(true)}
                >
                  <QuestionCircleFilled />
                  <span>Customer Support</span>
                </ButtonThemePrimary>
              </div>
              <BoxWrapper className="message-box-container p-0 relative h-[calc(100%-60px)]">
                <div className="px-[20px] absolute top-0 left-0 right-0 h-[77px]">
                  <div className="flex items-center relative py-[20px] message-box-header">
                    <Avatar src={getUserAvatar(selectedUser)} size={36}>
                      {selectedUser?.firstName?.slice(0, 1)}
                      {selectedUser?.lastName?.slice(0, 1)}
                    </Avatar>

                    <span className="ml-4 primary-color font-semibold text-lg">
                      {`${selectedUser.firstName} ${selectedUser.lastName}`}
                    </span>
                  </div>
                </div>

                <div className="overflow-y-auto absolute left-0 right-0 top-[77px] bottom-[165px] p-[20px]">
                  {msgList.map((item: any) => {
                    return (
                      <div key={item.id}>
                        {item?.content?.length > 0 ||
                        item?.media?.length > 0 ? (
                          <div
                            key={item.id}
                            className={`incoming mb-4 ${
                              item.authorId == user.id ? "ml-auto" : ""
                            }`}
                          >
                            <div className="mb-[10px]" key={item.id}>
                              <div
                                className={`incoming-message text-base text-secondary-color mb-[10px] ${
                                  item.authorId == user.id ? "my-messages" : ""
                                }`}
                              >
                                {item.content}
                                {"media" in item && item.media.length > 0 ? (
                                  <>
                                    {item.media.map((file: any) => (
                                      <div>
                                        {imageFormats.includes(
                                          file?.mediaType?.toLowerCase()
                                        ) ? (
                                          <Image
                                            src={getMessageMediaUrl(file.url)}
                                            height={110}
                                          />
                                        ) : (
                                          <>
                                            <div
                                              key={file.id}
                                              className="flex mb-[8px]"
                                            >
                                              <div className="flex justify-center items-center primary-bg-color p-2 rounded-[20px] h-[34px] w-[34px] min-w-[34px]">
                                                <img
                                                  src={DocIcon}
                                                  alt="fileIcon"
                                                />
                                              </div>
                                              <div className="ml-4 min-w-0">
                                                <div className="text-secondary-color text-sm font-medium truncate">
                                                  {file.name}
                                                </div>
                                                <div className="light-grey-color text-sm font-light">
                                                  {byteToHumanSize(file.size)}
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
                              <div
                                className={`font-normal text-sm light-grey-color mix-blend-normal ${
                                  item.authorId == user.id
                                    ? "text-right"
                                    : "text-left"
                                }`}
                              >
                                {getMessageTime(item.createdAt)}
                              </div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-[20px]">
                  <div className="border border-solid border-[#E6F4F9] rounded-[12px] p-[16px]">
                    <div className="flex">
                      <TextArea
                        className="chat-textarea p-0 !h-[51px]"
                        bordered={false}
                        value={content}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            HandleSubmitMessage();
                          }
                          if (e.key === "Enter" && e.shiftKey) {
                            console.log("shift+enter");
                          }
                          if (e.key === "Enter" && e.ctrlKey && e.shiftKey) {
                            console.log("clt+shift+enter");
                          }
                        }}
                        // onPressEnter={HandleSubmitMessage}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Type a messages…"
                      ></TextArea>
                    </div>
                    <div className="textarea-icon items-center bottom-[14px]  flex justify-between">
                      <div className="flex">
                        <div className="mr-[20px] cursor-pointer">
                          <Upload {...uploadData} fileList={fileList}>
                            <img src={Addatech} alt="sendicon" />
                          </Upload>
                        </div>

                        <Popover
                          placement="topLeft"
                          content={
                            <EmojiPicker
                              onEmojiClick={onClick}
                              autoFocusSearch={false}
                              emojiStyle={EmojiStyle.NATIVE}
                            />
                          }
                          trigger="click"
                        >
                          <div className="cursor-pointer">
                            <img
                              src={PlusIcon}
                              className="relative"
                              alt="sendicon"
                            />
                          </div>
                        </Popover>
                      </div>

                      <div className="cursor-pointer">
                        <img
                          src={SendIcon}
                          alt="sendicon"
                          onClick={HandleSubmitMessage}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </BoxWrapper>
            </Col>
            <Col
              className="chat-main-col"
              xxl={5}
              xl={6}
              lg={24}
              md={24}
              sm={12}
              xs={24}
            >
              <BoxWrapper className="h-full p-[18px]">
                <div className="text-center">
                  <Avatar
                    src={getUserAvatar(selectedUser)}
                    size={{
                      xs: 24,
                      sm: 32,
                      md: 40,
                      lg: 64,
                      xl: 80,
                      xxl: 100,
                    }}
                  >
                    {selectedUser?.firstName?.slice(0, 1)}
                    {selectedUser?.lastName?.slice(0, 1)}
                  </Avatar>
                  <div className="text-primary-color text-xl font-semibold capitalize mt-2">
                    {`${selectedUser.firstName} ${selectedUser.lastName}`}
                  </div>
                  <div className="text-primary-color font-medium text-base capitalize">
                    {selectedUser?.designation
                      ? selectedUser?.designation
                      : null}
                  </div>
                  <div className="font-normal text-primary-color text-base capitalize">
                    {selectedUser?.department ? selectedUser?.department : null}
                  </div>
                </div>
                <Divider className="my-[16px]" />
                <div>
                  <div className="mb-4 flex flex-row">
                    <img src={EmailIcon} />
                    <span className="ml-4 text-sm">{selectedUser.email}</span>
                  </div>
                  <div className="mb-4">
                    <img src={Phone} />
                    <span className="ml-4 text-sm">
                      {selectedUser.phoneNumber}
                    </span>
                  </div>
                  <div className="mb-4">
                    <img src={Location} />
                    <span className="ml-4 text-sm">{selectedUser.address}</span>
                  </div>
                </div>
                <Divider className="my-[16px]" />
                <div>
                  <div className="flex justify-between">
                    <div className="light-grey-color text-sm font-medium">
                      Media Files
                    </div>
                    <p
                      className="p-0 cursor-pointer"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Hide" : "Show All"}
                    </p>
                    {/* <div>
                      <img src={Moreicon} alt="moreIcon" />
                    </div> */}
                  </div>

                  <div
                    className={`mt-[12px] px-4 max-h-[210px] ${
                      isExpanded ? "overflow-y-auto" : "overflow-hidden"
                    }`}
                  >
                    <Row justify="center" gutter={[12, 12]}>
                      {mediaList
                        .filter((item: any) =>
                          imageFormats.includes(item.mediaType.toLowerCase())
                        )
                        ?.map((item: any) => (
                          <Col
                            xxl={12}
                            xl={12}
                            lg={12}
                            className="flex lg:justify-start"
                            key={item.id}
                          >
                            <Image
                              src={`${constants.MEDIA_URL}${item.url}`}
                              width={110}
                              height={110}
                            />
                          </Col>
                        ))}
                    </Row>
                  </div>
                  <Divider />
                  <div className="flex justify-between mb-4">
                    <div className="light-grey-color text-sm font-medium">
                      Documents
                    </div>
                    <p
                      className="text-teriary-color font-normal text-base cursor-pointer"
                      onClick={() => setToggleHide(!toggleHide)}
                    >
                      {toggleHide ? "Hide" : "Show All"}
                    </p>
                  </div>
                  <div
                    className={`max-h-[96px] ${
                      toggleHide ? "overflow-y-auto" : "overflow-hidden"
                    }`}
                  >
                    {mediaList
                      .filter(
                        (item: any) =>
                          !imageFormats.includes(item.mediaType.toLowerCase())
                      )
                      ?.map((item: any) => {
                        return (
                          <div key={item.id} className="flex mb-4">
                            <div className="flex justify-center items-center primary-bg-color rounded-[20px] h-[34px] w-[34px] min-w-[34px]">
                              <img src={DocIcon} alt="fileIcon" />
                            </div>
                            <div className="ml-4 min-w-0">
                              <div className="text-secondary-color text-sm font-medium truncate">
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
                </div>
              </BoxWrapper>
            </Col>
          </>
        ) : (
          <>
            <Col xxl={14} xl={12} lg={16} md={24} sm={12} xs={24}>
              <div className="flex justify-end mb-3">
                <Button
                  className="green-graph-tooltip-bg white-color flex items-center"
                  onClick={() => setIsSuportModal(true)}
                >
                  <QuestionCircleFilled />
                  <span>Customer Support</span>
                </Button>
              </div>
              <Space
                direction="horizontal"
                className="mt-10 w-full justify-center"
              >
                <Typography.Title level={1} style={{ margin: 0 }}>
                  Inbox is empty..
                </Typography.Title>
              </Space>
            </Col>
          </>
        )}
      </Row>
      <CustomSuportModal
        setIsSuportModal={setIsSuportModal}
        isSuportModal={isSuportModal}
      />
    </div>
  );
};
export default index;

function getUserAvatar(item: any) {
  return item.profileImage
    ? `${constants.MEDIA_URL}/${item?.profileImage?.mediaId}.${item?.profileImage?.metaData?.extension}`
    : `https://eu.ui-avatars.com/api/?name=${item?.firstName} ${item?.lastName}&size=250`;
}

function getMessageMediaUrl(url: any) {
  return url ? `${constants.MEDIA_URL}${url}` : "";
}

function getConvoName({ item, id }: any) {
  return item.creator.id == id
    ? `${item?.recipient?.firstName} ${item?.recipient?.lastName}`
    : `${item?.creator?.firstName} ${item?.creator?.lastName}`;
}

function getTime(date: string) {
  return dayjs(date).fromNow(true);
}

function getMessageTime(date: string) {
  return dayjs(date).format("hh:mm A");
}

function byteToHuman(bytes: any, decimals = 2) {
  let units = ["B", "KB", "MB", "GB", "TB", "PB"];

  let i = 0;

  for (i; bytes > 1024; i++) {
    bytes /= 1024;
  }

  return parseFloat(bytes).toFixed(decimals) + " " + units[i];
}
