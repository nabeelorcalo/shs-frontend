import { useEffect, useState } from "react";
import { Card, Typography } from "antd";
import "./style.scss";
import api from "../../api";
import { useRecoilState } from "recoil";
import { weatherApiState } from "../../store";
import dayjs from "dayjs";
import Loader from "../Loader";
export const TodayWeather: any = () => {
  const [weather, setWeather] = useRecoilState<any>(weatherApiState);
  const [isLoading, setIsloading] = useState(false)
  useEffect(() => {
    (async () => {
      setIsloading(true)
      await api
        .get("https://api.weatherapi.com/v1/current.json?key=9a906f7b9c93460889474850232804&q=London&aqi=no")
        .then((res) => setWeather(res));
      setIsloading(false)
    })();
  }, []);
  return (
    <Card className="w-full today-weather-container min-h-[240px]">
      <Typography.Title level={4} className="text-white">
        Today's Weather
      </Typography.Title>
      {
        isLoading ? <Loader /> :
          <div className="flex flex-row items-center">
            <img src={weather?.current?.condition?.icon} alt="" />
            <p className="ml-4 xl:ml-4 my-[20px] text-[36px] lg:text-[22px]">{weather?.current?.temp_c}° C</p>
          </div>
      }

      <Typography.Title level={4} className="todayDateTxt">
        {dayjs(weather?.location?.localtime).format("dddd, DD MMMM")}
      </Typography.Title>

      <p className="flex">{weather?.location?.name}</p>
    </Card>
  );
};
