import { useEffect } from 'react';
import { Select, Radio, Button } from 'antd';
import CommonModal from './CommonModal';
import type { RadioChangeEvent } from 'antd';
import UserSelector from '../../../components/UserSelector';
import useCustomHook from '../actionHandler';
import constants from '../../../config/constants';
import useTemplatesCustomHook from '../../setting/companyAdmin/Templates/actionHandler';

// const Options = Select;
interface Props {
  internDetails?: any;
  open?: boolean;
  setOpen?: any;
  setTogglePreview?: any;
  setOpenSignatureModal?: any;
  setCertificateDetails?: any;
  certificateDetails?: any;
  actionType?: string;
  issuewNewCertificate?: any;
  setIssuewNewCertificate?: any;
}

const IssueCertificate = (props: Props) => {
  const MAX_LENGTH = 300
  const {
    open, setOpen, setTogglePreview, setOpenSignatureModal,
    actionType, certificateDetails, setCertificateDetails, internDetails
  } = props;

  const { name, type, desc } = certificateDetails ?? {};

  // const [openDate, setOpenDate] = useState({ start: false, end: false });
  // const [dateVal, setDateVal] = useState({ start: '', end: '' });

  const { getCadidatesData, candidateList } = useCustomHook();
  const { getAllTemplates, templatesData } = useTemplatesCustomHook();

  useEffect(() => {
    getCadidatesData()
    getAllTemplates()
  }, [])

  const appreciationData = templatesData?.filter((item: any) => item?.type === 'certificateOfAppreciation');
  const completionData = templatesData?.filter((item: any) => item?.type === 'certificateOfCompletion');

  const filteredAppreciationData = appreciationData?.map((item: any) => {
    return (
      {
        key: item.id,
        value: item.id,
        label: item.name,
      })
  })

  const filteredCompletionData = completionData?.map((item: any) => {
    return (
      {
        key: item.id,
        value: item.id,
        label: item.name,
      })
  })

  let internsData = candidateList?.map((item: any) => {
    return (
      {
        key: item.id,
        value: item.id,
        label: `${item.userDetail.firstName} ${item.userDetail.lastName}`,
        avatar: `${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      })
  })

  const onChange = (e: string) => {
    const selectedOption = internsData.find((option: any) => option["value"] === e);
   
    setCertificateDetails((pre: any) => ({ ...pre, internEmail: '', name: selectedOption["label"], internId: e }));
  }

  const handleDescription = (e: any) => {
    const desc: any = templatesData?.filter((item: any) => item?.id === e)
    setCertificateDetails({
      ...certificateDetails, templateId: desc[0]?.id, desc: desc[0]?.description,
      certificateDesign: desc[0]?.attachment?.filename
    })

  }
  console.log(desc, 'filtered data');

  const removeHTMLTags = (str: any) => {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/<[^>]*>/g, '');
  };
  const sanitizedContent = removeHTMLTags(desc);

  return (
    <CommonModal
      title='Issue Certificate'
      onCancel={() => setOpen(!open)}
      open={open}
    >
      <label>Intern</label>
      <UserSelector
        className='w-full'
        placeholder="Select"
        value={internDetails ? `${internDetails?.userDetail?.firstName} ${internDetails?.userDetail?.lastName}` : name}
        onChange={onChange}
        options={internsData}
        hasSearch={false}
        // defaultValue={`${internDetails?.userDetail?.firstName} ${internDetails?.userDetail?.lastName}`}
        disabled={internDetails?.userDetail?.firstName ? true : false}
      />

      <div className='select-type my-[30px]'>
        <label className='block mb-[10px]'>Select Type</label>
        <Radio.Group
          className='flex flex-col'
          value={type}
          defaultValue={type}
          onChange={(e: RadioChangeEvent) => setCertificateDetails((pre: any) => ({ ...pre, type: e.target.value }))}>
          <Radio
            value={'certificateOfAppreciation'}
            className={`select-type-radio ${type === 'certificateOfAppreciation' && 'active-type'}`}>
            Certificate of Appreciation
          </Radio>

          <Radio
            value={'certificateOfCompletion'}
            className={`select-type-radio ${type === 'certificateOfCompletion' && 'active-type'}`}>
            Certificate of Completion
          </Radio>
        </Radio.Group>

        <div className='my-4'>
          {certificateDetails?.type === 'certificateOfAppreciation' &&
            <UserSelector
              className='w-full'
              placeholder="Select appreciation"
              onChange={(e: string) => handleDescription(e)}
              options={filteredAppreciationData}
              hasSearch={false}
            />}
          {certificateDetails?.type === 'certificateOfCompletion' &&
            <UserSelector
              className='w-full'
              placeholder="Select completion"
              onChange={(e: string) => handleDescription(e)}
              options={filteredCompletionData}
              hasSearch={false}
            />}
        </div>

      </div>

      <div
        className={`print-on-certificate mb-[30px] 
      ${name && type ? 'active-desc' : 'disabled'}`}>
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

      <div className='action-btns sm:flex  justify-end gap-4'>
        {name && type && <Button className='preview-btn btn flex items-center font-semibold'
          onClick={() => setTogglePreview(true)}>
          Preview
        </Button>}
        <Button
          className='cancel-btn btn flex items-center font-semibold'
          onClick={() => setOpen(!open)}>
          Cancel
        </Button>
        <Button
          className={`continue-btn btn flex items-center font-semibold`}
          // style={{ pointerEvents: !name ? 'none' : 'inherit' }}
          onClick={() => { setOpen(!open); setOpenSignatureModal(true) }}

        >
          Continue
        </Button>
      </div>
    </CommonModal>
  )
}

export default IssueCertificate