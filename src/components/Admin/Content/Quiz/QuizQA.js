import { useEffect, useState } from 'react';
import Select from 'react-select';
import "./QuizQA.scss"
import { FaPlus, FaMinus } from "react-icons/fa";
import {RiImageAddFill} from "react-icons/ri"
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash"
import Lightbox from "react-awesome-lightbox";
import { getAllQuizForAdmin, postCreateNewQuestionForQuiz, postCreateNewAnswerForQuestion, getQuizWithQA } from "../../../../services/apiServices"
import { toast } from 'react-toastify';
const QuizQA = (props) => {


      const initQuestions =    [
        {
            id: uuidv4() ,
            description: '',
            imageFile:'',
            imageName: '',
            answers:[
                {
                    id: uuidv4(),
                    description:'',
                    isCorrect:false
                }
            ]
        }
    ]

      const [questions, setQuestions] = useState(initQuestions)
      const [isPreviewImage, setIsPreviewImage] = useState(false)

      const [dataImagePreview, setDataImagePreview] = useState({
            title:"",
            url:""
      })

      const [listQuiz, setListQuiz] = useState([])
      const [selectedQuiz, setSelectedQuiz] = useState({})
      console.log("selected quiz: ", selectedQuiz)
      useEffect(()=> {
        fetchQuiz()
        }, [])

      useEffect(()=> {
        if(selectedQuiz && selectedQuiz.value){

            fetchQuizWithQA()
        }
      },[selectedQuiz])
    

      function urltoFile(url, filename, mimeType){
        if (url.startsWith('data:')) {
            var arr = url.split(','),
                mime = arr[0].match(/:(.*?);/)[1],
                bstr = atob(arr[arr.length - 1]), 
                n = bstr.length, 
                u8arr = new Uint8Array(n);
            while(n--){
                u8arr[n] = bstr.charCodeAt(n);
            }
            var file = new File([u8arr], filename, {type:mime || mimeType});
            return Promise.resolve(file);
        }
        return fetch(url)
            .then(res => res.arrayBuffer())
            .then(buf => new File([buf], filename,{type:mimeType}));
    }
    const fetchQuizWithQA =async () => {
        let res = await getQuizWithQA(selectedQuiz.value)
        if(res && res.EC ===0){
            //convert image data 
            let newQA = []
            for(let i = 0; i < res.DT.qa.length; i++){
                let q = res.DT.qa[i]
                if(q.imageFile){
                    q.imageName = `Question-${q.id}.png`
                    q.imageFile = await urltoFile(`data:image/png;base64,${q.imageFile}`, `Question-${q.id}.png`,`image/png`)
                }
                newQA.push(q)
            }

            setQuestions(newQA)
            console.log("check resL", res)

        }

    }
    const fetchQuiz =async () => {
       
        let res  = await getAllQuizForAdmin()
        if( res && res.EC === 0 ){

            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz)
        }
        
    }

      const handdleAddRemoveQuestion = (type, id)=> {
        if(type ==="ADD")
        {
            const newQuestion =  {
                id: uuidv4(),
                description: '',
                imageFile:'',
                imageName: '',
                answers:[
                    {
                        id: uuidv4(),
                        description:'',
                        isCorrect:false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if(type ==="REMOVE")
        {
            let questionClone = _.cloneDeep(questions)
            questionClone = questionClone.filter(item => item.id !==id)
            setQuestions(questionClone)
        }
      }

      const handdleAddRemoveAnswer = (type, questionId, answerId)=> {
        let questionsClone = _.cloneDeep(questions)

       if(type ==="ADD"){
            const newAnswer = {
                id: uuidv4(),
                description: "",
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers.push(newAnswer)
            setQuestions(questionsClone)
       }
       if(type ==="REMOVE"){
            let index = questionsClone.findIndex(item => item.id === questionId)
            questionsClone[index].answers = 
                questionsClone[index].answers.filter(item => item.id !== answerId)

            setQuestions(questionsClone)
       }
      }

      const handleOnChange = (type, questionId, value)=> {
        if(type ==='QUESTION'){
            let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if(index > -1){
                questionsClone[index].description = value
                setQuestions(questionsClone)
            }
        }
      }

      const handleOnChangeFileQuestion = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions)
            let index = questionsClone.findIndex(item => item.id === questionId)
            if(index > -1 && event.target && event.target.files && event.target.files[0]){
                questionsClone[index].imageFile = event.target.files[0]
                questionsClone[index].imageName = event.target.files[0].name
                setQuestions(questionsClone)
            }
      }

      const handleAnswerQuestion = (type, answerId,  questionId, value)=> {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)
        if(index > -1){
            questionsClone[index].answers = 
                questionsClone[index].answers.map(answer => {
                    if(answer.id === answerId){
                        if(type === "CHECKBOX")
                        {
                            answer.isCorrect = value
                        }
                        if(type === "INPUT")
                        {
                            answer.description = value
                        }
                       
                    }
                    return answer
            })
           
            setQuestions(questionsClone)
        }
      }

      const handleSubmitQuestionForQuiz =async () => {
        if(_.isEmpty(selectedQuiz)){
            toast.error("Pleasee choose quiz")
            return
        }
        //validate answer
        let isValidAnswer =true
        let indexQ = 0, indexA = 0
        for (let i = 0 ; i < questions.length; i++){
            for(let j=0; j < questions[i].answers.length; j++){
                if(!questions[i].answers[j].description){
                    isValidAnswer =false
                    indexA = j
                    break
                }
            }
            indexQ = i
            if(isValidAnswer ===false) break
        }

        if(isValidAnswer ===false){
            toast.error(`Not empty answer ${indexA+1} at question ${indexQ+1}`)
            return
        }
        
        //validate question

        let isValidQ =true
        let indexQ1 = 0
        for (let i = 0 ; i < questions.length; i++){
            if(!questions[i].description){
                isValidQ =false
                indexQ1 = i
                break
            }
        }
        if(isValidQ ===false){
            toast.error(`Not empty description in question ${indexQ1+1}`)
            return
        }
       
        for (const question of questions){
                const q = await postCreateNewQuestionForQuiz(+selectedQuiz.value, question.description, question.imageFile)
                    for(const answer of question.answers){
                        await postCreateNewAnswerForQuestion(answer.description, answer.isCorrect, q.DT.id)
                    }
            }
        toast.success("Create question success")
        setQuestions(initQuestions)

      }
     

        const handlePreviewImage = (questionId) => {
        let questionsClone = _.cloneDeep(questions)
        let index = questionsClone.findIndex(item => item.id === questionId)

        if(index > -1){
            setDataImagePreview({
                url: URL.createObjectURL(questionsClone[index].imageFile),
                title: questionsClone[index].imageName
            })

            setIsPreviewImage(true)
        }
    }
    return(
        <div className="questions-container">
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label className='mb-2'>Select quiz:</label>
                    <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}  
                />
                </div>
                
                <div className='mt-3 mb-2'>
                    Add questions
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index)=> {
                       return(
                        <div key={question.id} className='q-main mb-4'>
                        <div className='question-content'>
                            <div className="form-floating description">
                                <input 
                                type="type" 
                                className="form-control" 
                                placeholder="name@example.com"
                                value={question.description}
                                onChange={(event)=> handleOnChange('QUESTION', question.id, event.target.value)}
                                />
                                <label> Question {index + 1} 's description</label>
                            </div>
                            <div className='group-upload'>
                                <label htmlFor={`${question.id}`}>
                                    <RiImageAddFill className='label-up'/>
                                </label>
                                <input 
                                id={`${question.id}`}
                                onChange={(event)=> handleOnChangeFileQuestion(question.id, event)}
                                type={'file'} 
                                hidden/>
                                <span>
                                    
                                    {question.imageName ? 
                                    <span 
                                    style={{cursor:"pointer"}}
                                    onClick={()=> handlePreviewImage(question.id)}
                                    >{question.imageName}
                                    </span>
                                    : 
                                    "No image uploaded"}
                                </span>
                            </div>
                            <div className='btn-add'>
                                <span  onClick={() => handdleAddRemoveQuestion("ADD", "")}>
                                    <FaPlus className='icon-add' />
                                </span>
                                {questions.length > 1 &&
                                    <span  onClick={() => handdleAddRemoveQuestion("REMOVE", question.id)}>
                                    <FaMinus className='icon-remove' />
                                </span>
                                }
                                
                            </div>
                        </div>

                        {
                            question.answers && question.answers.length > 0
                            && question.answers.map((answer, index) => {
                                return(
                                    <div key={answer.id} className='answers-content'>
                                    <input 
                                        className="form-check-input iscorrect" 
                                        type="checkbox"
                                        checked={answer.isCorrect}
                                        onChange={(event) => handleAnswerQuestion("CHECKBOX", answer.id, question.id, event.target.checked)}
                                        />
                                     <div className="form-floating answer-name">
                                        <input 
                                        value={answer.description}
                                        type="type" 
                                        className="form-control" 
                                        placeholder="name@example.com"
                                        onChange={(event) => handleAnswerQuestion("INPUT", answer.id, question.id, event.target.value)}
                                        />
                                        
                                        <label>Answer {index+ 1 }</label>
                                    </div>
                                    <div className='btn-group'>
                                        <span onClick={()=> handdleAddRemoveAnswer("ADD", question.id)}>
                                            <FaPlus className='icon-add' />
                                        </span>
                                        {
                                            question.answers.length > 1 &&
                                            <span onClick={()=> handdleAddRemoveAnswer("REMOVE",question.id, answer.id)}>
                                                <FaMinus className='icon-remove' />
                                            </span>
                                        }  
                                    </div>
                                </div>
                                )
                            })
                        }
                       
                      

                    </div>
                       )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button 
                        onClick={()=> handleSubmitQuestionForQuiz()}
                        className='btn btn-warning'>Save Questions</button>
                    </div>
                }

                    {isPreviewImage === true &&
                        <Lightbox 
                            image={dataImagePreview.url}
                            title={dataImagePreview.title}
                            onClose={()=>setIsPreviewImage(false)}>
                        </Lightbox>}
            </div>
          
        </div>
    )
}
export default QuizQA