import SelectComp from '../../../components/Select/Select'
import CommonModal from './CommonModal';
import { Select, Radio, Space, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { UserAvatar } from '../../../assets/images';

const Options = Select;
interface Props {
    open?: boolean;
    setOpen?: any;
    setTogglePreview?: any;
    setOpenSignatureModal?: any;
    setIssuewNewCertificate?: any;
    issuewNewCertificate?: any;
    actionType?: string;
}

const IssueCertificate = (props: Props) => {

    const { open, setOpen, setTogglePreview, setOpenSignatureModal, actionType,
        issuewNewCertificate, setIssuewNewCertificate
    } = props;

    const { name, type, desc } = issuewNewCertificate;

    const options = [
        {
            id: '1',
            name: 'maria sanoid',
            img: UserAvatar
        },
        {
            id: '2',
            name: 'adams ',
            img: UserAvatar
        },
        {
            id: '3',
            name: 'mino marina',
            img: UserAvatar
        },
        {
            id: '4',
            name: 'john doe',
            img: UserAvatar
        },
    ];

    return (
        <CommonModal open={open} onCancel={() => setOpen(!open)} title='Issue Certificate'>
            <SelectComp value={name} label='intern' placeholder={'Select'} className={`user-select ${actionType === 'edit' ? 'disabled' : 'active'}`}
                onChange={(e: string) => setIssuewNewCertificate((pre: any) => ({ ...pre, name: e }))}>
                <>
                    {options.map((data) => (
                        <Options value={data.name}>
                            <div className='flex items-center gap-3'>
                                <img src={data.img} />
                                <span className='capitalize'>{data.name}</span>
                            </div>
                        </Options>
                    ))}
                </>
            </SelectComp>
            <div className='select-type my-[30px]'>
                <label className='block mb-[10px]'>Select Type</label>
                <Radio.Group value={type} defaultValue={type} onChange={(e: RadioChangeEvent) => setIssuewNewCertificate((pre: any) => ({ ...pre, type: e.target.value }))}>
                    <Space direction='vertical'>
                        <Radio value={'appreciation'} className={`select-type-radio ${type === 'appreciation' && 'active'}`}>Certificate of Appreciation</Radio>
                        <Radio value={'completion'} className={`select-type-radio ${type === 'completion' && 'active'}`}>Certificate of Completion</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className={`print-on-certificate mb-[30px] ${name && type ? 'active' : 'disabled'}`}>
                <label className='label block mb-[10px]'>Print on Certificate</label>
                <textarea
                    rows={5}
                    name='printOnCertificate'
                    value={desc}
                    onChange={((e: any) => setIssuewNewCertificate((pre: any) => ({ ...pre, desc: e.target.value })))}
                    className={`desc w-full rounded-lg box-border p-[16px]`}
                />
            </div>
            <div className='action-btns flex justify-end gap-4'>
                {name && type && <Button className='preview-btn btn flex items-center'
                    onClick={() => setTogglePreview(true)}>
                    Preview
                </Button>}
                <Button className='cancel-btn btn flex items-center' onClick={() => setOpen(!open)}>Cancel</Button>
                <Button className={`continue-btn btn flex items-center`} style={{ pointerEvents: !name ? 'none' : 'inherit' }}
                    onClick={() => { setOpen(!open); setOpenSignatureModal(true) }}>
                    Continue
                </Button>
            </div>
        </CommonModal >
    )
}

export default IssueCertificate