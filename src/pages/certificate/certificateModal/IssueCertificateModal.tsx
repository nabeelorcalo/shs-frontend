import SelectComp from '../../../components/Select/Select'
import CommonModal from './CommonModal';
import { Select, Radio, Space, Button, Row, Col } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { UserAvatar } from '../../../assets/images';
import { CommonDatePicker } from '../../../components';
import { useEffect, useState } from 'react';
import UserSelector from '../../../components/UserSelector';
import useCustomHook from '../actionHandler';
import constants from '../../../config/constants';
import useTemplatesCustomHook from '../../setting/companyAdmin/Templates/actionHandler';

const Options = Select;
interface Props {
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
  const { 
    open, setOpen, setTogglePreview, setOpenSignatureModal, 
    actionType, certificateDetails, setCertificateDetails
  } = props;

  const { name, type, desc } = certificateDetails ?? {};

  const [openDate, setOpenDate] = useState({ start: false, end: false });
  const [dateVal, setDateVal] = useState({ start: '', end: '' });

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
        value: item.userDetail.id,
        label: `${item.userDetail.firstName} ${item.userDetail.lastName}`,
        avatar: `${constants.MEDIA_URL}/${item?.userDetail?.profileImage?.mediaId}.${item?.userDetail?.profileImage?.metaData?.extension}`
      })
  })

  const onChange = (e: string) => {
    const selectedOption = internsData.find((option: any) => option["value"] === e);
    setCertificateDetails((pre: any) => ({ ...pre, name: selectedOption["label"] }));
  }

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
        value={name}
        onChange={onChange}
        options={internsData}
        hasSearch={false}
      />
      {/* <SelectComp
        value={name}
        label='intern'
        placeholder={'Select'}
        className={`user-select ${actionType === 'edit' ? 'disabled' : 'active'}`}
        onChange={(e: string) => setCertificateDetails((pre: any) => ({ ...pre, name: e }))}>
        <>
          {options.map((data) => (
            <Options value={data.name}>
              <div className='flex items-center gap-3'>
                <img src={data.img} />
                <span className='capitalize'>{data.name}</span>
              </div>
            </Options>
          ))}
        </>
      </SelectComp> */}
      <div className='select-type my-[30px]'>
        <label className='block mb-[10px]'>Select Type</label>
        <Radio.Group
          className='flex flex-col'
          value={type}
          defaultValue={type}
          onChange={(e: RadioChangeEvent) => setCertificateDetails((pre: any) => ({ ...pre, type: e.target.value }))}>
          {/* <Space direction='vertical'> */}
          <Radio
            value={'appreciation'}
            className={`select-type-radio ${type === 'appreciation' && 'active-type'}`}
          >
            Certificate of Appreciation
          </Radio>

          <Radio
            value={'completion'}
            className={`select-type-radio ${type === 'completion' && 'active-type'}`}
          >
            Certificate of Completion
          </Radio>
          {/* </Space> */}
        </Radio.Group>
        <div className='my-4'>
          {certificateDetails?.type === 'appreciation' &&
            <UserSelector
              placeholder="Select appreciation"
              className='w-full'
              // value={name}
              // onChange={(e: string) => setCertificateDetails((pre: any) => ({ ...pre, name: e }))}
              options={filteredAppreciationData}
              hasSearch={false}
            />}
          {certificateDetails?.type === 'completion' &&
            <UserSelector
              placeholder="Select completion"
              className='w-full'
              // value={name}
              // onChange={(e: string) => setCertificateDetails((pre: any) => ({ ...pre, name: e }))}
              options={filteredCompletionData}
              hasSearch={false}
            />}
        </div>

      </div>

      <div className={`print-on-certificate mb-[30px] ${name && type ? 'active-desc' : 'disabled'}`}>
        <label className='label block mb-[10px]'>Print on Certificate</label>
        <textarea
          rows={5}
          name='printOnCertificate'
          value={desc}
          onChange={((e: any) => setCertificateDetails((pre: any) => ({ ...pre, desc: e.target.value })))}
          className={`desc w-full rounded-lg box-border p-[16px]`}
        />
      </div>
      
      <div className='action-btns flex justify-end gap-4'>
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