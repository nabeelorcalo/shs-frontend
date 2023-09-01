import React, { useState } from "react";
import { Button, Dropdown, Menu, Modal } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import { EmotIconSatis, EmotIconUnSatis, HappyEmote, More, SadEmote } from "../../assets/images";
import { ButtonThemePrimary } from "../ButtonThemePrimary";

const GrievanceDropdown = (props: any) => {
  const [visible, setVisible] = useState(false);
  const [modalemoji, setModalEmoji] = useState<any>({ id: null, title: "" });
  const [openModalBox, setOpenModalBox] = useState(false);
  const navigate = useNavigate();
  const handleVisibleChange = (visible: any) => {
    setVisible(visible);
  };
  const ModalemojisIcons = [
    {
      icon: modalemoji?.title === "UnSatisfied" ? EmotIconSatis : SadEmote,
      title: "UnSatisfied",
    },
    {
      icon: modalemoji?.title === "Satisfied" ? HappyEmote : EmotIconUnSatis,
      title: "Satisfied",
    },
  ];
  const handleFeedback = () => {
    if (props?.addFeedBack)
      props?.addFeedBack({ status: modalemoji?.title?.toUpperCase(), grievanceId: props?.state?.grievanceId }, () => {
        setOpenModalBox(false);
      });
    navigate(props?.link, {
      state: props?.state,
    });
  };
  const getDetail = () => {
    if (props?.shouldModalOpen) {
      setOpenModalBox(true);
    } else
      navigate(props?.link, {
        state: props?.state,
      });
  };
  return (
    <>
      <Dropdown
        className="setting-custom-dropdown"
        overlay={
          <Menu>
            <Menu.Item key="1">
              <div
                className="text-[#454545] hover:text-[#454545] border-0"
                onClick={getDetail}
                //  to={props?.link}
                //  state={props?.state}
              >
                View Details
              </div>
            </Menu.Item>
          </Menu>
        }
        placement="bottomRight"
        open={visible}
        onOpenChange={handleVisibleChange}
        trigger={["click"]}
      >
        <div style={{ cursor: "pointer" }}>
          <More width="24px" />
        </div>
      </Dropdown>
      <Modal
        open={openModalBox}
        footer={[null]}
        onCancel={() => {
          setOpenModalBox(false);
          navigate(props?.link, {
            state: props?.state,
          });
        }}
      >
        <p className="text-center my-9">How would you rate this experience?</p>
        <div className="flex  justify-center my-5">
          {ModalemojisIcons.map((data: any, index: number) => (
            <div className="flex flex-col mx-7">
              <img src={data.icon} alt="" className="w-16 h-16 unsatisfy-emoji" onClick={() => setModalEmoji({ title: data?.title, id: index })} />
              {data?.title}
            </div>
          ))}
        </div>
        <ButtonThemePrimary
          className=" w-full mt-7"
          disabled={!modalemoji?.title}
          // htmlType="submit"
          // type="primary"
          onClick={handleFeedback}
        >
          Submit
        </ButtonThemePrimary>
      </Modal>
    </>
  );
};

export default GrievanceDropdown;
