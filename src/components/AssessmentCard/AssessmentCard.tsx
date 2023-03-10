import { AssessmentAproved, AssessmentDraft, AssessmentRejected, AssessmentSubmitted, ThreeDots } from '../../assets/images';
import {BoxWrapper} from '../BoxWrapper/BoxWrapper';
import { Dropdown } from 'antd';
import './AssessmentCard.scss';

interface Props {
    id?: string;
    title?: string;
    month?: string;
    year?: string;
    userName?: string;
    userImg?: string;
    status?: string;
    handleMenuClick?: any;
}

const AssessmentCard = (props: Props) => {
    const {
        id,
        title,
        month,
        year,
        userName,
        userImg,
        status = 'draft',
        handleMenuClick
    } = props;

    const renderStyles: any = {
        'draft': { icon: AssessmentDraft, bg: '#FFC15E' },
        'submitted': { icon: AssessmentSubmitted, bg: '#4783FF' },
        'approved': { icon: AssessmentAproved, bg: '#4ED185' },
        'rejected': { icon: AssessmentRejected, bg: '#D83A52' },
    };
    let Icon = renderStyles[status].icon;

    const items = [
        { label: <p className='mb-3' onClick={() => handleMenuClick({ action: 'edit', id })}>Edit</p>, key: 'edit' },
        { label: <p onClick={() => handleMenuClick({ action: 'delete', id })}>Delete</p>, key: 'delete' }
    ];

    return (
        <BoxWrapper className='relative assessment-card-wrapper' id={id}>
            <Dropdown
                menu={{ items }}
                trigger={['click']}
                placement={'bottomRight'}
                className='absolute right-[20px] top-[20px] cursor-pointer'
                overlayClassName='assessment-card-dropdown'
                overlayStyle={{ minWidth: '140px' }}
            >
                <ThreeDots />
            </Dropdown>
            <div className="flex items-center gap-4 flex-wrap">
                <Icon />
                <p className='title text-lg capitalize'>{title}</p>
            </div>
            <p className='my-[20px] font-semibold text-2xl month-year capitalize'>{month} {year}</p>
            <div className="flex items-center gap-[10px]">
                <img src={userImg} className='h-[32px] w-[32px] rounded-full object-cover' />
                <p className='userName capitalize'>{userName}</p>
            </div>
            <div
                className='absolute bottom-[10px] right-[10px] capitalize py-[2px] px-[10px] rounded-lg text-white'
                style={{ background: renderStyles[status].bg }}
            >
                {status}
            </div>
        </BoxWrapper>
    )
}

export default AssessmentCard