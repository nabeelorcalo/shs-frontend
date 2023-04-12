import { ReactNode } from "react";
import "./BoxWrapper.scss";
interface Props {
  id?: any
  className?: string
  children?: ReactNode
  boxShadow?: string
  borderLeft?: string
  rest?: any
}
export const BoxWrapper = (props: Props) => {
  const {
    id,
    className,
    children,
    boxShadow = "0px 2px 3px #E4E8F0",
    borderLeft="0",
    ...rest
  } = props;

  return (
    <div
      className={`${className} box-wrapper`}
      style={{ boxShadow: boxShadow, borderLeft: borderLeft}}
      {...rest}
    >
      {children}
    </div>
  );
};
