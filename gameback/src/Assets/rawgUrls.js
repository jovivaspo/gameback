const API_KEY = process.env.REACT_APP_KEY_RAW 
const URL_API = 'https://api.rawg.io/api'
const URL_GAMES = `${URL_API}/games?key=${API_KEY}&page_size=40`
const SEARCH= `${URL_GAMES}&search=`
const URL_GAMES_TOP=`${URL_GAMES}&ordering=-rating&page_size=20`


export {
    API_KEY,
    URL_API,
    URL_GAMES,
    URL_GAMES_TOP,
    SEARCH
}