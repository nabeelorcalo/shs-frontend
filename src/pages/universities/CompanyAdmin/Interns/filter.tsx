import React, { useState, useEffect } from 'react'
import { Button, Form } from "antd";
import { ArrowDownDark, UserAvatar } from '../../../../assets/images';
import { CommonDatePicker, DropDown } from '../../../../components';
import DropDownNew from '../../../../components/Dropdown/DropDownNew';
import './style.scss'
import useCustomHook from './actionHandler';
import UseDepartmentCustomHook from '../../../setting/companyAdmin/Department/actionHandler';
import UseManagerCustomHook from "../../../interns/InternsCompanyAdmin/actionHandler";
import UserSelector from '../../../../components/UserSelector';

const status = ["Pending", "Approved", "Rejected",]
const Filters = ({ setShowDrawer }: any) => {
  const [form] = Form.useForm();
  const [openDataPicker, setOpenDataPicker] = useState(false);
  const [selectValue, setSelectValue] = useState<any>(
    {
      userImg: '',
      assignedManager: null,
      status: null,
      department: null,
      joiningDate: null
    }
  );
  const { getUniIntersTableData } = useCustomHook();
  const { getSettingDepartment, settingDepartmentdata }: any = UseDepartmentCustomHook();
  const { getAllManagersData, getAllManagers } = UseManagerCustomHook();

  useEffect(() => {
    getSettingDepartment(null)
    getAllManagersData()
  }, [])

  const filteredData = getAllManagers?.map((item: any, index: number) => {
    return (
      {
        key: index,
        value: item?.id,
        label: `${item?.companyManager?.firstName} ${item?.companyManager?.lastName}`,
        avatar: 'hjghg'
      }
    )
  })

  const ResetHandler = () => {
    setSelectValue({
      department: null,
      status: null,
      joiningDate: null,
      userImg: '',
      assignedManager: null
    });
    getUniIntersTableData()
    setShowDrawer(false)
  }

  const onFinish = () => {
    const values = {
      assignedManager: selectValue.assignedManager,
      status: selectValue.status,
      department: selectValue.department,
      joiningDate: selectValue.joiningDate
    }
    setShowDrawer(false)
    getUniIntersTableData(null, null, selectValue)
  }

  return (
    <div className='uni-interns-filter_main_wrapper'>
      <Form layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item label="Status">
          <DropDown
            name="Status"
            value={selectValue.status}
            options={status.map((item: any) => { return item })}
            setValue={(e: string) => setSelectValue({ ...selectValue, status: e })}
          />
        </Form.Item>
        <Form.Item
          label="Department"
        >
          <DropDown
            name="department"
            value={selectValue.department}
            options={settingDepartmentdata.map((item: any) => item?.name)}
            setValue={(e: string) => setSelectValue({ ...selectValue, department: e })}
          />
        </Form.Item>
        <Form.Item label="Joining Date">
          <CommonDatePicker
            name={selectValue.joiningDate}
            onBtnClick={() => { }}
            open={openDataPicker}
            setOpen={setOpenDataPicker}
            setValue={(e: string) => setSelectValue({ ...selectValue, joiningDate: e })}
          />
        </Form.Item>
        <Form.Item name="mySelect" label="Manager">
          <div className='asignee-wrap w-[100%]'>
            <UserSelector
              placeholder="Select"
              value={selectValue.assignedManager}
              onChange={(event: any) => {
                setSelectValue({
                  ...selectValue,
                  assignedManager: event
                })
              }}
              options={filteredData}
              hasSearch={false}
              handleSearch={(e: any) => console.log(e)}
            />
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