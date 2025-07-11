import React, { useState } from 'react';

function TaskItem({ task, toggleComplete, startEditing, saveEditing, deleteTasks }) {
  const [editText, seteditText] = useState(task.text);
  const [editdeadline, seteditdeadline] = useState(task.deadline);

  return (
    <li
      style={{
        background: "#f4f4f4",
        margin: "10px 0",
        padding: '0 8px',
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => toggleComplete(task.id)}
      />

      {!task.isEditing ? (
        <>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              margin: "0 10px"
            }}
          >
            {task.text}
          </span>

          <small
            style={{
              marginLeft: "10px",
              fontSize: '15px',
              backgroundColor: "yellow",
              padding: '4px'
            }}
          >
            Deadline: {task.deadline}
          </small>

          <button
            style={{
              fontSize: '15px',
              backgroundColor: '#ffffff',
              padding: '7px 9px',
              margin: '5px'
            }}
            onClick={() => startEditing(task.id)}
          >
            Edit
          </button>
        </>
      ) : (
        <>
          <input
            type="text"
            value={editText}
            onChange={(e) => seteditText(e.target.value)}
            style={{ marginRight: '5px' }}
          />
          <input
            type="date"
            value={editdeadline}
            onChange={(e) => seteditdeadline(e.target.value)}
            style={{ marginRight: '5px' }}
          />
          <button
            onClick={() => saveEditing(task.id, editText, editdeadline)}
            style={{ marginLeft: '10px', color: 'green', margin: '5px' }}
          >
            Save
          </button>
        </>
      )}

      <button
        onClick={() => deleteTasks(task.id)}
        style={{ color: 'red', margin: '5px', padding: '7px 9px' }}
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;
