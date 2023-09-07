import { Divider, Typography } from 'antd';
import './style.scss';

interface TimeProps {
  Icon: any
  heading: string
  time: string
  isLast?: boolean
  colorClass?: string
  total?: string | number
}

export const AttendanceTimeCard: any = (props: TimeProps) => {
  const { Icon, heading, time, colorClass = '', isLast = false, total = 25 } = props;

  return (
    <div className={`flex flex-row items-center gap-4 time-card`}
    // ${isLast ? '' : 'border-right'}
    >
      {Icon}
      <div className="flex flex-col justify-around">
        <p className="heading">
          {heading}
        </p>

        <div className='flex'>
          <p style={{ color: `${colorClass}` }} className='font-medium text-2xl'>
            {`${time} `}
            {
              heading === "Working Days" &&
              <span className='text-secondary-color '>
                / {total}
              </span>
            }
          </p>
        </div>
      </div>
      {!isLast && <Divider type='vertical' className='card-divider' />}
    </div>
  )
}
