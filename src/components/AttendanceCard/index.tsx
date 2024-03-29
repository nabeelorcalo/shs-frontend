import { Typography } from 'antd';
import { BoxWrapper } from '../../components';

interface AttendanceProps {
  title: string
  count: number,
  avatar: any,
  className?: string,
}

export const AttendanceCard: any = (props: AttendanceProps) => {
  const { title, count, avatar, className } = props

  return (
    <BoxWrapper className='flex items-center gap-4 attendance-card'>
      {avatar}

      <Typography.Text >
        {title}
      </Typography.Text>

      <Typography.Title
        level={1}
        className="ml-auto text-primary-color"
      >
        {count}
      </Typography.Title>
    </BoxWrapper>
  )
}