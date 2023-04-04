import { notification } from "antd";
import "./style.scss";

interface NotificationProps {
  title: any;
  description: any;
  icon: any;
}
export const Notifications:any = (props: NotificationProps) => {
  const { title, description, icon } = props;
  notification.open({
    message: (
      <h3 className="text-semibold text-primary-color text-base ml-3 my-0">{title}</h3>
    ),
    description: (
      <span className="text-sm text-normal text-secondary-color ml-3 mt-0">{description}</span>
    ),
    duration: 10,
    icon: icon,
  });
};
