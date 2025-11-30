import { useEffect, useState } from 'react'
import './App.css'
import type { Task } from './types'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'

const STORAGE_KEY = 'rtm.tasks'

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? (JSON.parse(raw) as Task[]) : []
    } catch {
      return []
    }
  })
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
    } catch {
      // ignore
    }
  }, [tasks])

  const addTask = (text: string) => {
    const newTask: Task = { id: crypto.randomUUID(), text, completed: false, createdAt: Date.now() }
    setTasks((s) => [newTask, ...s])
  }

  const toggle = (id: string) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const remove = (id: string) => {
    setTasks((s) => s.filter((t) => t.id !== id))
  }

  const edit = (id: string, text: string) => {
    setTasks((s) => s.map((t) => (t.id === id ? { ...t, text } : t)))
  }

  const clearCompleted = () => {
    setTasks((s) => s.filter((t) => !t.completed))
  }

  const remaining = tasks.filter((t) => !t.completed).length

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
        <p className="subtitle">Small, fast, and local — manage tasks quickly.</p>
      </header>

      <main>
        <TaskInput onAdd={addTask} />

        <div className="meta">
          <span>{remaining} remaining</span>
          <button className="btn ghost" onClick={() => setTasks([])}>Clear All</button>
        </div>

        <TaskList
          tasks={tasks}
          onToggle={toggle}
          onDelete={remove}
          onEdit={edit}
          filter={filter}
          setFilter={setFilter}
          clearCompleted={clearCompleted}
        />
      </main>

      <footer>
        <small>Saved to localStorage · Minimal design</small>
      </footer>
    </div>
  )
}

export default App
