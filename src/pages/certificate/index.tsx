import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Button, Col, Row } from 'antd';
// import jsPDF from 'jspdf';
// import html2canvas from 'html2canvas';
import { PageHeader, SearchBar } from '../../components';
import SignatureAndUploadModal from '../../components/SignatureAndUploadModal';
import IssueCertificateModal from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import CertificateTable from './certificateTable';
import IssueCertificateBtn from './issueCertificateBtn';
import useCustomHook from './actionHandler';
import { certificateDetailsState } from '../../store';
import useDepartmentHook from '../setting/companyAdmin/Department/actionHandler'
import UserSelector from '../../components/UserSelector';
import { AppreciationCertificateImg, CompletionCertificateImg, AppreciationCertificateImg2, CompletionCertificateImg2 } from '../../assets/images';
import './style.scss';

const Certificates = () => {
  const [searchVal, setSearchVal] = useState(null);
  const [dropdownVal, setDropdownVal] = useState(null);
  const [openIssueCertificate, setOpenIssueCertificate] = useState(false);
  const [togglePreview, setTogglePreview] = useState(false);
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);

  const { getCadidatesData, candidateList, setFile, handleUploadFile, handleClear, issueCertificate } = useCustomHook();
  const { getSettingDepartment, settingDepartmentdata } = useDepartmentHook();

  const templateObj: any = {
    'APPRECIATION_CERTIFICATE_TEMPLATE_ONE': AppreciationCertificateImg,
    'APPRECIATION_CERTIFICATE_TEMPLATE_TWO': AppreciationCertificateImg2,
    'COMPLETION_CERTIFICATE_TEMPLATE_ONE': CompletionCertificateImg,
    'COMPLETION_CERTIFICATE_TEMPLATE_TWO': CompletionCertificateImg2,
  }

  const params = {
    internId: certificateDetails?.internId,
    templateId: certificateDetails?.certificateDesign?.includes('TWO') ? 2 : 1,
    certificateType: certificateDetails?.type,
    description: certificateDetails?.desc,
    signatureType: "TEXT",
  }

  useEffect(() => {
    getCadidatesData(searchVal, dropdownVal)
    getSettingDepartment()
  }, [searchVal, dropdownVal])

  // console.log(certificateDetails, 'certificate details');
  // console.log(candidateList, 'list candidates');

  // const signatureType = {
  //   imgSignature: 'DRAW',
  //   txtSignature: 'TEXT',
  //   file: 'UPLOAD'
  // }

  const handleIssueCertificate = () => {
    issueCertificate(params)
  }

  let departmentsData: any = settingDepartmentdata?.map((item: any) => {
    return (
      {
        key: item.id,
        value: item.id,
        label: item.name
      })
  })
  departmentsData?.unshift({ key: 'all', value: 'All', label: 'All' })

  // const issueCertificate = () => {
  //   const unit = 'pt';
  //   const size = 'A4';
  //   const orientation = 'landscape';
  //   const div: any = document.querySelector('.print-certificate');

  //   html2canvas(div).then(canvas => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const doc = new jsPDF(orientation, unit, size);

  //     const imgWidth = doc.internal.pageSize.getWidth();
  //     const imgHeight = (canvas.height * imgWidth) / canvas.width;

  //     doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  //     doc.save('certificate.pdf');
  //   });
  // }

  const handleIssueCertificateClick = () => {
    setOpenIssueCertificate(true);
    setCertificateDetails({
      internId: '',
      name: undefined,
      type: '',
      imgSignature: '',
      txtSignature: '',
      file: null,
      fileURL: null,
      desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.',
      certificateDesign: ''
    });
  }

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
          <IssueCertificateBtn className='w-full' onClick={handleIssueCertificateClick} />
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
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
        />
      }

      {
        togglePreview &&
        <PreviewModal
          open={togglePreview}
          setOpen={setTogglePreview}
          certificateImg={templateObj[certificateDetails?.certificateDesign]}
          footer={
            <>
              <Button
                className='signature-cancel-btn'
                onClick={() => setTogglePreview(!togglePreview)}
              >
                Back
              </Button>

              <Button
                type='primary'
                className='signature-submit-btn'
                onClick={handleIssueCertificate}
              >
                Issue
              </Button>
            </>
          }
        />
      }

      <SignatureAndUploadModal
        title="Issue Certificate"
        state={openSignatureModal}
        files={certificateDetails.file}
        setFiles={setFile}
        handleUploadFile={handleUploadFile}
        certificateDetails={certificateDetails}
        setCertificateDetails={setCertificateDetails}
        HandleCleare={handleClear}
        closeFunc={() => setOpenSignatureModal(!openSignatureModal)}
        footer={
          <>
            <Button
              className='signature-cancel-btn'
              onClick={() => setOpenSignatureModal(!openSignatureModal)}
            >
              Cancel
            </Button>

            <Button
              type='primary'
              className='signature-submit-btn'
              onClick={() => setTogglePreview(!togglePreview)}
            >
              Continue
            </Button>
          </>
        }
      />
    </div>
  )
}

export default Certificates