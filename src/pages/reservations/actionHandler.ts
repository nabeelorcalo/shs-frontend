import React, { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { reservationData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import api from "../../api";
import { debounce } from "lodash";
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_RESERVATIONS, UPDATE_STATUS_RESERVATION } = endpoints;
  const [reservations, setReservations] = useRecoilState(reservationData);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  //get reservation data
  const getReservationData = async (status: any, search: any) => {
    const { data } = await api.get(GET_RESERVATIONS, { status: status === 'All' ? '' : status, search: search ?? null });
    setReservations(data)
  };

  //status approve / reject reservations
  const updateReservations = async (id: any, status: any) => {
    const params = {
      bookingId: id,
      status: status
    }
    const { data } = await api.patch(UPDATE_STATUS_RESERVATION, params);
    setReservations(data)
    getReservationData(null, null)
    data && Notifications({ title: 'Success', description: 'Reservation updated', type: 'success' })
  }

  // search reservations
  const SearchReservations = async (search: any, status: any) => {
    const params = {
      search: search,
      status: status === 'All' ? '' : status
    }
    const { data } = await api.get(GET_RESERVATIONS, params);
    setReservations(data);
  };

  const debouncedResults = useMemo(() => {
    return debounce(SearchReservations, 500);
  }, []);

  return {
    reservations,
    getReservationData,
    SearchReservations,
    updateReservations
  };
};

export default useCustomHook;