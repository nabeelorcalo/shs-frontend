import { PopUpModal } from '../../../../../components'
import { Button, Form, Input } from 'antd'
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../../config/validationMessages';
import useTimesheetCustomHook from '../actionHandler';

const AddCategory = (props: any) => {
  const { state, setState, editData, setEditData } = props
  const [form] = Form.useForm();
  const { TextArea } = Input;

  console.log(state,'state data is', editData);

  const initialValues = {
    categoryName: state?.editField?.name,
    description: state?.editField?.description,
  }
  const { postTimeSheetData, editTimeSheets } = useTimesheetCustomHook();

  //  handle timeSheet form data 
  const handleFinish = (values: any) => {
    if (state.action === "edit") {
      editTimeSheets(state?.editField?.id, values);
    } else {
      postTimeSheetData(values);
    }
    setState({ ...state,editField:{},action:"", isEditModal: false });
    setEditData({});
    form.resetFields();

  }
  const handleClose = () => {
    setState({ ...state, isEditModal: false });
    setEditData({})
    form.resetFields();
  };

  return (
    <PopUpModal
      open={state.isEditModal}
      title="Add Category"
      width={600}
      close={handleClose}
      footer={false}
    >
      <Form
        layout="vertical"
        onFinish={handleFinish}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        form={form}
        initialValues={initialValues}
      >
        <Form.Item
          name="categoryName"
          rules={[{ required: true }, { type: "string" }]}
          label="Category Name"
        >
          <Input placeholder="Add category" className="input-style" />
        </Form.Item>
        <div className="mt-3 flex flex-col">
          <Form.Item
            name='description'
            label=" Description"
            rules={[{ required: true }, { type: "string" }]}
          >
            <TextArea rows={6} placeholder="Describe Category" />
          </Form.Item>
        </div>
        <div className="timesheet-department-footer flex max-sm:flex-col gap-4 justify-end">
          <Button onClick={handleClose} className="footer-cancel-btn">
            Cancel
          </Button>
          <Button htmlType="submit" className="footer-submit-btn">
            Add
          </Button>
        </div>
      </Form>
    </PopUpModal>
  )
}

export default AddCategory