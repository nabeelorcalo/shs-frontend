import { CertificateLayout } from '../../../assets/images';
import CommonModal from './CommonModal'
interface Props {
    open?: boolean;
    setOpen?: any;
    certificateImg?: any;
    name?: string;
    type?: string;
    desc?: string;
}

const PreviewModal = (props: Props) => {
    const { open, setOpen, certificateImg = CertificateLayout, name, type, desc } = props;
    return (
        <CommonModal title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
            <div className='relative overflow-hidden'>
                <img src={certificateImg} className='w-full' />
                <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full flex items-center justify-center flex-col">
                    <p className='absolute top-[110px] mb-[150px] text-2xl font-light font-sans'>of <span className='capitalize font-sans'>{type}</span></p>
                    <p className='absolute top-[200px] capitalize mb-[20px] text-[#4A4F4D] italic'>{name}</p>
                    <p className='absolute top-[230px] capitalize w-[60%] text-center'>{desc}</p>
                </div>
            </div>
        </CommonModal>
    )
}

export default PreviewModal