import { Button, Form, Modal } from 'antd';
import { TextArea } from "../../../../components";
import { IconCloseModal } from '../../../../assets/images';
import UserSelector from '../../../../components/UserSelector';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../config/validationMessages';

const CertificateModal = (props: any) => {
  const { certificateModal, handleCancel, form, handleCertificateSubmition, setPreviewModal, setCertificateModal,
    setSignatureModal } = props;

  return (
    <Modal
      title="Issue Certificate"
      open={certificateModal.isToggle}
      centered
      width={700}
      footer={false}
      closeIcon={<IconCloseModal />}
      onCancel={handleCancel} >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => handleCertificateSubmition(values)}
        initialValues={{
          internName: `${certificateModal?.data?.userDetail?.firstName} ${certificateModal?.data?.userDetail?.lastName}`,
          description: ""
        }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
      >
        <Form.Item label="Intern" name='internName' rules={[{ required: true }, { type: 'string' }]}>
          <UserSelector
            placeholder="Select"
            value={`${certificateModal.data?.userDetail?.firstName} ${certificateModal.data?.userDetail?.lastName}`}
            disabled={true}
          />
        </Form.Item>
        <Form.Item label="Print on Certificate" name='description' rules={[{ required: true }, { type: 'string' }]} >
          <TextArea placeholder="Enter certificate description" />
        </Form.Item>
        <div className="flex flex-row max-sm:flex-col  justify-end gap-3" >
          <Button
            htmlType="submit"
            type="default"
            size="middle"
            className="white-bg-color teriary-color font-medium max-sm:w-full rounded-lg"
            onClick={() => setPreviewModal(true)}
          >
            Preview
          </Button>
          <Button
            type="default"
            size="middle"
            className="button-default-tertiary max-sm:w-full rounded-lg"
            onClick={() => {
              form.resetFields();
              // setCertificateDetails({ ...certificateDetails, name: '', description: '' });
              setCertificateModal({ isToggle: false, data: {} })
            }}>
            Cancel
          </Button>
          <Button
            htmlType="submit"
            size="middle"
            className="button-tertiary max-sm:w-full rounded-lg"
            onClick={() => {
              setSignatureModal(true)
            }}
          >
            Continue
          </Button>
        </div >
      </Form>
    </Modal>
  )
}

export default CertificateModal