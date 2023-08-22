import React, { useState, useEffect } from 'react'
import { Button, Form, Select } from "antd";
import { ArrowDownDark, UserAvatar } from '../../../../assets/images';
import { CommonDatePicker, DropDown } from '../../../../components';
import DropDownNew from '../../../../components/Dropdown/DropDownNew';
import './style.scss'
import useCustomHook from './actionHandler';
import UseDepartmentCustomHook from '../../../setting/companyAdmin/Department/actionHandler';
import UseManagerCustomHook from "../../../interns/InternsCompanyAdmin/actionHandler";
import UserSelector from '../../../../components/UserSelector';
const { Option } = Select;

const status = ["All", "Pending", "Approved", "Rejected", "Completed", "Terminated", "Employed"]
const Filters = ({ setShowDrawer, selectValue,ResetHandler, setSelectValue, onFinish,resetDatePicker, setResetDatePicker }: any) => {
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);
  
  // const [selectValue, setSelectValue] = useState<any>(
  //   {
  //     userImg: '',
  //     assignedManager: undefined,
  //     status: null,
  //     department: null,
  //     joiningDate: null
  //   }
  // );
  const { getUniIntersTableData } = useCustomHook();
  const { getSettingDepartment, settingDepartmentdata }: any = UseDepartmentCustomHook();
  const { getAllManagersData, getAllManagers } = UseManagerCustomHook();

  useEffect(() => {
    getSettingDepartment(null)
    getAllManagersData()
  }, [])

  const mappedData = getAllManagers?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.id,
        label: `${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`,
        avatar: 'hjghg'
      }
    )
  })
  mappedData.unshift({ key: 0, value: "All", label: "All", avatar: "ckvsvnsd" });

  const departmentFilter = settingDepartmentdata.map((item: any) => item?.name)
  departmentFilter.unshift('All')

  return (
    <div className='uni-interns-filter_main_wrapper'>
      <Form layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item label="Status">
          <DropDown
            name="Select"
            value={selectValue.internStatus}
            options={status.map((item: any) => { return item })}
            setValue={(e: string) => setSelectValue({ ...selectValue, internStatus: e })}
          />
        </Form.Item>
        <Form.Item
          label="Department"
        >
          <DropDown
            name="Select"
            value={selectValue.department}
            options={departmentFilter}
            setValue={(e: string) => setSelectValue({ ...selectValue, department: e })}
          />
        </Form.Item>
        <Form.Item label="Joining Date">
          <CommonDatePicker
            open={openDataPicker}
            setOpen={setOpenDataPicker}
            reset={resetDatePicker}
            setValue={(e: string) => setSelectValue({ ...selectValue, joiningDate: e })}
          />
        </Form.Item>
        <Form.Item name="mySelect" label="Manager">
          <div className='asignee-wrap w-[100%]' defaultValue={"Select"}>
            <Select placeholder="Select" onChange={(event: any) => {
              setSelectValue({
                ...selectValue,
                assignedManager: event
              })
            }} value={selectValue.assignedManager} className="w-[200px]">

              {mappedData.map((data: any) => (
                <Option key={data.key} value={data.value}>{data.label}</Option>
              ))}
            </Select>
          </div>
        </Form.Item>
        <div className="company-admin-filter-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn" onClick={ResetHandler}>
            Reset
          </Button>
          <Button key="submit" className="footer-submit-btn" htmlType="submit">
            Apply
          </Button>
        </div>
      </Form>
    </div>
  )
}

export default Filters