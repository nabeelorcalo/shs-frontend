import { useState } from "react";
import { useRecoilState } from "recoil";
import { contractDetailsState, contractsDashboard, offerLetterList } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST,
    DEL_CONTRACT,
    OFFER_LETTER_DASHBOARD,
    CONTRACT_DETAILS,
    EDIT_CONTRACT } = endpoints;
  const [offerLetterDashboard, setOfferLetterDashboard] = useRecoilState(contractsDashboard);
  const [contractData, setContractData] = useRecoilState(offerLetterList);
  const [contractDetails, setOfferLetterDetails] = useRecoilState(contractDetailsState);

  // CONTRACT DASHBOARD
  const getOfferLetterDashboard = async () => {
    const { data } = await api.get(OFFER_LETTER_DASHBOARD);
    setOfferLetterDashboard(data)
  }

  const getOfferLetterList = async (args: any = null,
    tableParams: any = null,
    setTableParams: any = null,
    setLoading: any = null,
    filterType: any = null,
    startDate: any = null,
    endDate: any = null
  ) => {
    args.type = "OFFER_LETTER";
    args.status = args.status === 'All' ? null : args.status;
    args.filterType = filterType === 'ALL' ? null : filterType;
    args.startDate = startDate;
    args.endDate = endDate && dayjs(endDate).format('YYYY-MM-DD');
    await api.get(GET_CONTRACT_LIST, args).then((res: any) => {
      const { pagination } = res
      setLoading(true)
      setContractData(res)
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

  // contracts details
  const getContractDetails = async (id: any) => {
    const { data } = await api.get(`${CONTRACT_DETAILS}/${id}`);
    setOfferLetterDetails(data)

  }

  // edit cotract details
  const editContractDetails = async (id: any, values: any) => {
    const params = {
      status: values.status,
      content: values.content,
      reason: values.reason
    }
    const { data } = await api.put(`${EDIT_CONTRACT}/${id}`, params);
    getOfferLetterList()
    data && Notifications({ title: 'Success', description: 'Contract Sent', type: 'success' })
  }

  //delete offer letter
  const deleteOfferLetterHandler = async (val: any) => {
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getOfferLetterList();
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }
  return {
    offerLetterDashboard,
    contractData,
    contractDetails,
    getContractDetails,
    getOfferLetterList,
    getOfferLetterDashboard,
    deleteOfferLetterHandler,
    editContractDetails
  };
};

export default useCustomHook;