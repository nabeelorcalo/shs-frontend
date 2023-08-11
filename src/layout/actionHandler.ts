import { useRecoilState } from "recoil";
import api from "../api"
import endpoints from "../config/apiEndpoints"
import { appNotificationsState } from "../store/layout";

const { SEEN_NOTIFICATION, GET_NOTIFICATIONS } = endpoints;

const useCustomHook = () => {
  const [appNotifications, setAppNotifications] = useRecoilState(appNotificationsState)
  const getNotifications = async () => {
    await api.get(GET_NOTIFICATIONS).then((res: any) => {
      console.log("noti res", res);
      setAppNotifications(res?.data?.result?.map((ele: any) => ({
        id: ele?.id ?? "",
        firstName: ele?.sentBy?.firstName ?? "",
        lastName: ele?.sentBy?.lastName ?? "",
        profileImage: ele?.sentBy?.profileImage ?? "",
        description: ele?.description ?? "",
        date: ele?.createdAt ?? "",
        isSeen: ele?.isSeen ?? "",
      })) || [])
    })
  }

  const handleSeenNotification = async (notificationId: string) => {
    await api.patch(SEEN_NOTIFICATION, { notificationId }).then((res: any) => {
      console.log("noti res", res);
      setAppNotifications(appNotifications.map((ele: any) => (notificationId === ele?.id ? { ...ele, isSeen: true } : ele)))
    })
  }

  return { getNotifications, appNotifications, handleSeenNotification }
}

export default useCustomHook