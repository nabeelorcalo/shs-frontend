import React, { useState, useEffect } from 'react'
import { Button, Form } from "antd";
import { ArrowDownDark, UserAvatar } from '../../../../assets/images';
import { CommonDatePicker, DropDown } from '../../../../components';
import DropDownNew from '../../../../components/Dropdown/DropDownNew';
import './style.scss'
import useCustomHook from './actionHandler';
import UseDepartmentCustomHook from '../../../setting/companyAdmin/Department/actionHandler';
import UseManagerCustomHook from "../../../interns/InternsCompanyAdmin/actionHandler";
const detailsData = [
  {
    userImg: UserAvatar,
    userName: 'john doe'
  },
  {
    userImg: UserAvatar,
    userName: 'mina marino'
  },
  {
    userImg: UserAvatar,
    userName: 'clark'
  },
  {
    userImg: UserAvatar,
    userName: 'sarah joe'
  },
]
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

  console.log(getAllManagers, "getAllManagers");




  const ResetHandler = () => {
    setSelectValue({
      department: null,
      status: null,
      joiningDate: null,
      userImg: '',
      assignedManager: null
    });
  }

  const onFinish = (values: any) => {
    console.log(values);

    setShowDrawer(false)
    getUniIntersTableData(null, null,null, selectValue)
  }

  return (
    <div className='uni-interns-filter_main_wrapper'>
      <Form layout="vertical"
        form={form}
        onFinish={onFinish}>
        <Form.Item name="status" label="Status">
          <DropDown
            name={selectValue.status}
            value={selectValue.status}
            options={status.map((item: any) => { return item })}
            setValue={(e: string) => setSelectValue({ ...selectValue, status: e })}
          />
        </Form.Item>
        <Form.Item
          name="department"
          label="Department"
        >
          <DropDown
            name={selectValue.department}
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
            <DropDownNew
              placement={'bottomRight'}
              items={[
                {
                  label: <div>{detailsData.map((item: any) => (
                    <div className="flex items-center gap-3 mb-[20px]"
                      onClick={() => setSelectValue({ ...selectValue, assignedManager: item.assignedManager, userImg: item.userImg })}
                    >
                      <img src={item.userImg}
                        className='h-[24px] w-[24px] rounded-full object-cover'
                      />
                      <p>{item.assignedManager}</p>
                    </div>))}
                  </div>,
                  key: 'users'
                }]}>
              <div className="drop-down-with-imgs flex items-center gap-3">
                <div className="flex items-center gap-3 mr-[40px]">
                  {selectValue.userImg != '' && <img src={selectValue.userImg} />}
                  <p>{selectValue.assignedManager}</p>
                </div>
                <ArrowDownDark />
              </div>
            </DropDownNew>
          </div>
        </Form.Item>
        <div className="company-admin-filter-footer flex justify-end mt-4 gap-2">
          <Button key="Cancel" className="footer-cancel-btn" onClick={ResetHandler} >
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