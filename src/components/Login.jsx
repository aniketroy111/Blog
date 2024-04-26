import React,{useState} from 'react'
import { Link,useNavigate } from 'react-router-dom'
import {Button,Input,Logo} from './index'
import { login as authLogin } from '../feature/authentication/authSlice'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { set, useForm } from 'react-hook-form'


const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [error,setError] = useState("");

    const login = async(data)=>{
        setError("");
        try {
            const session = await authService.login(data);
            if(session){
                const userData = await authService.getCurrentUser();
                if(userData) dispatch(authLogin(userData));
                navigate('/');
            }

        } catch (error) {
            setError(error.message);
        }
    }

  return (
    <div>
      
    </div>
  )
}

export default Login
