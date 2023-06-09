import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { paymentsListState } from "../../../store";


const usePaymentsHook = () => {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const { GET_PAYMENTS } = endpoints;
  const [paymentList, setPaymentList] = useRecoilState(paymentsListState)


  // Get All Payments
  const getPayments = async (setLoading:React.Dispatch<React.SetStateAction<boolean>>, params:any={}) => {
    setLoading(true);
    try {
      const response = await api.get(`${GET_PAYMENTS}`, params);
      setPaymentList(response.data)
    } catch (error) {
      return;
    } finally {
      setLoading(false);
    }
  }

  return {
    getPayments,
    paymentList
  };
};

export default usePaymentsHook;