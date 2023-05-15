import { Input as AntInput } from "antd";
import { GlassMagnifier } from "../../assets/images";
import "./style.scss";

interface Props {
  size?: "large" | "small" | "middle";
  className?: string;
  placeholder?: string;
  value?: string;
  name?: string;
  icon?: any;
  handleChange({ }): void;
}

export const SearchBar = ({
  size, 
  placeholder = "Search",
  icon = <GlassMagnifier />,
  name,
  value,
  className,
  handleChange,
  ...rest
}: Props) => {
  return (
    <div className="input-wrapper">
      <AntInput
        className={`search-bar ${className}`}
        value={value}
        size={size}
        name={name}
        placeholder={placeholder}
        prefix={icon}
        onChange={(e) => handleChange(e.target.value)}
        {...rest} 
      />
    </div>
  );
};
