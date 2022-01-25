import React,{useState, useEffect} from "react"
import { helpHttp } from "../services/helpHttp"
import { URL_GAMES } from "../Assets/rawgUrls"

const useGames=()=>{
    const [imageBackground, setImageBackground] = useState()
    const [gamesCarrousel, setGamesCarrousel] = useState([])
    
    useEffect(()=>{
      (async()=>{
        helpHttp().get(URL_GAMES)
        .then(res=>{
            setImageBackground(res.results[Math.floor(Math.random()*res.results.length)].background_image)
           // if(!imageBackground) setImageBackground("https://image.api.playstation.com/vulcan/img/rnd/202009/2919/KpFO3I0iQCym2X58b43Avg8L.jpg")

           res.results.forEach(videogame=>{
              if(videogame.background_image) setGamesCarrousel((gamesCarrousel)=>[...gamesCarrousel,videogame.background_image]) 
            }) 
           
        })
        .catch(err=>console.log(err))
      })()
      
    },[])

    

    return {imageBackground, gamesCarrousel}
}

export {useGames}
