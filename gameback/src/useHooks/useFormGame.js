import { useContext, useState } from 'react'
import alertContext from '../contexts/alertContext'
import { useListGames } from './useListGames'


const useFormGame = (category) => {


    const initialForm = () => {
        return {
            name: '',
            image: '',
            rating: '',
            status: category,
            position: '',
            comment: '',
            idApi:''
        }
    }
    const [form, setForm] = useState(initialForm)
    const [game, setGame] = useState()
    const { setAlert, setShow } = useContext(alertContext)
    const {addGame} = useListGames()



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSelectGame = (e) => {

        setForm({ ...form, ['name']: e.target.dataset.name, ['image']: e.target.dataset.img, ['idApi']:e.target.dataset.api })
        setGame(e.target.dataset.name)
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!form.name) {
            setShow(true)
            setAlert({ error: true, message: 'You Must Select A Game' })
            setTimeout(()=>{
                setShow(false)
                setAlert({ error: false, message: null })
            },1200)
            return false
        } else {
            addGame(form)
            setForm(initialForm)
            setGame(null)
        }


    }


    return { form, game, handleChange, handleSubmit, handleSelectGame }
}

export { useFormGame }