import { Progress } from 'antd';
import { BoxWrapper } from '../BoxWrapper/BoxWrapper';
import './style.scss';
import TimeIcon from "../../assets/images/timesheetTime.png"
import Clock from "../../assets/images/Clock.png"
import { ContractsSigned } from '../../assets/images';


export const ContractCard = (props: any) => {
    const {
        cardWithProgressBar,
        img,
        title,
        description,
        userImg,
        userName,
        designation,
        totalHours,
        progress,
        workedHours,
        strokeColor,
        handleViewAll
    } = props;
    return (
        <div className={`contract-card relative flex items-center overflow-hidden rounded-lg w-full ${cardWithProgressBar && 'contract-card-progress'}`}
        >
            {!cardWithProgressBar ?
                <BoxWrapper className='box-wrapper-1 flex items-center'>
                    <img src={img} alt="icon" />
                    <div className='ml-3'>
                        <p className='text-base font-semibold'>{title}</p>
                        <span>{description}</span>
                    </div>
                </BoxWrapper>
                :
                <BoxWrapper className='card-progress-box flex gap-10 flex-wrap'>
                    <div className="relative user flex items-center">
                        <img src={userImg} className='img w-[48px] h-[48px] object-cover' />
                        <div className='ml-[20px] capitalize'>
                            <p className='user-name'>{userName}</p>
                            <span>{designation}</span>
                        </div>
                    </div>
                    <div className="total-hours flex items-center flex-1 gap-10">
                        <div className='flex items-center'>
                            <img src={Clock} className='img w-[48px] h-[48px] object-cover' />
                            <div className='ml-[20px] capitalize'>
                                <span className='inline-block w-[90px]'>Total hours</span>
                                <span>{totalHours}</span>
                            </div>
                        </div>
                        <Progress className='flex' percent={progress} strokeColor={strokeColor} />
                    </div>
                    <div className="relative flex items-center">
                        <img src={TimeIcon} className='img  h-[48px] object-cover mr-5  z-10' />
                        <div className='ml-[20px] capitalize'>
                            <p className='user-name'>Worked Hours</p>
                            <span>{workedHours}</span>
                        </div>
                    </div>
                </BoxWrapper>
            }

            <div className="view-all-btn">
                <span className='capitalize' onClick={handleViewAll}>view all</span>
            </div>
        </div>
    )
}