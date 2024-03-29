import {
  CalendarIcon,
  CalendarSearch,
  CalUserIcon,
  ClockDarkIcon,
  CopyPasteIcon,
  LocationDarkIcon,
  UserAvatar,
  VideoRecorder,
} from "../../../../assets/images";
import { calendarMockData } from "../mockData";
import { Avatar, Button } from "antd";
import dayjs from "dayjs";
import weekOfYear from "dayjs/plugin/weekOfYear";
import { Alert } from "../../../Alert";
import { useState } from "react";
import { calendarListState } from "../../../../store";
import { useRecoilState } from "recoil";
import constants from "../../../../config/constants";
import { ButtonThemePrimary } from "../../../ButtonThemePrimary";
import { ButtonThemeSecondary } from "../../../ButtonThemeSecondary";

const EventDetail = (props: any) => {
  const meetingStatusPayload: any = {
    pending: "notify attendeees",
    accept: "accept",
    accepted: "accepted",
    rejected: "accept",
  };
  dayjs.extend(weekOfYear);
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);

  const { eventId, eventCategory, eventStatus, statusUpdate, setOpen, deleteReminder, getData, updateEvent, notifyAttendees, startFrom } = props;
  const [isReminder, setIsReminder] = useState(false);

  const selectedEvent: any = listCalendar.find((event: any) => event.taskId === parseInt(eventId) && eventCategory === event.category);

  const formatTimeDate = (value: string | any, format: string) => {
    return dayjs(value).format(format);
  };

  const hourDiff = (startTime: string | any, endTime: string | any) => {
    return dayjs(endTime).diff(dayjs(startTime), "hour", true).toFixed(1);
  };

  const copyData = () => {
    navigator.clipboard.writeText(selectedEvent?.address);
  };

  const handleStatus = (status: string, eventStatus: string, type?: string) => {
    if (eventStatus == "pending") {
      if (type === "notify")
        notifyAttendees(eventId, () => {
          setOpen(false);
          getData();
        });
      else
        updateEvent({ status: "CANCELLED" }, eventId, () => {
          setOpen(false);
          getData();
        });
    } else
      statusUpdate({ meetingId: selectedEvent?.taskId, status }, () => {
        setOpen(false);
        getData();
      });
  };

  const renderStatusColor: any = {
    accepted: "#4A9D77",
    declined: "#D83A52",
  };

  return (
    <div className="event-detail-wrapper">
      <div className="event-detail">
        <p className="font-medium text-xl heading mb-[16px] capitalize">{selectedEvent?.title}</p>

        <div className="flex items-center gap-3">
          <img src={CalendarIcon} />
          {eventCategory !== "reminder" ? (
            <p className="event-info">
              {formatTimeDate(startFrom || selectedEvent?.start, "dddd, DD MMM YYYY")}
              &nbsp;-&nbsp;
              {formatTimeDate(startFrom || selectedEvent?.end, "dddd, DD MMM YYYY")}
            </p>
          ) : (
            <p>{formatTimeDate(startFrom || selectedEvent?.end, "dddd, DD MMM YYYY")}</p>
          )}
        </div>
        <div className="flex items-center gap-3 my-[20px]">
          <ClockDarkIcon />
          {eventCategory === "reminder" ? (
            <p>{formatTimeDate(selectedEvent?.start, "HH:mm A")}</p>
          ) : (
            <p className="event-info">
              {formatTimeDate(selectedEvent?.start, "HH:mm A")}
              &nbsp;-&nbsp;
              {formatTimeDate(selectedEvent?.end, "HH:mm A")}
              &nbsp;
              {`(${hourDiff(selectedEvent?.start, selectedEvent?.end)} hours) `}
            </p>
          )}
        </div>

        {selectedEvent?.userName && (
          <div className="flex items-center gap-3 my-[20px]">
            <CalUserIcon />
            <p className="capitalize">
              {selectedEvent?.userName}
              <span className="user-role">&nbsp;(organizer)</span>
            </p>
          </div>
        )}
      </div>
      <div className="event-type">
        <p className="font-medium text-xl heading mb-[16px]">Event Type</p>
        <div className="flex items-center gap-3 my-[20px]">
          <CalendarSearch />
          <p className="capitalize">{selectedEvent?.category}</p>
        </div>
      </div>
      {selectedEvent?.location && (
        <>
          {selectedEvent?.location.type === "virtual" ? (
            <div className="virtual">
              <p className="font-medium text-xl heading">Virtual</p>
              <div className="flex items-center gap-3">
                <div className="link flex flex-1 items-center justify-between gap-3 rounded-lg my-[20px]">
                  <VideoRecorder />
                  <p>{selectedEvent?.location?.link}</p>
                  <div onClick={copyData}>
                    <CopyPasteIcon />
                  </div>
                </div>
                <ButtonThemePrimary className="primary-btn rounded-lg green-graph-tooltip-bg">
                  {" "}
                  <a href={selectedEvent?.address} target="_blank" rel="noopener noreferrer">
                    Join Call
                  </a>
                </ButtonThemePrimary>
              </div>
            </div>
          ) : (
            <div className="onsite">
              <p className="font-medium text-xl heading mb-[16px]">Onsite</p>
              <div className="flex items-center justify-between gap-3 rounded-lg my-[20px]">
                <LocationDarkIcon />
                <p className="capitalize">{selectedEvent?.location?.link}</p>
                <div onClick={copyData}>
                  <CopyPasteIcon />
                </div>
              </div>
            </div>
          )}
        </>
      )}
      {selectedEvent?.attendees && (
        <div className="attendees">
          <p className="font-medium text-xl heading">Attendees</p>
          <div className="user-list">
            {selectedEvent?.attendees?.map((users: any, i: number) => (
              <div className="flex items-center gap-5 my-[20px]" key={i}>
                {/* <img src={users?.userProfile || UserAvatar} className="h-[48px] w-[48px] rounded-full object-cover" alt="icon" /> */}
                <Avatar size={30} src={`${constants.MEDIA_URL}/${users?.profileImage?.mediaId}.${users?.profileImage?.metaData?.extension}`}>
                  {users?.firstName?.charAt(0)}
                  {users?.lastName?.charAt(0)}
                </Avatar>
                <div className="capitalize">
                  <p>{users?.firstName + " " + users?.lastName}</p>
                  <p className="text-xs" style={{ color: renderStatusColor[users?.status] }}>
                    {users?.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="description">
        <p className="font-medium text-xl heading mb-[16px]">Description</p>
        <p className="font-normal text-sm">{selectedEvent?.description}</p>
      </div>
      <div className="flex justify-end gap-3 mt-[20px] event-actions">
        {eventCategory === "reminder" ? (
          <ButtonThemeSecondary
            className="outlined-btn rounded-lg"
            onClick={() => {
              setIsReminder(!isReminder);
            }}
          >
            Delete Reminder
          </ButtonThemeSecondary>
        ) : eventCategory === "meeting" || eventCategory === "interview" ? (
          <>
            <ButtonThemeSecondary onClick={() => handleStatus("rejected", eventStatus, "cancel")} className="outlined-btn rounded-lg capitalize">
              {eventStatus === "pending" ? "cancel meeting" : "decline"}
            </ButtonThemeSecondary>
            <ButtonThemePrimary
              onClick={() => handleStatus("accepted", eventStatus, "notify")}
              className="primary-btn rounded-lg green-graph-tooltip-bg capitalize"
              disabled={eventStatus === "accepted"}
            >
              {meetingStatusPayload[eventStatus]}
            </ButtonThemePrimary>
          </>
        ) : (
          <>
            {/* <ButtonThemeSecondary onClick={() => handleStatus("rejected", eventStatus)} className="outlined-btn rounded-lg capitalize">
              Decline
            </ButtonThemeSecondary>
            <ButtonThemePrimary
              onClick={() => handleStatus("accepted", eventStatus)}
              className="primary-btn rounded-lg green-graph-tooltip-bg capitalize"
            >
              Accept
            </ButtonThemePrimary> */}
          </>
        )}
      </div>
      <Alert
        type={"warning"}
        state={isReminder}
        setState={setIsReminder}
        okBtnFunc={() => {
          deleteReminder(eventId, () => {
            setIsReminder(false);
            setOpen(false);
            getData();
          });
        }}
        cancelBtntxt={"Cancel"}
        okBtntxt={"Delete"}
        children={<p>Are you sure you want to delete this event?</p>}
      />
    </div>
  );
};

export default EventDetail;
