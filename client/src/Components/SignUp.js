import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import validation from './SignupValidation'
import Axios from 'axios'
function SignUp() {
  const [values,setValues] = useState({
     username: "",
     email: "",
     password: ""
  })  
  console.log(values)
  const handleInput = (e) =>{
    setValues(prev => ({...prev,[e.target.name]: e.target.value}))
  }
  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault();
    setErrors(validation(values));
    if(errors.name === '' && errors.email === '' && errors.password === ''){
        Axios.post('http://localhost:8000/api/v1/register',values)
        .then(res =>{
            console.log(res);
            const { token } = res.data;
            Axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
            navigate('/')
        }).catch(err =>{
            console.log(err);
        })
    }
  }
  const [errors,setErrors] = useState({});

  return (
    <div className='d-flex justify-content-center align-item-center bg-gradient-primary vh-100'>
        <div>
            <form action=''  onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='username'><strong>Name</strong></label>
                    <input type='name' placeholder='Enter Name' onChange={handleInput} name='username'/>
                    {errors.name && <span className='text-danger'>{errors.name}</span>}
                </div>
                <div>
                    <label htmlFor='email'><strong>E-Mail</strong></label>
                    <input type='email' placeholder='Enter Email' onChange={handleInput} name='email'/>
                    {errors.email && <span className='text-danger'>{errors.email}</span>}
                </div>
                <div>
                    <label htmlFor='password'><strong>Password</strong></label>
                    <input type='password' placeholder='Enter password' onChange={handleInput} name='password'/>
                    {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <button type='submit'><strong>Sign up</strong></button>
            </form>
            <Link to='/'>Already Have Account?</Link>
        </div>
    </div>
  )
}

export default SignUp
