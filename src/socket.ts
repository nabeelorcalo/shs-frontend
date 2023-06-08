import { io } from 'socket.io-client'
import constants from './config/constants'

const URL = constants.APP_URL

export const socket = io(URL, {
  autoConnect: false
})