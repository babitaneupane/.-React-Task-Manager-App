import React from 'react'
import { Task } from '../types'

type Props = {
  task: Task
  onToggle: (id: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, text: string) => void
}

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
  const handleEdit = () => {
    const newText = prompt('Edit task', task.text)
    if (newText === null) return
    const trimmed = newText.trim()
    if (!trimmed) return
    onEdit(task.id, trimmed)
  }

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="text">{task.text}</span>
      </label>
      <div className="actions">
        <button className="btn small" onClick={handleEdit} aria-label="Edit">Edit</button>
        <button className="btn small danger" onClick={() => onDelete(task.id)} aria-label="Delete">Delete</button>
      </div>
    </li>
  )
}

export default TaskItem
