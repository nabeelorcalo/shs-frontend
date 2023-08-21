import { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState } from 'recoil';
import { Button, Col, Row } from 'antd';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PageHeader, SearchBar } from '../../components';
import SignatureAndUploadModal from '../../components/SignatureAndUploadModal';
import IssueCertificateModal from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import CertificateTable from './certificateTable';
import IssueCertificateBtn from './issueCertificateBtn';
import useCustomHook from './actionHandler';
import { certificateDetailsState, certificatesFilterState, certificatesPaginationState } from '../../store';
import useDepartmentHook from '../setting/companyAdmin/Department/actionHandler'
import UserSelector from '../../components/UserSelector';
import {
  AppreciationCertificateImg, CompletionCertificateImg,
  AppreciationCertificateImg2, CompletionCertificateImg2
} from '../../assets/images';
import './style.scss';

const Certificates = () => {
  const [openIssueCertificate, setOpenIssueCertificate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [togglePreview, setTogglePreview] = useState(false);
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);
  const [filter, setFilter] = useRecoilState(certificatesFilterState);
  const resetList = useResetRecoilState(certificatesFilterState);
  const resetTableParams = useResetRecoilState(certificatesPaginationState);

  const { getCadidatesData, candidateData, setFile, handleUploadFile,
    handleClear, issueCertificate, sendCertificateEmail } = useCustomHook();
  const { getSettingDepartment, settingDepartmentdata } = useDepartmentHook();

  const templateObj: any = {
    'APPRECIATION_CERTIFICATE_TEMPLATE_ONE': AppreciationCertificateImg,
    'APPRECIATION_CERTIFICATE_TEMPLATE_TWO': AppreciationCertificateImg2,
    'COMPLETION_CERTIFICATE_TEMPLATE_ONE': CompletionCertificateImg,
    'COMPLETION_CERTIFICATE_TEMPLATE_TWO': CompletionCertificateImg2,
  }

  const removeEmptyValues = (obj: Record<string, any>): Record<string, any> => {
    return Object.fromEntries(Object.entries(obj).filter(([_, value]) => value !== null && value !== undefined && value !== ""));
  };

  useEffect(() => {
    getSettingDepartment()
  }, [])

  useEffect(() => {
    let args = removeEmptyValues(filter)
    getCadidatesData(args, setLoading)
  }, [filter])

  useEffect(() => {
    return () => {
      resetList();
      resetTableParams();
    }
  }, []);

  let departmentsData: any = settingDepartmentdata?.map((item: any) => {
    return (
      {
        key: item.id,
        value: item.id,
        label: item.name
      })
  })
  departmentsData?.unshift({ key: 'all', value: 'All', label: 'All' })

  const handleIssueCertificate = () => {
    setLoading(true);

    const unit = 'pt';
    const size = 'A4';
    const orientation = 'landscape';
    const div: any = document.querySelector('.print-certificate');


    html2canvas(div).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const doc = new jsPDF(orientation, unit, size);

      const imgWidth = doc.internal.pageSize.getWidth();
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

      const pdfBlob = doc.output('blob');
      const pdfFile = new File([pdfBlob], 'certificate.pdf', { type: 'application/pdf' });
      console.log(typeof pdfFile, pdfFile, 'value');
      console.log(pdfBlob, 'blob');
      console.log(imgData);

      // Add the PDF file to the params object
      const params: any = {
        internId: certificateDetails?.internId,
        // templateId: certificateDetails?.certificateDesign?.includes('TWO') ? 2 : 1,
        templateId: certificateDetails?.templateId,
        certificateType: certificateDetails?.type,
        description: certificateDetails?.desc,
        signatureType: certificateDetails.signatureType,
        media: imgData,
        html: '',
        email: ''
      };

      if (certificateDetails.signatureType === "TEXT") {
        params.signatureText = certificateDetails?.txtSignature;
        params.signatureFont = certificateDetails.fontFamily;
      }
      // const internEmail = candidateList?.filter((item: any) => item.id === certificateDetails.internId)
      // console.log(internEmail[0]?.userDetail?.email);
      issueCertificate(params).then(() => {
        // const respDetails = {
        //   recipients: ['Shayan.ulhaq@ceative.co.uk'],
        //   subject: certificateDetails?.type === "certificateOfCompletion" ? "Certificate of Completion" : "Certificate of Appreciation",
        //   attachments: [
        //     {
        //       filename: 'certificate',
        //       content: pdfFile,
        //       contentType: "application/pdf"
        //     }
        //   ]
        // }
        // sendCertificateEmail(respDetails);
        setOpenSignatureModal(false);
        setTogglePreview(false);
        setLoading(false);

      });
    });
  };

  const clearAll = () => {
    setCertificateDetails({
      templateId: '',
      certificateId: '',
      attachmentId: '',
      internEmail: '',
      internId: '',
      name: undefined,
      type: '',
      signatureType: '',
      imgSignature: '',
      fontFamily: 'roboto',
      txtSignature: '',
      file: null,
      fileURL: null,
      desc: '',
      certificateDesign: ''
    });
  }

  const handleIssueCertificateClick = () => {
    setOpenIssueCertificate(true);
    clearAll();
  }

  const handleCloseUploadAndSignatureModal = () => {
    setOpenSignatureModal(!openSignatureModal);
    clearAll();
  }

  return (
    <div className='certificate-wrapper'>
      <PageHeader title='Certificate' bordered />
      <Row gutter={[20, 20]}>
        <Col xl={6} lg={9} md={24} sm={24} xs={24}>
          <SearchBar placeholder='Search by name' className='max-sm:w-full w-[375px]' handleChange={(e: any) => setFilter({ ...filter, search: e })} />
        </Col>
        <Col xl={18} lg={15} md={24} sm={24} xs={24} className='flex max-sm:flex-col flex-row gap-4 justify-end'>
          <UserSelector
            options={departmentsData}
            placeholder='Department'
            onChange={(num: any) => setFilter({ ...filter, departmentId: num })}
            className='max-sm:w-full w-[170px] department-select'
          />
          <IssueCertificateBtn className='w-full' onClick={handleIssueCertificateClick} />
        </Col>
        <Col xs={24}>
          <CertificateTable tableData={candidateData} loading={loading} setFilter={setFilter} />
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
        />}

      {togglePreview &&
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
                loading={loading}
                onClick={handleIssueCertificate}
              >
                Issue
              </Button>
            </>
          }
        />}

      {openSignatureModal &&
        <SignatureAndUploadModal
          title="Issue Certificate"
          state={openSignatureModal}
          files={certificateDetails.file}
          setFiles={setFile}
          handleUploadFile={handleUploadFile}
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
          HandleCleare={handleClear}
          closeFunc={handleCloseUploadAndSignatureModal}
          footer={
            <>
              <Button
                className='signature-cancel-btn'
                onClick={handleCloseUploadAndSignatureModal}
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
          } />}
    </div>
  )
}

export default Certificates