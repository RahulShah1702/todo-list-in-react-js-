import React from 'react'
import TaskItem from './TaskItem'


function TaskList({tasks, toggleComplete, startEditing, saveEditing, deleteTasks}) {
if(!Array.isArray(tasks) || tasks.length === 0) return <p>no task yet</p>
  return (
    <ul style={{listStyle: 'none', padding: 0}}>
        {tasks.map((task) => (
            <TaskItem
                key= {task.id}
                task = {task}
                toggleComplete= {toggleComplete}
                startEditing = {startEditing}
                saveEditing = {saveEditing}
                deleteTasks= {deleteTasks}
                />
        ))}
    </ul>
  )
}

export default TaskList