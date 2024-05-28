import {useDispatch,useSelector} from "react-redux"
import { useEffect } from "react"
import { getVocabularys } from "../features/vocabulary/vocabularySlice"
const Home = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getVocabularys())
    },[])

    const vocabulary = useSelector((state)=>state.vocabulary.vocabularys)
    console.log(vocabulary)
  return (
    <div>Home</div>
  )
}

export default Home