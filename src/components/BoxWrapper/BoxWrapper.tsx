import { ReactNode } from 'react';
import './BoxWrapper.scss';

interface Props {
    className?: string;
    children?: ReactNode;
    rest?: any;
}

const BoxWrapper = (props: Props) => {
    const { className, children, ...rest } = props;
    return (
        <div className={`${className} box-wrapper`} {...rest}>{children}</div>
    )
}

export default BoxWrapper