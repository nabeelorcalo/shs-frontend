import dayjs from "dayjs";
import { Encryption, Signeddigital } from "../../../assets/images";

const SenderRecieverDetails = (props?: any) => {
  const { detailsData,
    hasEmail,
    hasSigned,
    hasRejected,
    rejectedColor,
    rejectedDateTime,
    SignedDateTime
  } = props;
  return (
    <div>
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
      {hasRejected && <div className={`flex p-4 items-center pb-9 bg-[${rejectedColor}]`}>
        <Encryption />
        <div className="pl-6">
          <p className="text-lg font-medium primary-color pb-2">
            Signature will appear here
            <p>
              {dayjs(rejectedDateTime).format("DD MMMM YYYY [at] HH:MM A")}
            </p>
          </p>
        </div>
      </div>}
    </div>
  )
}

export default SenderRecieverDetails
