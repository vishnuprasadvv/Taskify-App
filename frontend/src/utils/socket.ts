import { config } from '@/config/config'
import {io} from 'socket.io-client'

const BASE_URL = config.app.BASE_URL;

const socket = io(BASE_URL)

export default socket;