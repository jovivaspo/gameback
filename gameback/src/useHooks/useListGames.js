import { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { list, changeColumnFrontend, changeOrderFrontend } from '../actions/gamesActions'
import { URL_VIDEOGAME_ADD, URL_VIDEOGAME_DELETE, URL_VIDEOGAME_UPDATE, URL_VIDEOGAME_UPDATELIST } from '../Assets/url_api'
import alertContext from '../contexts/alertContext'
import { helpHttp } from '../services/helpHttp'


const useListGames = () => {
    const games = useSelector(state => state.games)
    const { id, token } = useSelector(state => state.user.userInfo)
    const dispatch = useDispatch()
    const {setAlert, setShow} = useContext(alertContext)

    const addGame = (form) => {
        
        helpHttp().post(URL_VIDEOGAME_ADD,{
            headers:{
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body:{
                name:form.name,
                url_image:form.image,
                rating:form.rating,
                status:form.status,
                comment:form.comment,
                userId:id,
                idApi:form.idApi,
                position:games.gamesUser.games[form.status].length
            }
        }).then(res=>{
            if (res.error) {
                setAlert({error:true, message:res.error})
                setShow(true)
                setTimeout(()=>{
                    setShow(false)
                    setAlert({ error: false, message: null })
                },1200)
              }else{
                setAlert({success:true, message:res.message})
                setShow(true)
                setTimeout(()=>{
                    dispatch(list(id,token))
                    setShow(false)
                    setAlert({ error: false, message: null })
                },1200)

                
              }
           
        })
    }

    const editGame = (form,idGame) => {
 
            const originalPosition = games.gamesUser.games[form.status].find(el=>el.id===idGame)

         
             helpHttp().put( URL_VIDEOGAME_UPDATE + idGame,{
                headers:{
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:{
                    rating:form.rating,
                    status:form.status,
                    comment:form.comment,
                    position:originalPosition? originalPosition.position : games.gamesUser.games[form.status].length
                }}).then(res=>{
                    if (res.error) {
                        alert(res.error)
                      }else{
                        alert(res.message)
                        dispatch(list(id,token))
                      
                      }
                })    

    }

    const deleteGame = (e) => {

        const idGame = e.target.dataset.id

        helpHttp().del(URL_VIDEOGAME_DELETE + id + '/' + idGame, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => {
                if (res.error) {
                    alert(res.error)
                } else {
                    alert(res.message)
                    dispatch(list(id,token))

                }
            })
    }


    const onDragEnd = (result) => {

      //  console.log('Moviendo', result)

        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
         //   console.log('!Cambiando videojuego de columna!')
            dispatch(changeColumnFrontend(games,source,destination))
          //  console.log('Esto es lo que se envía al backend',games)
            updateBackend(games,id,token,source,destination)
          
        } else {
        //    console.log('!Cambiando videojuego solo de orden!')
            dispatch(changeOrderFrontend(games,source,destination))
            updateBackend(games,id,token,source,destination)
        }
    };

 const updateBackend = (snapgames, id, token, source,destination) => {
        
         helpHttp().put(URL_VIDEOGAME_UPDATELIST + id, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: { source, destination, snapgames }
            })
            .then(res => {
                if (res.error) {
                    alert(res.error)
                } else {
                    //alert(res.message)
                    dispatch(list(id,token))

                }
            }) 
    }


    return { addGame, deleteGame, onDragEnd, editGame }
}


export { useListGames }