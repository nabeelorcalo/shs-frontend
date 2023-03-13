import { ReactNode } from "react";
import "./BoxWrapper.scss";
interface Props {
  className?: string;
  children?: ReactNode;
  boxShadow?: string;
  rest?: any;
}
export const BoxWrapper = (props: Props) => {
  const {
    className,
    children,
    boxShadow = "0px 2px 3px #E4E8F0",
    ...rest
  } = props;
  return (
    <div
      className={`${className} box-wrapper`}
      style={{ boxShadow: boxShadow }}
      {...rest}
    >
      {children}
    </div>
  );
};
