import { useEffect, useState } from "react";
import { Avatar, Button, Form, Select } from "antd";
import { CommonDatePicker } from "../../../components";
import useCustomHook from "../actionHandler";
import "./style.scss";
import DropDownNew from "../../../components/Dropdown/DropDownNew";
import { ArrowDownDark } from "../../../assets/images";

const Filters = ({ setShowDrawer }: any) => {
  const { getData, getDepartmentList, handleFilterParams, departmentList, internList, getInternList } = useCustomHook();
  const status = [{ value: "Pending" }, { value: "Approved" }, { value: "Rejected" }];
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [filterValue, setFilterValue] = useState<any>();
  const [intern, setIntern] = useState<any>();

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
    getDepartmentList();
    getInternList();
  }, []);

  return (
    <div className="casestudies-filter_main_wrapper">
      <Form layout="vertical" form={form}>
        <Form.Item name="intern" label="Intern">
          <DropDownNew
            placement={"bottomRight"}
            value={""}
            items={[
              {
                label: (
                  <div className="max-h-[200px] overflow-y-scroll">
                    {internList?.map((item: any) => (
                      <div
                        key={item?.id}
                        className="flex justify-between mb-4"
                        onClick={() => {
                          setIntern(item);
                          setFilterValue({ ...filterValue, intern: item?.id });
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
            ]}
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
          </DropDownNew>
        </Form.Item>
        <Form.Item name="department" label="Department">
          <Select
            value={filterValue?.intern}
            placeholder="Select"
            onChange={(e: string) => setFilterValue({ ...filterValue, department: e })}
            options={departmentList}
          />
        </Form.Item>
        <CommonDatePicker
          name="date"
          onBtnClick={() => {}}
          open={openDataPicker}
          setOpen={setOpenDataPicker}
          setValue={(date: any) => setFilterValue({ ...filterValue, date })}
        />
        <Form.Item name="status" label="Status" className="mt-5">
          <Select
            value={filterValue?.status}
            placeholder="Select"
            onChange={(e: string) => setFilterValue({ ...filterValue, status: e })}
            options={status}
          />
        </Form.Item>
        <div className="filter-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn " onClick={ResetHandler}>
            Reset
          </Button>
          <Button key="submit" className="footer-submit-btn" htmlType="submit" onClick={onFinish}>
            Apply
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Filters;
