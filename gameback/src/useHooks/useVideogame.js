import { URL_API, API_KEY } from '../Assets/rawgUrls'
import {helpHttp} from '../services/helpHttp'
import {useState, useEffect} from 'react'
import {useSelector} from 'react-redux'
import { useListGames } from './useListGames'
import {useNavigate} from 'react-router-dom'
import { URL_VIDEOGAME_GAME } from '../Assets/url_api'

const useVideogame = (idGame) =>{
   
    const { id, token } = useSelector(state => state.user.userInfo)
    const {editGame} = useListGames()
    const [userVideogame,setUserVideogame] = useState(null)
    const [videogameApi, setVideogameApi] = useState(null)
    const [formEdit, setFormEdit] = useState(null)
    const navigate = useNavigate()

    const getGameRawg = (idApi) => {
        helpHttp().get(`${URL_API}/games/${idApi}?key=${API_KEY}`)
        .then(res=>{
          setVideogameApi(res)
          localStorage.setItem('idApi',idApi)
        })
        .catch(err=>console.log(err))
    }

    const getGameApi = () =>{
      helpHttp().get(URL_VIDEOGAME_GAME + id + '/' + idGame, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    .then(res=>{
      setUserVideogame(res)
      setFormEdit({
        rating: res.rating,
        status:res.status,
        comment: res.comment
      })
      getGameRawg(res.idApi)
    })

    }

    const handleChange = (e) =>{
      setFormEdit({...formEdit,[e.target.name]:e.target.value})
     // console.log(formEdit)
    }

    const handleSubmit = (e) => {
      e.preventDefault()
      editGame(formEdit,idGame )
      navigate('/')

    }
  
    useEffect(()=>{
      getGameApi()
    },[])

    return {userVideogame, videogameApi, handleChange, handleSubmit, formEdit}

   

}

export {useVideogame}

