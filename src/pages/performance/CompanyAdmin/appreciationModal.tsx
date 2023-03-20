import React from 'react';
import { Form, Input, Radio } from 'antd';
import { PopUpModal } from '../../../components/Model';
import { AvatarBox, Button, TextArea } from '../../../components';

interface AppreciationProps {
  title: string,
  open: boolean,
  initialValues: any,
  onSave?: any,
  onCancel?: any,
}

export const AppreciationModal: any = (props: AppreciationProps) => {
  const { title, initialValues, open, onSave, onCancel } = props;
  const {name, avatar, description} = initialValues;

  return (
    <PopUpModal
      title={title}
      open={open}
      width={700}
      wrapClassName='modal-wrapper performance-modal'
      close={onCancel}
      children={
        <Form
          layout="vertical"
          initialValues={initialValues}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 24 }}
          onFinish={(values) => onSave(values)}
        >
          {/* hidden tag */}
          <Form.Item name="name" hidden>
            <Input type="hidden" />
          </Form.Item>
          {/* --End-- */}

          <AvatarBox
            label="Intern"
            name={name}
            size={24}
            avatar={avatar}
          />

          <Form.Item
            name="type"
            label="Type"
            className='mt-4'
          >
            <Radio.Group>
              <Radio value="Email">
                Email
              </Radio>
              <Radio value="Certificates">
                Certificates
              </Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
          >
            <TextArea
              className="w-full"
              rows={4}
            />
          </Form.Item>

          <Form.Item className='flex justify-end'>
            <Button
              label="Cancel"
              type="default"
              onClick={onCancel}
              className="border-visible-btn mt-4"
            />
            
            <Button
              label="Send"
              htmlType="submit"
              className="bg-visible-btn mt-4 ml-2"
            />
          </Form.Item>
        </Form>
      }
      footer={<></>}
    />
  )
}