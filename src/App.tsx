import { useEffect, useState } from 'react';
import './App.css';
type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTodo.trim() === '') return;

    setTodos([...todos, { id: Date.now(), title: newTodo, completed: false }]);
    setNewTodo('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    const storedTodos = localStorage.getItem('TODOS');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('TODOS', JSON.stringify(todos));
  }, [todos]);

  return (
    <>
      <h1>Todo List</h1>
      <form onSubmit={addTodo}>
        <input placeholder="Add new todo +" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} />
              {todo.title}
            </label>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
