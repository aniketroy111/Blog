import { useEffect, useState, } from 'react'
import {useDispatch} from 'react-redux'
import authService from './appwrite/auth.js'
import {login,logout} from './feature/authentication/authSlice'
import './App.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import {Outlet} from 'react-router-dom'

function App() {
  const [loading,setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=>setLoading(false))
  },[])

  return !loading ? (
    <div className=' min-h-screen flex  justify-between bg-gray-400'>
        <div className='w-full block'>
          <Header/>
          <main>
            <Outlet/>
          </main>
          <Footer/>

        </div>
    </div>
  ) : (null)
}

export default App
