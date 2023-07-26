import { Alert } from 'antd'
import { AlertInfo, AlertDanger, AlertSuccess} from "../../assets/images";
import './style.scss'
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
      className={`alert-banner-main py-4 px-5 border-0 gap-2  flex flex-wrap ${className}`}
      message={message}
      type={type}
      showIcon={showIcon}
      closable={closable}
      action={hasAction && actions}
      icon={type==='info'?<AlertInfo/>:type==='success'?<AlertSuccess/>:type==='error'?<AlertDanger/>:''}
    />
  )
}

export default AlertBanner
