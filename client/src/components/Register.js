import React , {Fragment, useState}from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Register = ({setAuth}) => {
    const [inputs,setInputs] = useState({
        name:"",
        email:"",
        password:""
    })
    const {name,email,password} = inputs
    const handleChange = (e) =>{
        setInputs({...inputs,[e.target.name] :e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const data = {name,email,password}
            const response = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
              });
              const parseRes = await response.json()
              if (parseRes.token){
                setAuth(true)
                localStorage.setItem("token",parseRes.token)
                toast.success("Registered Succesfully")
              }else{
                setAuth(false)
                toast.error(parseRes)
              }

            
        } catch (error) {
            console.log(error.message)
          
        }

    }
        
  return (
    <Fragment>
      <nav className="navbar navbar-expand-sm navbar-light py-3">
        <div className="container " >
            <div className="collapse navbar-collapse" id="navmenu">
                <ul className="navbar-nav ms-auto">
                    <li className='nav-item'>
                        <Link to="/login" className="nav-link text-dark font" ><button className='btn btn-block rounded-pill text-light' style={{ background: '#6C63FF' }}>Login</button></Link>
                    </li>
                </ul>
            </div>
        </div>
      </nav>
      <section>
        <div className="container py-2">
          <div className="d-sm-flex justify-content-center">
             <div style={{
              background: '#F0EFFF'
            }}>
              <h1 className="mt-5 text-center">Register</h1>
              <form className="m-5" onSubmit={(e)=> handleSubmit(e)}>
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Name"
                  onChange={(e) => handleChange(e)}
                  className="form-control my-3"
                />
                <input
                  type="text"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => handleChange(e)}
                  className="form-control my-3"
                />
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Password"

                  className="form-control my-3"
                />
                <button style={{
                  background: '#6C63FF'
                }} className="btn btn-block rounded-pill text-light" type='submit'>
                  Submit
                  </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  )
}

export default Register