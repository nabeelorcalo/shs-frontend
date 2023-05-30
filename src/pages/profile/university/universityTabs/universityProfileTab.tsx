import "../../style.scss";
import { Tabs, } from "antd";
import { BoxWrapper } from "../../../../components";
import { DEFAULT_VALIDATIONS_MESSAGES } from "../../../../config/validationMessages";
import { DocumentsIcon, Info, PersnolIcon } from "../../../../assets/images";
import PersonalInformationTabs from "./personalInformation/PersonalInformationTabs";
import GenralInformationTab from "./generalInformation/genralInformationTab";
import DocumentsTab from "./documents/DocumentsTab";

const UniversityProfileTab = (props: any) => {
  const { selectedCandidate } = props;

  const items: any = [
    {
      key: "1",
      label: (
        <div className="flex gap-2 ">
          <PersnolIcon />
          <p className="text-success-placeholder-color">Personal Information</p>
        </div>
      ),
      children: <PersonalInformationTabs />,
    },
    {
      key: "2",
      label: (
        <div className="flex gap-2 items-center">
          <Info />
          <p className="text-success-placeholder-color">General Information</p>
        </div>
      ),
      children: <GenralInformationTab selectedCandidate={selectedCandidate} />,
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
      <BoxWrapper className="h-[100vh] overflow-y-scroll">
        <Tabs className="ml-5" defaultActiveKey="1" items={items} onChange={() => { }} />
      </BoxWrapper>
    </>
  )
}

export default UniversityProfileTab