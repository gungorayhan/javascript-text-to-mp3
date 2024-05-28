import axios from "axios"
import { base_url } from "../../utilities/base_url"

const getVocabulary=async()=>{
    const result = await axios.get(`${base_url}/`)
    return result.data
}

const vocabularyService ={
    getVocabulary
}

export default vocabularyService