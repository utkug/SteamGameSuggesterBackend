import express from 'express'
import { getSteamGameInfo } from '../controllers/userGameInfoController'

const router = express.Router()

router.get('/getUserGamesWithHours/:id', getSteamGameInfo)

export default router