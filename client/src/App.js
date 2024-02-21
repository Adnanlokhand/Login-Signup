
import { Fragment, useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router ,
    Navigate, Route, Routes
} from "react-router-dom"
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const [isAuthenticated,setAuthenticated] = useState(false)
  const setAuth = (bool) => {
    setAuthenticated(bool)
  }
  const handleIsAuthenticated = async () => {
    try {
      const response = await fetch("http://localhost:5000/auth/is-verify", {
        method: "GET",
        headers: {
          token : localStorage.token
        }
      })
      const parseRes = await response.json()
      parseRes === true ? setAuthenticated(true):setAuthenticated(false)


    } catch (error) {
      console.log(error.message)
    }
  }
  useEffect(()=> {
    handleIsAuthenticated()
  })
  return (
    <div className="App">
      <Fragment>
        <Router>
        <div className='container'>
            <ToastContainer/>
            <Routes>
              <Route exact path='/login' element = {!isAuthenticated ?<Login  setAuth = {setAuth} />:<Navigate to ="/dashboard" />} />
              <Route exact path='/register' element = {!isAuthenticated? <Register  setAuth = {setAuth}/> : <Navigate to ="/login"/>} />
              <Route exact path='/dashboard' element = {isAuthenticated? <Dashboard  setAuth = {setAuth}/>: <Navigate to ="/login"/>} />
            </Routes>
        </div>
        </Router>
      </Fragment>
    </div>
  );
}

export default App;
