import React, { useEffect, useState } from "react";
import { Col, Row, Form, Typography, Button, Input, Select } from "antd";
import { PageHeader } from "../../../components/PageHeader";
import { DropDown } from "../../../components";
import WithDrawalDetails from "./withDrawalDetails";
import { useNavigate } from "react-router-dom";
import useCustomHook from "../actionHandler";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../config/validationMessages";
import { number } from "echarts";

// const balance = "2000.00";

const WithDrawalRequest = (props: any) => {
  const navigate = useNavigate();
  const { currentBalance, fetchBalance, fetchBankList, bankList, addWithDrawl } = useCustomHook();
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [bankId, setBankId] = useState("");
  const [amount, setAmount] = useState(0);
  const [bankData, setBankData] = useState<any[]>([]);
  const [show, setShow] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    fetchBalance();
    fetchBankList();
  }, []);

  const handleBankChange = (bankIdString: string) => {
    const bankDataObject: any = bankList.find((bData: any) => bData.id === bankIdString);
    setBankId(bankIdString);
    setBankData([
      {
        title: "Account Name",
        value: bankDataObject?.account_holder_name,
      },
      {
        title: "Account Number",
        value: `${bankDataObject?.last4}`,
      },
      {
        title: "Sort Code",
        value: "11111",
      },
      {
        title: "Routing Number",
        value: bankDataObject?.routing_number,
      },
      {
        title: "Account Type",
        value: bankDataObject?.account_holder_type,
      },
      {
        title: "Withdraw Amount",
        value: `${amount} GBP`,
      },
      {
        title: "Withdraw Fee",
        value: `${amount / 5} GBP`,
      },
    ]);
    if (bankDataObject && amount) {
      setShow(true);
    }
  };
  const handleAmountChange = (e: any) => {
    setAmount(e.target.value);
    const parsedData = JSON.parse(JSON.stringify(bankData));
    const withDrawlAmountIndex = parsedData.findIndex((bd: any) => bd.title === "Withdraw Amount");
    const withDrawlFeeIndex = parsedData.findIndex((bd: any) => bd.title === "Withdraw Fee");
    parsedData[withDrawlAmountIndex] = {
      title: "Withdraw Amount",
      value: `${e.target.value} GBP`,
    };
    parsedData[withDrawlFeeIndex] = {
      title: "Withdraw Fee",
      value: `${e.target.value / 5} GBP`,
    };
    setBankData(parsedData);
    if (bankId && e.target.value) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const handleSubmit = (values: any) => {
    const body = {
      amount: values?.amount,
      bankName: values?.bankName,
      bankId,
    };
    addWithDrawl(body).then((result) => {
      if (result.data) {
        setOpen(true);
        setTransactionId(result?.data?.transactionId);
      }
      form.resetFields();
      setBankData([]);
      setBankId("");
      // setAmount(0);
    });
  };

  return (
    <div className="delegate-With-Drawal-Request">
      <PageHeader title="Withdrawal Request" bordered={true} actions={true}>
        <Button
          onClick={() => {
            navigate("/link-account");
          }}
          className="teriary-light-bg-color white-color 
          text-base font-semibold"
        >
          Link Account
        </Button>
      </PageHeader>
      <Form layout="vertical" form={form} validateMessages={DEFAULT_VALIDATIONS_MESSAGES} onFinish={handleSubmit}>
        <Row gutter={20}>
          <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
            <Typography
              className="text-[#14142A] 
              text-xl font-semibold
              mt-4 mb-5"
            >
              Current Balance : £{currentBalance}
            </Typography>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item label="Withdraw Account" name="bankName" rules={[{ required: true }, { type: "string" }]}>
              {/* <DropDown
                name="With Drawal Method"
                value={value}
                options={["Natwest Group", "Hbl", "item 3"]}
                setValue={setValue}
              /> */}
              <Select placeholder="With Drawal Method" onChange={handleBankChange}>
                {bankList?.length &&
                  bankList.map((option: any) => (
                    <Select.Option value={option?.id}>{option?.metadata?.bank_name}</Select.Option>
                  ))}{" "}
              </Select>
            </Form.Item>
          </Col>
          <Col xxl={12} xl={12} lg={12} md={12} sm={24} xs={24}>
            <Form.Item label="Amount" name="amount" rules={[{ required: true }]}>
              <Input
                type="number"
                name="amount"
                onChange={handleAmountChange}
                placeholder="Enter Amount"
                min="0"
              />
            </Form.Item>
          </Col>
        </Row>
        {show && (
          <WithDrawalDetails
            open={open}
            setOpen={setOpen}
            show={show}
            setShow={setShow}
            bankData={bankData}
            amount={amount}
            setAmount={setAmount}
            transactionId={transactionId}
          />
        )}
      </Form>
    </div>
  );
};

export default WithDrawalRequest;
