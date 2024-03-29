import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { CloseCircleFilled } from '@ant-design/icons'
import _ from 'lodash';
import { Modal, Form, Input, } from 'antd'
import { ButtonThemePrimary, ButtonThemeSecondary, CommonDatePicker, TextArea } from '../../../components';
import "./style.scss"
import { Button } from '../../../components';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../config/validationMessages';
import useCustomHook from '../actionHandler';
import dayjs from 'dayjs';
import { useRecoilValue } from 'recoil';
import { firstGoalState } from '../../../store';
import { ROUTES_CONSTANTS } from '../../../config/constants';
export const AddEditGoalTaskModal = (props: any) => {

  const action = useCustomHook();
  const { 
    title,
    goalData,
    state,
    setState
  } = props;
  let edit = state.edit;
  const navigate = useNavigate();
  const [openStartDate, setOpenStartDate] = useState(false);
  const firstGoalsData: any = useRecoilValue(firstGoalState);
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const dateFormat = 'YYYY/MM/DD';

  useEffect(() => {
    if(!edit) {
      setState({
        ...state,
        initValues: {},
      });
      form.setFields([
        { name: "startingDate", value: '' },
        { name: "note", value: '' },
        { name: "name", value: '' },
      ]);
    } else {
      form.setFields([
        { name: "startingDate", value: state.initValues.startingDate },
        { name: "note", value: state.initValues.note },
        { name: "name", value: state.initValues.name },
      ]);
    }
  }, [edit]);

  const disabledDate = (current: any) => {
    // Define the range of disabled dates 
    const disabledBefore = new Date(goalData?.startDate);
    const disabledAfter = new Date(goalData?.endDate);
    return current && (current < disabledBefore || current > disabledAfter);
  };

  const addGoalTaskHandle = async () => {
      const values = await form.validateFields();
      const data = {
        goalId: goalData.id,
        startingDate: dayjs(values.startingDate).toISOString().split('T')[0],
        note: values.note,
        name: values.name,
        completed: false,
      }
      setLoading(true);
      await action.addGoalTask(data);
      setDisabled(true)
      setLoading(false);
      setState({
        ...state,
        edit: false,
        initValues: {},
        openAddGoalTask: false,
        selectedGoal: firstGoalsData
      });
      form.resetFields();
  };

  const editTaskHandle = async () => {
    const values = await form.validateFields();
    const data = {
      goalId: goalData.id,
      taskId: state.taskId,
      startingDate: dayjs(values.startingDate).toISOString().split('T')[0],
      note: values.note,
      name: values.name,
      completed: false,
    }
    setLoading(true);
    const editData = await action.editTask(data);
    setDisabled(true)
    setLoading(false);
    setState({
      ...state,
      edit: false,
      initValues: {},
      openAddGoalTask: false,
      selectedGoal: editData
    });
    edit = false;
    form.resetFields();
    navigate(`/${ROUTES_CONSTANTS.ALL_GOALS}`)
};


  return (
    <Modal
      title={title}
      open={state.openAddGoalTask}
      onCancel={() => {
        setState({
          ...state,
          edit: false,
          initValues: {},
          openAddGoalTask: false,
        });
        edit = false;
      }}
      width={600}
      className="leave_modal_main"
      maskClosable={true}
      closeIcon={<CloseCircleFilled className=' text-xl text-[#A3AED0]' />}
      footer={false}
      centered
    >
      <Form
        layout='vertical'
        form={form}
        initialValues={state.initValues}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onValuesChange={() => setDisabled(false)}
        onFinish={(state.edit || !(_.isEmpty(state.initValues))) ? editTaskHandle : addGoalTaskHandle}
      >
        <Form.Item
          label="Task Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input
            id="01"
            type="text"
            name="taskName"
            placeholder={"Enter your goal task name"}
          />
        </Form.Item >
        <Form.Item 
          label="Notes" 
          name="note"
          rules={[{ required: true }]} 
        >
          <TextArea rows={6} placeholder="Type a message" maxLength={100} />
        </Form.Item>
        <Form.Item
          name="startingDate"
          label="Date To" 
          rules={[{ required: true }]} 
        >  
          <CommonDatePicker
            name="Date Picker"
            open={openStartDate}
            disabledDates={disabledDate}
            setOpen={setOpenStartDate}
            placement={'bottomLeft'}
            format={dateFormat}
          />
        </Form.Item>
        <Form.Item >
          <div className='flex items-center justify-end gap-3'>
            <ButtonThemeSecondary
              className='Leave_request_Canclebtn'
              onClick={() => {
                setState({
                  ...state,
                  edit: false,
                  initValues: {},
                  openAddGoalTask: false,
                });
                edit = false;
                form.resetFields();
              }}
              type="primary"
              htmlType="button"
            >Cancel</ButtonThemeSecondary>
            <ButtonThemePrimary 
              disabled= {disabled}
              loading={loading}
              htmlType="submit"
            >
            Submit
            </ButtonThemePrimary>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}
