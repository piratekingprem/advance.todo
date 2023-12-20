import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import moment from 'moment'
// import {} from 'moment-timezone';
// import styled from 'styled-components';
import '../Component_styles/ToDoList.css'

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const user = JSON.parse(sessionStorage.getItem('data')).userID;
  const postData = { task: "", user_id: user };
  const [inputData, setInputData] = useState(postData);  
  const status = { status: 1 };
  const [editing,setEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({ id: null, value: '' });
  const [darkMode, setDarkMode] = useState(false);
  const [previousDateTask, setPreviousDate] = useState();
  const handleData = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  }
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const darkModeStyles = {
    backgroundColor: darkMode ? '#333' : '#fff',
    color: darkMode ? '#fff' : '##f0f0f0',
  };
  const handleDateOfPreviousTask = (e) => {
    const selectedDate = e.target.value;
    setPreviousDate(selectedDate);
  };


  const handleTaskEdit = (taskId) => {
    // Find the task to edit based on its ID
    const taskToEdit = tasks.find((task) => task.id === taskId);
    // Set the edited task in the state
    setEditedTask({ id: taskId, value: taskToEdit.task });
    setEditing(true);
  };

  const handleTaskUpdate = () => {
    // Make sure the edited task is not empty
    if (editedTask.value.trim() !== '') {
      // Send a PUT request to update the task
      Axios.put(`http://localhost:8000/api/v1/task/${editedTask.id}`, { task: editedTask.value })
        .then((response) => {
          console.log(response);
          // Reset the edited task state and fetch the updated list of tasks
          setEditedTask({ id: null, value: '' });
          setEditing(false);
          fetchTasks();
        })
        .catch((error) => {
          console.error('Error updating task:', error);
        });
    } else {
      console.warn('Task cannot be empty');
    }
  };
  const handleTaskDelete = (e) =>{
      Axios.delete(`http://localhost:8000/api/v1/task/${e}`)
      .then(
        fetchTasks()
      ).catch((error)=>{
        console.log(error);
      })
  }
  const todayDate = moment().format('YYYY-MM-DD');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputData.task.trim() !== '') {
      Axios.post('http://localhost:8000/api/v1/task', inputData)
        .then((response) => {
          console.log(response);
          // Clear the input field after successfully adding a task
          setInputData({ task: '', user_id: user }); // Include user_id in the state
          // Fetch the updated list of tasks
          fetchTasks();
        }).catch((error) => {
          console.error('Error adding task:', error);
        });
    } else {
      // Handle the case where the task input is empty
      console.warn('Task cannot be empty');
    }
  };
  const fetchTasks = async () => {
    try {
      const { data } = await Axios.get(`http://localhost:8000/api/v1/task/${user}`);
      const arrayOfTask = data.data;

      setTasks(arrayOfTask); // Store the entire array of tasks
      console.log(arrayOfTask);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChangeOfCheckBox = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      Axios.put(`http://localhost:8000/api/v1/task/status/${e.target.value}`, status)
        .then((response) => {
          console.log(response);
          // Fetch the updated list of tasks
          fetchTasks();
        })
        .catch((error) => {
          console.error('Error adding task:', error);
        });
    } else {
      console.log("not checked")
    }
  }

  const filteredTask = tasks.filter(task => {
    const taskDate = moment(task.created_at).startOf('day').format('YYYY-MM-DD');
    return todayDate === taskDate;
  })

  const filteredPendingWork = tasks.filter(task => {
    let yesterday = moment().add(-1, 'days').format('YYYY-MM-DD');
    const taskDate = moment(task.created_at).startOf('day').format('YYYY-MM-DD');
    return (task.status === 0 && yesterday === taskDate);
  })
  let Todayscontent;

  if (filteredTask.length > 0) {
     Todayscontent = (
      <div>
        <h3>Today's task</h3>
        {filteredTask.map((task) => (
          <div key={task.id} className="task-container">
            {editing && editedTask.id === task.id ? (
              <>
                <input
                  type="text"
                  value={editedTask.value}
                  onChange={(e) => setEditedTask({ ...editedTask, value: e.target.value })}
                />
                <button onClick={handleTaskUpdate}>Update</button>
              </>
            ) : (
              <>
                <input
                  type="checkbox"
                  onChange={handleChangeOfCheckBox}
                  name="task.task"
                  value={task.id}
                />
                <label htmlFor="task.task" id="checkbox-label">
                  {task.task}
                </label>
                <i
                  title="edit task"
                  onClick={() => handleTaskEdit(task.id)}
                  className="fa fa-edit"
                  style={{ fontSize: '50%', color: '#0025ff91' }}
                ></i>
                <i
                  title="delete"
                  onClick={() => handleTaskDelete(task.id)}
                  className="fa fa-trash-o"
                  style={{ color: 'red', fontSize: '50%' }}
                ></i>
              </>
            )}
          </div>
        ))}
      </div>
    );

  } else {
    Todayscontent = (
      <div>
        <h3>No task for today</h3>
      </div>
    )
  }

  let pendingWork;
  if (filteredPendingWork.length > 0) {
    pendingWork = (
      <div>
        <h3>Yesterday Pending task</h3>
        {filteredPendingWork.map(task => (
          <div key={task.id}>
            <p>{task.task}</p>
          </div>
        ))}
      </div>
    )
  } else {
    pendingWork = (
      <div>
        <h3>No pending task</h3>
      </div>
    )
  }

  const filteredPreviousDateTask = tasks.filter(task => {
    const taskDate = moment(task.created_at).startOf('day').format('YYYY-MM-DD');
    return previousDateTask === taskDate;
  })

  let selectedDateTask;
  if (filteredPreviousDateTask.length > 0) {
    selectedDateTask = (
      <div>
        <h3>Task Found</h3>
        {filteredPreviousDateTask.map(task => {
          return <p>{task.task}</p>
        })}
      </div>
    )
  } else {
    selectedDateTask = (
      <div>
        <h3>No Task Found</h3>
      </div>
    )
  }
  // const user = 

  return (
    <div style={darkModeStyles}>    
    <div className='userBox'>
        <i class="fa fa-user"></i>  
    <span style={{padding: '10px '}}> 
        {JSON.parse(sessionStorage.getItem('data')).username}
    </span>
    <button onClick={toggleDarkMode}>
          {darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        </button>
    </div>
    <div className='container' >

      <h2 className='heading'>To-Do List</h2>
      
      <div className='grid-container'>
        <div className='grid-item'>
          <div className='input-container'>
            <input type='text' name='task' value={inputData.task} onChange={handleData} />
            <button onClick={handleSubmit}>+</button>
          </div>
          <ul>
            {Todayscontent}
          </ul>
        </div>
        <div className='grid-item'>
          {pendingWork}
        </div>
        <div className='grid-item'>
          <input className='input-container' id='date-input' type="date" name='dateOfPrevious' onChange={handleDateOfPreviousTask}></input>
          {selectedDateTask}
        </div>
      </div>
    </div>
    </div>
  );
}

export default ToDoList;


