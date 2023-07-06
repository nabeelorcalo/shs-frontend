import dayjs from "dayjs";
import { Encryption, Signeddigital } from "../../../assets/images";
import "./style.scss"

const SenderRecieverDetails = (props?: any) => {
  const { detailsData,
    hasEmail,
    hasSigned,
    hasRejected,
    bgColor,
    rejectedDateTime,
    SignedDateTime,
    hasPending,
    cardHeading
  } = props;
  return (
    <div className="contractCard">
      {detailsData?.slice(0, hasEmail ? 4 : -1)?.map((item: any, index: any) => {
        return (
          <div key={index} className="px-4 pt-3">
            <div className="pb-4">
              <p className="text-success-placeholder-color text-base font-normal">
                {item.label}
              </p>
              <p className="text-lg font-normal text-secondary-color">
                {item.title}
              </p>
            </div>
          </div>
        );
      })}
      {hasSigned && <div className="flex bg-[#9ec5b4] rounded-b-[14px] p-4 items-center">
        <Signeddigital />
        <div className="pl-6">
          <p className="text-lg font-medium text-green-color pb-2">
            Signed digitally
          </p>
          <p className="text-lg font-medium text-green-color">
            {dayjs(SignedDateTime).format("DD MMMM YYYY [at] HH:MM A")}
          </p>
        </div>
      </div>}
      {(hasRejected || hasPending) && <div className={`flex p-4 items-center rounded-b-[14px] pb-9 bg-[${bgColor}]`}>
        <Encryption className={`${hasRejected && 'rejectedIcon'}`} />
        <div className="pl-6">
          <p className={`text-lg font-medium pb-2 ${hasRejected && 'text-error-color'}`}>
            {cardHeading}
            <p>
              {rejectedDateTime && dayjs(rejectedDateTime).format("DD MMMM YYYY [at] HH:MM A")}
            </p>
          </p>
        </div>
      </div>}
    </div>
  )
}

export default SenderRecieverDetails
