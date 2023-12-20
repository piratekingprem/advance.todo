// import { useEffect, useState } from 'react';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp';
import ToDoList from './Components/ToDoList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}></Route>
          <Route path='/todolist' element={<ToDoList/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
        </Routes>
      </BrowserRouter>
     
      
    </div>
  );
}

export default App;
