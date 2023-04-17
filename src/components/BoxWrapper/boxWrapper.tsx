import { ReactNode } from "react";
import "./style.scss";
interface Props {
  id?: any
  className?: string
  children?: ReactNode
  boxShadow?: boolean
  borderLeft?: string
  rest?: any
}
export const BoxWrapper = (props: Props) => {
  const {
    id,
    className,
    children,
    boxShadow,
    borderLeft="0",
    ...rest
  } = props;

  return (
    <div
      className={`${className} ${boxShadow? "box-hover-wrapper": "box-wrapper"}`}
      style={{borderLeft: borderLeft}}
      {...rest}
    >
      {children}
    </div>
  );
};
