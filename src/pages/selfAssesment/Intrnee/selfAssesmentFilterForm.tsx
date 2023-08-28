import { Form } from 'antd'
import { useEffect, useState } from 'react'
import { Button, ButtonThemePrimary, ButtonThemeSecondary, CommonDatePicker, DropDown } from '../../../components'
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterData, remarkedByData } from '../../../store';
import UserSelector from '../../../components/UserSelector';
import dayjs from 'dayjs';
import useCustomHook from '../actionHandler';

const SelfAssesmentFilterForm = (props: any) => {
  const remarkedData: any = useRecoilValue(remarkedByData);
  const [form] = Form.useForm();
  const actions = useCustomHook();
  let itemArray: any = [];
  if (remarkedData.length !== 0) {
    for(const remark of remarkedData) {
      const item =  {
        key: remark?.remarked?.id,
        value: remark?.remarked?.id,
        label: `${remark?.remarked?.firstName} ${remark?.remarked?.lastName}`,
        // avatar: <LeaveProfileImg/>
      };
      if(itemArray.length !== remarkedData.length) itemArray.push(item);
    }
  }

  const [filterValu, setFilterValue] = useState({ remarkedBy: "", month: "Select", status: "Select" });
  const [filter, setFilter] = useRecoilState(filterData);
  const [openMonth, setOpenMonth] = useState(false)

  useEffect(()=>{
    actions.getSelfAssessments();
  }, [filter])

  const pick = (object: { [x: string]: any }, keys: any[]): object => {
    return keys.reduce((obj: { [x: string]: any }, key: string | number) => {
      if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        obj[key] = object[key];
      }
      return obj;
    }, {});
  }
  const getFilters = async () => {
    const values = await form.validateFields();
    if(values.month) {
      values.month = dayjs(values?.month).toISOString().split('T')[0];
    }
    if(filterValu?.status && filterValu.status !== 'Select') {
      values.status =  filterValu?.status.toLowerCase();
    }
    const data = pick(values, ['status', 'remarkedBy', 'month']);
    setFilter(data);
  };

  return (
    <div className='filter_form_main'>
      <div className="data_container">
        <Form
          name="basic"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={getFilters}
        >
          <Form.Item
            label="Remarked By"
            name="remarkedBy"
          >
            <UserSelector
                placeholder="Select"
                value={filterValu.remarkedBy}
                options={itemArray}
              />
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <DropDown
              value='Select'
              name={filterValu.status}
              options={['Draft ', 'Submitted', 'Approved', 'Rejected']}
              setValue={(e: string) => setFilterValue({ ...filterValu, status: e })}
            />
          </Form.Item>
          <Form.Item
            label="Month"
            name="month"
          >
            <CommonDatePicker
              name="Date Picker"
              open={openMonth}
              setOpen={setOpenMonth}
              picker='month'
            />
          </Form.Item>
          <Form.Item >
            <div className='flex items-center justify-end filter_btn_wrapper'>
              <ButtonThemeSecondary
                htmlType="button"
                onClick={()=>{ 
                  form.resetFields();
                  setFilterValue({ ...filterValu, status: "Select" });
                  setFilter({});
                }}
                shape="default"
                className="mr-5"
              >
                Reset
              </ButtonThemeSecondary>
              <ButtonThemePrimary
                htmlType="submit"
              >
                Apply
              </ButtonThemePrimary>
            </div>
          </Form.Item>

        </Form>
      </div>

    </div>
  )
}

export default SelfAssesmentFilterForm
