import { Button as AntButton } from 'antd'

interface ButtonProps {
  label: string
  type: 'primary' | 'dashed' | 'text' | 'default'
  block?: boolean,
  size?: 'small' | 'middle' | 'large',
  color?: string,
  loading?: boolean,
  shape?: 'default' | 'circle' | 'round'
  onClick?: () => void,
  disabled?: boolean,
  icon?: any
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
  ...props
}: ButtonProps) => {
  return (
    <AntButton 
      size={size}
      type={type}
      block={block}
      style={{ backgroundColor: color }}
      loading={loading}
      shape={shape}
      disabled={disabled}
      icon={icon}
      {...props}
    >
      {label}
    </AntButton>
  )
}
