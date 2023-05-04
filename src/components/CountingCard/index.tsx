import { FC } from "react";
import {
  HiredStudentsIcon,
  IconActiveMember,
  IconTotalMember,
  InactiveMembersIcon,
  ListingIcon,
  OngoingIcon,
  PeopleIcon,
  PresentInternsIcon,
  ProfileRemoveIcon,
  ProfileTick,
  ProfileTwouserIcon,
  PropertiesIcon,
  ReservedProperties,
  TotalManagersIcon,
  UniversityIcon,
  VacantProperties,
} from "../../assets/images";
import { Row, Col } from "antd";
import Card from "./Card";
import "./style.scss";
interface ICountingCard {
  // manager dashboard
  totalInterns?: string | number;
  present?: string | number;
  myInterns?: string | number;
  onLeave?: string | number;

  //company admin dashboard
  totalApplicants?: string | number;
  totalUniversities?: string | number;
  totalInternsComapany?: string | number;
  totalManagers?: string | number;

  //agent dashboard
  totalListings?: string | number;
  occupiedProperties?: string | number;
  reservedProperties?: string | number;
  vacantProperties?: string | number;

  // delegate agent dashboard
  totalMembers?: string | number;
  activeMembers?: string | number;
  inActiveMembers?: string | number;

  // university dashboard
  registeredStudents?: string | number;
  hiredStudents?: string | number;
  completedInternship?: string | number;
  ongoingInternship?: string | number;

  // styling check
  isSeprate?: boolean;
}

interface ICardsList {
  icon: JSX.Element;
  iconBg: string;
  title: string;
  count: string | number;
}

//icons background colors
const IconBgColors = {
  blueBg: "rgba(71, 131, 255,0.05)",
  greenBg: "rgba(74, 157, 119,0.05)",
  yellowBg: "rgba(255, 193, 93,0.05)",
  redBg: "rgba(233, 80, 96,0.05)",
};

export const CountingCard: FC<ICountingCard> = (props) => {
  const {
    //manager dashboard
    totalInterns,
    present,
    myInterns,
    onLeave,
    // comapany dashboard
    totalListings,
    occupiedProperties,
    reservedProperties,
    vacantProperties,
    //agent dashboard
    totalApplicants,
    totalUniversities,
    totalInternsComapany,
    totalManagers,
    //delegate agent dashboard
    totalMembers,
    activeMembers,
    inActiveMembers,
    //university dashboard
    registeredStudents,
    hiredStudents,
    completedInternship,
    ongoingInternship,
    // styling check
    isSeprate,
  } = props;

  //Icons Colors destructured
  const { blueBg, greenBg, yellowBg, redBg } = IconBgColors;

  // counting handling card list on props basis
  const handleCardList = (icon: JSX.Element, title: string, count: string | number, iconBg: string) =>
    cardsList.push({ icon, title, count, iconBg });

  // counting card list
  const cardsList: ICardsList[] = [];

  //manager dashboard
  totalInterns && handleCardList(<PeopleIcon />, "Total Interns", totalInterns, blueBg);

  present && handleCardList(<ProfileTick />, "Present", present, greenBg);

  myInterns && handleCardList(<ProfileTwouserIcon />, "My Interns", myInterns, yellowBg);

  onLeave && handleCardList(<ProfileRemoveIcon />, "On Leave", onLeave, redBg);

  //company admin dashboard
  totalApplicants && handleCardList(<PeopleIcon />, "Total Applicants", totalApplicants, blueBg);

  totalUniversities && handleCardList(<UniversityIcon />, "Total Universities", totalUniversities, greenBg);

  totalInternsComapany && handleCardList(<ProfileTwouserIcon />, "Total Universities", totalInternsComapany, greenBg);

  totalManagers && handleCardList(<TotalManagersIcon />, "Total Universities", totalManagers, redBg);

  //agent dashboard
  (totalListings || totalListings === 0) && handleCardList(<ListingIcon />, "Total Listings", totalListings, blueBg);

  (occupiedProperties || occupiedProperties === 0) &&
    handleCardList(<PropertiesIcon />, "Occupied Properties", occupiedProperties, redBg);

  (reservedProperties || reservedProperties === 0) &&
    handleCardList(<ReservedProperties />, "Reserved Properties", reservedProperties, yellowBg);

  (vacantProperties || vacantProperties === 0) &&
    handleCardList(<VacantProperties />, "Vacant Propertiess", vacantProperties, greenBg);

  //delegate agent dashboard
  totalMembers && handleCardList(<IconTotalMember />, "Total Members", totalMembers, blueBg);

  activeMembers && handleCardList(<IconActiveMember />, "Active Members", activeMembers, blueBg);

  inActiveMembers && handleCardList(<InactiveMembersIcon />, "In-Active Members", inActiveMembers, blueBg);

  // university dashboard
  registeredStudents && handleCardList(<PeopleIcon />, "Registered Students", registeredStudents, blueBg);

  hiredStudents && handleCardList(<HiredStudentsIcon />, "Hired Students", hiredStudents, greenBg);

  completedInternship && handleCardList(<PresentInternsIcon />, "Completed Internship", completedInternship, greenBg);

  ongoingInternship && handleCardList(<OngoingIcon />, "Ongoing Internship", ongoingInternship, redBg);

  return (
    <Row className={`${isSeprate ? `xs:gap-[16px] lg:gap-[20px] 2xl:gap-[30px]` : `max-w-[510px]`} counting-card`}>
      {cardsList?.map(({ icon, iconBg, title, count }: any, index) => (
        <Col
          key={title}
          className={`${
            isSeprate ? "bg-white p-5 rounded-2xl wrapper-shadow" : `basis-1/2 col-${index + 1} min-h-[150px]`
          } flex-1 `}
        >
          <Card icon={icon} title={title} count={count} iconBg={iconBg} />
        </Col>
      ))}
    </Row>
  );
};
