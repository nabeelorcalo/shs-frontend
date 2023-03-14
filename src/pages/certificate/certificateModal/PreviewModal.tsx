import CommonModal from './CommonModal'
interface Props {
    open?: boolean;
    setOpen?: any;
    certificateImg?: any;
}

const PreviewModal = (props: Props) => {
    const { open, setOpen, certificateImg } = props;
    return (
        <CommonModal title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
            <img src={certificateImg} className='w-full' />
        </CommonModal>
    )
}

export default PreviewModal