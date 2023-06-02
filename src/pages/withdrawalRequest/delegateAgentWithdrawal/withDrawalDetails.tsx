import React, { useState } from "react";
import { Col, Row, Button, Modal } from "antd";
import Typography from "antd/es/typography";
import { PageHeader } from "../../../components";
import "../style.scss";
import { accountDetail } from "./withdrawalMock";
import { CloseCircleFilled, PlusCircleFilled } from "@ant-design/icons";
import { Check } from "../../../assets/images";

const WithDrawalDetails = (props: any) => {
  const { bankData, open, setOpen, transactionId, amount } = props;
  return (
    <div className="with-drawal-details">
      <PageHeader title="Withdraw Details" />
      <div className="card-style">
        <Row gutter={[50, 10]}>
          {bankData.map((item: any, index: number) => {
            return (
              <>
                <Col xxl={12} xl={12} lg={12} md={24} sm={24} xs={24}>
                  <div className="details">
                    <Typography className="text-primary-color font-normal text-base">{item.title}</Typography>
                    <Typography className="text-primary-color font-normal text-base">{item.value}</Typography>
                  </div>
                </Col>
              </>
            );
          })}
        </Row>
        <div className="flex justify-center md:justify-end">
          <Button htmlType="submit" className="teriary-bg-color white-color text-base font-semibold">
            Withdraw Money
          </Button>
        </div>
      </div>
      <Modal
        open={open}
        footer={null}
        closeIcon={
          <CloseCircleFilled
            onClick={() => {
              setOpen(!open);
              props.setShow(false);
            }}
            style={{ color: "#363565", fontSize: "20px" }}
          />
        }
        centered
        width={800}
      >
        <div className="mt-3">
          <center>
            <Check />
            <div className="p-6 mt-3 mb-4">
              <Typography className="text-[#171721] font-bold text-4xl mb-4">Withdrawal Request Successful</Typography>
              <Typography className="text-[#000000] font-normal text-sm mb-4">
                Your request to withdraw ${amount} has been successfully sent. You will be notified as soon as it is
                approved. Transaction ID: {transactionId}
              </Typography>
              <Button
                onClick={() => {
                  props.setShow(false);
                  setOpen(false);
                }}
                className="teriary-light-bg-color white-color text-base font-semibold flex items-center"
              >
                <PlusCircleFilled /> Withdraw Request Again
              </Button>
            </div>
          </center>
        </div>
      </Modal>
    </div>
  );
};

export default WithDrawalDetails;
