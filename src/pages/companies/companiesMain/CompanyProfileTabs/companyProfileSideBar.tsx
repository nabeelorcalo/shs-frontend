import { BoxWrapper } from '../../../../components'
import { Avatar, Divider } from "antd"
import { Call, LocationIconNew, Mail } from '../../../../assets/images';
import constants from '../../../../config/constants';

const CompanyProfileSideBar = (props: any) => {
  const { data } = props;

  const { email, firstName, lastName, phoneCode, phoneNumber, country } = data.admin;

  const userinfoData = [
    { icon: Mail, title: email },
    { icon: Call, title: `${phoneCode} ${phoneNumber}` },
    { icon: LocationIconNew, title: `${data?.address},${country}` },
  ];

  return (
    <BoxWrapper className='h-[80vh]'>
      <div className="user-info flex flex-col items-center">
        <Avatar size={75} src={`${constants.MEDIA_URL}/${data?.logo?.mediaId}.${data?.logo?.metaData?.extension}`}>
          {data?.userDetail?.firstName?.charAt(0)}{data?.userDetail?.lastName?.charAt(0)}
        </Avatar>
        <div className="py-4 text-center">
          <p className="text-xl font-semibold text-primary-color">{firstName} {lastName}</p>
          <p className="text-secondary-color font-medium text-base">{data?.ownerRole}</p>
          <p className="text-secondary-color font-medium text-base">{data?.businessName}</p>
        </div>
      </div>
      <Divider />
      <div className="contact pt-4">
        {userinfoData.map((info, i) => (
          <div className="message  text-secondary-color flex items-center gap-5 my-5" key={i}>
            <div>
              <info.icon width={24} />
            </div>
            {info.title ? <p className="m-0 ">{info.title}</p> : "N/A"}
          </div>
        ))}
      </div>
    </BoxWrapper>

  )
}

export default CompanyProfileSideBar