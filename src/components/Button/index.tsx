import { Button as AntButton } from 'antd'

 interface ButtonProps {
  label?: string
  type?: 'primary' | 'dashed' | 'text' | 'default'
  block?: boolean,
  size?: 'small' | 'middle' | 'large',
  color?: string,
  loading?: boolean,
  shape?: 'default' | 'circle' | 'round'
  onClick?: () => void,
  disabled?: boolean,
  className?:string,
  upcomingIcon?:any,
  icon?: any
  style?: any
  htmlType?:any
}

export const Button = ({ 
  label,
  type = 'primary',
  block = false,
  size = 'middle',
  color,
  loading = false,
  shape = 'default',
  disabled = false,
  icon,
  className,
  upcomingIcon,
  ...props
}: ButtonProps) => {
  return (
    <AntButton 
      size={size}
      type={type}
      block={block}
      style={{ backgroundColor: color, ...props?.style }}
      loading={loading}
      shape={shape}
      disabled={disabled}
      icon={icon}
      className={className}
      {...props}
    >
      {label} {upcomingIcon}
    </AntButton>
  )
}
