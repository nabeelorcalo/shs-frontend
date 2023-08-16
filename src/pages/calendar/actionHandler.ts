import React from "react";
// import { useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil";
// import { peronalChatListState, personalChatMsgxState, chatIdState } from "../../store";
import api from "../../api";
import constants from "../../config/constants";
import { useRecoilState, useRecoilValue } from "recoil";
import { attendesListState, calendarListState, currentUserState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import dayjs from "dayjs";
import { Notifications } from "../../components";
import AppSidebar from "../../layout/components/sidebar";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

// Chat operation and save into store
const useCustomHook = () => {
  const utcOffsetInMinutes = new Date().getTimezoneOffset();
  // const [peronalChatList, setPeronalChatList] = useRecoilState(peronalChatListState);
  // const [chatId, setChatId] = useRecoilState(chatIdState);
  // const [personalChatMsgx, setPersonalChatMsgx] = useRecoilState(personalChatMsgxState);
  const [listCalendar, setListCalendar] = useRecoilState(calendarListState);
  const [attendees, setAttendees] = useRecoilState(attendesListState);
  const currentUser = useRecoilValue(currentUserState);

  const {
    GET_ALL_MEETINGS,
    CREATE_MEETING,
    INTERN_ATTENDEES_LIST,
    UPDATE_MEETING,
    UPDATE_MEETING_STATUS,
    CREATE_REMINDER,
    UPDATE_REMINDER,
    DELETE_REMINDER,
    NOTIFY_ATTENDEES,
  } = endpoints;
  const getData = async (type: string): Promise<any> => {
    const { data } = await api.get(`${process.env.REACT_APP_APP_URL}/${type}`);
  };

  const getCalenderData = (params: any) => {
    api.get(GET_ALL_MEETINGS, params).then((result) => {
      if (result?.data) {
        setListCalendar(
          result?.data?.map((task: any, index: number) => {
            // const startTime: any = task?.reminder && dayjs(task.time);
            return {
              ...task,
              id: generateRandomString(30),
              taskId: task.id,
              // start: task.reminder
              //   ? dayjs(task.dateFrom).hour(startTime.hour()).minute(startTime.minute()).toISOString()
              //   : dayjs(task.startTime).toISOString(),
              // end: task?.reminder
              //   ? dayjs(task.dateFrom).hour(startTime.hour()).minute(startTime.minute()).add(task?.reminder?.split(" ")[0], "minute").toISOString()
              //   : dayjs(task.endTime).toISOString(),
              category: task.eventType?.toLowerCase() || "reminder",
              location: !task.reminder ? { link: task.address, type: task?.locationType?.toLowerCase() } : null,
              userName: !task?.reminder ? task?.organizeBy?.firstName + " " + task?.organizeBy?.lastName : null,
              status: renderStatus(task.organizer, task?.meetingUser, task?.reminder),
              start:
                task?.eventType === "INTERVIEW"
                  ? dayjs.utc(task?.start).utcOffset(utcOffsetInMinutes).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
                  : task?.start,
              end:
                task?.eventType === "INTERVIEW" ? dayjs.utc(task?.end).utcOffset(utcOffsetInMinutes).format("YYYY-MM-DDTHH:mm:ss.SSS[Z]") : task?.end,
              attendees: !task.reminder
                ? task?.meetingUser?.map((tsk: any) => {
                    return { ...tsk, ...tsk?.userData, status: tsk?.status || "pending" };
                  })
                : null,
            };
          })
        );
      }
    });
  };

  const getAttendeeList = () => {
    api.get(INTERN_ATTENDEES_LIST).then(({ data }) => setAttendees(data));
  };

  const addEvent = (payload: any, onSuccess?: () => void) => {
    api.post(CREATE_MEETING, payload).then((result) => {
      Notifications({
        title: "Success",
        description: `Event Added`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      return result;
    });
  };
  const updateEvent = (payload: any, meetingId: string, onSuccess?: () => void) => {
    api.put(`${UPDATE_MEETING}/${meetingId}`, payload).then((result) => {
      Notifications({
        title: "Success",
        description: `Event ${payload?.status === "CANCELLED" ? "Cancelled" : "Updated"}`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      return result;
    });
  };
  const notifyAttendees = (meetingId: string, onSuccess?: () => void) => {
    api.get(`${NOTIFY_ATTENDEES}/${meetingId}`).then((result) => {
      if (onSuccess) onSuccess();
      if (result) Notifications({ title: "Success", description: result?.message, type: "success" });
      return result;
    });
  };
  const statusUpdate = (payload: any, onSuccess?: () => void) => {
    payload["userId"] = currentUser.id;
    api.put(UPDATE_MEETING_STATUS, payload).then((result) => {
      Notifications({
        title: "Success",
        description: `Event ${payload?.status === "rejected" ? "Cancelled" : "Accepted"}`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      return result;
    });
  };

  const addReminder = (payload: any, onSuccess?: () => void) => {
    api.post(CREATE_REMINDER, payload).then((result) => {
      Notifications({
        title: "Success",
        description: `Reminder Added`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      return result;
    });
  };
  const updateReminder = (payload: any, reminderId: string, onSuccess?: () => void) => {
    api.put(`${UPDATE_REMINDER}/${reminderId}`, payload).then((result) => {
      Notifications({
        title: "Success",
        description: `Reminder Updated`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      return result;
    });
  };

  const deleteReminder = (reminderId: string, onSuccess?: () => void) => {
    api.delete(`${DELETE_REMINDER}/${reminderId}`).then((result) => {
      Notifications({
        title: "Success",
        description: `Reminder Deleted`,
        type: "success",
      });
      if (onSuccess) onSuccess();
      return result;
    });
  };

  const renderStatus = (organizerId: string, list: any[], reminder?: any) => {
    if (reminder) return "pending";
    console.log(currentUser.id === organizerId);

    if (currentUser.id === organizerId) return "pending";
    else {
      const userStatus = list.find((user: any) => user?.userId === currentUser.id);
      return userStatus?.status ?? "accept";
    }
  };

  const generateRandomString = (length: number) => {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return {
    getData,
    getCalenderData,
    listCalendar,
    addEvent,
    getAttendeeList,
    attendees,
    updateEvent,
    statusUpdate,
    addReminder,
    updateReminder,
    deleteReminder,
    notifyAttendees,
  };
};

export default useCustomHook;
