import { notification } from "antd";
import "./style.scss";
import { Success } from "../../assets/images";
import { InfoCircleFilled, WarningFilled } from "@ant-design/icons";

interface NotificationProps {
  title: any;
  description: any;
  type: any;
}
export const Notifications: any = (props: NotificationProps) => {
  const { type, title, description } = props;
  const typeObj: any = {
    success: <Success />,
    warning: <WarningFilled />,
    info: <InfoCircleFilled />,
    error: <InfoCircleFilled />
  }
  notification.open({
    message: (
      <h3 className="text-semibold text-primary-color text-base ml-3 my-0">{title}</h3>
    ),
    description: (
      <span className="text-sm text-normal text-secondary-color ml-3 mt-0">{description}</span>
    ),
    duration: 10,
    icon: typeObj[type],
  });
};
