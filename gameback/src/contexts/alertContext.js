import { createContext, useState } from "react";

const alertContext = createContext()

const AlertProvider = ({children})=>{
    const initialAlert = {
        error:false,
        success:false,
        message: null
    }
    const [alert,setAlert] = useState(initialAlert)
    const [show, setShow] = useState(false)

    const data = {alert, setAlert, show, setShow}

    return(
        <alertContext.Provider value={data}>{children}</alertContext.Provider>
    )
}

export {AlertProvider}
export default alertContext