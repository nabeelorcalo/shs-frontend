import { Alert } from 'antd'
interface bannerProps {
    className?: any;
    message: any;
    type: any;
    showIcon?: boolean;
    closable?: boolean;
    actions?: any

}
const AlertBanner = (props: bannerProps) => {
    const { className, message, type, showIcon, closable, actions } = props
    return (
        <Alert
            className={className}
            message={message}
            type={type}
            showIcon={showIcon}
            closable={closable}
            action={actions}
        />
    )
}

export default AlertBanner
