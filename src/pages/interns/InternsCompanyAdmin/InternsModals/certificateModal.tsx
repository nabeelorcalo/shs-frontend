import { useEffect } from 'react';
import { Form, Modal, Select } from 'antd';
import { IconCloseModal } from '../../../../assets/images';
import UserSelector from '../../../../components/UserSelector';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../config/validationMessages';
import useTemplatesCustomHook from '../../../setting/companyAdmin/Templates/actionHandler';
import { useRecoilValue } from 'recoil';
import { newTemplatesDataState } from '../../../../store';
import { ButtonThemePrimary, ButtonThemeSecondary } from '../../../../components';

const CertificateModal = (props: any) => {
  const { certificateModal, handleCancel, form, handleCertificateSubmition, setPreviewModal, setCertificateModal,
    setSignatureModal, internCertificate, setInternCertificate, certificateDetails, setCertificateDetails } = props;
  const { desc } = certificateDetails ?? {};
  const { getAllTemplates, templatesData } = useTemplatesCustomHook();
  const MAX_LENGTH = 350;
  const template = useRecoilValue(newTemplatesDataState);

  useEffect(() => {
    getAllTemplates();
  }, [certificateModal])

  const completionData = template?.filter((item: any) => item?.type === 'certificateOfCompletion');

  const onChange = (e: any) => {
    const desc: any = templatesData?.filter((item: any) => item?.id === e)
    setCertificateDetails({
      ...certificateDetails, templateId: desc[0]?.id, desc: desc[0]?.description,
      certificateDesign: desc[0]?.attachment?.filename
    })
  }
  const removeHTMLTags = (str: any) => {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/<[^>]*>/g, '');
  };
  const sanitizedContent = removeHTMLTags(desc);

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
        initialValues={{
          internName: `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`,
          description: ""
        }}
        validateMessages={DEFAULT_VALIDATIONS_MESSAGES}
        onFinish={() => {
          handleCertificateSubmition('continue',
            `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`);
          form.resetFields();
          setCertificateModal(false)
          setSignatureModal(true);
        }}>

        <div className='my-2'>
          <p>Intern</p>
          <UserSelector
            className='w-full'
            placeholder="Select"
            value={`${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`}
            disabled={true}
          />
        </div>

        <Form.Item label="Template" name="template" rules={[{ required: true }]}>
          <Select
            placeholder="Select template"
            options={completionData}
            onChange={onChange}
            className='w-full'
          />
        </Form.Item>

        <div
          className={`print-on-certificate mb-[30px] `}>
          <label className='label block mb-[10px]'>Print on Certificate</label>
          <textarea
            rows={5}
            maxLength={MAX_LENGTH}
            name='printOnCertificate'
            value={sanitizedContent}
            onChange={((e: any) => setCertificateDetails((pre: any) => ({ ...pre, desc: e.target.value })))}
            className={`desc w-full rounded-lg box-border p-[16px]`}
          />
          <div className="editor-details  items-center flex justify-between">
            {sanitizedContent?.length > 0 && <small className="text-gray-400">Characters remaining:
              {MAX_LENGTH - sanitizedContent?.replace(/<[^>]+>/g, '')?.length} </small>}
            <small className="text-gray-400 float-right">Limit:{MAX_LENGTH}</small>
          </div>
        </div>

        <div className="flex flex-row max-sm:flex-col  justify-end gap-3" >
          <ButtonThemeSecondary
            onClick={() => {
              setPreviewModal(true); handleCertificateSubmition('preview',
                `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`);
            }}>
            Preview
          </ButtonThemeSecondary>
          <ButtonThemeSecondary
            onClick={handleCancel}>
            Cancel
          </ButtonThemeSecondary>
          <ButtonThemePrimary
            htmlType="submit">
            Continue
          </ButtonThemePrimary>
        </div >
      </Form>
    </Modal>
  )
}

export default CertificateModal