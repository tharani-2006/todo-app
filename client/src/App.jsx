import './style.css';
import Todo from './Todo.jsx';
import { useEffect, useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [content, setContent] = useState('');

  // Fetch todos
  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line
  }, []);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/todos');
      const todos = await res.json();
      setTodos(todos);
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
      setTodos([]);
    }
    setLoading(false);
  };

  const createNewTodo = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: content }),
      });

      if (!res.ok) throw new Error('Network response was not ok');

      await fetchTodos();
      setContent('');
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  // Toggle status of a single todo
  const toggleTodoStatus = async (id, currentStatus) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: !currentStatus }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      await fetchTodos();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  // Delete a todo
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Network response was not ok');
      setTodos(todos => todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const updateTodoText = async (id, newText) => {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todo: newText }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      await fetchTodos();
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  return (
    <main className="container">
      <h1>Thrx's Todos</h1>

      <form className="todo-form" onSubmit={createNewTodo} >
        <input type="text" value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a new todo"
          required
        />
        <button type="submit">Add</button>
      </form>

      <div className="todos">
        {loading ? (
          <p>Loading...</p>
        ) : todos.length > 0 ? (
          todos.map((todo) => (
            <Todo
              key={todo._id}
              todo={todo}
              toggleTodoStatus={toggleTodoStatus}
              deleteTodo={deleteTodo}
              updateTodoText={updateTodoText}
            />
          ))
        ) : (
          <p>No todos found.</p>
        )}
      </div>
    </main>
  );
}