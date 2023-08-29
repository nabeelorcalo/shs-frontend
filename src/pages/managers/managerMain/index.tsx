import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form, Space, Select, TablePaginationConfig } from 'antd';
import { ROUTES_CONSTANTS } from "../../../config/constants";
import { useNavigate } from "react-router-dom";
import {
  ButtonThemePrimary,
  ButtonThemeSecondary,
  DropDown,
  FiltersButton,
  PageHeader,
  SearchBar
} from "../../../components";
import { User } from "../../../assets/images";
import listView from "../../../assets/images/profile/university/listview.svg";
import gridview from "../../../assets/images/profile/university/gridview.svg";
import ManagerInfo from "./managerInfo";
import ManagerInfoTable from "./managerInfoTable";
import Drawer from "../../../components/Drawer";
import '../style.scss';
import useCustomHook from "../actionHandler";
import { useRecoilState, useResetRecoilState } from "recoil";
import { settingDepartmentState } from "../../../store";
import {
  companyAdminManagerFilterState,
  companyAdminManagerPaginationState,
  getManagerDetailState
} from "../../../store/managerCompanyAdmin";
const { Option } = Select;

const ManagerMain = () => {
  const action = useCustomHook();
  const [tableParams, setTableParams]: any = useRecoilState(companyAdminManagerPaginationState);
  const [filter, setFilter] = useRecoilState(companyAdminManagerFilterState);
  const resetList = useResetRecoilState(companyAdminManagerFilterState);
  const resetTableParams = useResetRecoilState(companyAdminManagerPaginationState);
  const pdfHeader = ['name', 'title', 'status', 'internee'];
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [showGrid, setShowGrid] = useState(true);
  const [showTable, setShowTable] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeButton, setActiveButton] = useState(0);
  const [searchItem, setSearchItem] = useState('');
  const [form] = Form.useForm();
  const managerCardData = useRecoilState<any>(getManagerDetailState);
  const departmentData = useRecoilState<any>(settingDepartmentState);

  const pdfBody = managerCardData[0].map((item: any) =>
    [
      item?.companyManager?.firstName + ' ' + item?.companyManager?.lastName,
      item?.title,
      item?.companyManager?.status,
      item?.assignedInterns
    ]
  )
  const departmentIds = departmentData[0].map((department: any) => {
    return { name: department.name, id: department.id };
  });

  const params: any = {
    page: tableParams?.pagination?.current,
    limit: tableParams?.pagination?.pageSize,
  };

  const searchValue = (e: any) => {
    setSearchItem(e);
    setFilter({ ...filter, page: 1, search: e })
    setTableParams((prevFilter: any) => ({
      ...prevFilter,
      pagination: {
        ...prevFilter.pagination,
        current: 1
      }
    }))
  };

  useEffect(() => {
    fetchSubCompany()
  }, [searchItem, filter])

  const fetchSubCompany = () => {
    action.getManagerCompanyAdmin(
      filter,
      tableParams,
      setTableParams
    );
  };

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  useEffect(() => {
    action.getSettingDepartment(1, "");
  }, []);

  const onFinish = (values: any) => {
    const { statusFilters, departmentFilters } = values;
    let param: any = {};
    if (statusFilters) param['status'] = statusFilters;
    if (departmentFilters) param['departmentId'] = departmentFilters;
    setFilter({ ...filter, page: 1, ...param })
    setOpenDrawer(false)
  }

  const handleClick = (buttonIndex: any) => {
    setActiveButton(buttonIndex);
  }

  const handleClearForm = () => {
    form.resetFields();
    setOpenDrawer(false)
    setFilter({
      page: 1,
      limit: 10,
      department: "",
      search: "",
      status: "",
    })
  };

  const handleChangeSelect = (value: string, label: string) => {
    form.setFieldsValue({
      [label]: value
    })
  };

  const handleTableChange = (pagination: TablePaginationConfig) => {
    const { current }: any = pagination;
    setTableParams({ pagination });
    setFilter((prevFilter) => ({
      ...prevFilter,
      page: current,
    }));
  };

  return (
    <div className="manager-main">
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title='Filters'
      >
        <Form
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <div className="mb-6">
            <Form.Item
              name='statusFilters'
              label='Status'
            >
              <div className="mt-2">
                <Select
                  placeholder='Select'
                  className="w-[100%]"
                  onChange={(e: any) => handleChangeSelect(e, 'statusFilters')}
                >
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </div>
            </Form.Item>
          </div>
          <div className="mb-6">
            <Form.Item
              name='departmentFilters'
              label='Department'
            >
              <div className="mt-2">
                <Select
                  placeholder='Select'
                  className="w-full"
                  onChange={(e: any) => handleChangeSelect(e, 'departmentFilters')}
                >
                  {departmentIds.map((item: any) => {
                    return <Option value={item.id}>{item.name}</Option>;
                  })}
                </Select>
              </div>
            </Form.Item>
          </div>
          <div className="flex justify-center sm:justify-end">
            <Space>
              <ButtonThemeSecondary
                onClick={() => handleClearForm()}
              >
                Reset
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                htmlType="submit"
              >
                Apply
              </ButtonThemePrimary>
            </Space>
          </div>
        </Form>
      </Drawer>
      <Row>
        <Col xxl={24} xl={24} lg={24} md={24} sm={24} xs={24}>
          <PageHeader title='Managers' bordered={true} />
        </Col>
      </Row>
      <Row gutter={[20, 30]} className="flex items-center pb-5">
        <Col xl={6} lg={24} md={24} sm={24} xs={24}>
          <SearchBar
            placeholder="Search by person name"
            handleChange={searchValue}
          />
        </Col>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}
          className="flex max-sm:flex-col gap-4 justify-end"
        >
          <ButtonThemePrimary
            onClick={() => {
              navigate(`/${ROUTES_CONSTANTS.ADD_MANAGER}`);
            }}
          >
            <span className="flex items-center">
              <User />
              <span className="ml-2">New Manager</span>
            </span>
          </ButtonThemePrimary>
          <FiltersButton label='Filters' onClick={() => setOpenDrawer(true)} />
          <div className="flex justify-between flex-row gap-4">
            <div className="text-input-bg-color rounded-lg p-1 flex gap-2">
              <div
                className={`button ${activeButton === 0 ? 'active' : ''}`}
                onClick={() => {
                  setShowGrid(true);
                  setShowTable(false);
                  handleClick(0);
                }}
              >
                <img src={gridview} alt="grid-iocn" className='img-style' />
              </div>
              <div
                className={`button ${activeButton === 1 ? 'active' : ''}`}
                onClick={() => {
                  setShowTable(true);
                  setShowGrid(false);
                  handleClick(1);
                }}
              >
                <img src={listView} alt="list-icon" className='img-style' />
              </div>
            </div>
            <DropDown
              requiredDownloadIcon
              options={["pdf", "excel"]}
              value={value}
              setValue={(val: any) => {
                action.downloadPdfOrCsv(val, pdfHeader, managerCardData[0].map((item: any) => {
                  return {
                    name: item?.companyManager?.firstName + ' ' + item?.companyManager?.lastName,
                    title: item?.title,
                    status: item?.department?.status,
                    internee: item?.assignedInterns
                  }
                }
                ), 'Manager Data', pdfBody)
              }
              }
            />
          </div>
        </Col>
        <Col xs={24}>
          {showGrid === true && (
            <ManagerInfo
              searchItem={searchItem}
              tableParams={tableParams}
              setTableParams={setTableParams}
            />
          )}
          {showTable === true && (
            <ManagerInfoTable
              searchItem={searchItem}
              filter={filter}
              setFilter={setFilter}
              tableParams={tableParams}
              setTableParams={setTableParams}
              handleTableChange={handleTableChange}
              paginationObject={action.managerPaginationObject}
              params={params}
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default ManagerMain;
