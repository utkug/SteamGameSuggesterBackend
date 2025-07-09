# 🎮 Steam Game Suggester - Backend

This is the backend API for the **Steam Game Suggester App**. It fetches and enriches Steam user game libraries with additional metadata such as genres, supported languages, review summaries, and estimated playtime using HowLongToBeat data.

> 📦 Looking for the frontend?  
👉 Check out the frontend repo here: [Steam Game Suggestion - Frontend](https://github.com/utkug/Frontend-Steam-Game-Suggester-With-HowLongToBeat-Data)

## 📦 Features

- 🔍 Resolve custom Steam usernames to SteamID
- 🎮 Fetch owned games from a public Steam profile
- 📊 Enrich game data with:
  - Metacritic score
  - Genres
  - Supported languages (cleaned)
  - Steam user reviews
  - Estimated gameplay time (via HowLongToBeat)
- 📡 Supports Server-Sent Events (SSE) for real-time frontend updates

## 🚀 Getting Started

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/utkug/SteamGameSuggesterBackend.git
```
### 2. Install Dependencies
```bash
npm install
```
### 3. Put Your Steam Web API Key
```bash
const STEAM_API_KEY=your_steam_api_key_here
```
### 4. Start the Development Server
```bash
npx tsx src/app.ts
```

## 📡 API Endpoints
GET /getUserGamesWithHours/:steamId
<br />
Fetches enriched game data for the user (with SSE support).

## 🔧 Technologies Used

- **Node.js**
- **Express**
- **TypeScript**
- **Axios**
- [**HowLongToBeat API**](https://github.com/ckatzorke/howlongtobeat)
- **Steam Web API**
- [**SteamAPI**](https://github.com/xDimGG/node-steamapi)
- **SSE (Server-Sent Events)**
