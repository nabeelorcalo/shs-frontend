import { useNavigate } from "react-router-dom";
import "./style.scss";
import { Divider } from "antd";

interface BreadCrumbProps {
  breadCrumbData: any
  bordered?: any
  hasNavigateState?: any
};

export const Breadcrumb = (props: BreadCrumbProps) => {
  const { breadCrumbData, bordered, hasNavigateState } = props;

  const navigate = useNavigate();
  return (
    <div className=" breadCrumb-main">
      {breadCrumbData.map((element: any, i: number) => (
        <span key={i} onClick={() => element?.onClickNavigateTo ? navigate(element.onClickNavigateTo, hasNavigateState) : {}}>
          {element.name}
        </span>
      ))
      }
      {bordered && <Divider />}
    </div >
  );
};
