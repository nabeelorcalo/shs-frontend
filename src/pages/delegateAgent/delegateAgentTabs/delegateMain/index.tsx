import React, { useEffect, useState } from 'react'
import { Col, Menu, Row } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { DropDown, SearchBar, GlobalTable, BoxWrapper } from '../../../../components'
import CustomDroupDown from '../../../digiVault/Student/dropDownCustom';
import '../../style.scss';
import useCustomHook from '../../actionHandler';
import { useRecoilState } from 'recoil';
import { getDelegateAgentsState } from '../../../../store/delegate';
import dayjs from 'dayjs';

const DelegateMain = () => {
  const action = useCustomHook();
  const [value, setValue] = useState("");
  const delegateAgent = useRecoilState<any>(getDelegateAgentsState);
  const searchValue = () => { };

  useEffect(() => {
    action.getAgentDelegate();
  }, [])

  const columns = [
    {
      dataIndex: "no",
      render: (_: any, item: any) => (
        <div>
          {item?.id}
        </div>
      ),
      key: "no",
      title: "No.",
    },
    {
      dataIndex: "name",
      render: (_: any, item: any) => (
        <div>
          {item?.firstName}  {item?.lastName}
        </div>
      ),
      key: "name",
      title: "Name",
    },
    {
      dataIndex: "email",
      render: (_: any, item: any) => (
        <div>
          {item?.email}
        </div>
      ),
      key: "email",
      title: "Email",
    },
    {
      dataIndex: "agenttype",
      render: (_: any, item: any) => (
        <div>
          {item?.role}
        </div>
      ),
      key: "agenttype",
      title: "Agent Type",
    },
    {
      dataIndex: "joiningdate",
      render: (_: any, item: any) => (
        <div>
          {dayjs(item?.createdAt).format('DD/MMM/YY')}
        </div>
      ),
      key: "joiningdate",
      title: "Joining Date",
    },
    {
      dataIndex: "delegatemember",
      render: (_: any, item: any) => (
        <div>
          {item?.referralsCount}
        </div>
      ),
      key: "delegatemember",
      title: "Delegate Member",
    },
    {
      dataIndex: "status",
      render: (_: any, item: any) => (
        <div
          className="table-status-style text-center white-color rounded"
          style={{
            backgroundColor:
              item?.isDelegate === true
                ? "#3DC475" :
                item.isDelegate === false ?
                  "#D83A52"
                  : item?.isDelegate === null
                    ? "#D83A52"
                    : "",
            padding: " 2px 3px 2px 3px",
          }}
        >
          {item?.isDelegate === true ? 'Active' : "Inactive"}
        </div>
      ),
      key: "status",
      title: "Status",
    },
    {
      render: (_: any, item: any) => (
        <span>
          <CustomDroupDown menu1={item.isDelegate ? active : inActive} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const active = (
    <Menu>
      <Menu.Item key="1" >Revoke Access</Menu.Item>
      <Menu.Item key="2" ><a href="create-password">Password Reset</a></Menu.Item>
    </Menu>
  );

  const inActive = (
    <Menu>
      <Menu.Item key="1" >Grant Access</Menu.Item>
      <Menu.Item key="2" ><a href="create-password">Password Reset</a></Menu.Item>
    </Menu>
  );
  return (
    <div className='delegate-main'>
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex  justify-center sm:justify-end gap-3 mt-3 md:mt-0 delegate-right-menu">
            <DropDown
              name="Status"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
            <DropDown
              name="Method"
              value={value}
              options={["item 1", "item 2", "item 3"]}
              setValue={setValue}
            />
          </div>
        </Col>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <BoxWrapper>
            <div className="shadow-[0px 0px 8px 1px rgba(9, 161, 218, 0.1)] white-bg-color p-2 rounded-2xl">
              <GlobalTable tableData={delegateAgent[0]} columns={columns} />
            </div>
          </BoxWrapper>
        </Col>
      </Row>
    </div>
  )
}

export default DelegateMain