import React, { useState } from "react";
import { Carousel, Avatar, Image, Row } from "antd";
import { Button } from "../Button";
import { BoxWrapper } from "../BoxWrapper/BoxWrapper";
import "./style.scss";

interface BirthdayProps {
  user?: string;
  wishList: any;
  onClick?: () => void;
}

export const BirthdayWishes = (props: BirthdayProps) => {
  const { wishList: list, user } = props;
  let [wishList, setWishList] = useState(list);

  const onWishClick = (id: number) => {
    const newArr = [...wishList];
    const index = newArr.findIndex((obj) => obj.id === id);
    newArr[index].isWished = true;
    setWishList(newArr);
  };
  console.log(wishList);

  return (
    <div
      className={`birthday-wishes bg-white rounded-2xl p-5 wrapper-shadow h-full ${
        user === "Intern" ? "min-h-[182px]" : ""
      }`}
    >
      <Carousel autoplay={false} className="h-full">
        {wishList.map((item: any) => (
          <div className="flex flex-col a-wish">
            <div className="flex flex-row">
              <Avatar size={48} alt="avatar" src={<img src={item.avatar} />} />
              {item?.isWished ? (
                <div>
                  <div className="flex pl-4 items-center">
                    <p className="font-normal text-sm text-secondary-color">
                      You wished
                      <span className="secondary-color"> {item.name} </span> a
                      Happay Birthday.
                    </p>
                  </div>
                  <div className="relative mt-4">
                    <Image
                      className="absolute left-[85%]"
                      alt="birthday"
                      width={70}
                      height={70}
                      preview={false}
                      src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/6b3fe963030867.5aa3707f0c627.gif"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col pl-4 ">
                    <p className="text-primary-color">{item.name}</p>
                    <p className="font-normal text-sm text-secondary-color">
                      Has birthday today.
                    </p>
                    <p className="font-normal text-sm light-grey-color">
                      {item.date}
                    </p>
                  </div>
                  <Image
                    alt="birthday"
                    width={70}
                    height={70}
                    preview={false}
                    src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/6b3fe963030867.5aa3707f0c627.gif"
                  />
                </>
              )}
            </div>

            <div
              className={`flex flex-row ${
                item?.isWished ? "" : "mt-4"
              } items-end`}
            >
              {!item?.isWished && (
                <Button
                  label="Wish Now"
                  type="primary"
                  block={true}
                  className="wish-now-btn page-header-secondary-bg-color"
                  onClick={() => onWishClick(item.id)}
                />
              )}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
