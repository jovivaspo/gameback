import { CHANGE_COLUMN_FRONTEND, CHANGE_ORDER_FRONTEND, LIST, UPDATEBACKEND } from "../types";
import { helpHttp } from "../services/helpHttp";
import { URL_VIDEOGAME_LIST, URL_VIDEOGAME_UPDATELIST } from "../Assets/url_api";

export const list = (id, token) => async (dispatch) => {
    try {
       // console.log('Pidiendo juegos')
        const games = await helpHttp().get(URL_VIDEOGAME_LIST + id,
            {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })

        dispatch({ type: LIST, payload: { games } })

    } catch (err) {
       // console.log(err)
        alert(err.error)
    }

}


export const changeColumnFrontend = (games, source, destination) => async (dispatch) => {
 

        const sourceColumn = games.gamesUser.games[source.droppableId];
        const destColumn = games.gamesUser.games[destination.droppableId];
        const [removed] = sourceColumn.splice(source.index, 1)
        destColumn.splice(destination.index, 0, removed);
        dispatch({ type: CHANGE_COLUMN_FRONTEND, payload: { source, destination, sourceColumn, destColumn } })

}


export const changeOrderFrontend = (games, source, destination) => async (dispatch) => {

    const column = games.gamesUser.games[source.droppableId];
    const [removed] = column.splice(source.index, 1);
    column.splice(destination.index, 0, removed)
    dispatch({ type: CHANGE_ORDER_FRONTEND, payload: { source, column } })

}

export const updateBackend = (snapgames, id, token, source,destination) => async (dispatch) => {
    try {
      
        const games = await helpHttp().put(URL_VIDEOGAME_UPDATELIST + id, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: { source, destination, snapgames }
        })
     //   console.log('Juegos actualizados', games)
        dispatch({type:UPDATEBACKEND, payload: { games }})

    } catch (err) {
        console.log(err)
        alert(err)
    }

}





