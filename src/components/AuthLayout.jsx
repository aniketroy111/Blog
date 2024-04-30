import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const AuthLayout = ({children,authentication=true}) => {
    const [loader,setLoader] = useState(true);
    const navigate = useNavigate();
    const authStatus = useSelector(state=>state.status);


    useEffect(()=>{
        if(authStatus){
            navigate("/");
        }
        else if(authStatus===false){
            navigate("/login");
        }
        // const authValue = authStatus===true? true:false;
        // if(authentication && authStatus!==authentication){
        //     navigate('/login');
        // }
        // else if(!authentication && authStatus!==authentication){
        //     navigate('/');
        // }

        setLoader(false);

    },[authStatus,navigate,authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>;
}

export default AuthLayout
