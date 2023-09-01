import { useEffect, useState } from "react";
import { Carousel, Avatar, Image } from "antd";
import { Button } from "../Button";
import "./style.scss";
import { BirthdayWishGift } from "../../assets/images";
import { NoDataFound } from "../NoData";
import Loader from "../Loader";
interface BirthdayProps {
  user?: string;
  wishList: any;
  wishBirthdayToUser?: any;
  isLoading?: boolean
}

export const BirthdayWishes = (props: BirthdayProps) => {
  const { wishList: list, user, wishBirthdayToUser, isLoading } = props;

  let [wishList, setWishList] = useState(list?.map((obj: any) => list));

  const onWishClick = (item: any) => {
    wishBirthdayToUser({
      receiverId: item?.id,
      type: "BIRTHDAY",
      description: `Happy birthday ${item?.name}`,
    });
    setWishList(wishList?.map((obj: any) => ({ ...obj, isWished: obj?.id === item?.id ? true : obj?.isWished })));
  };
  useEffect(() => {
    setWishList(list);
  }, [list]);
  return (
    <div
      className={`birthday-wishes bg-white rounded-2xl p-5 wrapper-shadow h-full ${user === "Intern" ? "min-h-[182px]" : ""
        }`}
    >
      {
        isLoading ? <div className="h-[182px]"> <Loader /></div> :
          <Carousel autoplay={true} className="h-full">
            {wishList?.length > 0 ? (
              wishList.map((item: any, index: number) => (
                <div key={index} className="flex flex-col a-wish">
                  <div className="flex flex-row items-start">
                    <Avatar className="min-w-[48px]" size={48} alt="avatar" src={item?.avatar}>
                      <span>
                        {item?.name?.split(" ")[0][0]}
                        {item?.name?.split(" ")[1][0]}
                      </span>
                    </Avatar>
                    {item?.isWished ? (
                      <div className="w-full">
                        <div className="flex pl-4 items-center justify-between flex-nowrap">
                          <p className="font-normal text-sm text-secondary-color">
                            You wished
                            <span className="secondary-color"> {item?.name} </span> a Happy Birthday.
                          </p>
                          <Image alt="birthday" width={70} height={70} preview={false} src={BirthdayWishGift} />
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex flex-col pl-4 ">
                          <p className="text-primary-color">{item.name}</p>
                          <p className="font-normal text-sm text-secondary-color">Has birthday today.</p>
                          <p className="font-normal text-sm light-grey-color">{item.date}</p>
                        </div>
                        <Image alt="birthday" width={70} height={70} preview={false} src={BirthdayWishGift} />
                      </>
                    )}
                  </div>

                  <div className={`flex flex-row ${item?.isWished ? "" : "mt-4"} items-end`}>
                    {!item?.isWished && (
                      <Button
                        label="Wish Now"
                        type="primary"
                        block={true}
                        className="wish-now-btn page-header-secondary-bg-color"
                        onClick={() => onWishClick(item)}
                      />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <NoDataFound isNoBorder={true} height={120} />
            )}
          </Carousel>
      }
    </div>
  );
};
