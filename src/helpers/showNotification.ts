import { notification } from "antd";
import { Notifications } from "../components";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const showNotification = (type: NotificationType, details:any) => {
  notification[type]({
    message: details.message,
    description: details.description,
  });
};
export default showNotification;