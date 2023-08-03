import { useRecoilState } from "recoil";
import { contractsListData, contractsDashboard, contractDetailsState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, UPDATE_STATUS_RESERVATION, DEL_CONTRACT, CONTRACT_DASHBOARD, CONTRACT_DETAILS, EDIT_CONTRACT, CREATECONTRACT_OFFERLETTER } = endpoints;
  const [contractDashboard, setContractDashboard] = useRecoilState(contractsDashboard);
  const [contractData, setContractData] = useRecoilState(contractsListData);
  const [contractDetails, setContractDetails] = useRecoilState(contractDetailsState)
  // const [createContactData, setCreateContract] = useRecoilState(createContractState)

  // CONTRACT DASHBOARD
  const getContractDashboard = async () => {
    const { data } = await api.get(CONTRACT_DASHBOARD);
    setContractDashboard(data)
  }
  //get contracts
  const getContractList = async (args: any = null,
    tableParams: any = null,
    setTableParams: any = null,
    setLoading: any = null,
    filterType: any = null,
    startDate: any = null,
    endDate: any = null
  ) => {
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
    setContractDetails(data)
  }

  // edit cotract details
  const editContractDetails = async (id: any, values: any) => {
    const params = {
      status: values.status,
      content: values.content,
      reason: values.reason
    }
    const reservedParams = {
      bookingId: values.reservationId,
      status: values.reservationStatus
    }
    const { data } = await api.put(`${EDIT_CONTRACT}/${id}`, params);
    !values.reservation && getContractList();
    (data && values.reservationId) && await api.patch(UPDATE_STATUS_RESERVATION, reservedParams)
    data && Notifications({ title: 'Success', description: 'Contract Sent', type: 'success' })
  }

  //delete contracts
  const deleteContractHandler = async (val: any) => {
    await api.delete(`${DEL_CONTRACT}/${val}`);
    getContractList()
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
  }

  const createContract = async (values: any) => {
    await api.post(CREATECONTRACT_OFFERLETTER, values);
  }

  return {
    contractDashboard,
    contractData,
    contractDetails,
    getContractDashboard,
    getContractDetails,
    getContractList,
    deleteContractHandler,
    editContractDetails,
    createContract,
  };
};

export default useCustomHook;