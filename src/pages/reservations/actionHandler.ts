import React, { useEffect, useMemo } from "react";
import { useRecoilState } from "recoil";
import { reservationData } from "../../store";
import endpoints from "../../config/apiEndpoints";
import api from "../../api";
import { debounce } from "lodash";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_RESERVATIONS } = endpoints;
  const [reservations, setReservations] = useRecoilState(reservationData);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  //get reservation data
  const getReservationData = async (status: any, search: any) => {
    const { data } = await api.get(GET_RESERVATIONS, { status: status, search: search });
    setReservations(data)
  };

  // search reservations
  const SearchReservations = async (search: any, status: any) => {
    const params = {
      search: search,
      status: status
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
    SearchReservations
  };
};

export default useCustomHook;