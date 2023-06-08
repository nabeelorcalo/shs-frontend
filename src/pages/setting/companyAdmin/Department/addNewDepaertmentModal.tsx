import { Button, Form } from "antd";
import { Input } from "antd";
import { PopUpModal } from "../../../../components/Model";
import useDepartmentCustomHook from './actionHandler';
import TextArea from 'antd/es/input/TextArea';

const AddNewDepaertmentModal = (props: any) => {
    const { state, setState } = props;
    const [form] = Form.useForm();
    const { postSettingDepartment, patchSettingDepartment } = useDepartmentCustomHook();

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
            close={() => { setState({ ...state, isEditModal: false , editField:{}}); form.resetFields() }}
            footer={false}
        >
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinish}
                initialValues={initialValues}
            >
                <Form.Item
                    label="Department Name"
                    name="departmentName"
                >
                    <Input
                        className="input"
                        id="departmentName"
                        placeholder="Enter department name "
                        size="middle"
                        type="text"
                    />
                </Form.Item>
                <Form.Item
                    label="Description"
                    name="description"
                >
                    <TextArea rows={6} placeholder="Write Something..."
                        id="description"
                        name="description"
                        size="middle"
                    />
                </Form.Item>
                <div className="setting-department-footer flex justify-end mt-4 gap-2">
                    <Button key="Cancel" className="footer-cancel-btn "
                    // onClick={resetFormHandler}
                    >
                        Cancel
                    </Button>
                    <Button key="submit" className="footer-submit-btn" htmlType="submit">
                        Submit
                    </Button>
                </div>
            </Form>
        </PopUpModal>
    )
}

export default AddNewDepaertmentModal