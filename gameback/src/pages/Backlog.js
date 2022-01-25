import React from 'react'
import './Backlog.css'
import ModalGame from '../components/ModalGame'
import  Card  from '../components/Card'
import { useListGames } from '../useHooks/useListGames'


const columns = ["Not Status", "Not Started", "In Progress", "Completed", "Abandoned"]


const Backlog = () => {

   const {games} = useListGames()

   console.log(games)

    return (
        <div className='backlog-container pt-3'>
            <div className="backlog-container-main container-lg text-white m-auto">
                <div className="backlog-container-main-row row">
                    <div className="backlog-container-main-sidebar col-lg-2">Soy una barra lateral</div>
                    <div className="backlog-container-main-body col-lg-10">
                        <div className="backlog-container-main-body-row row">

                            {columns.map((category, index) => {
                                const classe = category.replace(/ /, '-')
                                return (
                                    <div className="backlog-column col-md p-2" key={index}>
                                        <h6 className={classe.toLocaleLowerCase() + ' tag'}>{category}</h6>
                                        <span className='p-1 text-secondary'>{games.gamesUser? (games.gamesUser.games[category].length) : 0}</span>
                                        <ModalGame category={category}/>
                                        <div className='container-cards'>
                                            {(games.gamesUser && games.gamesUser.games[category].length > 0) ?
                                                (games.gamesUser.games[category].map((el, index) => {
                                                   //console.log(el)
                                                   return (<Card game={el} key={index} />)
                                                })) :
                                                (<></>)
                                            }

                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )






}

export default Backlog

