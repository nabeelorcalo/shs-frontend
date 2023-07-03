import { Divider } from "antd";
import { BoxWrapper } from "../../components";
import "./style.scss";
import dayjs from "dayjs";
import useCustomHook from "../../pages/leaves/actionHandler";
// const Format = (date:any, format:any) =>{
//   return dayjs(date).format(format);
// }
export const UpcomingHolidayComp = (props: any) => {
  const { upcomingHolidayData } = props;
  const action = useCustomHook();
  return (
    <BoxWrapper boxShadow='0px 0px 8px 1px rgba(9, 161, 218, 0.1' className="left_upcoming_holiudays">
      <h4 className='upcomming_Holiday font-medium text-xl mb-4 '>Upcoming Holidays</h4>
      <ul className='upcoming_holidayList p-0 m-0  list-none h-[470px] overflow-y-auto'>
        {upcomingHolidayData?.map((data: any) => {
          const { date: { iso } } = data;

          return (
            <li key={data.id} className='List_item_wrapper'>
              <div className='List_item_main flex items-center justify-between '>
                <div className='left_side'>
                  <p className='light_text text-sm font-norma '>{action.formate(iso, "dddd")}</p>
                  <p className='date_text text-base font-normal'>{action.formate(iso, "D-MMMM").replace(/-/g, ' ')}</p>
                </div>
                <p className='holiday_typeText text-base font-normal'>{data.name}</p>
              </div>
              <Divider style={{ margin: "10px 0", borderColor: "#D9DBE9" }} />
            </li>
          )
        })}
      </ul>
    </BoxWrapper>
  )
}