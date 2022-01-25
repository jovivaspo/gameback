import {useState} from 'react'
import { SEARCH } from '../Assets/rawgUrls'
import { helpHttp } from '../services/helpHttp'

const useSearch = () =>{

    const [search, setSearch] = useState()

    const handleSearch = (e) =>{
        helpHttp().get(`${SEARCH}${e.target.value}`)
        .then(res=>{
           
            setSearch(res.results)
          
        })
    }

    return {search,  handleSearch}
}

export {useSearch}