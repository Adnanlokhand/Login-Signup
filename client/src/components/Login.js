import React , {Fragment, useState}from 'react'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const Login = ({setAuth}) => {
    const [inputs,setInputs] = useState({
        email:"",
        password:""
    })
    const {email,password} = inputs
    const handleChange = (e) =>{
        setInputs({...inputs,[e.target.name] :e.target.value})
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        try {
            const data = {email,password}
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });
            const parseRes = await response.json()
            if(parseRes.token){
                setAuth(true)
                localStorage.setItem("token",parseRes.token)
                toast.success("Logged in Succesfully")
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
                            <Link to="/register" className="nav-link text-dark font" ><button className='btn btn-block rounded-pill text-light' style={{ background: '#6C63FF' }}>Register</button></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <section>
            <div className="container py-2">
                <div className="d-sm-flex justify-content-center">
                    <div className="pt-5" style={{
                        background: '#F0EFFF'
                    }}>
                        <h1 className="mt-4 text-center">Sign in</h1>

                        <form
                            onSubmit={handleSubmit}
                            className="m-5"
                        >
                            <input
                                type="text"
                                name="email"
                                value={email}
                                placeholder="Email"
                                onChange={e => handleChange(e)}
                                className="form-control my-3"
                            />
                            <input
                                type="password"
                                name="password"
                                value={password}
                                placeholder="Password"
                                onChange={e => handleChange(e)}
                                className="form-control my-3"
                            />
                            <button
                                style={{ background: '#6C63FF' }}
                                className="btn btn-block rounded-pill text-light"
                                
                            >
                                Submit</button>
                        </form>
                        
                    </div>
                    
                    
                </div>
            </div>
        </section>
    </Fragment>
  )
}

export default Login