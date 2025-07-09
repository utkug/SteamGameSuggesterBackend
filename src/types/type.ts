interface GameDetail {
  appid: number
  playtime_forever: number
  name: string
  genres: string[]
  metacriticScore?: number
  imageUrl: string
  languages: string[]
  steam_reviews: userReviews
}

interface userReviews {
  review_score_desc: string
  total_positive: number
  total_negative: number
  total_reviews: number
}

interface UserGameDetailsWithHowLongToBeat extends GameDetail{
  gameplayMain: number
  gameplayMainExtra: number
  gameplayCompletionist: number   
}

interface Genre  {
  id: string
  description: string
}

interface AppDetail {
  name: string;
  genres?: Genre[]
  metacritic?: {
    score: number
    url: string
  }
  header_image: string
  supported_languages: string[]
}

interface OwnedGame {
  appid: number
  playtime_forever: number
}