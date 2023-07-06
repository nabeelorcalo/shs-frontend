import { useEffect, useState } from 'react';
import { PageHeader, SearchBar } from '../../components';
import SignatureAndUploadModal from '../../components/SignatureAndUploadModal';
import IssueCertificateModal from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import CertificateTable from './certificateTable';
import IssueCertificateBtn from './issueCertificateBtn';
import { Button, Col, Row } from 'antd';
import useCustomHook from './actionHandler';
import useDepartmentHook from '../setting/companyAdmin/Department/actionHandler'
import UserSelector from '../../components/UserSelector';
import './style.scss';

const Certificates = () => {
  const [searchVal, setSearchVal] = useState(null);
  const [dropdownVal, setDropdownVal] = useState(null);
  const [openIssueCertificate, setOpenIssueCertificate] = useState(false);
  const [togglePreview, setTogglePreview] = useState(false);
  const [opensignatureModal, setOpenSignatureModal] = useState(false);
  const [issuewNewCertificate, setIssuewNewCertificate] = useState({
    name: undefined, 
    type: '',
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.'
  });

  const { getCadidatesData, candidateList } = useCustomHook();
  const { getSettingDepartment, settingDepartmentdata } = useDepartmentHook()

  useEffect(() => {
    getCadidatesData(searchVal, dropdownVal)
    getSettingDepartment()
  }, [searchVal, dropdownVal])

  let departmentsData: any = settingDepartmentdata?.map((item: any) => {
    return (
      {
        key: item.id,
        value: item.id,
        label: item.name
      })
  })
  departmentsData?.unshift({ key: 'all', value: 'All', label: 'All' })

  console.log('candidates data', candidateList);


  return (
    <div className='certificate-wrapper'>
      <PageHeader title='Certificate' bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar placeholder='Search by name' className='max-sm:w-full w-[375px]' handleChange={(e: any) => setSearchVal(e)} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col flex-row gap-4 justify-end'>
          <UserSelector
            options={departmentsData}
            placeholder='Department'
            onChange={(num: any) => setDropdownVal(num)}
            className='w-[170px] department-select'
          />
          <IssueCertificateBtn className='w-full' onClick={() => setOpenIssueCertificate(true)} />
        </Col>
        <Col xs={24}>
          <CertificateTable tableData={candidateList} />
        </Col>
      </Row>

      {openIssueCertificate &&
        <IssueCertificateModal
          setOpen={setOpenIssueCertificate}
          open={openIssueCertificate}
          setTogglePreview={setTogglePreview}
          setOpenSignatureModal={setOpenSignatureModal}
          issuewNewCertificate={issuewNewCertificate}
          setIssuewNewCertificate={setIssuewNewCertificate}
        />
      }
      {togglePreview &&
        <PreviewModal
          open={togglePreview}
          setOpen={setTogglePreview}
          name={issuewNewCertificate.name}
          type={issuewNewCertificate.type}
          desc={issuewNewCertificate.desc}
        />}


      <SignatureAndUploadModal
        title=""
        width={500}
        state={opensignatureModal}
        setState={setOpenSignatureModal}
        cancelBtntxt={false}
        okBtntxt="Upload"
        okBtnFunc={() => { }}
        footer={<>
          <Button className='  signature-cancel-btn' > Cancel </Button>
          <Button type='primary' className='signature-submit-btn' >Submit</Button>
        </>}
      />
    </div>
  )
}

export default Certificates