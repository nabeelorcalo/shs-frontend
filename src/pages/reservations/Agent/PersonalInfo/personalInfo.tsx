import { Divider, Button } from "antd";
import dayjs from "dayjs";
import useCustomHook from "../../actionHandler";
import { useNavigate } from "react-router-dom";
import { ROUTES_CONSTANTS } from "../../../../config/constants";
import { useState } from "react";

const PersonalInfo = (props: any) => {
  const navigate = useNavigate()
  const { data, setOpen, args } = props
  const { updateReservations } = useCustomHook();
  const [loading, setLoading] = useState(false)

  const dataEndPoint = data.tenant;
  const startDate = dayjs(data?.bookingStartDate).format("DD/MM/YYYY")
  const endDate = dayjs(data?.bookingEndDate).format("DD/MM/YYYY")
  const personalInfoData = [
    {
      title: "Name",
      disc: `${dataEndPoint?.firstName} ${dataEndPoint?.lastName}`,
    },
    {
      title: "Phone",
      disc: dataEndPoint?.phoneNumber,
    },
    {
      title: "Address",
      disc: data?.property?.addressOne,
    },
    {
      title: "Email",
      disc: dataEndPoint?.email,
    },
    {
      title: "Occupation",
      disc: "Accountant",
    },
    {
      title: "Booking Dates",
      disc: `${startDate} - ${endDate}`,
    },
  ];

  const handleRejectReservation = () => {
    updateReservations(args, setLoading, data?.id)
    setOpen(false)
  }

  return (
    <div>
      <div className="font-semibold text-[28px] text-primary-color pb-2">
        Personal Information
      </div>

      {personalInfoData.map((item: any, index: number) => {
        return (
          <div className="pb-4" key={index + 1}>
            <div className="text-primary-color text-base font-medium">
              {item.title}
            </div>
            <div className="text-primary-color text-base font-normal">
              {item.disc}
            </div>
          </div>
        );
      })}
      <Divider />

      <div>
        <div className="font-semibold text-xl pb-2">Message Details</div>
        <div className="text-base font-normal text-teriary-color pb-2">Message</div>
        <div className="text-input-bg-color rounded-[8px] p-4">
          {data?.tenantMessage}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <div>
          <Button
            className="white-color page-header-secondary-bg-color"
            disabled={data.status !== 'pending' && true}
            onClick={() => handleRejectReservation()}
          >
            Reject
          </Button>
        </div>

        <div>
          <Button
            value='reserved'
            htmlType="submit"
            className="green-graph-tooltip-bg white-color"
            disabled={data.status !== 'pending' && true}
            onClick={() => navigate(`/${ROUTES_CONSTANTS.RECEIVED_VIEW}`, { state: data })}
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;