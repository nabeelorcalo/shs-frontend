import { Select as AntSelect } from 'antd';
import { ReactNode } from 'react';
import { ArrowDownDark } from '../../assets/images';
import './style.scss';

interface Props {
  className?: string;
  value?: string;
  popupClassName?: string;
  label?: string;
  options?: any;
  suffixIcon?: any;
  placeholder?: string;
  onChange?: any;
  children?: ReactNode | ReactNode[],
}

const SelectComp = (props: Props) => {
  const {
    label,
    value,
    className,
    popupClassName,
    suffixIcon = <ArrowDownDark />,
    placeholder,
    onChange,
    children,
    ...rest
  } = props;

  return (
    <div className='select-wrapper'>

      {label &&
        <label
          className='label text-base mb-[8px] block capitalize'>
          {label}
        </label>}

      <AntSelect
        value={value}
        className={`select-comp w-full rounded-lg ${className}`}
        popupClassName={`select-popup-box ${popupClassName}`}
        suffixIcon={suffixIcon}
        placeholder={placeholder}
        onChange={onChange}
        {...rest}
      >
        {children}
      </AntSelect>

    </div>
  )
}

export default SelectComp