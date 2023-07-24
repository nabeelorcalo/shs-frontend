import { useRecoilValue } from 'recoil';
import CommonModal from './CommonModal'
import { certificateDetailsState } from '../../../store';
import { CertificateLayout } from '../../../assets/images';
interface Props {
  open?: boolean;
  setOpen?: any;
  certificateImg?: any;
  footer?: any;
}

const PreviewModal = (props: Props) => {
  const { footer, open, setOpen, certificateImg = CertificateLayout, } = props;
  const certificateDetails = useRecoilValue(certificateDetailsState);
  const { name, desc, imgSignature, txtSignature, fileURL } = certificateDetails;

  return (
    <CommonModal footer={footer} title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
      <div className='relative overflow-hidden print-certificate'>
        <img src={certificateImg} className='w-full certificate-img' />
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center flex-col">
          {/* <p className='absolute top-[110px] mb-[150px] text-2xl font-light font-sans'>of <span className='capitalize font-sans'>{type}</span></p> */}
          <p className='absolute top-[200px] capitalize mb-[20px] text-5xl text-[#4A4F4D] italic'>{name}</p>
          <p className='absolute top-[270px] capitalize w-[60%] text-center certificate-desc'>{desc}</p>
          {
            imgSignature &&
            <img
              src={imgSignature}
              alt="certificate-signature"
              className={`absolute bottom-[85px] right-[50px] w-[156px] h-[62px]`}
            />
          }
          {
            txtSignature &&
            <div className='flex justify-center text-center absolute bottom-[45px] right-[50px] w-[150px] h-[62px]'>
              <p className={`absolute bottom-[45px] w-auto`}>
                {txtSignature}
              </p>
            </div>
          }
          {
            fileURL &&
            <img
              src={fileURL}
              alt="certificate-signature"
              className={`absolute bottom-[85px] right-[50px] w-[156px] h-[62px] object-contain`}
            />
          }
        </div>
      </div>
    </CommonModal>
  )
}

export default PreviewModal