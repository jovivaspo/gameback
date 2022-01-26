import { LIST, CHANGE_COLUMN_FRONTEND, CHANGE_ORDER_FRONTEND, LOGOUTGAMES } from "../types/index"

export default function gamesReducer (state={},action){
    switch(action.type){
        case LIST :{
        
            return {gamesUser:action.payload}
        }

        case CHANGE_COLUMN_FRONTEND:{
         //  console.log('Cambiando en el frontend dos columnas')
            const {source,destination,sourceColumn,destColumn} = action.payload
            const newState = {
                games: {...state.gamesUser.games,
                    [source.droppableId] : sourceColumn,
                    [destination.droppableId] : destColumn
                }
            }
         //   console.log('Nuevo estado en el front',newState)
            return {gamesUser:newState}
            
           
        }

        case CHANGE_ORDER_FRONTEND:{
         //  console.log('Cambiando en el frontend solo una columna')
            const {source,column} = action.payload
           
            const newState = {
                games:{...state.gamesUser.games,
                [source.droppableId]:column}
            }

         //   console.log('Nuevo estado en el front',newState)
          
            return {gamesUser:newState}
        }

        case LOGOUTGAMES: {
            return{gamesUser:null}
        }
        
        default:
            return state
                
    }
}