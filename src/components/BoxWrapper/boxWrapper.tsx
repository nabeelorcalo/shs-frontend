import { ReactNode } from "react";
import "./BoxWrapper.scss";

interface Props {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
  rest?: any;
}

const BoxWrapper = (props: Props) => {
  const { className, children,onClick, ...rest } = props;
  return (
    <div className={`${className} box-wrapper`} onClick={onClick} {...rest}>
      {children}
    </div>
  );
};

export default BoxWrapper;
