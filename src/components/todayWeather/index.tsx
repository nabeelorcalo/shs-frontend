import { FC, useEffect, useState } from "react";
import "./style.scss";
import api from "../../api";
import { useRecoilState } from "recoil";
import { weatherApiState } from "../../store";
import dayjs from "dayjs";
import Loader from "../Loader";
import { LocationIcon } from "../../assets/images";
import constants from "../../config/constants";
export const TodayWeather: FC<{ isStudent?: boolean }> = (props) => {
  console
  const { isStudent } = props;
  const [weather, setWeather] = useRecoilState<any>(weatherApiState);
  const [isLoading, setIsloading] = useState(false)
  const [userCurrentLocation, setUserCurrentLocation] = useState<any>({})

  useEffect(() => {
    // get browser current location
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          setUserCurrentLocation({ latitude, longitude })
        }
      );
    }
  }, [])

  useEffect(() => {
    (async () => {
      setIsloading(true)
      await api
        .get(`${constants?.WEATHER_API_URL}&q=${(userCurrentLocation?.latitude && userCurrentLocation?.longitude) ? `${userCurrentLocation?.latitude},${userCurrentLocation?.longitude}` : "London"}&aqi=no`)
        .then((res) => setWeather(res));
      setIsloading(false)
    })();
  }, [JSON.stringify(userCurrentLocation)]);

  return (
    <div className={`w-full ${isStudent ? "p-5" : "p-5"} rounded-2xl today-weather-container`}>
      {
        // !isStudent &&
        <p className={`text-white font-medium text-[20px] leading-7 ${isStudent ? "" : "mb-[23px]"}`}>
          Today's Weather
        </p>
      }
      {
        isLoading ? <Loader /> :
          <div className={`flex gap-9 flex-row items-center ${!isStudent && "mb-[27px]"}`}>
            <img height={isStudent ? 50 : 60} width={isStudent ? 50 : 60} src={weather?.current?.condition?.icon} alt="" />
            <p className="text-[36px] font-medium">{weather?.current?.temp_c}° C</p>
          </div>
      }

      <p className={`text-white font-medium text-[20px] leading-7 ${isStudent ? "mb-1" : "mb-[10px]"}`}>
        {dayjs(weather?.location?.localtime).format("dddd, DD MMMM")}
      </p>
      <div className="flex gap-2">
        <LocationIcon />
        <p className="flex">{weather?.location?.name || "N/A"}</p>
      </div>
    </div>
  );
};
