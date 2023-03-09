import { Card, Button } from 'antd'
import { BathIcon, BedIcon, SaveIcon } from '../../assets/images';
import './AccommodationCard.scss';

interface Props {
    maxWidth?: string;
    id?: string;
    coverPhoto?: string;
    discount?: string;
    autualPrice?: string;
    withDiscountPrice?: string;
    propertyAvailableFor?: string;
    propertyType?: string;
    totalBeds?: string;
    totalWashRoom?: string;
    tags?: string[];
    location?: string;
    handleSaveClick?: () => void;
    handleDetailClick?: () => void;
    handleChatClick?: () => void;
}

const AccommodationCard = (props: Props) => {
    const { maxWidth,
        coverPhoto,
        id,
        discount,
        autualPrice,
        withDiscountPrice,
        propertyAvailableFor,
        propertyType,
        totalBeds,
        totalWashRoom,
        tags = ['utility bills', 'laundry', 'meals', 'others'],
        location,
        handleSaveClick,
        handleDetailClick,
        handleChatClick,
    } = props;
    return (

        <Card id={id} className='relative accommodation-card-wrapper h-full'
            style={{ maxWidth: maxWidth }}
            cover={
                <img
                    src={coverPhoto}
                    alt='icon'
                    className='h-[200px] w-100 object-cover'
                />
            }
        >
            {discount && <div className="badge absolute top-[10px] right-[10px] font-medium">{discount}% Off</div>}
            <div className='card-content-box'>
                <div className='flex items-center justify-between flex-wrap gap-2'>
                    <p>
                        <span className='actual-price text-xs mr-1'>
                            {autualPrice && <><span className='line-through mr-1'>£{autualPrice}</span>-</>}
                        </span>
                        <span className='discount'>
                            <span className='bold text-2xl font-semibold mr-1'>£{withDiscountPrice}</span>
                            <span className='week'>/{propertyAvailableFor}</span>
                        </span>
                    </p>
                    <div className="save-icon w-[36px] h-[36px] rounded-md flex items-center justify-center cursor-pointer" onClick={handleSaveClick}>
                        <SaveIcon />
                    </div>
                </div>
                <div className="flex items-center flex-wrap gap-2 my-[10px]">
                    <p className='title mr-[20px] text-lg capitalize'>{propertyType}</p>
                    <p className='room-info flex items-center gap-2'>
                        <span className='font-semibold text-base flex items-center gap-2'>
                            {totalBeds}
                            <BedIcon className='mx-[10px]' />
                        </span>
                        <span className='circle h-[6px] w-[6px] rounded-full'></span>
                        <span className='font-semibold text-base flex items-center gap-2 ml-[10px]'>
                            {totalWashRoom}
                            <BathIcon className='mx-[10px]' />
                        </span>
                    </p>
                </div>
                <div className="address text-[15px] mb-[10px] capitalize">{location}</div>
                <div className="tags flex items-center gap-[10px] flex-wrap">
                    {tags.map((tags: any | string, i: number) => (
                        <p key={i} className='rounded-[4px] tag py-[2px] px-[12px] capitalize'>{tags}</p>
                    ))}
                </div>
                <div className="card-action-btn flex items-center justify-between gap-[15px] flex-wrap mt-[20px]">
                    <Button className='font-semibold flex-1 card-btn detail-btn rounded-lg' onClick={handleDetailClick}>Details</Button>
                    <Button className='font-semibold flex-1 card-btn chat-btn rounded-lg' onClick={handleChatClick}>Chat</Button>
                </div>
            </div>
        </Card>

    )
}

export default AccommodationCard