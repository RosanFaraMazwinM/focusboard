
import {useState} from 'react'

const TaskForm = ({task, onSave, onCancel}) => {
  const [title, setTitle] = useState(task?.title || '')
  const [description, setDescription] = useState(task?.description || '')
  const [category, setCategory] = useState(task?.category || 'Work')
  const [status, setStatus] = useState(task?.status || 'To do')
  const [priority, setPriority] = useState(task?.priority || 'Medium')
  const [dueDate, setDueDate] = useState(task?.dueDate || '')
  const [error, setError] = useState('')

  const handleSubmit = event => {
    event.preventDefault()

    if (!title.trim()) {
      setError('Please enter a task title.')
      return
    }

    if (!dueDate) {
      setError('Please select a due date.')
      return
    }

    onSave({
      id: task ? task.id : Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      status,
      priority,
      dueDate,
    })
  }

  return (
    <div className="modal-overlay">
      <form className="task-form" onSubmit={handleSubmit}>
        <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
        <p className="form-subtitle">
          Add the details of your task below.
        </p>

        <label htmlFor="task-title">Task Title *</label>
        <input
          id="task-title"
          value={title}
          onChange={event => {
            setTitle(event.target.value)
            setError('')
          }}
          placeholder="Enter task title"
        />
        {error && <p className="form-error" role="alert">{error}</p>}

        <label htmlFor="task-description">Description</label>
        <textarea
          id="task-description"
          value={description}
          onChange={event => setDescription(event.target.value)}
          placeholder="Describe your task"
          rows="3"
        />

        <label htmlFor="task-category">Category</label>
        <select
          id="task-category"
          value={category}
          onChange={event => setCategory(event.target.value)}
        >
          <option>Work</option>
          <option>Development</option>
          <option>Learning</option>
          <option>Personal</option>
          <option>Design</option>
        </select>

        <div className="form-two-columns">
          <div>
            <label htmlFor="task-status">Status</label>
            <select
              id="task-status"
              value={status}
              onChange={event => setStatus(event.target.value)}
            >
              <option>To do</option>
              <option>In progress</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label htmlFor="task-priority">Priority</label>
            <select
              id="task-priority"
              value={priority}
              onChange={event => setPriority(event.target.value)}
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
        </div>

        <label htmlFor="task-date">Due Date *</label>
        <input
          id="task-date"
          type="date"
          value={dueDate}
          onChange={event => {
            setDueDate(event.target.value)
            setError('')
          }}
        />

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button type="submit" className="add-button">
            {task ? 'Save Changes' : 'Create Task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
