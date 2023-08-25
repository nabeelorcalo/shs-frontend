import { Divider } from "antd";
import { BoxWrapper } from "../../components";
import './style.scss';
interface LeaveCardProps {
  title?: string
  total?: string
  pending?: string
  approved?: string
  declined?: string
  icon?: any
}

export const LeaveCard = ({
  title = "Sick",
  total = '27',
  pending = "0",
  approved = "0",
  declined = "0",
  icon,
  ...props
}: LeaveCardProps) => {

  return (
    <BoxWrapper className="leave-card-wrapper">
      <div className="upper-part">
        <div className="upper-part-1">
          <div className="imgBg">
            <img src={icon} alt='icon' />
          </div>
          <h4>{title}</h4>
        </div>
        <h2>{total}</h2>
      </div>
      <Divider style={{ marginBlock: '15px' }} />
      <div className="lower-part">
        <div>
          <h6>Pending</h6>
          <h6 style={{ color: '#4E4B66' }}>{pending}</h6>
        </div>
        <div className="remainingLeave">
          <h6>Approved</h6>
          <h6 style={{ color: '#4E4B66' }}>{approved}</h6>
        </div>
        <div>
          <h6>Declined</h6>
          <h6 style={{ color: '#4E4B66' }}>{declined}</h6>
        </div>
      </div>
    </BoxWrapper>
  )
}
