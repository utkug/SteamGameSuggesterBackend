import axios from "axios"
import SteamAPI from "steamapi"
import { parseLanguages, sanitizeGameName } from "../utils/utilsForStrings"
import { HowLongToBeatService } from "howlongtobeat"

const STEAM_API_KEY = "YOUR STEAM API KEY"

const STEAM_OWNED_GAMES_URL = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"
const STEAM_REVIEW_URL = "https://store.steampowered.com/appreviews/"
const STEAM_ID_URL = "http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/"

const steam = new SteamAPI(STEAM_API_KEY)

export const fetchSteamProfileGames = async (steamId: string): Promise<OwnedGame[]> => {
    const { data } = await axios.get(STEAM_OWNED_GAMES_URL, {
        params: {
            key: STEAM_API_KEY,
            steamid: steamId,
            format: "json"
        }
    })
    const userGames: OwnedGame[] = data?.response.games
    return userGames.map(({ appid, playtime_forever }) => ({
        appid,
        playtime_forever
    }))
}

export const getGameReviews = async (appid: number): Promise<userReviews> => {
    const response = await axios.get(STEAM_REVIEW_URL + appid, {
        params: {
            json: 1,
            l: 'en'
        }
    })
    const review = response.data['query_summary']
    return {
        review_score_desc: review['review_score_desc'],
        total_positive: review['total_positive'],
        total_negative: review['total_negative'],
        total_reviews: review['total_reviews'],
    }
}

export const getSteamIdByUsername = async (username: string) => {
    const response = await axios.get(STEAM_ID_URL, {
        params: {
            key: STEAM_API_KEY,
            vanityurl: username
        }
    })
    const steamId = response.data?.response?.steamid
    console.log("steam id: " + steamId)
    return steamId
}

export const getSteamGamesDetails = async (userGames: OwnedGame[]): Promise<GameDetail[]> => {
    const results: GameDetail[] = []
    for (const game of userGames) {
        const data = await steam.getGameDetails(game.appid)
        const review = await getGameReviews(game.appid)

        if (!data) continue

        console.log(`${game.appid} : ${data.name}`)

        const raw = data.supportedLanguages
        const cleanLanguages = parseLanguages(data.supportedLanguages)

        results.push({
            appid: game.appid,
            playtime_forever: game.playtime_forever,
            name: data.name,
            genres: data.genres?.map((g: any) => g.description) ?? [],
            metacriticScore: data.metacritic ? data.metacritic.score : 0,
            imageUrl: data.headerImage,
            languages: cleanLanguages,
            steam_reviews: {...review}
        })
    }
    return results
}

export const getUserGameDetailsWithHowLongToBeat = async (games: GameDetail[]): Promise<UserGameDetailsWithHowLongToBeat[]> => {
    const userGameDetails: UserGameDetailsWithHowLongToBeat[] = []
    const hltbService = new HowLongToBeatService()
    for (const game of games) {
        try{
            const name = sanitizeGameName(game.name)
            let response = await hltbService.search(name)
            let howLongData = response[0]

            if (!howLongData || howLongData.gameplayMain < 0) {
                const shortned = name.split(" ").slice(0, 4).join(" ")
                console.log("Shortned Name: " + shortned)
                response = await hltbService.search(shortned)
                howLongData = response[0]
            }
            
            userGameDetails.push({
                ...game,
                gameplayMain: howLongData.gameplayMain || 0,
                gameplayMainExtra: howLongData.gameplayMainExtra || 0,
                gameplayCompletionist: howLongData.gameplayCompletionist || 0,
            })
        }
        catch{
            userGameDetails.push({
                ...game,
                gameplayMain: 0,
                gameplayMainExtra: 0,
                gameplayCompletionist: 0,
            })
        }
    }
    return userGameDetails
}