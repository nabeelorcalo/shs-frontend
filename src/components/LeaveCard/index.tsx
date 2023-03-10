import { Divider } from "antd";
import { BoxWrapper } from "../BoxWrapper/boxWrapper";



import './style.scss';
interface LeaveCardProps {
    Icon?: any
    title?: string
    total?: string
    pending?: string
    approved?: string
    declined?: string
    bg?: string
}
export const LeaveCard = (props: LeaveCardProps) => {
    const { title, total, pending, approved, declined, Icon,bg } = props
    return (
        <BoxWrapper className="leave-card-wrapper">
            <div className="upper_part flex items-center justify-between">
                <div className="upper_part_1 flex items-center">
                    <div className="imgBg rounded-lg flex items-center justify-center w-[60px] h-[60px]" style={{background: `${bg}`}}>
                        <Icon/>
                    </div>
                    <h4 className=" ml-2 my-0 font-semibold  text-[20px]">{title}</h4>
                </div>
                <h2 className="my-0 font-medium  text-[30px]">{total}</h2>
            </div>
            <Divider style={{ marginBlock: '15px' }} />
            <div className="lower_part flex items-center justify-between">
                <div className="info_wraper ">
                    <h6 className="heading font-medium text-[16px] mb-0 mt-5 ">Pending</h6>
                    <h6 className="info_count  font-medium text-[16px] text-center my-2">{pending}</h6>
                </div>
                <div className="info_wraper">
                    <h6 className="heading font-medium text-[16px] mb-0 mt-5">Approved</h6>
                    <h6 className="info_count  font-medium text-[16px] text-center my-2">{approved}</h6>
                </div>
                <div className="info_wraper">
                    <h6 className="heading font-medium text-[16px] mb-0 mt-5">Declined</h6>
                    <h6 className="info_count  font-medium text-[16px] text-center my-2">{declined}</h6>
                </div>
            </div>
        </BoxWrapper>
    )
}
