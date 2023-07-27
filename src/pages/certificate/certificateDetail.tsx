import { Avatar, Button, Col, Row } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import { BoxWrapper } from '../../components';
import { tableMockData } from './certificateTable/tableMock';
import { Alert, Breadcrumb, OverAllPerfomance } from '../../components';
import { CertificateEyeIcon, ThreeDots } from '../../assets/images';
import { useEffect, useState } from 'react';
import IssueCertificateBtn from './issueCertificateBtn';
import IssueCertificateModal from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import DropDownNew from '../../components/Dropdown/DropDownNew';
import LeaveChart from '../../components/ChartsOfGraphs/LeaveChart/LeaveChart';
import SignatureAndUploadModal from '../../components/SignatureAndUploadModal';
import useCustomHook from './actionHandler';
import useLeavesHook from "../setting/companyAdmin/Leaves/actionHandler"
import constants from '../../config/constants';
import useInternHook from "../interns/actionHandler"
import { useRecoilState } from 'recoil';
import { certificateDetailsState } from '../../store';
import { AppreciationCertificateImg, CompletionCertificateImg } from '../../assets/images';
import "./style.scss";

const CertificateDetail = () => {
  const { id } = useParams();
  // const navigate = useNavigate();
  const findUser = tableMockData?.find(user => user.no === id);
  // const [issueCertificateModal, setIssueCertificateModal] = useState(false);
  const [openIssueCertificate, setOpenIssueCertificate] = useState(false);
  const [togglePreview, setTogglePreview] = useState(false);
  const [openSignatureModal, setOpenSignatureModal] = useState(false);
  const [certificateDetails, setCertificateDetails] = useRecoilState(certificateDetailsState);

  const [previewModal, setPreviewModal] = useState(false);
  // const [signatureModal, setSignatureModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { state: internData } = useLocation();

  const {
    certificatesList, internLeaves,
    perfromanceData, getCertificates,
    getInternLeaves, getPerformnaceEvaluation } = useCustomHook();
  const { getSettingLeaves, settingLeaveData } = useLeavesHook();

  const { getProfile } = useInternHook()
  const { getCadidatesData, setFile, handleUploadFile, handleClear, issueCertificate } = useCustomHook();

  useEffect(() => {
    getCadidatesData();
    getCertificates(internData.id)
    getPerformnaceEvaluation(internData?.userDetail?.id)
    getSettingLeaves()
    getInternLeaves(internData.id)
  }, [])

  const [issuewNewCertificate, setIssuewNewCertificate] = useState({
    name: findUser?.name, type: '',
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.'
  });

  const calculateAvg = (rating: any) => {
    const totalRating = perfromanceData.map((item: any) => item[rating] / perfromanceData.length)
    var sum = 0;
    for (var i = 0; i < totalRating.length; i++) {
      sum += totalRating[i];
    }
    return Math.round(sum);
  }

  const performanceEvaulation = [
    {
      title: <span className='text-xl font-semibold'>Overall</span>,
      percent: calculateAvg('overallRating'),
      strokeColor: '#4783FF'
    },
    {
      title: <span className='text-xl font-semibold'>Learning</span>,
      percent: calculateAvg('learningObjectiveRating'),
      strokeColor: '#9BD5E8'
    },
    {
      title: <span className='text-xl font-semibold'>Discipline</span>,
      percent: calculateAvg('disciplineRating'),
      strokeColor: '#F08D97'
    },
    {
      title: <span className='text-xl font-semibold'>Personal</span>,
      percent: calculateAvg('personalRating'),
      strokeColor: '#78DAAC'
    },
  ]

  const templateObj: any = {
    'APPRECIATION_CERTIFICATE_TEMPLATE_ONE': AppreciationCertificateImg,
    'APPRECIATION_CERTIFICATE_TEMPLATE_TWO': AppreciationCertificateImg,
    'COMPLETION_CERTIFICATE_TEMPLATE_ONE': CompletionCertificateImg,
    'COMPLETION_CERTIFICATE_TEMPLATE_TWO': CompletionCertificateImg,
  }


  return (
    <div className='certificate-detail-wrapper'>
      <Breadcrumb breadCrumbData={[{ name: `${internData?.userDetail?.firstName} ${internData?.userDetail?.lastName}` }, { name: 'Certificate', onClickNavigateTo: '/certificates' }]} />
      <Row gutter={[15, 15]} className='flex-wrap certificates-row'>
        <Col xxl={5} xl={12} xs={24}>
          <BoxWrapper
            boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'
            className='user-info flex items-center flex-col rounded-2xl'>
            <Avatar
              className='w-[100px] h-[100px] flex justify-center items-center'
              src={`${constants.MEDIA_URL}/${internData?.userDetail?.profileImage?.mediaId}.${internData?.userDetail?.profileImage?.metaData?.extension}`}>
              <span className='text-[50px] flex'>{`${internData?.userDetail.firstName?.charAt(0)}${internData?.userDetail.lastName?.charAt(0)}`}</span>
            </Avatar>
            <p className='user-name capitalize mt-[20px] mb-[5px] font-medium text-2xl'>{`${internData?.userDetail?.firstName} ${internData?.userDetail?.lastName}`}</p>
            <span className='department capitalize text-sm'>{internData?.internship?.department?.name}</span>
            <Button className='mt-[30px] w-full view-profile-btn font-medium'
              onClick={() => { getProfile(internData?.userId) }}
            >
              View Profile
            </Button>
          </BoxWrapper>
        </Col>
        <Col xxl={14} xl={24} xs={24} className='over-all-performance'>
          <OverAllPerfomance
            data={performanceEvaulation}
            heading={'Overall Performance'}
          />
        </Col>
        <Col xxl={5} xl={12} xs={24}>
          <LeaveChart heading='Leaves' leavesData={internLeaves} />
        </Col>
      </Row>
      <div className="flex items-center justify-between gap-3 flex-wrap my-[30px]">
        <p className='font-semibold text-base total-certificates'>
          Total Certificates:&nbsp;
          <span className='total-num'>
            {findUser?.certificates && findUser?.certificates?.length < 10 ?
              `0${findUser?.certificates?.length}` :
              findUser?.certificates?.length}
            {!findUser?.certificates && '00'}
          </span>
        </p>
        <IssueCertificateBtn onClick={() => setOpenIssueCertificate(true)} />
      </div>

      <div className="certificate-cards">
        <Row gutter={[15, 15]}>
          {findUser?.certificates ? findUser?.certificates?.map((certificate: any, i: number) => (
            <Col xl={6} lg={8} sm={12} xs={24} key={i}>
              <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'>
                <div className="flex items-center justify-between mb-[30px]">
                  <p className='font-medium title text-xl'>
                    Certificate of &nbsp;
                    <span className='capitalize'>{certificate?.certificateType}</span>
                  </p>
                  <DropDownNew items={[
                    {
                      label: <p onClick={() => setOpenIssueCertificate(true)}>Edit</p>,
                      key: 'edit'
                    },
                    { label: <p onClick={() => setDeleteModal(true)}>Delete</p>, key: 'delete' },
                  ]}
                    placement={'bottomRight'}
                    overlayStyle={{ width: '100px' }}
                  >
                    <ThreeDots
                      className='cursor-pointer'
                      onClick={() => setIssuewNewCertificate({
                        name: findUser?.name,
                        type: certificate?.certificateType,
                        desc: certificate?.desc
                      })}
                    />
                  </DropDownNew>
                </div>
                <div className="img-wrapper py-[20px] relative overflow-hidden w-[100%] rounded-xl">
                  <img
                    src={certificate?.certificateImg}
                    className='w-[90%] mx-auto block'
                  />
                  <div className="img-overlay absolute w-full h-full top-0 left-0 flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setPreviewModal(true);
                    }}
                  >
                    <CertificateEyeIcon
                      className='eye-icon'
                      height={70}
                      width={70}
                      onClick={() => setIssuewNewCertificate({
                        name: findUser?.name,
                        type: certificate?.certificateType,
                        desc: certificate?.desc
                      })}
                    />
                  </div>
                </div>
              </BoxWrapper>
            </Col>
          ))
            :
            <p className='text-lg opacity-[0.7]'>No Certificates Found...</p>
          }
        </Row>
      </div>


      {openIssueCertificate &&
        <IssueCertificateModal
          internDetails={internData}
          setOpen={setOpenIssueCertificate}
          open={openIssueCertificate}
          setTogglePreview={setTogglePreview}
          setOpenSignatureModal={setOpenSignatureModal}
          certificateDetails={certificateDetails}
          setCertificateDetails={setCertificateDetails}
        // open={openIssueCertificate}
        // setOpen={setOpenIssueCertificate}
        // setTogglePreview={setPreviewModal}
        // setOpenSignatureModal={setSignatureModal}
        // issuewNewCertificate={issuewNewCertificate}
        // setIssuewNewCertificate={setIssuewNewCertificate}
        // actionType={'edit'}
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
              // onClick={handleIssueCertificate}
              >
                Issue
              </Button>
            </>
          }
        />}
      {previewModal && <PreviewModal
        open={previewModal}
        setOpen={setPreviewModal}
      // name={findUser?.name}
      // type={issuewNewCertificate?.type}
      // desc={issuewNewCertificate?.desc}
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
      }

      {deleteModal &&
        <Alert
          type={'error'}
          state={deleteModal}
          setState={setDeleteModal}
          icon={''}
          cancelBtntxt={'Cancel'}
          okBtntxt={'Delete'}
        >
          <p className='font-medium text-[#4E4B66]'>
            Are you sure you want to delete this cetificate?
          </p>
        </Alert>}
    </div>
  )
}

export default CertificateDetail