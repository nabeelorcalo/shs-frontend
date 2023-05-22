import { Tabs } from 'antd';
import React from 'react'
import { Info, PersnolIcon } from '../../../../assets/images';
import { BoxWrapper } from '../../../../components';
import CompanyInformationTabs from './companyInformationTabs';
import CompanyProfileTabs from './personalInformationTab';

const CompanyTabs = () => {
    const items: any = [
        {
            key: "1",
            label: (
                <div className="flex gap-2 ">
                    <PersnolIcon />
                    <p className="text-success-placeholder-color">Personal Information</p>
                </div>
            ),
            children: <CompanyProfileTabs />,
        },
        {
            key: "2",
            label: (
                <div className="flex gap-2 items-center">
                    <Info />
                    <p className="text-success-placeholder-color">General Information</p>
                </div>
            ),
            children: <CompanyInformationTabs />,
        },

    ];
    return (
        <>
            <BoxWrapper className="mx-2 h-[80vh] overflow-y-scroll"> 
                <Tabs className="" defaultActiveKey="1" items={items} onChange={() => { }} />
            </BoxWrapper>
            </>
    )
}

export default CompanyTabs