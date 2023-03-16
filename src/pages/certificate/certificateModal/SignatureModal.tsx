import CommonModal from './CommonModal';
import { Button, Tabs } from 'antd';
import type { TabsProps } from 'antd';

interface Props {
    open?: boolean;
    setOpen?: any;
};

const RenderSignature = () => {
    return (
        <div className='relative signature-wrapper rounded-[4px] flex items-center justify-end flex-col px-[70px]'>
            <div className="absolute"></div>
            <div className="border w-full"></div>
            <p className='mt-[15px] mb-[35px] font-medium text-sm'>Draw your signature here</p>
        </div>
    )
}

const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Draw`,
        children: <RenderSignature />,
    },
    {
        key: '2',
        label: `Type`, 
        children: `Content of Tab Pane 2`,
    },
    {
        key: '3',
        label: `Upload`,
        children: `Content of Tab Pane 3`,
    },
];


const SignatureModal = (props: Props) => {
    const { open, setOpen } = props;
    const onChange = (key: string) => console.log(key);

    return (
        <CommonModal title='Signature' open={open} onCancel={() => setOpen(!open)}>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} className='mt-[-10px] mb-[30px]' />

            <div className="action-btns flex justify-end gap-4">
                <Button className='cancel-btn btn flex items-center' >Cancel</Button>
                <Button className='continue-btn btn flex items-center'>Sign</Button>
            </div >
        </CommonModal >
    )
}

export default SignatureModal