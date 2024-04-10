import { useEffect } from "react"
import {useParams ,useLocation} from "react-router-dom"
import { getDataQuiz } from "../../services/apiServices"
import "./DetailQuiz.scss"
import _, { lowerCase } from 'lodash'


const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()

    console.log(location)
    useEffect(()=> {
        fetchQuestion()
    }, [quizId] )


    const fetchQuestion = async() => {
        let res = await  getDataQuiz(quizId)
        
        if (res && res.EC ===0){
            let raw = res.DT;
            let data = _.chain(raw)
            .groupBy("id")
            .map((value, key) => {
                let questionDescription, image = null
                let answers = []
                value.forEach((item, index) => {
                    if(index === 0){
                        questionDescription = item.description
                        image = item.image
                    }
                    answers.push(item.answers)
                })
                return { questionId: key, answers: answers, questionDescription, image }
            })
            .value()
            // console.log("data >>>> ", data)
        }
    }
    return (
        <div className="detail-quiz-container">
           <div className="left-content">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizTitle}
                </div>
                <hr></hr>
                <div className="q-body"></div>
                <div className="q-content">
                   <div className="question">Question 1: how are you doing</div>
                   <div className="answer">
                        <div className="a-child">A. hehehehe</div>
                        <div className="a-child">B. hehehehe</div>
                        <div className="a-child">C. hehehehe</div>
                   </div>
                </div>
                <div className="footer">
                    <button className="btn btn-secondary">Prev</button>
                    <button className="btn btn-primary">Next</button>
                </div>
           </div>

           <div className="right-content">
                countdownt timer
            </div>
        </div>
    )
}

export default DetailQuiz;