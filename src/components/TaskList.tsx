import React from 'react'
import { Task } from '../types'
import TaskItem from './TaskItem'

type Filter = 'all' | 'active' | 'completed'

type Props = {
  tasks: Task[]
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
  filter: Filter
  setFilter: (f: Filter) => void
  clearCompleted: () => void
}

const TaskList: React.FC<Props> = ({ tasks, onToggle, onDelete, onEdit, filter, setFilter, clearCompleted }) => {
  const filtered = tasks.filter((t) => {
    if (filter === 'active') return !t.completed
    if (filter === 'completed') return t.completed
    return true
  })

  return (
    <section className="task-list">
      <div className="list-controls">
        <div className="filters">
          <button className={`btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
          <button className={`btn ${filter === 'active' ? 'active' : ''}`} onClick={() => setFilter('active')}>Active</button>
          <button className={`btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className="btn small" onClick={clearCompleted}>Clear Completed</button>
      </div>

      <ul>
        {filtered.length === 0 ? (
          <li className="empty">No tasks</li>
        ) : (
          filtered.map((t) => (
            <TaskItem key={t.id} task={t} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
          ))
        )}
      </ul>
    </section>
  )
}

export default TaskList
