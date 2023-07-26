import React, { useEffect, useState } from "react";
import { DropDown, PageHeader } from "../../../components";
import { Row, Col, Typography, Button, Divider, Modal, Form, Input, Select } from "antd";
import "../style.scss";
import { bankInfo } from "./withdrawalMock";
import { Edit } from "../../../assets/images";
import { CloseCircleFilled } from "@ant-design/icons";
import useCustomHook from "../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import bank from "../../../assets/images/profile/delegateagent/bankh.svg";

// const balance = "2000.00";
const types = ["Individual", "Company"];
const bankTypes = ["Natwest Group", "Hbl", "item 3"];

const { Option } = Select;

const LinkAccount = () => {
  const [addNew, setAddNew] = useState(false);
  const [bankId, setBankId] = useState("");
  const [editModal, setEditModal] = useState(false);
  const { fetchBalance, currentBalance, bankList, fetchBankList, linkAccount, updateBankAccount } = useCustomHook();
  const [form] = Form.useForm();

  useEffect(() => {
    fetchBalance();
    fetchBankList();
  }, []);

  const handleSubmit = async (values: any) => {
    if (editModal) {
      updateBankAccount({ accName: values?.accName, accType: values?.accType }, bankId).then(() => {
        form.resetFields();
        setAddNew(false);
        setEditModal(false);
      });
    } else {
      linkAccount(values).then(() => {
        form.resetFields();
        setAddNew(false);
      });
    }
    fetchBankList();
  };
  const handleCancel = () => {
    form.resetFields();
    setAddNew(false);
  };
  const handleEdit = (item: any) => {
    form.setFields([
      { name: "bankName", value: item?.metadata?.bank_name },
      { name: "accNumber", value: `*******${item?.last4}` },
      { name: "accName", value: item?.account_holder_name },
      { name: "routingNumber", value: item?.routing_number },
      { name: "sortCode", value: "test" },
      { name: "accType", value: item?.account_holder_type },
    ]);
    setBankId(item?.id);
    setEditModal(true);
    setAddNew(true);
  };
  const handleAdd = () => {
    form.resetFields();
    setEditModal(false);
    setAddNew(true);
  };

  return (
    <div className="link-account">
      <PageHeader title="Withdrawals" bordered={true} />
      <Row>
        <Col xxl={12} xl={12} lg={12} md={24} xs={24}>
          <Typography
            className="text-[#14142A] 
              text-xl font-semibold
              mt-4 mb-5"
          >
            Current Balance : £{currentBalance}
          </Typography>
        </Col>
        <Col xxl={12} xl={12} lg={12} md={24} xs={24} className="flex justify-end mb-2">
          <Button onClick={handleAdd} className="teriary-light-bg-color white-color text-base font-semibold">
            Add New
          </Button>
        </Col>
      </Row>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
          <div className="card-style">
            <Row>
              <Col xxl={24} xl={24} lg={24} md={24} xs={24}>
                <Typography className="primary-color text-lg font-medium ml-3 mt-2">Banks</Typography>
              </Col>
            </Row>
            <Divider />

            {bankList?.length &&
              bankList.map((item: any, index: number) => {
                return (
                  <>
                    <div className="details">
                      <div className="flex items-center gap-x-3">
                        <img src={bank} alt="" />
                        <div className="grid">
                          <Typography>{item?.metadata?.bank_name}</Typography>
                          <Typography>*******{item?.last4}</Typography>
                        </div>
                      </div>
                      <div>
                        <Edit
                          onClick={() => {
                            handleEdit(item);
                          }}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </>
                );
              })}
          </div>
        </Col>
      </Row>
      <Modal
        open={addNew}
        closeIcon={<CloseCircleFilled className="text-[#A3AED0] text-xl" />}
        footer={[
          <Button
            key="Cancel"
            className="teriary-color border-1 border-solid border-[#4a9d77] pt-0 pb-0 pr-5 pl-5"
            onClick={handleCancel}
          >
            Cancel
          </Button>,
          <Button
            key="submit"
            htmlType="submit"
            form="addForm"
            className="teriary-bg-color border-1 border-solid border-[#4a9d77] white-color pt-0 pb-0 pr-5 pl-5"
          >
            Link Account
          </Button>,
        ]}
      >
        <div>
          <Form
            id="addForm"
            form={form}
            layout="vertical"
            validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
            onFinish={handleSubmit}
          >
            <Row gutter={[15, 10]}>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Choose Your Bank" name="bankName" rules={[{ required: true }]}>
                  <Select disabled={editModal} placeholder="Select Bank">
                    {bankTypes.map((option: any) => (
                      <Option value={option}>{option}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Account Number" name="accNumber" rules={[{ required: true }, { type: "string" }]}>
                  <Input disabled={editModal} placeholder="Enter account Number" className="bg-[#e6f4f9]" />
                </Form.Item>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Account Name" name="accName" rules={[{ required: true }, { type: "string" }]}>
                  <Input placeholder="Enter account Name" className="bg-[#e6f4f9]" />
                </Form.Item>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Routing Number" name="routingNumber" rules={[{ required: true }, { type: "string" }]}>
                  <Input disabled={editModal} placeholder="Enter Routing Number" className="bg-[#e6f4f9]" />
                </Form.Item>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Sort Code" name="sortCode" rules={[{ required: true }, { type: "string" }]}>
                  <Input disabled={editModal} placeholder="Enter sort code" className="bg-[#e6f4f9]" />
                </Form.Item>
              </Col>
              <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
                <Form.Item label="Account Type" name="accType" rules={[{ required: true }]}>
                  <Select placeholder="Select Account Type">
                    {types.map((options: any) => (
                      <Option value={options.toLowerCase()}>{options}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default LinkAccount;
