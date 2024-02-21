import React , {Fragment, useEffect, useState}from 'react'
import { toast } from 'react-toastify'

const Dashboard = ({setAuth}) => {
    const handleLogout = (e) =>{
        e.preventDefault()
        setAuth(false)
        localStorage.removeItem("token")
        toast.success("Logged Out Successfully")
    }
    const getName  = async() => {
        const response = await fetch("http://localhost:5000/dashboard", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              token : localStorage.token
            }
          });
          const parseRes = await response.json()
          if(response.status === 200){
            setName(parseRes)

          }else{
            toast.error(parseRes)
          }


          
    }
    const [name,setName] = useState("Adnan")
    useEffect(() => {
        getName()
    })
    return (
        <Fragment>
            <div>Dashboard {name}</div>
            <button style={{
                  background: '#6C63FF'
                }} className="btn btn-block rounded-pill text-light" type='submit' onClick={(e) => {handleLogout(e)}}>Logout</button>

        </Fragment>
    )
}

export default Dashboard