import SelectComp from '../../../components/Select/Select'
import CommonModal from './CommonModal';
import { Select, Radio, Space, Button } from 'antd';
import type { RadioChangeEvent } from 'antd';
import { UserAvatar } from '../../../assets/images';
import React, { useState } from 'react';
const Options = Select;

interface Props {
    open?: boolean;
    setOpen?: any;
    setTogglePreview?: any;
    setOpenSignatureModal?: any;
}

const IssueCertificate = (props: Props) => {

    const { open, setOpen, setTogglePreview, setOpenSignatureModal } = props;

    const [selectType, setSelectType] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [printOnCertificate, setPrintOnCertificate] = useState('Fo r being a member of the Content writer team in Student Help Squad for three Months. Your efforts are highly appreciated. The skills and knowledge you have demonstrated are an important contribution to the success of our programs.')

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
            <SelectComp value={selectedUser} label='intern' placeholder={'Select'} onChange={(e: string) => setSelectedUser(e)}>
                <>
                    {options.map((data) => (
                        <Options value={data.id}>
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
                <Radio.Group value={selectType} onChange={(e: RadioChangeEvent) => setSelectType(e.target.value)}>
                    <Space direction='vertical'>
                        <Radio value={'Certificate of Appreciation'} className={`select-type-radio ${selectType.includes('Appreciation') && 'active'}`}>Certificate of Appreciation</Radio>
                        <Radio value={'Certificate of Completion'} className={`select-type-radio ${selectType.includes('Completion') && 'active'}`}>Certificate of Completion</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <div className={`print-on-certificate mb-[30px] ${!selectedUser ? 'disabled' : 'active'}`}>
                <label className='label block mb-[10px]'>Print on Certificate</label>
                <textarea
                    rows={5}
                    name='printOnCertificate'
                    value={printOnCertificate}
                    onChange={((e: any) => setPrintOnCertificate(e.target.value))}
                    className={`desc w-full rounded-lg box-border p-[16px]`}
                />
            </div>
            <div className='action-btns flex justify-end gap-4'>
                {selectedUser && <Button className='preview-btn btn flex items-center' onClick={() => setTogglePreview(true)}>Preview</Button>}
                <Button className='cancel-btn btn flex items-center' onClick={() => setOpen(!open)}>Cancel</Button>
                <Button className={`continue-btn btn flex items-center`} style={{ pointerEvents: !selectedUser ? 'none' : 'inherit' }} onClick={() => { setOpen(!open); setOpenSignatureModal(true) }}>Continue</Button>
            </div>
        </CommonModal>
    )
}

export default IssueCertificate