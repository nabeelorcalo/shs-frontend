import { useNavigate } from "react-router-dom";
import "./style.scss";

interface BreadCrumbProps {
  breadCrumbData: any
};

export const Breadcrumb = (props: BreadCrumbProps) => {
  const { breadCrumbData } = props;
  const navigate = useNavigate();
  return (
    <div className=" breadCrumb-main">
      {breadCrumbData.map((element: any, i: number) => (
        <span key={i} onClick={() => navigate(element.onClickNavigateTo, { replace: true })}>
          {element.name}
        </span>
      ))}
    </div>
  );
};
