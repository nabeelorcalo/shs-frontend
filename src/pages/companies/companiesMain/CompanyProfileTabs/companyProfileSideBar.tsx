import { BoxWrapper } from '../../../../components'
import { Avatar, Divider } from "antd"
import { Call, LocationIconNew, Mail } from '../../../../assets/images';
import constants from '../../../../config/constants';

const CompanyProfileSideBar = (props: any) => {
  const { data } = props;
  const { logo, ownerName, ownerRole, businessName, ownerAddress, country } = data;

  const userinfoData = [
    { img: Mail, title: data?.website },
    { img: Call, title: data?.user?.phoneNumber },
    { img: LocationIconNew, title: `${ownerAddress},${country}` },
  ];

  return (
    <BoxWrapper className='h-[80vh]'>
      <div className="user-info flex flex-col items-center">
        <Avatar size={75} src={`${constants.MEDIA_URL}/${logo?.mediaId}.${logo?.metaData?.extension}`}>
          {data?.userDetail?.firstName?.charAt(0)}{data?.userDetail?.lastName?.charAt(0)}
        </Avatar>
        <div className="py-4 text-center">
          <p className="text-xl font-semibold text-primary-color">{ownerName}</p>
          <p className="text-secondary-color font-medium text-base">{ownerRole}</p>
          <p className="text-secondary-color font-medium text-base">{businessName}</p>
        </div>
      </div>
      <Divider />
      <div className="contact pt-4">
        {userinfoData.map((info, i) => (
          <div className="message  text-secondary-color flex items-center gap-5 my-5" key={i}>
            <div>
              <info.img width={24} />
            </div>
            {info.title ? <p className="m-0 ">{info.title}</p> : "N/A"}
          </div>
        ))}
      </div>
    </BoxWrapper>

  )
}

export default CompanyProfileSideBar