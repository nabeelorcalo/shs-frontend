import React, { useEffect, useState } from 'react'
import { Col, Menu, Row ,Button} from 'antd'
import { DropDown, SearchBar, GlobalTable, BoxWrapper, Notifications, Alert, PopUpModal } from '../../../../components'
import CustomDroupDown from '../../../digiVault/Student/dropDownCustom';
import '../../style.scss';
import useCustomHook from '../../actionHandler';
import { useRecoilState } from 'recoil';
import { getDelegateAgentsState } from '../../../../store/delegate';
import dayjs from 'dayjs';
import { Success, WarningIcon } from '../../../../assets/images';

const DelegateMain = () => {
  const action = useCustomHook();
  const [selectEmail, setSelectEmail] = useState('');
  const [searchItem, setSearchItem] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [accessState, setAccessState] = useState('')
  const [openDelete, setOpenDelete] = useState(false);

  const delegateAgent = useRecoilState<any>(getDelegateAgentsState);
  const searchValue = (e: any) => {
    setSearchItem(e);
  };

  useEffect(() => {
    fetchDelegateAgent();
  }, [searchItem, statusFilter, typeFilter])

  const passwordResetHandler = () => {
    setOpenDelete(false)
    action.forgotpassword({
      email: selectEmail,
    });
  }

  const fetchDelegateAgent = () => {
    const param: any = {};
    if (searchItem) param['q'] = searchItem;
    if (statusFilter) param['status'] = statusFilter?.toUpperCase();
    if (typeFilter) param['type'] = typeFilter?.toUpperCase();
    action.getAgentDelegate({ page: 1, ...param });
  }
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
            borderRadius: "8px"
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
        <span
          onClick={() => {
            setSelectEmail(item?.email)
            setAccessState(item?.id)
          }}
        >
          <CustomDroupDown menu1={item.isDelegate ? active : inActive} />
        </span>
      ),
      key: "Actions",
      title: "Actions",
    },
  ];
  const active = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          action.delegateAccess(accessState, { access: 'revoke' },
            () => {
              fetchDelegateAgent()
            })
            Notifications({
              icon: <Success />,
              title: "Success",
              description: "User access revoked successfully",
              type: "success",
            })
        }}
      >
        Revoke Access
      </Menu.Item>
      <Menu.Item key="2"
        onClick={() => setOpenDelete(true)}
      >
        Password Reset
      </Menu.Item>
    </Menu>
  );
  const inActive = (
    <Menu>
      <Menu.Item
        key="1"
        onClick={() => {
          action.delegateAccess(accessState, { access: 'grant' },
            () => {
              fetchDelegateAgent();
            })
            Notifications({
              icon: <Success />,
              title: "Success",
              description: "User access granted successfully",
              type: "success",
            })
        }}
      >
        Grant Access
      </Menu.Item>
    </Menu>
  );
  return (
    <div className='delegate-main'>
      <Row gutter={[20, 20]}>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <SearchBar handleChange={searchValue} placeholder="Search by person name" />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>
          <div className="flex  justify-center sm:justify-end gap-3 mt-3 md:mt-0 delegate-right-menu">
            <DropDown
              name="Status"
              value={statusFilter}
              options={["Active", "Inactive"]}
              setValue={(e: any) => setStatusFilter(e)}
            />
            <DropDown
              name="Type"
              value={typeFilter}
              options={["Intern", "Student", "Delegate_Agent", 'Company_Admin', 'Company_Manager', 'University']}
              setValue={(e: any) => setTypeFilter(e)}
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
      <PopUpModal
        open={openDelete}
        width={500}
        close={() => setOpenDelete(false)}
        children={
          <div className="flex flex-col gap-5">
            <div className='flex flex-row items-center gap-3'>
              <div><WarningIcon /></div>
              <div><h2>Reset Password</h2></div>
            </div>
            <p>Are you sure to generate reset the password request</p>
          </div>
        }
        footer={
          <div className="flex flex-row pt-4 gap-3 justify-end max-sm:flex-col">
            <Button
              type="default"
              size="middle"
              className="button-default-tertiary max-sm:w-full"
              onClick={() => setOpenDelete(false)}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              size="middle"
              className="button-tertiary max-sm:w-full"
              onClick={passwordResetHandler}
            >
              Reset
            </Button>
          </div>
        }
      />
    </div>
  )
}

export default DelegateMain