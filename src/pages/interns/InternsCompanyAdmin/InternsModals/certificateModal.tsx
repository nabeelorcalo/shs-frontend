import { Button, Form, Modal } from 'antd';
import { TextArea } from "../../../../components";
import { IconCloseModal } from '../../../../assets/images';
import UserSelector from '../../../../components/UserSelector';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../config/validationMessages';

const CertificateModal = (props: any) => {
  const { certificateModal, handleCancel, form, handleCertificateSubmition, setPreviewModal, setCertificateModal,
    setSignatureModal, internCertificate, setInternCertificate } = props;

  return (
    <Modal
      title="Issue Certificate"
      open={certificateModal}
      centered
      width={700}
      footer={false}
      closeIcon={<IconCloseModal />}
      onCancel={handleCancel} >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => handleCertificateSubmition(values, `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`)}
        initialValues={{
          internName: `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`,
          description: ""
        }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
      >

        <div>
          <p>Intern</p>
          <UserSelector
            className='w-full'
            placeholder="Select"
            value={`${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`}
            disabled={true}
          />
        </div>

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
              setCertificateModal(false);
              setInternCertificate({})
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