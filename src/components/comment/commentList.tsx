import { Avatar } from "antd";
import dayjs from "dayjs";
import { Dot } from "../../assets/images";
import { NoDataFound } from "../NoData";
import { getUserAvatar } from "../../helpers";

export const CommentList = (props: any) => {
  const { commentsList } = props;
  return (
    <div className="comments-list">
      {commentsList?.length > 0 ? (
        commentsList?.map(({ commentedByUser, createdAt, comment }: any, index: number) => (
          <div key={index} className="avatar flex items-center gap-3 mt-6">
            <Avatar
              className="h-[48px] w-[48px] rounded-full object-cover relative"
              src={getUserAvatar({ profileImage: commentedByUser?.profileImage })}
              alt={commentedByUser?.firstName}
              icon={
                <span className="uppercase text-[18px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
                  {commentedByUser?.firstName[0]}
                  {commentedByUser?.lastName[0]}
                </span>
              }
            />
            <div className="text">
              <div className="flex gap-3">
                <p className="font-medium">{`${commentedByUser?.firstName} ${commentedByUser?.lastName}`}</p>
                <p className="mt-1 txt-p">
                  {dayjs(createdAt).format(`HH:mm`)} <Dot className="mx-1" /> {dayjs(createdAt).format(`DD MMM YYYY`)}
                </p>
              </div>
              <p>{comment}</p>
            </div>
            <div></div>
          </div>
        ))
      ) : (
        <div className="p-1">
          <NoDataFound />
        </div>
      )}
    </div>
  );
};
