// import { Col, Row, Space, Typography } from 'antd'
// import { CasualIcon, MedicalIcon, SickIcon, WFHIcon } from './assets/images'
// import { Button } from './components'
// import DigivaultCard from './components/DigiVaultCard/digivaultCard'
// import { LeaveCard } from './components/LeaveCard/leaveCard'
// import { useEffect } from 'react'
// import React, { FC, useEffect } from 'react'
import { useLocation, useNavigate, useRoutes } from "react-router-dom";
import { getRoutes } from "./routes";
import "./App.scss";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallback } from "./pages/errors/errorBoundary";
import AppLayout from './layout'
// import Table from './components/Noman/Table';

// Leave card Data 
// const LeaveCardData = [
//   {
//     id: '1',
//     icon: SickIcon,
//     leaveType: 'Sick',
//     totalLeaves: '27',
//     pending: '0',
//     approved: '0',
//     declined: '0'
//   },
//   {
//     id: '2',
//     icon: CasualIcon,
//     leaveType: 'Casual',
//     totalLeaves: '16',
//     pending: '1',
//     approved: '1',
//     declined: '0'
//   },
//   {
//     id: '3',
//     icon: WFHIcon,
//     leaveType: 'Work From Home',
//     totalLeaves: '07',
//     pending: '0',
//     approved: '1',
//     declined: '1'
//   },
//   {
//     id: '4',
//     icon: MedicalIcon,
//     leaveType: 'Medical',
//     totalLeaves: '15',
//     pending: '0',
//     approved: '2',
//     declined: '0'
//   },
// ]


function App() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userData: any = JSON.parse(localStorage.getItem("UserData") || "{}");
  const user_role = userData.role || 'Intern';
  const publicRoutes = getRoutes('Public');
  let routes = getRoutes(user_role);
  routes = routes.concat(publicRoutes);
  
  const pages = useRoutes(routes);
  /* HOOKS
  -------------------------------------------------------------------------------------*/
  // useEffect(() => {
  //   if (
  //     !userData.token &&
  //     !pathname.includes("signup") &&
  //     !pathname.includes("forget-password") &&
  //     !pathname.includes("reset-password")
  //   ) {
  //     navigate("/login");
  //   }
  // }, [pathname]);

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/



  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {pages}
    </ErrorBoundary>
  )
}

export default App;
