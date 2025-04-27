import React, { useState, useEffect } from 'react';
import { fetchTodos } from './services/api';
import FilterDropdown from './components/FilterDropdown';
import SortDropdown from './components/SortDropdown';
import TodoList from './components/TodoList';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [sortOrderUncompleted, setSortOrderUncompleted] = useState('asc');
  const [sortOrderCompleted, setSortOrderCompleted] = useState('asc');
  const [sortOrderUncompletedDate, setSortOrderUncompletedDate] = useState('asc');
  const [sortOrderCompletedDate, setSortOrderCompletedDate] = useState('asc');

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    } else {
      fetchTodos().then((data) => {
        const withCompletedDate = data.map((todo) => ({ ...todo, completedDate: null }));
        setTodos(withCompletedDate);
      });
    }
  }, []);

  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const handleToggle = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed: !todo.completed,
              completedDate: !todo.completed ? new Date().toISOString() : null,
            }
          : todo
      )
    );
  };

  const getFilteredTodos = (completed) => {
    let filtered = todos.filter((todo) => todo.completed === completed);
    if (selectedUser) {
      filtered = filtered.filter((todo) => todo.userId.toString() === selectedUser);
    }

    if (completed) {
      filtered.sort((a, b) => {
        if (sortOrderCompleted === 'asc') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title); 
        }
      });

      filtered.sort((a, b) => {
        if (!a.completedDate) return 1;
        if (!b.completedDate) return -1;
        return sortOrderCompletedDate === 'asc'
          ? new Date(a.completedDate) - new Date(b.completedDate)
          : new Date(b.completedDate) - new Date(a.completedDate);
      });
    } else {
      filtered.sort((a, b) => {
        return sortOrderUncompleted === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      });

      filtered.sort((a, b) => {
        return sortOrderUncompletedDate === 'asc'
          ? new Date(a.startingDate) - new Date(b.startingDate)
          : new Date(b.startingDate) - new Date(a.startingDate);
      });
    }

    return filtered;
  };

  const uniqueUsers = [...new Set(todos.map((todo) => todo.userId))];

  return (
    <div className="app">
      <h1>Todo React App</h1>
      <div className="controls">
        <FilterDropdown users={uniqueUsers} selectedUser={selectedUser} onChange={setSelectedUser} />
      </div>
      <div className="sections">
        <div className="section">
          <h2>Uncompleted Todos</h2>
          <div className="sort-dropdown">
            <SortDropdown
              options={[
                { value: 'asc', label: 'A-Z' },
                { value: 'desc', label: 'Z-A' },
              ]}
              selectedOption={sortOrderUncompleted}
              onChange={setSortOrderUncompleted}
            />
            <SortDropdown
              options={[
                { value: 'asc', label: 'Oldest First' },
                { value: 'desc', label: 'Newest First' },
              ]}
              selectedOption={sortOrderUncompletedDate}
              onChange={setSortOrderUncompletedDate}
            />
          </div>
          <TodoList todos={getFilteredTodos(false)} onToggle={handleToggle} isCompleted={false} />
        </div>
        <div className="section">
          <h2>Completed Todos</h2>
          <div className="sort-dropdown">
            <SortDropdown
              options={[
                { value: 'asc', label: 'A-Z' },
                { value: 'desc', label: 'Z-A' },
              ]}
              selectedOption={sortOrderCompleted}
              onChange={setSortOrderCompleted}
            />
            <SortDropdown
              options={[
                { value: 'asc', label: 'Oldest First' },
                { value: 'desc', label: 'Newest First' },
              ]}
              selectedOption={sortOrderCompletedDate}
              onChange={setSortOrderCompletedDate}
            />
          </div>
          <TodoList todos={getFilteredTodos(true)} onToggle={handleToggle} isCompleted={true} />
        </div>
      </div>
    </div>
  );
}