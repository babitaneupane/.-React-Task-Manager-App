import React, { useState, FormEvent } from 'react'

type Props = {
  onAdd: (text: string) => void
}

const TaskInput: React.FC<Props> = ({ onAdd }) => {
  const [text, setText] = useState('')

  const submit = (e?: FormEvent) => {
    e?.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setText('')
  }

  return (
    <form className="task-input" onSubmit={submit}>
      <input
        aria-label="Add task"
        placeholder="Add a new task and press Enter"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  )
}

export default TaskInput
