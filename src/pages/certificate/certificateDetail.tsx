import { Button, Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import { BoxWrapper } from '../../components/BoxWrapper/BoxWrapper';
import { tableMockData } from './certificateTable/tableMock';
import { OverAllPerfomance } from '../../components';
import { CertificateEyeIcon, ThreeDots } from '../../assets/images';
import { useState } from 'react';
import IssueCertificateBtn from './issueCertificateBtn';
import IssueCertificate from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import SignatureModal from './certificateModal/SignatureModal';
import DropDownNew from '../../components/Dropdown/DropDownNew';
import LeaveChart from '../../components/ChartsOfGraphs/LeaveChart/LeaveChart';

const CertificateDetail = () => {
  const { id } = useParams();

  const findUser = tableMockData.find(user => user.no === id);
  const [issueCertificateModal, setIssueCertificateModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  const [previewImg, setPreviewImg] = useState('');
  const [signatureModal, setSignatureModal] = useState(false);

  const [issuewNewCertificate, setIssuewNewCertificate] = useState({
    name: findUser?.name, type: '',
    desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.'
  });

  return (
    <div className='certificate-detail-wrapper'>
      <div className="certificate-top-heading text-2xl flex items-center gap-4 font-semibold pb-[30px] mb-[30px] capitalize">
        {findUser?.name}
        <span className='seperator'></span>
        <span className='font-medium text-base'>Certificate</span>
      </div>
      <Row gutter={[15, 15]} className='flex-wrap'>
        <Col xl={6} lg={6} md={24} xs={24}>
          <BoxWrapper
            boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'
            className='user-info flex items-center justify-center flex-col'>
            <img
              src={findUser?.avatar}
              className='h-[100px] w-[100px] rounded-full object-cover'
              alt='avatar'
            />
            <p className='user-name capitalize mt-[20px] mb-[5px] font-medium text-2xl'>{findUser?.name}</p>
            <span className='department capitalize'>{findUser?.department}</span>
            <Button className='mt-[30px] w-full view-profile-btn'>View Profile</Button>
          </BoxWrapper>
        </Col>
        <Col xl={12} lg={18} md={24} xs={24} className='over-all-performance'>
          <OverAllPerfomance
            lg={5} md={12} xs={24}
            data={findUser?.performance}
            heading={'Overall Performance'}
          />
        </Col>
        <Col xl={6} lg={24} xs={24}>
          <LeaveChart heading='Leaves' />
        </Col>
      </Row>
      <div className="flex items-center justify-between gap-3 flex-wrap my-[30px]">
        <p className='font-semibold text-base total-certificates'>
          Total Certificates:
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
            <Col lg={6} md={8} sm={12} xs={24} key={i}>
              <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1)'>
                <div className="flex items-center justify-between mb-[30px]">
                  <p className='font-medium title text-xl'>
                    Certificate of
                    <span className='capitalize'>{certificate?.certificateType}</span>
                  </p>
                  <DropDownNew items={[
                    {
                      label: <p onClick={() => { setIssueCertificateModal(true) }}>Edit</p>,
                      key: 'edit'
                    },
                    { label: <p>Delete</p>, key: 'delete' },
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
                      setPreviewImg(certificate?.certificateImg)
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
      {signatureModal && <SignatureModal open={signatureModal} setOpen={setSignatureModal} />}
    </div>
  )
}

export default CertificateDetail