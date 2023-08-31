import { useEffect, useRef, useState } from "react";
import { ScheduleModalComp } from "../../../components";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

export const ScheduleInterviewModal = (props: any) => {
  // for cleanup re-rendering
  const shouldLoogged = useRef(true);
  dayjs.extend(utc);
  // custom validation
  const isManagerList = useRef(true);
  const isLocation = useRef(false);
  const isDate = useRef(false);
  const isDateTouched = useRef(false);

  const {
    candidateId,
    data,
    handleEdit,
    companyManagerList,
    getCompanyManagerList,
    handleUpdateInterview,
    scheduleInterview,
    isLoading,
    open,
    setOpen,
  } = props;

  const managerList = companyManagerList?.map((obj: any) => obj?.companyManager);
  const [assignUser, setAssignUser] = useState<any[]>([]);

  const [values, setValues] = useState<any>({
    dateFrom: "",
    dateTo: "",
    attendees: [],
    startTime: "",
    endTime: "",
    locationType: "",
    description: "",
    address: ""
  });

  useEffect(() => {
    if (shouldLoogged.current) {
      shouldLoogged.current = false;
      getCompanyManagerList();
    }
    // for update event
    if (data) {
      setValues({
        dateFrom: dayjs(data?.dateFrom).format("YYYY-MM-DD"),
        dateTo: dayjs(data?.dateTo).format("YYYY-MM-DD"),
        startTime: dayjs(data?.startTime).utc(),
        endTime: dayjs(data?.endTime).utc(),
        attendees: data?.attendees ?? [],
        locationType: data?.locationType,
        description: data?.description,
        address: data?.address
      });
      data?.locationType && (isLocation.current = true);
      data?.dateFrom && (isDate.current = true);
      if (companyManagerList?.map((obj: any) => obj?.companyManager)?.length > 0 && isManagerList.current) {
        setAssignUser(
          data?.attendees?.map(
            (item: any) =>
              companyManagerList?.map((obj: any) => obj?.companyManager)?.find((obj: any) => item?.id === obj?.id) ?? []
          )
        );
        isManagerList.current = false;
      }
    }
  }, [data, companyManagerList]);

  return (
    <div className="Modal">
      <ScheduleModalComp
        open={open}
        setOpen={setOpen}
        assignUser={assignUser}
        setAssignUser={setAssignUser}
        candidateId={candidateId}
        data={data}
        handleUpdateInterview={handleUpdateInterview}
        values={values}
        setValues={setValues}
        scheduleInterview={scheduleInterview}
        handleEdit={handleEdit}
        isDate={isDate}
        getCompanyManagerList={getCompanyManagerList}
        managerList={managerList}
        isDateTouched={isDateTouched}
        isLoading={isLoading}
        isLocation={isLocation}
      />
    </div>
  );
};
