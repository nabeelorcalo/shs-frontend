import { Card, Button } from 'antd'
import { BathIcon, BedIcon, SaveIcon } from '../../assets/images';
import './AccommodationCard.scss';

interface Props {
	coverPhoto?: string;
	offer?: number;
	rent?: number;
	propertyAvailableFor?: string;
	propertyType?: string;
	totalBedrooms?: number;
	totalBathrooms?: number;
	tags?: string[];
	address?: string;
	onSave?: () => void;
	onDetail?: () => void;
	onChat?: () => void;
}

export const AccommodationCard = (props: Props) => {
	const {
		coverPhoto,
		offer,
		rent = 0,
		propertyAvailableFor,
		propertyType,
		totalBedrooms,
		totalBathrooms,
		address,
		tags = ['utility bills', 'laundry', 'meals', 'others'],
		onSave,
		onDetail,
		onChat,
	} = props;


	return (
		<Card className='relative accommodation-card-wrapper'
			cover={
				<img
					src={coverPhoto}
					alt='icon'
					className='h-[200px] w-100 object-cover'
				/>
			}
		>
			{offer && <div className="badge absolute top-[10px] right-[10px] font-medium">{offer}% Off</div>}
			<div className='card-content-box'>
				<div className='flex items-center justify-between flex-wrap gap-2'>
					<p>
						<span className='actual-price text-xs mr-1'>
							{offer && <><span className='line-through mr-1'>£{rent}</span>-</>}
						</span>
						<span className='discount'>
							<span className='bold text-2xl font-semibold mr-1'>
								{offer ? Math.round(rent - ((offer / 100) * rent)) : `£${rent}`}
							</span>
							<span className='week'>/{propertyAvailableFor}</span>
						</span>
					</p>
					<div className="save-icon w-[36px] h-[36px] rounded-md flex items-center justify-center cursor-pointer" onClick={onSave}>
						<SaveIcon />
					</div>
				</div>
				<div className="flex items-center flex-wrap gap-y-2 my-[10px]">
					<p className='title mr-[20px] text-lg capitalize'>{propertyType}</p>
					<p className='room-info flex items-center'>
						<span className='font-semibold text-base flex items-center'>
							{totalBedrooms}
							<BedIcon className='ml-[10px]' />
						</span>
						<span className='circle h-[6px] w-[6px] rounded-full mx-[10px]'></span>
						<span className='font-semibold text-base flex items-center'>
							{totalBathrooms}
							<BathIcon className='ml-[10px]' />
						</span>
					</p>
				</div>
				<div className="address text-[15px] mb-[10px] capitalize">{address}</div>
				<div className="tags flex items-center gap-[10px] flex-wrap">
					{tags.map((tags: any | string, i: number) => (
						<p key={i} className='rounded-[4px] tag py-[2px] px-[12px] capitalize'>{tags}</p>
					))}
				</div>
				<div className="card-action-btn flex items-center justify-between gap-[15px] flex-wrap mt-[20px]">
					<Button className='font-semibold flex-1 card-btn detail-btn rounded-lg' onClick={onDetail}>Details</Button>
					<Button className='font-semibold flex-1 card-btn chat-btn rounded-lg' onClick={onChat}>Chat</Button>
				</div>
			</div>
		</Card>
	)
}