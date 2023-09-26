import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Space, Typography, Modal } from "antd";
import "../../style.scss";
import useCustomHook from "../../actionHandler";
import { GlobalTable } from "../../../../components";
import { useRecoilState } from "recoil";
import { getRewardState } from "../../../../store/delegate";
import { Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons/lib/icons';
import constants from "../../../../config/constants";

const Rewards = () => {
  const [open, setOpen] = useState({ isOpen: false, id: '' });
  const action = useCustomHook();
  const rewardData = useRecoilState<any>(getRewardState);
  const [form] = Form.useForm();

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      dataIndex: "Roles",
      render: (_: any, item: any) => (
        <div>
          {item?.role || 'N/A'}
        </div>
      ),
      key: "roles",
      title: "Roles",
    },
    {
      dataIndex: "rewardAmount",
      render: (_: any, item: any) => (
        <div>
          {item?.rewardAmount || 'N/A'}
        </div>
      ),
      key: "rewardAmount",
      title: "Reward Amount",
    },
    {
      dataIndex: "maxWithDrawal",
      render: (_: any, item: any) => (
        <div>
          {item?.maxWithdrawal || 'N/A'}
        </div>
      ),
      key: "maxWithDrawal",
      title: "Max Withdrawal Transaction",
    },
    {
      render: (_: any, item: any) => (
        <Typography
          onClick={() => {
            form.setFieldsValue({
              role: item?.role,
              rewardAmount: item?.rewardAmount,
              maxWithdrawal: item ?. maxWithdrawal
            });
            setOpen({
              isOpen: true,
              id: item?.id
            })
          }}
          className="underline decoration-1 text-primary font-normal text-base text-secondary-color text-center cursor-pointer">
          Edit
        </Typography>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];

  const onFinish = (values: any) => {
    const {
      role,
      rewardAmount,
      maxWithdrawal
    } = values;
    let rewards: any = [];
    if (role === constants.INTERN) {
      rewards.push({ role: constants.INTERN, rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === constants.STUDENT) {
      rewards.push({ role: constants.STUDENT, rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === constants.UNIVERSITY) {
      rewards.push({ role: constants.UNIVERSITY, rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === constants.MANAGER) {
      rewards.push({ role: constants.MANAGER, rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === constants.COMPANY_ADMIN) {
      rewards.push({ role: constants.COMPANY_ADMIN, rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === constants.DELEGATE_AGENT) {
      rewards.push({ role: constants.DELEGATE_AGENT, rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    }
    action.addRewards({ rewards },
      () => action.getAllRewards(1))
    setOpen({
      isOpen: false,
      id: ""
    })  
  };

  const validatePositiveNumber = (rule: any, value: any, callback: any) => {
    if (value < 0) {
      callback('Negative values are not allowed');
    } else {
      callback();
    }
  };


  useEffect(() => {
    action.getAllRewards(1);
  }, [])

  return (
    <div className="rewards">
      <GlobalTable tableData={rewardData[0]} columns={columns} pagination={false}  />
      <Modal
        open={open.isOpen}
        closeIcon={
          <CloseCircleFilled
            className="text-teriary-color text-xl"
            onClick={() => {
              setOpen({
                isOpen: false,
                id: rewardData[0].id
              })
            }}
          />
        }
        footer={null}
        centered
        title='Edit Rewards'
      >
        <Form
          name="basic"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
          form={form}
        >
          <Row gutter={30} className="mb-7 mt-5">
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label='Role'
                name='role'
                className="text-base font-semibold text-teriary-color"
                hidden
              >
                <Select
                  placeholder='Select'
                  onChange={handleChange}
                  disabled
                  options={[
                    { value: constants.INTERN, label: 'INTERN' },
                    { value: constants.STUDENT, label: 'STUDENT' },
                    { value: constants.COMPANY_ADMIN, label: 'COMPANY ADMIN' },
                    { value: constants.UNIVERSITY, label: 'University' },
                    { value: constants.MANAGER, label: 'COMPANY_MANAGER' },
                    { value: constants.DELEGATE_AGENT, label: 'DELEGATE_AGENT' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label='Reward Amount'
                name='rewardAmount'
                rules={[{ validator: validatePositiveNumber }]}
                className="text-base font-semibold text-teriary-color"
              >
                <Input
                  type="number"
                  placeholder='PlaceHolder'
                  size="large"
                  className="text-input-bg-color rounded-[8px]"
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                name="maxWithdrawal"
                label="Max Withdrawal Transaction"
                rules={[{ validator: validatePositiveNumber }]}
                className="text-base font-semibold text-teriary-color "
              >
                <Input
                  placeholder='PlaceHolder'
                  type="number"
                  size="large"
                  className="text-input-bg-color rounded-[8px]"
                />
              </Form.Item>
            </Col>
          </Row>
          <Typography className="flex justify-center sm:justify-end">
            <Space>
              <Button
                onClick={() => {
                  setOpen({
                    isOpen: false,
                    id: rewardData[0].id
                  })
                }}
                className="border-1 border-[#4A9D77] teriary-color font-semibold">
                Cancel
              </Button>
              <Button
                className="teriary-bg-color white-color border-0 border-[#4a9d77] ml-2 pt-0 pb-0 pl-5 pr-5"
                htmlType="submit"
              >
                Submit
              </Button>
            </Space>
          </Typography>
        </Form>
      </Modal>
    </div>
  );
};

export default Rewards;
