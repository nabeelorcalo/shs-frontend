import { useEffect } from 'react';
import { Button, Form, Modal, Select } from 'antd';
// import { TextArea } from "../../../../components";
import { IconCloseModal } from '../../../../assets/images';
import UserSelector from '../../../../components/UserSelector';
import { DEFAULT_VALIDATIONS_MESSAGES } from '../../../../config/validationMessages';
import useTemplatesCustomHook from '../../../setting/companyAdmin/Templates/actionHandler';
import { useRecoilValue } from 'recoil';
import { newTemplatesDataState } from '../../../../store';


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
  // const filteredCompletionData = completionData?.map((item: any) => {
  //   return (
  //     {
  //       key: item.id,
  //       value: item.id,
  //       label: item.name,
  //     })
  // });

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
        onFinish={(values) => {
          handleCertificateSubmition('continue',
            `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`);
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

        <Form.Item label="Template">
          <Select
            placeholder="Select template"
            options={completionData}
            onChange={onChange}
            className='w-full'
          />
          {/* <UserSelector
            className='w-full'
            placeholder="Select template"
            // onChange={onChange}
            options={completionData}
            hasSearch={false}
          /> */}
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
          <Button
            // htmlType="submit"
            type="default"
            size="middle"
            className="white-bg-color teriary-color font-medium max-sm:w-full rounded-lg"
            onClick={() => {
              setPreviewModal(true); handleCertificateSubmition('preview',
                `${internCertificate?.userDetail?.firstName} ${internCertificate?.userDetail?.lastName}`);
            }}>
            Preview
          </Button>
          <Button
            type="default"
            size="middle"
            className="button-default-tertiary max-sm:w-full rounded-lg"
            onClick={() => {
              form.resetFields();
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