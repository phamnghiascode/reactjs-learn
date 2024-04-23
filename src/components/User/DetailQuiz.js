import { useEffect,useState } from "react"
import {useParams ,useLocation} from "react-router-dom"
import { getDataQuiz, postSubmitQuiz } from "../../services/apiServices"
import "./DetailQuiz.scss"
import _ from 'lodash'
import Question from "./Question"
import ModalResult from "./ModalResult"
import { setSelectionRange } from "@testing-library/user-event/dist/utils"
import RightContent from "./Content/RightContent"



const DetailQuiz = (props) => {
    const params = useParams()
    const quizId = params.id
    const location = useLocation()
    const [dataQuiz, setDataQuiz] = useState([])
    const [index, setIndex] = useState(0)
    const [isShowModalResult, setIsShowModalResult] = useState(0)
    const [dataModalResult, setDataModalResult] = useState({})
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
                    item.answers.isSelected = false
                    answers.push(item.answers)
                })
                return { questionId: key, answers: answers, questionDescription, image }
            })
            .value()
         
            setDataQuiz(data)
        }
    }

    const handlePrev = () => {
        if(index-1 < 0) return
        setIndex(index-1)
    }
    const handleNext = () => {
        if(dataQuiz && dataQuiz.length > index+1)
            setIndex(index+1)

    }
    const handleCheckBox = (answerId, questionId) =>
    {
        let dataQuizClone = _.cloneDeep(dataQuiz)
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if(question && question.answers){

            question.answers = question.answers.map(item => {
                if(+item.id === +answerId){
                    item.isSelected = !item.isSelected
                }
                return item
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if(index > -1){
            dataQuizClone[index] = question
            setDataQuiz(dataQuizClone)
        }
        
    }
   
    const handleFinishQuiz = async () => {
        
        let payload = {
            quizId : +quizId,
            answers: []
        }
        console.log("check data befor submit: ", dataQuiz)
        let answers = []
        if(dataQuiz.length && dataQuiz.length > 0)
        {
            dataQuiz.forEach(question => {
                
                let questionId = question.questionId
                let userAnswerId = []
                question.answers.forEach(a => {
                    if(a.isSelected === true)
                    {
                        userAnswerId.push(a.id)
                    }
                })
                answers.push({
                    questionId: +questionId,
                    userAnswerId : userAnswerId
                })
            })
            payload.answers = answers
        //    submit api
            let res = await postSubmitQuiz(payload)
            console.log("check res: ", res)
            if(res && res.EC ===0)
            {
                setDataModalResult({
                    countCorrect : res.DT.countCorrect,
                    countTotal : res.DT.countTotal,
                    quizData : res.DT.quizData
                })
                setIsShowModalResult(true)
            }
            else {
                alert("something wrong")
            }
        }
    }
    return (
        <div className="detail-quiz-container">
           <div className="left-content">
                <div className="title">
                    Quiz {quizId} : {location?.state?.quizTitle}
                </div>
                <hr></hr>
                <div className="q-body">
                    <img></img>
                </div>
                <div className="q-content">
                   <Question 
                   handleCheckBox = {handleCheckBox}
                   index={index}
                   data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}/>
                </div>
                <div className="footer">
                    <button 
                        className="btn btn-secondary"
                        onClick={()=> handlePrev()}>
                            Prev
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={()=> handleNext()}>
                            Next
                    </button>
                    <button 
                        className="btn btn-warning"
                        onClick={()=> handleFinishQuiz()}>
                            Finish
                    </button>
                </div>
           </div>

           <div className="right-content">
                <RightContent
                    dataQuiz={dataQuiz}
                    handleFinishQuiz={handleFinishQuiz}
                    setIndex={setIndex}
                />
            </div>
            <ModalResult
            show={isShowModalResult}
            setShow={setIsShowModalResult}
            dataModalResult = {dataModalResult}/>
        </div>
    )
}

export default DetailQuiz;