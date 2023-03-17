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
    const [issuewNewCertificate, setIssuewNewCertificate] = useState({
        name: '', type: '',
        desc: 'For being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.'
    });

    const dropdownData = ['design', 'research', 'management', 'development', 'business'];

    return (
        <div className='certificate-wrapper'>
            <div className="certificate-top-heading text-2xl font-semibold pb-[30px] mb-[30px]">
                Certificate
            </div>
            <div className="flex items-center justify-between flex-wrap gap-4">
                <SearchBar size='middle' handleChange={setSearchVal} value={searchVal} className='' />
                <div className='flex gap-4 items-end justify-end flex-wrap'>
                    <DropDown value={dropdownVal} name={'Department'} setValue={setDropdownVal} options={dropdownData} />
                    <IssueCertificateBtn className='w-full' onClick={() => setOpenIssueCertificate(true)} />
                </div>
            </div>
            <CertificateTable />
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
            {opensignatureModal && <SignatureModal open={opensignatureModal} setOpen={setOpenSignatureModal} />}
        </div>
    )
}

export default Certificates