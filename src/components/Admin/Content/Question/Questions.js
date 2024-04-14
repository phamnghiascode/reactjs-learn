import { useState } from 'react';
import Select from 'react-select';
import "./Questions.scss"
import { FaPlus, FaMinus } from "react-icons/fa";
const Questions = (props) => {
    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
      ];

      const [selectedQuiz, setSelectedQuiz] = useState({})
    return(
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className='col-6 form-group'>
                    <label>Select quiz:</label>
                    <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={options}
                   
                />
                </div>
                
                <div className='mt-3'>
                    Add questions
                </div>
                <div>
                    <div className='question-content'>
                        
                        <div className="form-floating description">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label>Description</label>
                        </div>
                        <div className='group-upload'>
                            <label className='label-up'>Upload Image</label>
                            <input type='file' hidden/>
                            <span>No image uploaded</span>
                        </div>
                        <div className='btn-add'>
                            <span>
                                <FaPlus className='icon-add' />
                            </span>
                            <span>
                                <FaMinus className='icon-remove' />
                            </span>
                        </div>
                    </div>
                    <div className='answers-content'>
                        <input 
                            className="form-check-input iscorrect" 
                            type="checkbox"/>
                         <div className="form-floating answer-name">
                            <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                            <label>Answer 1</label>
                        </div>
                        <div className='btn-group'>
                            <span>
                                <FaPlus className='icon-add' />
                            </span>
                            <span>
                                <FaMinus className='icon-remove' />
                            </span>
                        </div>
                    </div>
                </div>
               
            </div>
        </div>
    )
}
export default Questions