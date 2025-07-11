import { useState, useEffect } from 'react'
import './App.css'
import TaskList from './TaskList'
import TaskItem from './TaskItem'


function App() {
  const [tasks, setTasks] = useState([])
  const [hasLoaded, setHasLoaded] = useState(false)
  const [taskInput, settaskInput] = useState('')
  const [deadline, setDeadline] = useState("")

useEffect(() => {
  const savedTasks = localStorage.getItem('tasks');

  if (savedTasks) {
    try {
      const parsed = JSON.parse(savedTasks);
      if (Array.isArray(parsed)) {
        setTasks(parsed);
      }
    } catch (error) {
      console.error('❌ Failed to parse tasks from localStorage:', error);
    }
  } else {
    console.log('⚠️ No tasks found in localStorage.');
  }
  
  setHasLoaded(true)
}, []);

 useEffect(() => {
  if (hasLoaded) {
    console.log('Saving tasks to localStorage:', tasks);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
}, [tasks, hasLoaded]);

function addTasks(){
  if(!taskInput) return;

  const newTask = {
    id: Date.now(),
    text: taskInput,
    completed: false,
    deadline: deadline || 'no deadline',
    isEditing: false,

     
  }
  setTasks([...tasks, newTask]);
  settaskInput('');
  setDeadline('');
}

function toggleComplete(id){
  const update = tasks.map((task)=> 
  task.id === id ? {...task, completed: !task.completed}: task
  )
  setTasks(update)
}

function startEditing(id){
setTasks(tasks.map((task)=> 
  task.id === id ? {...task, isEditing: true} : task
  ))

}

function saveEditing(id, newText, newDeadline){
  setTasks(tasks.map((task) => task.id === id ? {...task, text: newText, deadline: newDeadline || "no deadline", isEditing: false,} : task)
 )
}

function deleteTasks(id){
  setTasks(tasks.filter((task)=> task.id != id))
}
  

  return (
    <>
      <div style={{padding: "20px", fontFamily: "Arial", color: 'black', background: 'linear-gradient(to right, #e0c3fc, #8ec5fc)', borderRadius: '8px', maxWidth: '600px', margin: 'auto', boxShadow: '0 4px 12px', textAlign: 'center'
      }}>
        <h1 style={{marginBottom:'15px'}}>Task Manager</h1>

        <input 
        style={{fontSize: '20px', padding: '2px 10px', borderRadius: '8px', }}
        type="text" 
        value={taskInput}
        onChange={(e) => settaskInput(e.target.value)}
        placeholder='enter task..'
         />

         <input 
         style={{fontSize: '15px', padding: '6px 0 4px 5px', borderRadius: '8px', marginLeft: '5px'}}
         type="date"
         value={deadline}
         onChange={(e) => setDeadline(e.target.value)}
         />

        <button style={{fontSize: '15px', backgroundColor:'green', boxShadow: '' , padding: '7px 9px 6px 10px', margin:'5px'}} onClick={addTasks}>Add Task</button>

        <TaskList tasks={tasks} toggleComplete={toggleComplete} startEditing = {startEditing} saveEditing = {saveEditing} deleteTasks={deleteTasks} 
        
        />
      </div>
    </>
  )
}

export default App
