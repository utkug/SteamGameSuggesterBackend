import { Request, Response } from "express"
import { fetchSteamProfileGames, getSteamGamesDetails, getSteamIdByUsername, getUserGameDetailsWithHowLongToBeat } from "../services/userGameInfoService"

export const getSteamGameInfo = async (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')

    const username = req.params.id
    let userGames = []
    if (username.length == 17 && username.substring(0,4) == "7656") {
        userGames = await fetchSteamProfileGames(username)
    }
    else {
        const steamId = await getSteamIdByUsername(username)
        userGames = await fetchSteamProfileGames(steamId)
    }

    const chunkSize = 3
    for (let i=0; i<userGames.length; i += chunkSize) {
        const batch = userGames.slice(i, i + chunkSize)
        const steamGamesData = await getSteamGamesDetails(batch)
        const a = await getUserGameDetailsWithHowLongToBeat(steamGamesData)

        for (const item of a) {
            res.write(`data: ${JSON.stringify(item)}\n\n`)
        }
        if (i + chunkSize < userGames.length) {
            await new Promise(r => setTimeout(r, 1000))
        }
    }
    res.write('event: end\ndata: done\n\n')
    console.log("✅ Sending END event");
    res.end()
}