import React, { useState } from "react";
import "./style.scss";
import { Row, Col, Divider, Input } from "antd";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { SearchBar } from "../../../components";
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

const { TextArea } = Input;

const inboxMessage = [
  {
    id: "1",
    img: AvatarIcon,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "2",
  },
  {
    id: "2",
    img: AvatarIcon,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "3",
  },
  {
    id: "3",
    img: AvatarIcon,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "1",
  },
  {
    id: "4",
    img: AvatarIcon,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "7",
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

const incomigMsg = [
  {
    id: "1",
    text: "Yeah, your Student help squad is very awesome \n and useful for my carrier. Great job! .",
    time: "12:46 PM",
  },
  {
    id: "2",
    text: "By the way, can you please show me \n the preview of your new product?",
    time: "12:46 PM",
  },
];

const outgoingMsg = [
  {
    id: "1",
    text: "By the way, can you please show me \n the preview of your new product?",
    time: "12:46 PM",
    img1: Userimg,
    img2: Userimg,
  },
];

const index = () => {
  const [value, setValue] = useState("");
  return (
    <div className="chat-main">
      <Row gutter={[20, 20]}>
        <Col xxl={5} xl={6} lg={8} md={24} sm={12} xs={24}>
          <div className="inbox-main">
            <div>
              <div>
                <span className="text-secondary-color text-2xl font-semibold mr-2">
                  Index
                </span>

                <span className="text-sm text-teriary-color">
                  (<span className="mr-1">98</span> message)
                </span>
              </div>

              <div className="flex items-center justify-between mt-4">
                <div className="">
                  <SearchBar handleChange={() => {}} />
                </div>

                <div className="flex items-center cursor-pointer justify-center w-[60px] h-[48px] bg-[#E6F4F9] rounded-lg ml-2">
                  <img src={Filter} alt="filterIcon" />
                </div>
              </div>

              {inboxMessage.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center justify-between mt-4 mb-4 hover:bg-[#E6F4F9] p-2 rounded-[5px]"
                  >
                    <div className="flex items-center">
                      <div className="mr-4">
                        <img src={item.img} alt="avatar" />
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
                        <div className="mb-2 text-sm font-normal text-[#A0A3BD]">
                          {item.time}
                        </div>
                        <div className="flex text-xs font-normal items-center  rounded-[15px] text-teriary-bg-color p-2 h-[23px] white-color">
                          {item.textNum}
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
              <div className="flex items-center">
                <img src={Userimg} alt="userIcon" width="40px" height="40px" />
                <span className="ml-4 primary-color font-semibold text-lg">
                  Mino Marina
                </span>
              </div>

              <Divider />

              <Row className="mb-12">
                <Col>
                  <div className="incoming mb-4">
                    {incomigMsg.length &&
                      incomigMsg.map((item) => {
                        return (
                          <div className="mb-4" key={item.id}>
                            <div className="incoming-message text-base text-secondary-color mb-2">
                              {item.text}
                            </div>
                            <div className="font-normal text-sm text-[#A0A3BD] mix-blend-normal">
                              {item.time}
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </Col>
              </Row>

              <Row justify="end">
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
                            <p className="font-normal text-sm text-[#A0A3BD] mix-blend-normal ">
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
              </Row>

              <div className="relative">
                <div>
                  <TextArea
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder="Type a messages…"
                    autoSize={{ minRows: 6, maxRows: 6 }}
                  ></TextArea>
                </div>

                <div className="textarea-icon items-center bottom-[14px] absolute flex justify-between">
                  <div className="flex ml-4">
                    <div className="mr-4">
                      <img src={Addatech} alt="sendicon" />
                    </div>
                    <div>
                      <img src={PlusIcon} alt="sendicon" />
                    </div>
                  </div>

                  <div className="mr-4">
                    <img src={SendIcon} alt="sendicon" />
                  </div>
                </div>
              </div>
            </div>
          </BoxWrapper>
        </Col>

        <Col xxl={5} xl={6} lg={24} md={24} sm={12} xs={24}>
          <BoxWrapper>
            <div>
              <div className="text-center">
                <img src={Userimg} alt="userimg" />
                <div className="text-[#14142A] text-xl font-semibold mt-1">
                  Mino Marina
                </div>
                <div className="text-[#14142A] font-medium text-base">
                  UI UX Designer
                </div>
                <div className="font-normal text-[#14142A] text-base">
                  Design
                </div>
              </div>
              <Divider />
              <div>
                <div className="mb-4">
                  <img src={EmailIcon} />
                  <span className="ml-4 text-sm">maria@Squad.com</span>
                </div>
                <div className="mb-4">
                  <img src={Phone} />
                  <span className="ml-4 text-sm">+44 7700 900077</span>
                </div>
                <div className="mb-4">
                  <img src={Location} />
                  <span className="ml-4 text-sm">
                    263 Eversholt St, London NW11NB, UK
                  </span>
                </div>
              </div>
              <Divider />
              <div>
                <div className="flex justify-between">
                  <div className="text-[#A0A3BD] text-sm font-medium">
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
                      <img src={DocImg1} alt="imgicon" />
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
                  <div className="text-[#A0A3BD] text-sm font-medium">
                    Documents
                  </div>
                  <div className="text-teriary-color font-normal text-base">
                    Show all
                  </div>
                </div>

                {DocData.map((item) => {
                  return (
                    <div key={item.id} className="flex h-[34px] mb-4">
                      <div className="flex justify-center items-center bg-[#363565] p-2 rounded-[20px]">
                        <img src={item.img} alt="fileIcon" />
                      </div>
                      <div className="ml-4">
                        <div className="text-secondary-color text-sm font-medium">
                          {item.docName}
                        </div>
                        <div className="text-[#A0A3BD] text-sm font-light">
                          {item.docSize}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  );
};

export default index;
