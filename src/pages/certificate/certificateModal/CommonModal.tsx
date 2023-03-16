import { Modal } from 'antd'
import { ReactNode } from 'react';
import { CloseCircleIcon } from '../../../assets/images';
import './style.scss';

interface Props {
    open?: boolean;
    width?: string;
    onCancel?: () => void;
    title?: string;
    className?: string;
    children?: ReactNode;
}

const CommonModal = (props: Props) => {
    const { open, onCancel, width = '700px', title, className, children } = props;
    return (
        <Modal
            width={width}
            className={`common-style ${className}`}
            open={open}
            closeIcon={<img src={CloseCircleIcon} />}
            onCancel={onCancel}
            title={<span className='text-xl font-medium'>{title}</span>}
            footer={''}
        >
            {children}
        </Modal>
    )
}

export default CommonModal