import { useEffect, useState } from 'react';
import { DropDown, PageHeader, SearchBar } from '../../components';
import SignatureAndUploadModal from '../../components/SignatureAndUploadModal';
import IssueCertificateModal from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import CertificateTable from './certificateTable';
import IssueCertificateBtn from './issueCertificateBtn';
import { Button, Col, Row } from 'antd';
import './style.scss';
import useCustomHook from './actionHandler';

const Certificates = () => {
  const [searchVal, setSearchVal] = useState('');
  const [dropdownVal, setDropdownVal] = useState('');
  const [openIssueCertificate, setOpenIssueCertificate] = useState(false);
  const [togglePreview, setTogglePreview] = useState(false);
  const [opensignatureModal, setOpenSignatureModal] = useState(false);
  const [issuewNewCertificate, setIssuewNewCertificate] = useState({
    name: '', type: '',
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.'
  });

  const dropdownData = ['design', 'research', 'management', 'development', 'business'];

  const { getCadidatesData, candidateList } = useCustomHook();

  useEffect(() => {
    getCadidatesData()
  }, [])

  return (
    <div className='certificate-wrapper'>
      <PageHeader title='Certificates' bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar handleChange={setSearchVal} value={searchVal} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col gap-4 justify-end'>
          <DropDown value={dropdownVal} name={'Department'} setValue={setDropdownVal} options={dropdownData} />
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