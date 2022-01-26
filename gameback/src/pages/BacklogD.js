import React, { useState } from 'react'
import './Backlog.css'
import ModalGame from '../components/ModalGame'
import Card from '../components/Card'
import { useListGames } from '../useHooks/useListGames'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useSelector } from 'react-redux'


const BacklogD = () => {
    const [aside, setAside] = useState(null)
    const { onDragEnd } = useListGames()
    const games = useSelector(state => state.games)

    return (
        <div className='backlog-container pt-3'>
            <div className="backlog-container-main container-lg text-white m-auto">
                <div className="backlog-container-main-row row">
                    {aside && <div className="backlog-container-main-sidebar col-lg-2">Soy una barra lateral</div>}
                    <div className="backlog-container-main-body col-lg-12">
                        {games.gamesUser && <DragDropContext
                            onDragEnd={result => onDragEnd(result)}
                        >
                            <div className="backlog-container-main-body-row row">
                                {Object.entries(games.gamesUser?.games).map(([status, items]) => {
                                    const classe = status.replace(/ /, '-')
                                    return (
                                        <div className="backlog-column col-md p-3" key={status}>
                                            <h6 className={classe.toLocaleLowerCase() + ' tag'}>{status}</h6>
                                            <span className='p-1 text-secondary'>{games.gamesUser ? (games.gamesUser.games[status].length) : 0}</span>
                                            <ModalGame category={status} />
                                            <Droppable droppableId={status}>
                                                {(provided) => {
                                                    return (<div className='container-cards'
                                                        {...provided.droppableProps}
                                                        ref={provided.innerRef}
                                                    >
                                                        {items.map((el, index) => {
                                                            //console.log(el.id)
                                                            return (
                                                                <Draggable key={el.id} draggableId={el.id} index={index}>
                                                                    {(provided) => {
                                                                        return (
                                                                            <div ref={provided.innerRef}
                                                                                {...provided.draggableProps}
                                                                                {...provided.dragHandleProps}>
                                                                                <Card game={el} position={index} />
                                                                            </div>

                                                                        )
                                                                    }}
                                                                </Draggable>
                                                            )
                                                        })}
                                                        {provided.placeholder}
                                                    </div>
                                                    )
                                                }}
                                            </Droppable>

                                        </div>)
                                })}

                            </div>
                        </DragDropContext>}
                    </div>
                </div>
            </div>
        </div>
    )






}

export default BacklogD

