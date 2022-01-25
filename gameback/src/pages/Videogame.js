import React, { useContext } from 'react';
import { useParams } from 'react-router-dom'
import { useVideogame } from '../useHooks/useVideogame';
import {Form, Button} from 'react-bootstrap'
import '../pages/Videogames.css'


const rating=[0,1,2,3,4,5]
const status = ["Not Status", "Not Started", "In Progress", "Completed", "Abandoned"]

const Videogame = () => {

  const { id } = useParams()
  const { userVideogame, videogameApi, handleChange, handleSubmit, formEdit } = useVideogame(id)
  

 // console.log(userVideogame)
 // console.log(videogameApi);

  return (userVideogame && videogameApi && <div className="videogame-background" style={{
    backgroundImage: `url(${userVideogame.url_image})`
  }} >
    <div className="videogame-gradient">
      <div className="container videogame-container-info">
        <h2 style={{color:'white', fontWeight:'bold', margin:'0 auto', textAlign:'center', padding:40}}>{userVideogame.name}</h2>
        <div className="row">
          <div className="col-md-6 game-info">
            <p><span className='main-tags'>Platforms: </span><br/><span className='info-tags'>{videogameApi.platforms?.map(el=>{
              return el.platform.name + ' '
            })}</span></p>
             <p><span className='main-tags'>Publishers: </span><br/><span className='info-tags'>{videogameApi.publishers?.map(el=>{
              return el.name + ' '
            })}</span></p>
             <p><span className='main-tags'>Stores: </span><br/><span className='info-tags'>{videogameApi.stores?.map(el=>{
              return el.store.name + ' '
            })}</span></p>
              <p><span className='main-tags'>Global Rating: </span><br/><span className='info-tags'>{videogameApi?.rating}</span></p>
              <p><span className='main-tags'>Website: </span><br/><a className='info-tags' target='_blank' style={{cursor:'pointer', color:'white'}}>{videogameApi?.website}</a></p>
          </div>
          <div className="col-md-6 game-info">
          <Form className='form-game' style={{maxWidth:400}}>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label className='text-white'>Your Rating</Form.Label>
                            <Form.Select size="sm" name="rating" className='bg-transparent text-white' value={formEdit.rating} onChange={handleChange}>
                                <option style={{ color: 'white', background: '#212529' }}>Select</option>
                                {
                                    rating.map((el, index) => {
                                        return (
                                            <option key={index} value={el} style={{ color: 'white', background: '#212529' }}
                                                value={el}>{el}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlInput1">
                            <Form.Label className='text-white'>Status</Form.Label>
                            <Form.Select size="sm" className='bg-transparent text-white' name='status' value={formEdit.status} onChange={handleChange}>
                                <option style={{ color: 'white', background: '#212529' }}>Select</option>
                                {
                                    status.map((el, index) => {
                                        return (
                                            <option key={index} value={el} style={{ color: 'white', background: '#212529' }}
                                                value={el}>{el}</option>
                                        )
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-2" controlId="exampleForm.ControlTextarea1">
                            <Form.Label className='text-white'>Comment</Form.Label>
                            <Form.Control as="textarea" rows={2} className='bg-transparent text-white' name='comment' value={formEdit.comment} onChange={handleChange} placeholder='Write a new comment'/>
                        </Form.Group>
                        <Form.Group className='mb-2'>
                            <Button variant='outline-light' onClick={handleSubmit}>Save</Button>
                        </Form.Group>
                      
                    </Form>

          </div>
        </div>
      </div>
    </div>
  </div>);
};

export default Videogame;
