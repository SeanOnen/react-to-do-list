import { useState, useRef, useEffect } from "react"

const FILTERS = ["All", "Active", "Completed"]

function TodoItem({ todo, toggleTodo, deleteTodo }) {
  return (
    <div className={`todo-item ${todo.completed ? "done" : ""}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
        id={`todo-${todo.id}`}
      />
      <label htmlFor={`todo-${todo.id}`}>{todo.title}</label>
      <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
    </div>
  )
}

export default function App() {
  const [todos, setTodos] = useState([
    { id: 1, title: "Learn React components", completed: true },
    { id: 2, title: "Understand useState hook", completed: false },
    { id: 3, title: "Build this todo app", completed: false },
  ])
  const [filter, setFilter] = useState("All")
  const [input, setInput] = useState("")
  const inputRef = useRef(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  function addTodo(e) {
    e.preventDefault()
    const trimmed = input.trim()
    if (!trimmed) return
    setTodos(prev => [...prev, { id: Date.now(), title: trimmed, completed: false }])
    setInput("")
  }

  function toggleTodo(id) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t))
  }

  function deleteTodo(id) {
    setTodos(prev => prev.filter(t => t.id !== id))
  }

  function clearCompleted() {
    setTodos(prev => prev.filter(t => !t.completed))
  }

  const filtered = todos.filter(t => {
    if (filter === "Active") return !t.completed
    if (filter === "Completed") return t.completed
    return true
  })

  const remaining = todos.filter(t => !t.completed).length

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        body {
          min-height: 100vh;
          background: #f5ede0;
          background-image: radial-gradient(ellipse at 20% 20%, #e8d5bc 0%, transparent 50%),
                            radial-gradient(ellipse at 80% 80%, #d4c4a8 0%, transparent 50%);
          font-family: 'DM Sans', sans-serif;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
        }

        .app {
          width: 100%;
          max-width: 520px;
        }

        .header {
          margin-bottom: 2rem;
        }

        .header h1 {
          font-family: 'DM Serif Display', serif;
          font-size: 3rem;
          color: #2c1810;
          line-height: 1;
          letter-spacing: -1px;
        }

        .header h1 em {
          font-style: italic;
          color: #8b5e3c;
        }

        .header p {
          color: #9b7b5e;
          margin-top: 0.4rem;
          font-size: 0.9rem;
          font-weight: 300;
        }

        .card {
          background: #fffdf9;
          border-radius: 20px;
          box-shadow: 0 8px 40px rgba(44, 24, 16, 0.12), 0 2px 8px rgba(44, 24, 16, 0.06);
          overflow: hidden;
        }

        .add-form {
          display: flex;
          gap: 0;
          border-bottom: 1px solid #f0e8dc;
        }

        .add-form input {
          flex: 1;
          padding: 1.1rem 1.4rem;
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.95rem;
          color: #2c1810;
          outline: none;
        }

        .add-form input::placeholder { color: #c4a882; }

        .add-form button {
          padding: 0 1.4rem;
          background: #2c1810;
          color: #f5ede0;
          border: none;
          cursor: pointer;
          font-family: 'DM Serif Display', serif;
          font-size: 1.4rem;
          transition: background 0.2s;
        }

        .add-form button:hover { background: #8b5e3c; }

        .filters {
          display: flex;
          padding: 0.6rem 1rem;
          gap: 0.3rem;
          border-bottom: 1px solid #f0e8dc;
          background: #faf6f0;
        }

        .filters button {
          padding: 0.3rem 0.8rem;
          border-radius: 20px;
          border: none;
          background: transparent;
          color: #9b7b5e;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.8rem;
          font-weight: 500;
          transition: all 0.15s;
        }

        .filters button.active {
          background: #2c1810;
          color: #f5ede0;
        }

        .todo-list {
          min-height: 80px;
        }

        .todo-item {
          display: flex;
          align-items: center;
          padding: 0.9rem 1.4rem;
          border-bottom: 1px solid #f0e8dc;
          gap: 0.9rem;
          transition: background 0.15s;
          animation: slideIn 0.2s ease;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .todo-item:hover { background: #faf6f0; }
        .todo-item:last-child { border-bottom: none; }

        .todo-item input[type="checkbox"] {
          width: 18px; height: 18px;
          accent-color: #8b5e3c;
          cursor: pointer;
          flex-shrink: 0;
        }

        .todo-item label {
          flex: 1;
          font-size: 0.95rem;
          color: #2c1810;
          cursor: pointer;
          transition: all 0.2s;
          line-height: 1.4;
        }

        .todo-item.done label {
          text-decoration: line-through;
          color: #c4a882;
        }

        .delete-btn {
          background: none;
          border: none;
          color: #c4a882;
          cursor: pointer;
          font-size: 0.75rem;
          padding: 0.2rem 0.4rem;
          border-radius: 4px;
          transition: all 0.15s;
          opacity: 0;
        }

        .todo-item:hover .delete-btn { opacity: 1; }
        .delete-btn:hover { background: #f5e0d0; color: #8b3c1c; }

        .empty {
          padding: 2.5rem;
          text-align: center;
          color: #c4a882;
          font-style: italic;
          font-family: 'DM Serif Display', serif;
          font-size: 1rem;
        }

        .footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.8rem 1.4rem;
          background: #faf6f0;
          border-top: 1px solid #f0e8dc;
        }

        .footer span {
          font-size: 0.8rem;
          color: #9b7b5e;
        }

        .clear-btn {
          background: none;
          border: none;
          font-size: 0.8rem;
          color: #9b7b5e;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          text-decoration: underline;
          transition: color 0.15s;
        }

        .clear-btn:hover { color: #2c1810; }
      `}</style>

      <div className="app">
        <div className="header">
          <h1>To<em>do</em></h1>
          <p>Stay on top of your day, one task at a time.</p>
        </div>

        <div className="card">
          <form className="add-form" onSubmit={addTodo}>
            <input
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="What needs to be done?"
            />
            <button type="submit">+</button>
          </form>

          <div className="filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="todo-list">
            {filtered.length === 0
              ? <div className="empty">Nothing here yet…</div>
              : filtered.map(todo => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                />
              ))
            }
          </div>

          <div className="footer">
            <span>{remaining} item{remaining !== 1 ? "s" : ""} left</span>
            <button className="clear-btn" onClick={clearCompleted}>Clear completed</button>
          </div>
        </div>
      </div>
    </>
  )
}