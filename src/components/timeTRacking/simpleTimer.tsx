import { useEffect, useState } from "react"
import { TimerPlayIcon, TimerPauseIcon } from "../../assets/images";

export const SimpleTimer = (props: any) => {
    const { hideCounter, iconHiehgt = '50px', iconWidth = '51px' } = props;

    const [isRunning, setIsRunning] = useState(false);
    const [time, setTime] = useState(0);

    useEffect(() => {
        let intervalId: any;
        if (isRunning) {
            intervalId = setInterval(() => setTime(time + 1), 10);
        }
        return () => clearInterval(intervalId);
    }, [isRunning, time]);

    const hours = Math.floor(time / 360000);
    const minutes = Math.floor((time % 360000) / 6000);
    const seconds = Math.floor((time % 6000) / 100);

    return (
        <div className="simple-tracker-wrapper flex items-center gap-3">
            {!hideCounter && <p className="timer text-3xl font-medium text-[#4E4B66] flex items-center">
                {hours.toString().padStart(2, '0')}
                &nbsp;<span className="mt-[-7px]">:</span>&nbsp;
                {minutes.toString().padStart(2, '0')}
                &nbsp;<span className="mt-[-7px]">:</span>&nbsp;
                {seconds.toString().padStart(2, '0')}
            </p>}
            <span onClick={() => setIsRunning(!isRunning)}
                style={{ height: iconHiehgt, width: iconWidth }}
                className={`cursor-pointer rounded-full bg-[#E9F8E7] flex items-center justify-center`}>
                {!isRunning ? <TimerPlayIcon className="h-[40px] w-[40px]" /> :
                    <TimerPauseIcon className="h-[40px] w-[40px]" />}
            </span>
        </div>
    )
}
