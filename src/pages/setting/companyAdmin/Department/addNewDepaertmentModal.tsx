import { Button, Form } from "antd";
import { Input } from "antd";
import { PopUpModal } from "../../../../components/Model";
import useDepartmentCustomHook from './actionHandler';
import TextArea from 'antd/es/input/TextArea';
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import UserSelector from "../../../../components/UserSelector";

const AddNewDepaertmentModal = (props: any) => {
    const { state, setState } = props;
    const [form] = Form.useForm();
    const { postSettingDepartment, patchSettingDepartment } = useDepartmentCustomHook();

    const departmentsData = [
        { value: 'Design & Development', label: 'Design & Development' },
        { value: 'Marketing & Communication', label: 'Marketing & Communication' },
        { value: 'Project Management', label: 'Project Management' },
        { value: 'Finance Management', label: 'Finance Management' },
        { value: 'Human Resource Management', label: 'Human Resource Management' },
        { value: 'Business & Consultancy', label: 'Business & Consultancy' },
        { value: 'Administration', label: 'Administration' },
        { value: 'Customer Success Management', label: 'Customer Success Management' }
    ]

    const onFinish = (values: any) => {
        if (state?.editField?.id) {
            patchSettingDepartment(values, state?.editField?.id)
            form.resetFields()
            setState({ ...state, isEditModal: false, editField: {} })
        }
        else {
            postSettingDepartment({
                name: values?.departmentName,
                description: values?.description
            })
            setState({ ...state, isEditModal: false })
            form.resetFields()
        };
    }

    const initialValues = {
        departmentName: state?.editField?.name ?? null,
        description: state?.editField?.description ?? null
    }

    return (
        <PopUpModal
            open={state.isEditModal}
            title="Department"
            width={600}
            close={() => { setState({ ...state, isEditModal: false, editField: {} }); form.resetFields() }}
            footer={false}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
                validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
            >
                <Form.Item
                    label={<span className="text-teriary-color">Department Name</span>}
                    name="departmentName"
                    rules={[{ required: true }, { type: "string" }]}
                >
                    {/* <Input
                        className="input"
                        id="departmentName"
                        placeholder="Enter department name "
                        size="middle"
                        type="text"
                    /> */}
                    <UserSelector
                        placeholder="Select Department"
                        options={departmentsData}
                    />
                </Form.Item>
                <Form.Item
                    label={<span className="text-teriary-color">Description</span>}
                    name="description"
                    rules={[{ required: true }, { type: "string" }]}
                >
                    <TextArea rows={6} placeholder="Type here..."
                        id="description"
                        name="description"
                        size="middle"
                        maxLength={255}
                    />
                </Form.Item>
                <div className="setting-department-footer flex justify-end mt-4 gap-2">
                    <Button key="Cancel" className="footer-cancel-btn font-semibold"
                        onClick={() => { setState({ ...state, isEditModal: false }) }}
                    >
                        Cancel
                    </Button>
                    <Button key="submit" className="footer-submit-btn font-semibold" htmlType="submit">
                        Save
                    </Button>
                </div>
            </Form>
        </PopUpModal>
    )
}

export default AddNewDepaertmentModal