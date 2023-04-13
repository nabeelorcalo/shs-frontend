import { useEffect } from "react";
import api from "../../../api";
import endpoints from "../../../config/apiEndpoints";
import { useRecoilState } from "recoil";
import { timeSheetAtom } from "../../../store/timesheet";

export const useAPiHook = () => {
    const [timeSheetData, setTimeSheetData] = useRecoilState(timeSheetAtom);

    const getData = async (endPoint: string, page: string = '1', limit: string = '100') => {
        const { data, message }: any = await api.get(endPoint, { page, limit });
        setTimeSheetData({ data, message });
    }
    // const postData = async () => {
    //     const res = await api.get(TIMRSHEET_FINDALL, { page: '1', limit: '100' });
    //     console.log(res);

    // }

    // useEffect(() => {
    //     getData();
    //     // postData();
    // }, [])


    return { timeSheetData, getData }
}