import React, { useState } from 'react';

export default function Todo({ todo, toggleTodoStatus, deleteTodo, updateTodoText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(todo.todo);

  const handleUpdate = () => {
    updateTodoText(todo._id, editContent);
    setIsEditing(false);
  };

  return (
    <div className={`todo ${todo.status ? 'done' : ''}`}>
      {isEditing ? (
        <>
          <input
            value={editContent}
            onChange={e => setEditContent(e.target.value)}
          />
          <button onClick={handleUpdate}>Update</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p>{todo.todo}</p>
          <button
            className="todostatus"
            onClick={() => toggleTodoStatus(todo._id, todo.status)}
            aria-label={todo.status ? "Mark as not completed" : "Mark as done"}
          >
            {todo.status ? '✅' : '❌'}
          </button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
        </>
      )}
    </div>
  );
}