import { useRecoilValue } from 'recoil';
import CommonModal from './CommonModal'
import { certificateDetailsState } from '../../../store';
import { Certificate } from '../../../components';
import { useState } from 'react';
interface Props {
  open?: boolean;
  setOpen?: any;
  certificateImg?: any;
  footer?: any;
}

const PreviewModal = (props: Props) => {
  const { footer, open, setOpen } = props;
  const certificateDetails = useRecoilValue(certificateDetailsState);
  const { name, type, desc, imgSignature, txtSignature, fontFamily, fileURL } = certificateDetails;
  const currentDesign = certificateDetails?.certificateDesign
  let certificateId;
  if (currentDesign === 'APPRECIATION_CERTIFICATE_TEMPLATE_TWO' || currentDesign === 'COMPLETION_CERTIFICATE_TEMPLATE_TWO') {
    certificateId = 1
  }
  else {
    certificateId = 2
  }

  return (
    <CommonModal footer={footer} title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
      <div className='relative overflow-hidden print-certificate'>
        <Certificate
          id={certificateId} // templateId
          name={name} // Inter name
          type={type} // certificateOfAppreciation | certificateOfCompletion
          fontFamily={fontFamily}
          txtSignature={txtSignature}
          imgSignature={imgSignature} // Drawable image signature
          fileURL={fileURL} // Upload file image url
          description={<span dangerouslySetInnerHTML={{ __html: desc }}></span>}
          className="certificate-template print-certificate w-full h-auto object-cover"
        />
      </div>
    </CommonModal>
  )
}

export default PreviewModal;