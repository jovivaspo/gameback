import React from 'react'
import { useListGames } from '../useHooks/useListGames'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const Card = ({ game}) => {

    const { deleteGame } = useListGames()
    const navigate = useNavigate()


    return (
        <div className="card m-1 mb-3 bg-secondary">
            <img className='card-img-top' src={game.url_image} height='110px' style={{ objectFit: 'cover', objectPosition: '0px 50%' }}
            />
            <div className="card-body" draggable="true">
                <h6 className="card-title text">{game.name}</h6>
                <div className="card-text">
                    <div className='col-12'>
                        <span>Rating: </span>
                        <span>{game.rating ? `${game.rating}/5` : '-/5'}</span>
                    </div>
                    <div className='col-12 d-flex justify-content-end'>
                        <Button variant='outline-light' size='sm' className='mx-1' onClick={() => navigate(`/edit/${game.id}`)}>See</Button>
                        <Button variant='outline-light' size='sm' className='mx-1' onClick={deleteGame} data-id={game.id}>Delete</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card
