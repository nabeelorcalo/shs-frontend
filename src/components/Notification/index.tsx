import { notification } from "antd";
import "./style.scss";

export const openNotification = (args:any) => {
  notification.open({
    message: (
      <h3 className="text-semibold text-primary-color text-base ml-3">
        {args.title}
      </h3>
    ),
    description: (
      <span className="text-sm text-normal text-secondary-color ml-3">
        {args.description}
      </span>
    ),
    duration: 10,
    icon: args.icon,
  });
};
