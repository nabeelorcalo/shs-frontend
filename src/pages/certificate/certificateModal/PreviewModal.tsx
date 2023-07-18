import { CertificateLayout } from '../../../assets/images';
import CommonModal from './CommonModal'
interface Props {
  open?: boolean;
  setOpen?: any;
  certificateImg?: any;
  name?: string;
  type?: string;
  desc?: string;
  imgSignature?: any;
  txtSignature?: any;
  footer?: any
}

const PreviewModal = (props: Props) => {
  const { footer, open, setOpen, certificateImg = CertificateLayout, name, type, desc, imgSignature, txtSignature } = props;

  return (
    <CommonModal footer={footer} title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
      <div className='relative overflow-hidden print-certificate'>
        <img src={certificateImg} className='w-full certificate-img' />
        <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center flex-col">
          {/* <p className='absolute top-[110px] mb-[150px] text-2xl font-light font-sans'>of <span className='capitalize font-sans'>{type}</span></p> */}
          <p className='absolute top-[200px] capitalize mb-[20px] text-5xl text-[#4A4F4D] italic'>{name}</p>
          <p className='absolute top-[270px] capitalize w-[60%] text-center certificate-desc'>{desc}</p>
          <img
            src={imgSignature}
            className={`absolute top-[${txtSignature ? '350px' : '490px'}] w-[100px] h-[100px]`}
          />
          {/* <p className={`absolute top-[${txtSignature ? '350px' : '490px'}] right-[-125px] capitalize w-[60%] text-center`}>{imgSignature}</p> */}
        </div>
      </div>
    </CommonModal>
  )
}

export default PreviewModal