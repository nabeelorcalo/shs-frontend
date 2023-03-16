import CommonModal from './CommonModal'

interface Props {
    open?: boolean;
    setOpen?: any;
}

const PreviewModal = (props: Props) => {
    const { open, setOpen } = props;
    return (
        <CommonModal title='Preview' width='900px' open={open} onCancel={() => setOpen(!open)}>
            <img />
        </CommonModal>
    )
}

export default PreviewModal