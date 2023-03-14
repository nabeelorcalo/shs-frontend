import { Row, Col } from 'antd';
import { useState } from 'react';
import { DropDown, SearchBar } from '../../components';
import IssueCertificateModal from './certificateModal/IssueCertificateModal';
import PreviewModal from './certificateModal/PreviewModal';
import SignatureModal from './certificateModal/SignatureModal';
import CertificateTable from './certificateTable';
import IssueCertificateBtn from './issueCertificateBtn';
import './style.scss';

const Certificates = () => {
    const [searchVal, setSearchVal] = useState('');
    const [dropdownVal, setDropdownVal] = useState('');
    const [openIssueCertificate, setOpenIssueCertificate] = useState(false);
    const [togglePreview, setTogglePreview] = useState(false);
    const [opensignatureModal, setOpenSignatureModal] = useState(false);

    const dropdownData = ['design', 'research', 'management', 'development', 'business'];

    return (
        <div className='certificate-wrapper'>

            <div className="certificate-top-heading text-2xl font-semibold pb-[30px] mb-[30px]">
                Certificate
            </div>

            <Row className="justify-between gap-2">

                <Col xl={7}>
                    <SearchBar size='middle' handleChange={setSearchVal} value={searchVal} className='' />
                </Col>

                <Col xl={16}>
                    <Row className='justify-end' gutter={[20, 10]}>
                        <Col lg={5}>
                            <DropDown value={dropdownVal} name={'Department'} setValue={setDropdownVal} options={dropdownData} />
                        </Col>
                        <Col>
                            <IssueCertificateBtn onClick={() => setOpenIssueCertificate(true)} />
                        </Col>
                    </Row>
                </Col>

            </Row>

            <CertificateTable />

            {openIssueCertificate &&
                <IssueCertificateModal
                    setOpen={setOpenIssueCertificate}
                    open={openIssueCertificate}
                    setTogglePreview={setTogglePreview}
                    setOpenSignatureModal={setOpenSignatureModal}
                />
            }

            {togglePreview && <PreviewModal open={togglePreview} setOpen={setTogglePreview} />}

            {opensignatureModal && <SignatureModal open={opensignatureModal} setOpen={setOpenSignatureModal} />}
            <DropDown requiredDownloadIcon />
        </div>
    )
}

export default Certificates