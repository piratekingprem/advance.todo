import {React,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
// import 'bootstrap/dist/css/bootstrap.min.css'
import Axios from 'axios';
import validation from './LoginValidation';

function Login() {
    const navigate = useNavigate()
    const [values, setValues] = useState({
        email: '',
        password: ''
      });
      const handleSubmit = (e) =>{
        e.preventDefault();
        setErrors(validation(values));
        if(errors.email === "" && errors.password === ""){
          Axios.post('http://localhost:8000/api/v1/login',values)
          .then(res =>{
            console.log(res);
            const {token}  = res.data;
            sessionStorage.setItem('data',JSON.stringify(res.data))
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            navigate('/todolist')
          })
          .catch(err=>{
            console.log(err);
          })
        }
      }
      const [errors, setErrors] = useState({});
      const handleInput = (e) =>{
        setValues(prev => ({...prev, [e.target.name]: e.target.value }))
      }
  return (
    <div className='d-flex justify-content-center align-item-center bg-gradient-primary vh-100'>
        <div>
            <form action='' onSubmit={handleSubmit} >
                <div>
                    <label htmlFor='email'><strong>E-Mail</strong></label>
                    <input onChange={handleInput} type='email' placeholder='Enter Email' name='email'/>
                    {errors.email && <span className='text-danger'> {errors.email}</span>}
                </div>
                <div>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input onChange={handleInput} type='password' placeholder='Enter password' name='password'/>
                    {errors.password && <span className='text-danger'> {errors.password}</span>}
                </div>
                <button type='submit'><strong>Log In</strong></button>
            </form>
            <Link to='/signup' >Create Account?</Link>
        </div>
      
    </div>
  )
}

export default Login
