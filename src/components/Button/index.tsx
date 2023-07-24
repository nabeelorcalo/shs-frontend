import { Button as AntButton } from 'antd';
import { CustomTheme } from '../../personalizeTheme';

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
  className?: string,
  upcomingIcon?: any,
  icon?: any
  style?: any
  htmlType?: any
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
  const { themeContext, theme } = CustomTheme();
  const styles: any = {
    'primary': { backgroundColor: theme.primary },
    'default': { borderColor: theme.secondary, color: theme.secondary }
  }

  return (
    <AntButton
      size={size}
      type={type}
      block={block}
      loading={loading}
      shape={shape}
      disabled={disabled}
      icon={icon}
      className={className}
      style={styles[type]}
      {...props}
    >
      {label} {upcomingIcon}
    </AntButton>
  )
}
