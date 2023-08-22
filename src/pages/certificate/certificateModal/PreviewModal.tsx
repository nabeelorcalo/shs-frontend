import { useRecoilValue } from 'recoil';
import CommonModal from './CommonModal'
import { certificateDetailsState } from '../../../store';
import { Certificate } from '../../../components';
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

  return (
    <CommonModal footer={footer} title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
      <div className='relative overflow-hidden print-certificate'>
        <Certificate
          id={2}
          name={name}
          type={type}
          fontFamily={fontFamily}
          txtSignature={txtSignature}
          imgSignature={imgSignature}
          fileURL={fileURL}
          description={desc}
          className="certificate-template print-certificate w-full h-auto object-cover"
        />
      </div>
    </CommonModal>
  )
}

export default PreviewModal;