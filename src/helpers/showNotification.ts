import { notification } from "antd";

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const showNotification = (type: NotificationType, title:any, description:any) => {
  notification[type]({
    message: title,
    description: description,
  });
};
export default showNotification;