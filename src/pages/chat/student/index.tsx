import React from "react";
import { Row, Col, Divider } from "antd";
import { BoxWrapper } from "../../../components/BoxWrapper/BoxWrapper";
import { SearchBar } from "../../../components";
import {
  Filter,
  Avatar,
  Userimg,
  EmailIcon,
  Phone,
  Location,
  Moreicon,
  DocIcon,
} from "../../../assets/images";

const inboxMessage = [
  {
    id: "1",
    img: Avatar,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "2",
  },
  {
    id: "2",
    img: Avatar,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "2",
  },
  {
    id: "3",
    img: Avatar,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "2",
  },
  {
    id: "4",
    img: Avatar,
    name: "Arthur Leo",
    time: "2m",
    text: " I need to solve my life",
    textNum: "2",
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

const index = () => {
  return (
    <div className="chat-main">
      <Row gutter={20}>
        <Col xxl={5} xl={6} lg={5} md={12} sm={12} xs={24}>
          <BoxWrapper>
            <div>
              <div>
                <span className="text-[#4E4B66] text-2xl font-semibold mr-2">
                  Index
                </span>

                <span className="text-sm text-[#6E7191]">
                  (<span className="mr-1">98</span> message)
                </span>
              </div>

              <div className="flex items-center mt-4">
                <div className="">
                  <SearchBar handleChange={() => {}} />
                </div>

                <div className="flex items-center cursor-pointer justify-center w-[48px] h-[48px] bg-[#E6F4F9] rounded-lg ml-2">
                  <img src={Filter} alt="filterIcon" />
                </div>
              </div>

              {inboxMessage.map((item) => {
                return (
                  <div
                    key={item.id}
                    className="flex items-center mt-4 mb-4 bg-[#E6F4F9] p-2 rounded-[5px]"
                  >
                    <div className="mr-2">
                      <img src={item.img} alt="avatar" />
                    </div>

                    <div>
                      <div className="flex justify-between w-[110%]">
                        <div className="text-[#4E4B66] text-base font-semibold">
                          {item.name}
                        </div>
                        <div>{item.time}</div>
                      </div>

                      <div className="flex justify-between w-[110%] h-[25px]">
                        <div className="text-base text-[#6E7191] w-28 text-ellipsis truncate">
                          {item.text}
                        </div>
                        <div className="flex items-center  rounded-[15px] bg-[#6E7191] p-2 text-[#ffff]">
                          {item.textNum}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </BoxWrapper>
        </Col>
        <Col xxl={14} xl={12} lg={14} md={12} sm={12} xs={24}>
          <BoxWrapper>
            <div>
              <div className="flex items-center">
                <img src={Userimg} alt="userIcon" width="40px" height="40px" />
                <span className="ml-4 text-[#363565] font-semibold text-lg">Mino Marina</span>
              </div>
              <Divider />
            </div>
          </BoxWrapper>
        </Col>
        <Col xxl={5} xl={6} lg={5} md={12} sm={12} xs={24}>
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
                <div></div>
                <Divider />
                <div className="flex justify-between mb-4">
                  <div className="text-[#A0A3BD] text-sm font-medium">
                    Documents
                  </div>
                  <div className="text-[#6E7191] font-normal text-base">
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
                        <div className="text-[#4E4B66] text-sm font-medium">
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
