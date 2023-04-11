import React from 'react';
import { Tabs, TabsProps } from 'antd';
import PersnolInformation from './persnolInformation';
import { PersnolIcon, DocumentsIcon, HiringIcon, InterviewIcon } from "../../assets/images/"
import DrawerDocuments from './drawerDocuments';
import HiringProcess from './hiringProcess';
import Interview from './interview';


const onChange = (key: string) => {
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <div className='flex gap-2'>
      <PersnolIcon />
      <p>Personal Information</p></div>,
    children: <PersnolInformation />,
  },
  {
    key: '2',

    label: <div className='flex gap-2'>
      <DocumentsIcon />
      <p>Documents</p></div>,
    children: <DrawerDocuments />,
  },
  {
    key: '3',
    label: <div className='flex gap-2'>
      <HiringIcon />
      <p>Hiring Process</p></div>,
    children: <HiringProcess />,
  },
  {
    key: '4',
    label: <div className='flex gap-2'>
      <InterviewIcon />
      <p>Interview</p></div>,
    children: <Interview />,

  },
];
const DrawerTabs = () => {

  return (
    <div className='md:px-5'>
      <Tabs className='' defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default DrawerTabs
