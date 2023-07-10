import { Row, Col } from "antd";
import { FC } from "react";
import { CardRemoveIcon, EyeIcon, SavedProperties, WalletMoneyIcon } from "../../assets/images";
import Card from "./Card";
interface IFavouritesViewCard {
  totalViews?: string | number;
  favourites?: string | number;
  currentBalance?: string | number;
  inactiveMembersBalance?: string | number;
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
  grayBg: "rgba(217, 219, 233, 1)",
};

export const FavouritesViewCard: FC<IFavouritesViewCard> = (props) => {
  const {
    totalViews,
    favourites,
    // delegate agent dashboard
    currentBalance,
    inactiveMembersBalance,
  } = props;

  //Icons Colors destructured
  const { greenBg, redBg, grayBg } = IconBgColors;

  // FavouritesViewCard handling card list on props basis
  const handleCardList = (icon: JSX.Element, title: string, count: string | number, iconBg: string) =>
    cardsList.push({ icon, title, count, iconBg });

  // FavouritesViewCard card list
  const cardsList: ICardsList[] = [];

  // agent dashboard
  totalViews && handleCardList(<EyeIcon />, "Total Views", totalViews, greenBg);
  favourites && handleCardList(<SavedProperties />, "Saved Properties", favourites, grayBg);

  // delegate agent dashboard
  currentBalance && handleCardList(<WalletMoneyIcon />, "Current Balance", currentBalance, greenBg);
  inactiveMembersBalance &&
    handleCardList(<CardRemoveIcon />, "Inactive Members Balance", inactiveMembersBalance, redBg);

  return (
    <Row
      className={`xs:gap-[8px] sm:gap-[16px] lg:gap-[20px] xl:gap-[30px] px-7 py-6 bg-white rounded-2xl wrapper-shadow flex-col sm:flex-row`}
    >
      {cardsList?.map(({ icon, iconBg, title, count }, index) => (
        <Col
          key={title}
          className={`flex-1 border-y-0 border-l-0 ${
            index === 0 &&
            "border-solid border-b-[1px] sm:border-b-0 xs:pb-5 sm:border-solid border-r-0 sm:border-r-[1px]"
          } gray-border-color`}
        >
          <Card icon={icon} title={title} count={count} iconBg={iconBg} />
        </Col>
      ))}
    </Row>
  );
};
