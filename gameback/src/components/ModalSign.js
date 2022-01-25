
import { Button, Modal, Nav } from 'react-bootstrap'
import React, { useState } from 'react';
import FormSign from './FormSign';
function ModalSign() {


  const [modalShow, setModalShow] = useState(false)
  const [modalBody, setModalBody] = useState('signUp')

  const handlerSelect= (eventKey)=>{
    //console.log(eventKey)
      setModalBody(eventKey)
  }

  return (
    <>
      <Button variant='outline-light' onClick={() => setModalShow(true)}>
        Login
      </Button>
      <Modal
        size="mg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        onHide={() => setModalShow(false)}
      >
        <Modal.Header closeButton className='bg-dark text-white border border-white'>
            <Nav fill variant="tabs" defaultActiveKey="2" 
            className='d-flex flex-row justify-content-center bg-dark text-white'
            style={{width:'90%'}}
            onSelect={handlerSelect}
            >
              <Nav.Item>
                <Nav.Link eventKey='signIn' className='bg-dark text-white'>Sign In</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="signUp" className='bg-dark text-white'>Sign Up</Nav.Link>
              </Nav.Item>
            </Nav>
        </Modal.Header>
        <Modal.Body className='bg-dark text-white border border-white'>
         <FormSign modalBody={modalBody}/>
        </Modal.Body>
        <Modal.Footer className='bg-dark text-white border border-white'>
          <Button variant='outline-light' onClick={()=>setModalShow(false)}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>

  );
}



export default ModalSign