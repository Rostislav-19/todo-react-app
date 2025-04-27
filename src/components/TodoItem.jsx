import React from 'react';

export default function TodoItem({ todo, onToggle, isCompleted }) {
  return (
    <div className="todo-item">
      <span>{todo.title}</span>
      
      {!isCompleted && todo.startDate && (
        <small> - Started on {new Date(todo.startDate).toLocaleDateString()}</small>
      )}

      {isCompleted && todo.completedDate && (
        <small> - Completed on {new Date(todo.completedDate).toLocaleDateString()}</small>
      )}

      <button onClick={() => onToggle(todo.id)}>
        {isCompleted ? 'Uncomplete' : 'Complete'}
      </button>
    </div>
  );
}

