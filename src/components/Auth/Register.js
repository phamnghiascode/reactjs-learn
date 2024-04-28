import { useState } from 'react'
import './Login.scss'
import {  useNavigate } from 'react-router-dom'
import { postRegister } from '../../services/apiServices'
import {toast} from "react-toastify"
import Language from '../Header/Language'
const Register = (props) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const navigate = useNavigate()
    const validateEmail = (email) => {
        return String(email)
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
      };
    const handleRegister =async ()=> {
        //validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail){
            toast.error("Invalid email")
            return
        }
        if(!password) {
            toast.error("Invalid password")
            return
        }
        //submit
        let data = await postRegister(email, password, username)
        // console.log("register data: >>>>> ", data)
        if (data && data.EC === 0) {
            toast.success(data.EM)
            navigate("/login")
           
        }
        if (data && +data.EC !== 0) {
            toast.error(data.EM)
        }
    }
    return (
        <div className="login-container">
           <div className='header'>
           <span>Have one?</span> 
           <button onClick={()=>navigate("/login")}>Sign in</button>
           <Language/>
           </div>
           <div className='title col-4 mx-auto'>
            QuyZzz
           </div>
           <div className='welcome col-4 mx-auto'>
            Let start our journey!
           </div>
           <div className='content-form col-4 mx-auto'>
            <div className='form-group'>
                <label>Email</label>
                <input 
                type={"email"} 
                className="form-control"
                value={email}
                onChange={(event)=> setEmail(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label>Password</label>
                <input 
                type={"password"} 
                className="form-control"
                value={password}
                onChange={(event)=> setPassword(event.target.value)}/>
            </div>
            <div className='form-group'>
                <label>User name</label>
                <input 
                type={"text"} 
                className="form-control"
                value={username}
                onChange={(event)=> setUsername(event.target.value)}/>
            </div>
            <span className='forgot-password'>Forgot password</span>
            <div>
            <button className='btn-submit'
            onClick={()=> handleRegister()}>Create now</button>
            </div>
            <div className='text-center'>
                <span className='back' onClick={()=> {navigate("/")}}> &#60;&#60; Go to Homepage</span>
            </div>
           </div>
        </div>
    )
}
export default Register