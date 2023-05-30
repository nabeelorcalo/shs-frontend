import { Alert } from 'antd'
interface bannerProps {
  className?: any;
  message: any;
  type: any;
  showIcon?: boolean;
  closable?: boolean;
  actions?: any;
  hasAction?: boolean
}
const AlertBanner = (props: bannerProps) => {
  const { className, message, type, showIcon, closable, actions, hasAction } = props
  return (
    <Alert
      className={className}
      message={message}
      type={type}
      showIcon={showIcon}
      closable={closable}
      action={hasAction && actions}
    />
  )
}

export default AlertBanner
