import React from 'react'
import { Form, Select,} from "antd";
import { Button } from '../../../components';
const FilterDrawerForm = (props:any) => {
    const {onFinish,onFinishFailed,handleChange,HandleCancel,Handlesubmit}= props;
    return (
        <div>
            <div className="data_container">
                <Form
                    name="basic"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Leave Type"
                        name="Leave Type"
                    >
                        <Select
                            defaultValue="sick"
                            onChange={handleChange}
                            size="large"
                            options={[
                                { value: 'sick', label: 'Sick' },
                                { value: 'casual', label: 'Casual' },
                                { value: 'work from home', label: 'Work From Home' },
                                { value: 'medicale', label: 'Medicale' },
                            ]}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Time Frame"
                        name="time frame"
                    >
                        <Select
                            defaultValue="this week"
                            onChange={handleChange}
                            size="large"
                            options={[
                                { value: 'this week', label: 'This Week' },
                                { value: 'last week', label: 'Last Week' },
                                { value: 'this month', label: 'This Month' },
                                { value: 'Last Month', label: 'Last Month' },
                                { value: 'Date Range', label: 'Date Range' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item
                        label="Status"
                        name="status"
                    >
                        <Select
                            defaultValue="Pending"
                            onChange={handleChange}
                            size="large"
                            options={[
                                { value: 'pending', label: 'Pending' },
                                { value: 'declined', label: 'Declined' },
                                { value: 'approved', label: 'Approved' },
                            ]}
                        />
                    </Form.Item>
                </Form>

            </div>
            <div className='flex items-center justify-end view_history_button_wrapper'>
                <Button
                    label="Reset"
                    htmlType="button"
                    onClick={HandleCancel}
                    shape="default"
                    size="large"
                    type="default"
                    style={{ color: "#4A9D77", background: "#fff", display: "flex", alignItems: "center", border: "1px solid #4A9D77" }}
                    className="button_request_leave  mr-5"
                />
                <Button
                    label="Apply"
                    htmlType="submit"
                    onClick={Handlesubmit}
                    shape="default"
                    size="large"
                    type="default"
                    style={{ color: "#fff", background: "#4A9D77", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid #4A9D77" }}
                    className="button_request_leave"
                />
            </div>
        </div>
    )
}

export default FilterDrawerForm