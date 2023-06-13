import React, { FC, useEffect, useMemo } from 'react'
import { useLocation, useNavigate, useRoutes } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorFallback } from './pages/errors/errorBoundary'
import { getRoutes } from './routes'
import './App.scss'
import constants, { ROUTES_CONSTANTS } from './config/constants'
import { ConfigProvider, notification } from 'antd'
import { themeState } from './store'
import { useRecoilState, useSetRecoilState, useResetRecoilState } from 'recoil'
import { currentUserState } from './store/Signin'
const Context = React.createContext({ name: 'Default' })

function App() {
  /* VARIABLE DECLARATION
  -------------------------------------------------------------------------------------*/
  const [api, contextHolder] = notification.useNotification()
  const contextValue = useMemo(() => ({ name: 'Student Help Squad' }), [])
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [currentTheme, setCurrentTheme] = useRecoilState(themeState)
  const accessToken = localStorage.getItem('accessToken')
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState)

  /* HOOKS
  -------------------------------------------------------------------------------------*/
  useEffect(() => {
    if (accessToken && pathname === `/${ROUTES_CONSTANTS.LOGIN}`) {
      navigate(`/${ROUTES_CONSTANTS.DASHBOARD}`)
    } else if (
      !accessToken &&
      pathname != `/${ROUTES_CONSTANTS.SIGNUP}` &&
      pathname != `/${ROUTES_CONSTANTS.VERIFICATION_STEPS}` && 
      pathname != `/${ROUTES_CONSTANTS.FORGOT_PASSWORD}` && 
      pathname != `/${ROUTES_CONSTANTS.RESET_LINK_SENT}` &&  
      pathname != `/${ROUTES_CONSTANTS.CREATE_PASSWORD}`
    ) {
      navigate(`/${ROUTES_CONSTANTS.LOGIN}`)
    }
  }, [pathname])

  /* EVENT FUNCTIONS
  -------------------------------------------------------------------------------------*/

  /* RENDER APP
  -------------------------------------------------------------------------------------*/
  return (
    <>
      <Context.Provider value={contextValue}>
        {contextHolder}
        <ConfigProvider theme={currentTheme}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            {accessToken
              ? useRoutes(
                getRoutes(currentUser.role).concat(
                  getRoutes(constants.PUBLIC)
                )
              )
              : useRoutes(getRoutes(constants.PUBLIC))}
          </ErrorBoundary>
        </ConfigProvider>
      </Context.Provider>
    </>
  )
}
export default App
