import { Tabs } from 'antd';
import { Info, PersnolIcon } from '../../../../assets/images';
import { BoxWrapper } from '../../../../components';
import CompanyInformationTabs from './companyInformationTabs';
import CompanyProfileTabs from './personalInformationTab';
import { useLocation } from 'react-router-dom';
import '../style.scss'

const CompanyTabs = () => {
  const { state } = useLocation();

  const items: any = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 ">
          <PersnolIcon />
          <p className="text-success-placeholder-color">Personal Information</p>
        </div>
      ),
      children: <CompanyProfileTabs data={state} />,
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 items-center">
          <Info />
          <p className="text-success-placeholder-color">Company Information</p>
        </div>
      ),
      children: <CompanyInformationTabs data={state} />,
    },

  ];
  return (
    <>
      <BoxWrapper className="mx-2 h-[80vh] overflow-y-scroll tabs-parent">
        <Tabs className="" defaultActiveKey="1" items={items} onChange={() => { }} />
      </BoxWrapper>
    </>
  )
}

export default CompanyTabs