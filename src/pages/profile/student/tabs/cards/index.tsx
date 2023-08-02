import React, { useEffect, useState } from "react";
import { Button, Modal, Space, Switch, Select } from "antd";
import { Col, Form, Input, Row } from "antd";
import upload from "../../../../../assets/images/profile/student/Upload.svg";
import { cardArr } from "./cardMock";
import { CloseCircleFilled } from "@ant-design/icons";
import { Alert, CommonDatePicker } from "../../../../../components";
import { DeleteIcon } from '../../../../../assets/images';
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../../config/validationMessages";
import CardUsers from "./userCards";
import "../../../style.scss";
import useCustomHook from "../../../actionHandler";
import { useRecoilState } from "recoil";
import { allPaymentCardsState } from "../../../../../store";
import visa from '../../../../../assets/images/profile/student/Visa.svg'

const { Option } = Select;

const CardTabs = ({ name }: any) => {
  const action = useCustomHook()
  const [isOpen, setIsOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [isDefaultCard, setIsDefaultCard] = useState(false);
  const currentYear = new Date().getFullYear();
  const paymentCard = useRecoilState<any>(allPaymentCardsState);
  const yearsArray = Array.from({ length: 10 }, (_, index) => (currentYear + index).toString());
  const months = Array.from({ length: 12 }, (_, index) => (index + 1).toString());

  const handleSwitchChange = (checked:any) => {
    setIsDefaultCard(checked);
  };

  useEffect(() => {
    action.getPaymentCardList()
  }, [])

  const onFinish = (values: any) => {
    const { cardNumber, cardHolderName, expMonth, expYear, cvc } = values;
    const isDefaultCard = values.isDefaultCard;

    const cardData = {
      cardNumber: cardNumber,
      cardHolderName: cardHolderName,
      expMonth: expMonth,
      expYear: expYear,
      cvc: cvc,
      isDefault: isDefaultCard,
    };
    action.addPaymentCard(cardData, () => action.getPaymentCardList());
    setIsOpen(false);
  };

  return (
    <div className="card-tabs">
      <div className='flex justify-end md:justify-center"'>
        <Button
          className="upload-button flex gap-2 items-center justify-between teriary-bg-color white-color"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <img src={upload} alt="wallet" /> Add Card
        </Button>
      </div>
      {paymentCard[0]?.data?.map((item: any) => {
        return (
          <>
            <CardUsers
              name={name}
              img={item?.img ? item.img : visa}
              title={item?.brand}
              last4={item?.last4}
              description={item?.exp_month}
              year={item?.exp_year}
              sideIcon={<DeleteIcon onClick={() => {
                setAlertOpen(true)
                setSelectedId(item?.id)
              }} />}
            />
          </>
        );
      })}
      <Alert
        type={'error'}
        state={alertOpen}
        setState={setAlertOpen}
        icon={''}
        cancelBtntxt={'Cancel'}
        okBtntxt={'Delete'}
        okBtnFunc={() => {
          action.deletePaymentCard(selectedId, () => {
            setAlertOpen(false);
            action.getPaymentCardList();
          })
        }}
      >
        <p className='font-medium text-secondary-color'>
          Are you sure you want to delete this cetificate?
        </p>
      </Alert>
      <Modal
        open={isOpen}
        closeIcon={
          <CloseCircleFilled
            className="text-success-placeholder-color text-xl"
            onClick={() => setIsOpen(false)}
          />
        }
        footer={null}
        title="Add Card"
      >
        <Form
          layout="vertical"
          name="basic"
          initialValues={{ remember: true }}
          validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Row gutter={[10, 15]}>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Card Number"
                name="cardNumber"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input className="input-style" maxLength={16} placeholder="**** **** **** ****" />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label="Card Holder"
                name="cardHolderName"
                rules={[{ required: true }, { type: "string" }]}
              >
                <Input className="input-style" />
              </Form.Item>
            </Col>
            <Row gutter={[10, 15]}>
              <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item
                  label="Expiration Month"
                  name="expMonth"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {months.map((item: any) => (
                      <Option value={item}>{item}</Option>
                    )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item
                  label='Expiration Year'
                  name="expYear"
                  rules={[{ required: true }]}
                >
                  <Select>
                    {yearsArray.map((item: any) => (
                      <Option value={item}>{item}</Option>
                    )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={8} xl={8} lg={8} md={12} sm={24} xs={24}>
                <Form.Item
                  label='CVC'
                  name="cvc"
                  rules={[{ required: true }, { type: "string" }]}
                >
                  <Input maxLength={3} placeholder="***"/>
                </Form.Item>
              </Col>
            </Row>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <div className="flex items-center gap-x-3 pb-3">
                <Switch  checked={isDefaultCard} onChange={handleSwitchChange}/>
                <label className="text-teriary-color font-normal text-base">Mark As Default Card</label>
              </div>
            </Col>
          </Row>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <Button className="border-1 border-[#4A9D77] teriary-color font-semibold" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 py-0 px-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CardTabs;
