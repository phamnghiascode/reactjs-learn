import { useEffect } from "react"
import {useParams} from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices"
const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    useEffect(()=> {
        fetchQuestion()
    }, [quizId] )


    const fetchQuestion = async() => {
        let res = await  getDataQuiz(quizId)
        console.log(">>>>question: ", res)
    }
    return (
        <div className="detail-quiz-container">
            DetailQuiz
        </div>
    )
}

export default DetailQuiz;