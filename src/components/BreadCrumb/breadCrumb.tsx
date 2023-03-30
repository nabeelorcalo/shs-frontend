import { useNavigate } from "react-router-dom";
import "./style.scss";

type items = {
  name: string;
  onClickNavigateTo: string;
  color: string;
};

export const Breadcrumb = ({ breadCrumbData }: any) => {
  const navigate = useNavigate();

  const onClickMethod = (receivedObject: items) => {
    navigate(receivedObject.onClickNavigateTo, { replace: true });
  };
  return (
    <div className=" BreadCrum_main">
      {breadCrumbData.map((element: items, i: number) => (
        <span
          key={i}
          style={{
            color: element.color,
            cursor: element.onClickNavigateTo ? "pointer" : "default",
          }}
          onClick={() => onClickMethod(element)}
        >
          {element.name}
        </span>
      ))}
    </div>
  );
};
