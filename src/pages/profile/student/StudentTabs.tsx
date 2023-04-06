import {ProfileUser,GeneralInfo,ProfileDoc,Imigration,ProfileCards} from "../../../assets/images/index"
import AppTabs from "../../../components/Tabs";
import Documents from "./tabs/documents";
import GeneralInformation from "./tabs/generalInformation";
import ImmigrationStatus from "./tabs/immigrationStatus";
import PersonalInformation from "./tabs/personalInformation";
import CardTabs from "./tabs/cards/index";
import '../style.scss';

const items = [
  {
    key: "1",

    label: (
      <span>
        <ProfileUser /> 
        <span className="ml-3">Personal Information</span> 
      </span>
    ),
    children: <PersonalInformation />,
  },
  {
    key: "2",
    label: (
      <span>
        <GeneralInfo />
        <span className="ml-3">General Information</span>
      </span>
    ),
    children: <GeneralInformation />,
  },
  {
    key: "3",
    label: (
      <span>
        <ProfileDoc />
        <span className="ml-3">Documents</span>
      </span>
    ),
    children: <Documents />,
  },
  {
    key: "4",
    label: (
      <span>
        <Imigration />
        <span className="ml-3">Immigration Status</span>
      </span>
    ),
    children: <ImmigrationStatus />,
  },
  {
    key: "5",
    label: (
      <span>
        <ProfileCards /> 
        <span className="ml-3">Cards</span>
      </span>
    ),
    children: <CardTabs />,
  },
];

const StudentsTabs = () => {
  return (
    <div className="studdnt-dash">
      <AppTabs items={items} />
    </div>
  );
}

export default StudentsTabs;
