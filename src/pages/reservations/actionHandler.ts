import { useState } from "react";
import { useRecoilState } from "recoil";
import { reservationData, reservationPaginationState, studentProfileCompletionState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import api from "../../api"
import { Notifications } from "../../components";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_RESERVATIONS, UPDATE_STATUS_RESERVATION, DOCUMENTS_LIST } = endpoints;
  const [reservationsData, setReservationsData] = useRecoilState(reservationData);
  const [getDocuments, setDocuments] = useRecoilState(studentProfileCompletionState);
  const [tableParams, setTableParams]: any = useRecoilState(reservationPaginationState);

  //get reservation data
  const getReservationData = async (args: any, setLoading: any) => {
    args.status = args.status === 'All' ? null : args.status;
    await api.get(GET_RESERVATIONS, args).then((res) => {
      const { pagination } = res
      setLoading(true)
      setReservationsData(res)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          total: pagination?.totalResult,
        },
      });
      setLoading(false)
    })
  };

  //status approve / reject reservations
  const updateReservations = async (args: any, setLoading: any, id: any) => {
    const params = {
      bookingId: id,
      status: 'rejected'
    }
    await api.patch(UPDATE_STATUS_RESERVATION, params).then(() => {
      getReservationData(args, setLoading)
      Notifications({ title: 'Success', description: 'Reservation rejected successfully', type: 'success' })
    })
  }

  const getStudentProfile = async (id: any) => {
    const params = {
      userId: id,
      docType: 'INTERN'
    }
    const { data } = await api.get(DOCUMENTS_LIST, params);
    setDocuments(data);
  };
  return {
    reservationsData,
    getReservationData,
    updateReservations,
    setDocuments,
    getDocuments,
    getStudentProfile
  };
};

export default useCustomHook;