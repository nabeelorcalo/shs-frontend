import { Avatar, Button, Col, Row } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BoxWrapper } from '../../components';
import { tableMockData } from './certificateTable/tableMock';
import { Alert, Breadcrumb, OverAllPerfomance } from '../../components';
import { CertificateEyeIcon, ThreeDots } from '../../assets/images';
import { useEffect, useState } from 'react';
import IssueCertificateBtn from './issueCertificateBtn';
import IssueCertificate from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import DropDownNew from '../../components/Dropdown/DropDownNew';
import LeaveChart from '../../components/ChartsOfGraphs/LeaveChart/LeaveChart';
import SignatureAndUploadModal from '../../components/SignatureAndUploadModal';
import "./style.scss";
import useCustomHook from './actionHandler';
import useLeavesHook from "../setting/companyAdmin/Leaves/actionHandler"
import { useRecoilState } from 'recoil';
import { currentUserState } from '../../store';
import constants from '../../config/constants';

const CertificateDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const findUser = tableMockData.find(user => user.no === id);
  const [issueCertificateModal, setIssueCertificateModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [signatureModal, setSignatureModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { state: internData } = useLocation()
  const loggedUserDetail = useRecoilState(currentUserState)
  const { certificatesList, getCertificates } = useCustomHook();
  const { getSettingLeaves, settingLeaveData } = useLeavesHook()

  useEffect(() => {
    getCertificates(internData.id)
    getSettingLeaves()
  }, [])

  const [issuewNewCertificate, setIssuewNewCertificate] = useState({
    name: findUser?.name, type: '',
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.'
  });

  return (
    <div className='certificate-detail-wrapper'>
      <Breadcrumb breadCrumbData={[{ name: `${internData?.userDetail?.firstName} ${internData?.userDetail?.lastName}` }, { name: 'Certificate', onClickNavigateTo: '/certificates' }]} />
      <Row gutter={[15, 15]} className='flex-wrap certificates-row'>
        <Col xxl={6} xl={12} xs={24}>
          <BoxWrapper
            boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'
            className='user-info flex items-center flex-col'>
            <Avatar
              className='w-[100px] h-[100px]'
              src={`${constants.MEDIA_URL}/${loggedUserDetail[0]?.profileImage?.mediaId}.${loggedUserDetail[0]?.profileImage?.metaData?.extension}`}>
              {`${loggedUserDetail[0]?.firstName?.charAt(0)} ${loggedUserDetail[0]?.lastName?.charAt(0)}`}
            </Avatar>
            <p className='user-name capitalize mt-[20px] mb-[5px] font-medium text-2xl'>{`${loggedUserDetail[0]?.firstName} ${loggedUserDetail[0]?.lastName}`}</p>
            <span className='department capitalize'>{loggedUserDetail[0]?.department ? loggedUserDetail[0]?.department : 'N/A'}</span>
            <Button className='mt-[30px] w-full view-profile-btn' onClick={() => navigate('/profile')}>View Profile</Button>
          </BoxWrapper>
        </Col>
        <Col xxl={12} xl={24} xs={24} className='over-all-performance'>
          <OverAllPerfomance
            data={findUser?.performance}
            heading={'Overall Performance'}
          />
        </Col>
        <Col xxl={6} xl={12} xs={24}>
          <LeaveChart heading='Leaves' leavesData={settingLeaveData} />
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
        <IssueCertificateBtn onClick={() => setIssueCertificateModal(true)} />
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
                      label: <p onClick={() => setIssueCertificateModal(true)}>Edit</p>,
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
      {issueCertificateModal && <IssueCertificate
        open={issueCertificateModal}
        setOpen={setIssueCertificateModal}
        setTogglePreview={setPreviewModal}
        setOpenSignatureModal={setSignatureModal}
        issuewNewCertificate={issuewNewCertificate}
        setIssuewNewCertificate={setIssuewNewCertificate}
        actionType={'edit'}
      />}
      {previewModal && <PreviewModal
        open={previewModal}
        setOpen={setPreviewModal}
        name={findUser?.name}
        type={issuewNewCertificate?.type}
        desc={issuewNewCertificate?.desc}
      />}
      {signatureModal && <SignatureAndUploadModal />}

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