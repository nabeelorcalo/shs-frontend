import { useRecoilState, useRecoilValue } from "recoil";
import { contractsListData, contractsDashboard, contractDetailsState, currentUserRoleState, contractPaginationState } from "../../store";
import endpoints from "../../config/apiEndpoints";
import { Notifications } from "../../components";
import api from "../../api";
import dayjs from "dayjs";
import constants from "../../config/constants";

// Chat operation and save into store
const useCustomHook = () => {
  const { GET_CONTRACT_LIST, UPDATE_STATUS_RESERVATION, DEL_CONTRACT, CONTRACT_DASHBOARD, CONTRACT_DETAILS, EDIT_CONTRACT, CREATECONTRACT_OFFERLETTER } = endpoints;
  const [contractDashboard, setContractDashboard] = useRecoilState(contractsDashboard);
  const [contractData, setContractData] = useRecoilState<any>(contractsListData);
  const [contractDetails, setContractDetails] = useRecoilState(contractDetailsState);
  const [tableParams, setTableParams]: any = useRecoilState(contractPaginationState);
  const role = useRecoilValue(currentUserRoleState);
  // const [createContactData, setCreateContract] = useRecoilState(createContractState)

  // CONTRACT DASHBOARD
  const getContractDashboard = async () => {
    const { data } = await api.get(CONTRACT_DASHBOARD);
    setContractDashboard(data)
  }
  //get contracts
  const getContractList = async (args: any = null,
    setLoading: any = null,
    filterType: any = null,
    startDate: any = null,
    endDate: any = null
  ) => {
    if (args) {
      args.status = args?.status === 'All' ? null : args?.status;
      args.filterType = filterType === 'ALL' ? null : filterType;
      args.startDate = startDate;
      args.endDate = endDate && dayjs(endDate).format('YYYY-MM-DD');
    }
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
  const editContractDetails = async (id: any, values: any, args: any, setLoading: any) => {
    const params = {
      status: (role === constants.COMPANY_ADMIN && values.status === 'CHANGEREQUEST') ? 'NEW' : values.status,
      content: values.content,
      reason: values.reason
    }
    const reservedParams = {
      bookingId: values.reservationId,
      status: values.reservationStatus
    }
    const { data } = await api.put(`${EDIT_CONTRACT}/${id}`, params);
    !values.reservation && getContractList(args, setLoading);
    (data && values.reservationId) && await api.patch(UPDATE_STATUS_RESERVATION, reservedParams)
    data && Notifications({ title: 'Success', description: 'Contract Sent', type: 'success' })
  }

  //delete contracts
  const deleteContractHandler = async (args: any, setLoading: any, id: any) => {
    await api.delete(`${DEL_CONTRACT}/${id}`);
    Notifications({ title: 'Success', description: 'Contract deleted', type: 'success' })
    getContractList(args, setLoading)
  }

  // create contract
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