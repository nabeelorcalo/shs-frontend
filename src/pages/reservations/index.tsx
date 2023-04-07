import { useState } from "react";
import { Outlet } from "react-router-dom";
import ReservationsAgent from "./Agent";
import "./style.scss";

const Reservations = () => {
  return <ReservationsAgent/>
}

export default Reservations