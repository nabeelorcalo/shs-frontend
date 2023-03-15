import React from 'react';
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';
import PersnolInformation from './persnolInformation';
import PersnolIcon from "../../assets/images/persnolInformation.png";
import DocumentsIcon from "../../assets/images/documents.png";
import HiringIcon from "../../assets/images/hiring.png";
import InterviewIcon from "../../assets/images/interview.png";
import DrawerDocuments from './drawerDocuments';
import HiringProcess from './hiringProcess';
import Interview from './interview';




const onChange = (key: string) => {
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: <div className='flex gap-2'>
      <img src={PersnolIcon} alt="" />
      <p>Personal Information</p></div>,
    children: <PersnolInformation />,
  },
  {
    key: '2',

    label: <div className='flex gap-2'>
      <img src={DocumentsIcon} alt="" />
      <p>Documents</p></div>,
    children: <DrawerDocuments />,
  },
  {
    key: '3',
    label: <div className='flex gap-2'>
      <img src={HiringIcon} alt="" />
      <p>Hiring Process</p></div>,
    children: <HiringProcess />,
  },
  {
    key: '4',
    label: <div className='flex gap-2'>
      <img src={InterviewIcon} alt="" />
      <p>Interview</p></div>,
    children: <Interview />,

  },
];
const DrawerTabs = () => {

  return (
    <div className='px-5 '>
      <Tabs className='' defaultActiveKey="1" items={items} onChange={onChange} />
    </div>
  )
}

export default DrawerTabs
