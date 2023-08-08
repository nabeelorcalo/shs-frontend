import { Avatar, Input } from "antd";
import { SendBtn } from "../../assets/images";
import { getUserAvatar } from "../../helpers";

export const CreateComment = (props: any) => {
  const { userData, comment, setComment, handleCreateComment, id } = props;
  return (
    <div className="Comments flex justify-between mt-6">
      <div className="icon ">
        <Avatar
          className="h-[48px] w-[48px] rounded-full object-cover relative"
          src={getUserAvatar({ profileImage: userData?.profileImage })}
          alt={userData?.firstName}
          icon={
            <span className="uppercase text-[18px] leading-[22px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">
              {userData?.firstName[0]}
              {userData?.lastName[0]}
            </span>
          }
        />
      </div>

      <div className="Input">
        <Input
          className="ant-inp"
          value={comment}
          onChange={(e) => setComment(e?.target?.value)}
          placeholder="Write anything here..."
        ></Input>
      </div>

      <button className="btn-icon cursor-pointer" onClick={() => handleCreateComment(id, comment)}>
        <SendBtn />
        {/* <img src={} alt="btn-icon" /> */}
      </button>
    </div>
  );
};
