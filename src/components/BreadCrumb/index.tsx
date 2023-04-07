import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Divider } from "antd";

interface BreadCrumbProps {
  breadCrumbData: any
  bordered?: any
};

export const Breadcrumb = (props: BreadCrumbProps) => {
  const { breadCrumbData, bordered } = props;
  const navigate = useNavigate();
  return (
    <div className=" breadCrumb-main">
      {breadCrumbData.map((element: any, i: number) => (
        <span key={i} onClick={() => navigate(element.onClickNavigateTo, { replace: true })}>
          {element.name}
        </span>
      ))}
      {bordered && <Divider />}
    </div>
  );
};
