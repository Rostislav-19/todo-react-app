export const fetchTodos = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/todos');
  if (!res.ok) {
    throw new Error('Failed to fetch todos');
  }
  const todos = await res.json();

  const todosWithDate = todos.map(todo => ({
    ...todo,
    startDate: todo.completed ? null : new Date().toISOString(),
  }));

  return todosWithDate;
};