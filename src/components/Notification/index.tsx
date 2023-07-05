import { notification } from "antd";
import "./style.scss";
import { Success } from "../../assets/images";
import { CloseCircleFilled, InfoCircleFilled, WarningFilled } from "@ant-design/icons";

interface NotificationProps {
  title: string;
  description: string;
  type?: string;
  key?: string;
}
export const Notifications: any = (props: NotificationProps) => {
  const { type = "success", title, description, key } = props;
  const typeObj: any = {
    success: <Success />,
    warning: <WarningFilled className="text-warning-color" />,
    info: <InfoCircleFilled className="accommodation-btn-info" />,
    error: <CloseCircleFilled className="text-error-color" />,
  };
  notification.open({
    message: <h3 className="text-semibold text-primary-color text-base ml-0 my-0">{title}</h3>,
    description: <span className="text-sm text-normal text-secondary-color mt-0">{description}</span>,
    duration: 5,
    icon: typeObj[type],
    key
  });
};
