import { useEffect, useState } from "react";
import { getQuizByUser } from "../../services/apiServices";
import './ListQuiz.scss'
import {useNavigate} from "react-router-dom"
const ListQuiz = (props) => {
    const [arrayQuiz, setArrayQuizz] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
      

        getQuizData()
    }, [])

    const getQuizData = async() => {
        const res = await getQuizByUser()
        if(res && res.EC ===0){
            setArrayQuizz(res.DT)
        }
    }
    return (
        <div  className="list-quiz-container container">
            {arrayQuiz && arrayQuiz.length > 0 && arrayQuiz.map((quiz, index) => {
                return (
                    <div key ={`${index}-quiz`} className="card" style={{width: "18rem"}}>
                        <img className="card-img-top" src={`data:image/jpeg;base64, ${quiz.image}`} alt="Card image cap"/>
                        <div className="card-body">
                            <h5 className="card-title">Quiz {index+1}</h5>
                            <p className="card-text">{quiz.description}</p>
                            <button 
                            className="btn btn-primary"
                            onClick={()=> navigate(`/quiz/${quiz.id}`)}
                            >Start Now</button>
                        </div>
                    </div>
                )
            })}
            
            {arrayQuiz && arrayQuiz.length === 0 &&
            <div>Dont have quiz yet...</div>
            }
        </div>
    )
}
export default ListQuiz;