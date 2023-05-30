import { BoxWrapper } from '../../../../components'
import { Avatar, Divider } from "antd"
import { Call, LocationIconNew, Mail } from '../../../../assets/images';
const CompanyProfileSideBar = (props:any) => {
  const {data}=props
  const userinfoData = [
    { img: Mail, title: data?.website },
    { img: Call, title: data?.user?.phoneNumber },
    { img: LocationIconNew, title: data?.user?.address },
  ];
  return (
    <BoxWrapper className='h-[80vh]'>
      <div className="user-info flex flex-col items-center">
        <Avatar
          className="h-[80px] w-[80px] rounded-full object-cover relative"
          // src={avatar}
          alt={"firstName"}
          icon={
            <span className="uppercase text-[36px] leading-[48px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] ">

              {/* {"firstName"[0]} */}
              {/* {"lastName"[0]} */}
            </span>
          }
        />
        {/* <p className="user-name capitalize">{`${"firstName"} ${"lastName"}`}</p> */}
        <div className="py-4 text-center">
          <p className="text-xl font-semibold text-primary-color">{`${data?.user?.firstName} ${data?.user?.lastName}`}</p>
          <p className="text-secondary-color font-medium text-base">{data?.ownerRole}</p>
          <p className="text-secondary-color font-medium text-base">{data?.businessName}</p>
        </div>
      </div>
      <Divider />
      <div className="contact pt-4">
        {userinfoData.map((info, i) => (
          <div className="message  text-secondary-color flex items-center gap-5 my-5" key={i}>
            <div>
              <info.img width={24} />
            </div>
            <p className="m-0 ">{info.title}</p>
          </div>
        ))}
      </div>
    </BoxWrapper>

  )
}

export default CompanyProfileSideBar