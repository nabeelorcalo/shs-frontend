import { AssessmentAproved, AssessmentDraft, AssessmentRejected, AssessmentSubmitted, ThreeDots } from '../../assets/images';
import { BoxWrapper } from '../../components';
import { Dropdown } from 'antd';
import './AssessmentCard.scss';
import DropDownNew from '../Dropdown/DropDownNew';

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
    const isSubmitted: any = [
        { label: <p className='mb-3' onClick={() => handleMenuClick({ action: 'view', id })}>View</p>, key: 'view' },
        { label: <p onClick={() => handleMenuClick({ action: 'send reminder', id })}>Send Reminder</p>, key: 'send reminder' }
    ]
    const isApproved: any = [
        { label: <p className='mb-3' onClick={() => handleMenuClick({ action: 'view', id })}>View</p>, key: 'view' },
        { label: <p onClick={() => handleMenuClick({ action: 'download', id })}>Download</p>, key: 'download' }
    ]
    const items: any = [
        { label: <p className='mb-3' onClick={() => handleMenuClick({ action: 'edit', id })}>Edit</p>, key: 'edit' },
        { label: <p onClick={() => handleMenuClick({ action: 'delete', id })}>Delete</p>, key: 'delete' }
    ];


    const renderStyles: any = {
        'Draft': { icon: AssessmentDraft, bg: '#FFC15E', options: items },
        'Submitted': { icon: AssessmentSubmitted, bg: '#4783FF', options: isSubmitted },
        'Approved': { icon: AssessmentAproved, bg: '#4ED185', options: isApproved },
        'Rejected': { icon: AssessmentRejected, bg: '#D83A52', options: items },
    };
    let Icon = renderStyles[status].icon;

    return (
        <BoxWrapper className='relative assessment-card-wrapper' boxShadow=' 0px 0px 8px 1px rgba(9, 161, 218, 0.1)' id={id}>

            <DropDownNew items={renderStyles[status].options} placement={'bottomRight'} className='absolute right-[20px] top-[20px] cursor-pointer'>
                <ThreeDots />
            </DropDownNew>
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