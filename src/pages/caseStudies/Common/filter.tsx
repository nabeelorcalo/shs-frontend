import { useEffect, useRef, useState } from "react";
import { Avatar, Dropdown, Form, Select } from "antd";
import { ButtonThemePrimary, ButtonThemeSecondary, CommonDatePicker } from "../../../components";
import useCustomHook from "../actionHandler";
import "./style.scss";
import { ArrowDownDark } from "../../../assets/images";
import constants from "../../../config/constants";

const Filters = ({ setShowDrawer }: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  const {
    currentUserRole,
    getData,
    getDepartmentList,
    handleFilterParams,
    departmentList,
    internList,
    getInternList,
    // company manager list
    companyManagerList,
    getCompanyManagerList,
  } = useCustomHook();
  const status = [{ value: "Pending" }, { value: "Approved" }, { value: "Rejected" }];
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [filterValue, setFilterValue] = useState<any>();
  const [intern, setIntern] = useState<any>();

  const list = currentUserRole === constants.COMPANY_ADMIN ? companyManagerList : internList;

  const onFinish = () => {
    // maintain filter params on search also
    handleFilterParams(filterValue);
    getData(filterValue);
    setShowDrawer(false);
  };

  const ResetHandler = () => {
    // reset filter params
    setFilterValue({});
    setIntern("");
    handleFilterParams({});
    getData("resetFilter");
  };

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getDepartmentList();
      currentUserRole === constants.COMPANY_ADMIN ? getCompanyManagerList() : getInternList();
    }
  }, []);

  return (
    <div className="casestudies-filter_main_wrapper">
      <Form layout="vertical" form={form}>
        <Form.Item label={currentUserRole === constants.COMPANY_ADMIN ? `Manager` : "Intern"}>
          <Dropdown
            placement={"bottomRight"}
            menu={{
              items: [
                {
                  label: (
                    <div className="max-h-[200px] overflow-y-scroll">
                      {list?.map((item: any) => (
                        <div
                          key={item?.id}
                          className="flex justify-between mb-4"
                          onClick={() => {
                            setIntern(item);
                            currentUserRole === constants.COMPANY_ADMIN
                              ? setFilterValue({ ...filterValue, manager: item?.id })
                              : setFilterValue({ ...filterValue, intern: item?.id });
                          }}
                        >
                          <div className="flex">
                            <div className="mr-2">
                              <Avatar
                                className="h-[32px] w-[32px] rounded-full object-cover relative"
                                src={item?.avatar}
                                alt={item?.firstName}
                                icon={
                                  <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                                    {item?.firstName[0]}
                                    {item?.lastName[0]}
                                  </span>
                                }
                              />
                            </div>
                            <div>{`${item?.firstName} ${item?.lastName}`}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ),
                  key: "users",
                },
              ],
            }}
          >
            <div className="drop-down-with-imgs flex items-center gap-3 h-12">
              {intern ? (
                <div className="flex items-center gap-3 mr-[40px]">
                  <Avatar
                    className="h-[32px] w-[32px] rounded-full object-cover relative"
                    src={intern?.avatar}
                    alt={intern?.firstName}
                    icon={
                      <span className="uppercase text-sm leading-[16px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                        {intern?.firstName[0]}
                        {intern?.lastName[0]}
                      </span>
                    }
                  />
                  <p>{`${intern?.firstName} ${intern?.lastName}`}</p>
                </div>
              ) : (
                <p>Select</p>
              )}
              <ArrowDownDark />
            </div>
          </Dropdown>
        </Form.Item>
        <Form.Item label="Department">
          <Select
            allowClear
            value={filterValue?.department}
            placeholder="Select"
            onChange={(e: string) => setFilterValue({ ...filterValue, department: e })}
            options={departmentList}
          />
        </Form.Item>
        <Form.Item label="Date">
          <CommonDatePicker
            name="date"
            onBtnClick={() => { }}
            open={openDataPicker}
            setOpen={setOpenDataPicker}
            setValue={(date: any) => setFilterValue({ ...filterValue, date })}
          />
        </Form.Item>
        <Form.Item label="Status">
          <Select
            allowClear
            value={filterValue?.status}
            placeholder="Select"
            onChange={(e: string) => setFilterValue({ ...filterValue, status: e })}
            options={status}
          />
        </Form.Item>
        <div className="filter-footer flex justify-end mt-4 gap-2">
          <ButtonThemeSecondary key="Cancel" onClick={ResetHandler}>
            Reset
          </ButtonThemeSecondary>
          <ButtonThemePrimary key="submit" htmlType="submit" onClick={onFinish}>
            Apply
          </ButtonThemePrimary>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
