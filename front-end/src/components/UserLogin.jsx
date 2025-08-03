import React from 'react'
import { FaReact } from 'react-icons/fa6'
import '../style.css'
import { useState } from 'react'
import _ from 'lodash'
const UserLogin = ({setUser}) => {
    const [userName,setUserName] = useState()
    const handleUser=() =>{
        if(!userName) return;
        localStorage.setItem('user',userName)
        setUser(userName)
        localStorage.setItem('avatar',"https://tse3.mm.bing.net/th/id/OIP.qw42y3S9KyR2Wn9JVAWArgHaHa?pid=Api&P=0&h=180")
    }
  return (
    <div className='login_container'>
        <div className='login_title'>
            <FaReact className='login_icon'/>
            <h1>Chat App</h1>
        </div>
        <div className='login_form'>
            <input type="text" placeholder='Enter a unique name' onChange={(e) => setUserName(e.target.value)} />
            <button onClick={handleUser}>Login</button>
        </div>
    </div>
  )
}

export default UserLogin
