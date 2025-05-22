import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './TodoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:5000/todos');
      setTodos(res.data);
    } catch (err) {
      setMessage({ text: 'Failed to fetch todos', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async () => {
    if (!title.trim()) {
      setMessage({ text: 'Title is required', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post('http://localhost:5000/todos', {
        title,
        content
      });
      setTodos([...todos, res.data]);
      setTitle('');
      setContent('');
      setMessage({ text: 'Todo added successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to add todo', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      setTodos(todos.filter(todo => todo.id !== id));
      setMessage({ text: 'Todo deleted successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to delete todo', type: 'error' });
    }
  };

  const handleEdit = async (id, newTitle, newContent) => {
    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        title: newTitle,
        content: newContent
      });
      const updated = res.data;
      setTodos(prev =>
        prev.map(todo => (todo.id === id ? updated : todo))
      );
      setMessage({ text: 'Todo updated successfully', type: 'success' });
    } catch (err) {
      setMessage({ text: 'Failed to update todo', type: 'error' });
    }
  };

  const handleToggleComplete = async (id) => {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    try {
      const res = await axios.put(`http://localhost:5000/todos/${id}`, {
        completed: !todo.completed,
      });
      const updated = res.data;
      setTodos(prev =>
        prev.map(t => (t.id === id ? updated : t))
      );
    } catch (err) {
      setMessage({ text: 'Failed to update todo status', type: 'error' });
    }
  };

  const summarizeTodos = async () => {
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/summarize');
      setMessage({ text: '✅ Summary sent to Slack successfully!', type: 'success' });
    } catch (err) {
      setMessage({ text: '❌ Failed to send summary to Slack', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => setMessage({ text: '', type: '' }), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="net-bg">
      {/* Navbar */}
      <nav className="navbar navbar-center">
        <div className="navbar-brand">
          <span className="brand-gradient">Todo Summary Assistant </span>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="hero-gradient">Organize</span> Your Day<br />with <span className="hero-gradient">AI</span> Power
          </h1>
          <p className="hero-subtitle">
            Manage your tasks, get instant AI-powered summaries, and stay productive. <br />
            <span className="hero-highlight">Beautiful. Fast. Smart.</span>
          </p>
        </div>
      </header>

      {/* Main App Container */}
      <div className="app-container">
        <div className="todo-form">
          <input
            type="text"
            className="todo-input"
            placeholder="Add todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          />
          <textarea
            className="todo-textarea"
            placeholder="Add todo details..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button
            className="btn btn-primary"
            onClick={addTodo}
            disabled={isSubmitting}
          >
            {isSubmitting ? <span className="loading"></span> : 'Add Todo'}
          </button>
        </div>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        {loading ? (
          <div className="text-center">
            <span className="loading"></span>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onDelete={deleteTodo}
            onEdit={handleEdit}
            onToggleComplete={handleToggleComplete}
          />
        )}

        <button
          className="btn btn-secondary"
          onClick={summarizeTodos}
          disabled={isSubmitting || todos.length === 0}
          style={{ marginTop: '2rem', width: '100%' }}
        >
          {isSubmitting ? (
            <span className="loading"></span>
          ) : (
            '📤 Send Summary to Slack'
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
