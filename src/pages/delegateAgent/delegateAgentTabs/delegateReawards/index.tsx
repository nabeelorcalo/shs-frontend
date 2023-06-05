import React, { useEffect, useState } from "react";
import { Button, Col, Form, Input, Row, Space, Typography, Modal } from "antd";
import { rewardForm } from "./rewardMock";
import "../../style.scss";
import useCustomHook from "../../actionHandler";
import { GlobalTable } from "../../../../components";
import { useRecoilState } from "recoil";
import { getRewardState } from "../../../../store/delegate";
import { Select } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons/lib/icons';

const Rewards = () => {
  const [open, setOpen] = useState({ isOpen: false, id: '' });
  const action = useCustomHook();
  const rewardData = useRecoilState<any>(getRewardState);

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const columns = [
    {
      dataIndex: "Roles",
      render: (_: any, item: any) => (
        <div>
          {item?.role}
        </div>
      ),
      key: "roles",
      title: "Roles",
    },
    {
      dataIndex: "rewardAmount",
      render: (_: any, item: any) => (
        <div>
          {item?.rewardAmount}
        </div>
      ),
      key: "rewardAmount",
      title: "RewardAmount",
    },
    {
      dataIndex: "maxWithDrawal",
      render: (_: any, item: any) => (
        <div>
          {item?.maxWithdrawal}
        </div>
      ),
      key: "maxWithDrawal",
      title: "Max Withdrawal Transaction",
    },
    {
      render: (_: any, item: any) => (
        <Typography
          onClick={() => {
            setOpen({
              isOpen: true,
              id: item?.id
            })
          }}
          className="underline decoration-1 text-primary font-normal text-base text-secondary-color">
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
    if (role === 'INTERN') {
      rewards.push({ role: 'INTERN', rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === 'STUDENT') {
      rewards.push({ role: 'STUDENT', rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === 'UNIVERSITY') {
      rewards.push({ role: 'UNIVERSITY', rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === 'COMPANY_MANAGER') {
      rewards.push({ role: 'COMPANY_MANAGER', rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === 'COMPANY_ADMIN') {
      rewards.push({ role: 'COMPANY_ADMIN', rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    } else if (role === 'DELEGATE_AGENT') {
      rewards.push({ role: 'DELEGATE_AGENT', rewardAmount: rewardAmount, maxWithdrawal: maxWithdrawal });
    }
    // Call the API with the updated rewards object
    action.addRewards({ rewards });
  };

  useEffect(() => {
    action.getAllRewards(1, 10);
  }, [])

  return (
    <div className="rewards">
      <GlobalTable tableData={rewardData[0]} columns={columns} />
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
        >
          <Row gutter={30} className="mb-7 mt-5">
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label='Role'
                name='role'
                className="text-base font-semibold text-teriary-color"
              >
                <Select
                  placeholder='Select'
                  onChange={handleChange}
                  options={[
                    { value: 'INTERN', label: 'INTERN' },
                    { value: 'STUDENT', label: 'STUDENT' },
                    { value: 'COMPANY_ADMIN', label: 'COMPANY ADMIN' },
                    { value: 'UNIVERSITY', label: 'COMPANY ADMIN' },
                    { value: 'COMPANY_MANAGER', label: 'COMPANY_MANAGER' },
                    { value: 'DELEGATE_AGENT', label: 'DELEGATE_AGENT' },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
              <Form.Item
                label='Reward Amount'
                name='rewardAmount'
                className="text-base font-semibold text-teriary-color"
              >
                <Input
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
                className="text-base font-semibold text-teriary-color "
              >
                <Input
                  placeholder='PlaceHolder'
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
