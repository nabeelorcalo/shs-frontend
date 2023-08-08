import { useRecoilState } from "recoil";
import api from "../api"
import endpoints from "../config/apiEndpoints"
import { appNotificationsState } from "../store/layout";

const { SEEN_NOTIFICATION, GET_NOTIFICATIONS } = endpoints;

const notifications = [
  {
    id: "1",
    firstName: "tesy",
    lastName: "user",
    profileImage: {},
    content: "test",
    date: new Date(),
    isSeen: false,
  },
  {
    id: "2",
    firstName: "tesy",
    lastName: "user",
    profileImage: {},
    content: "test 1",
    date: new Date(),
    isSeen: false,
  },
  {
    id: "3",
    firstName: "tesy",
    lastName: "user",
    profileImage: {},
    content: "test 2",
    date: new Date(),
    isSeen: false,
  },
  {
    id: "4",
    firstName: "tesy",
    lastName: "user",
    profileImage: {},
    content: "test 3",
    date: new Date(),
    isSeen: false,
  },
]

const useCustomHook = () => {
  const [appNotifications, setAppNotifications] = useRecoilState(appNotificationsState)
  const getNotifications = async () => {
    await api.get(GET_NOTIFICATIONS).then((res: any) => {
      console.log("noti res", res);
      // setAppNotifications(res?.data?.result)
      setAppNotifications(notifications)
    })
  }

  const handleSeenNotification = async (id: string) => {
    console.log(id);
    setAppNotifications(appNotifications.map((ele: any) => (id === ele?.id ? { ...ele, isSeen: true } : ele)))

    // await api.get(SEEN_NOTIFICATION).then((res: any) => {
    //   console.log("noti res", res);
    //   setAppNotifications(res?.data?.result)
    // })
  }

  return { getNotifications, appNotifications, handleSeenNotification }
}

export default useCustomHook