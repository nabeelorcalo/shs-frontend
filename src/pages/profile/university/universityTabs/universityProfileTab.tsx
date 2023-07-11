import { Tabs, } from "antd";
import { BoxWrapper } from "../../../../components";
import { DocumentsIcon, Info, PersnolIcon } from "../../../../assets/images";
import PersonalInformationTabs from "./personalInformation/PersonalInformationTabs";
import GenralInformationTab from "./generalInformation/genralInformationTab";
import DocumentsTab from "./documents/DocumentsTab";
import "../../style.scss";

const UniversityProfileTab = (props: any) => {
  const { data } = props;

  const items: any = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 ">
          <PersnolIcon />
          <p className="text-success-placeholder-color">Personal Information</p>
        </div>
      ),
      children: <PersonalInformationTabs info={data} />,
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 items-center">
          <Info />
          <p className="text-success-placeholder-color">General Information</p>
        </div>
      ),
      children: <GenralInformationTab info={data} />
      // children: <GenralInformationTab selectedCandidate={selectedCandidate} />,
    },
    {
      key: "3",

      label: (
        <div className="flex gap-2">
          <DocumentsIcon />
          <p className="text-success-placeholder-color">Documents</p>
        </div>
      ),
      children: <DocumentsTab />,
    },

  ];
  return (
    <>
      <BoxWrapper className="h-[100vh] overflow-y-scroll tabs-parent">
        <Tabs className="ml-5" defaultActiveKey="1" items={items} onChange={() => { }} />
      </BoxWrapper>
    </>
  )
}

export default UniversityProfileTab