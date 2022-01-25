import React,{useContext, useState, useEffect} from 'react'
import alertContext from '../contexts/alertContext'
import {Alert} from 'react-bootstrap'
import './Alert.css'

const AlertMessage = () => {
    const {alert,show} = useContext(alertContext)
    return (
      <>
        {alert?.message && <Alert className='alert' show={show} variant={alert.error? 'dark' : 'primary'}>{alert.message}</Alert> } 
      </>
   
    )
}

export default AlertMessage
