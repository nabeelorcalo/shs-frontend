import { useState } from "react";
import { useRecoilState } from "recoil";
import { reservationData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import api from "../../api"
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_RESERVATIONS, UPDATE_STATUS_RESERVATION } = endpoints;
  const [reservations, setReservations] = useRecoilState(reservationData);
  const [isLoading, setIsLoading] = useState(false)

  //get reservation data
  const getReservationData = async (status: any, search: any) => {
    setIsLoading(true)
    const { data } = await api.get(GET_RESERVATIONS,
      { status: status === 'All' ? '' : status, search: search ?? null });
    setReservations(data)
    setIsLoading(false)
  };

  //status approve / reject reservations
  const updateReservations = async (id: any, status: any) => {
    setIsLoading(true)
    const params = {
      bookingId: id,
      status: status
    }
    const { data } = await api.patch(UPDATE_STATUS_RESERVATION, params);
    setReservations(data)
    getReservationData(null, null)
    setIsLoading(false)
    data && Notifications({ title: 'Success', description: 'Reservation updated', type: 'success' })
  }

  return {
    isLoading,
    reservations,
    getReservationData,
    updateReservations
  };
};

export default useCustomHook;