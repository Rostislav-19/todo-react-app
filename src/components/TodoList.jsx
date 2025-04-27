import React from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos, onToggle, isCompleted }) {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} onToggle={onToggle} isCompleted={isCompleted} />
      ))}
    </div>
  );
}