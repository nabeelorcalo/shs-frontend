import { Col, Progress, Row } from 'antd';
import BoxWrapper from '../BoxWrapper/BoxWrapper';
import { array } from '../DocumentsWidgets/widgets';
import './ContractCard.scss';

export const ContractCard = (props: any) => {
    const { cardWithProgressBar } = props;
    return (
        <div className={`contract-card relative flex items-center overflow-hidden rounded-lg w-full ${cardWithProgressBar && 'contract-card-progress'}`}
        >
            {!cardWithProgressBar ?
                <BoxWrapper className='box-wrapper-1 flex items-center'>
                    <img src={array[0].img} alt="" />
                    <div className='ml-3'>
                        <p className='text-base font-semibold'>{array[0].title}</p>
                        <span>{array[0].description}</span>
                    </div>
                </BoxWrapper>
                :
                <BoxWrapper className='card-progress-box flex gap-10 flex-wrap'>
                    <div className="relative user flex items-center">
                        <img className='img w-[48px] h-[48px] object-cover' />
                        <div className='ml-[20px] capitalize'>
                            <p className='user-name'>don joe</p>
                            <span>web developer</span>
                        </div>
                    </div>
                    <div className="total-hours flex items-center flex-1 gap-10">
                        <div className='flex items-center'>
                            <img className='img w-[48px] h-[48px] object-cover' />
                            <div className='ml-[20px] capitalize'>
                                <p>Total hours</p>
                                <span>35h</span>
                            </div>
                        </div>
                        <Progress percent={30} />
                    </div>
                </BoxWrapper>
            }

            <div className="view-all-btn">
                <span className='capitalize'>view all</span>
            </div>
        </div>
    )
}