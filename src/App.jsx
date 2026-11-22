import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  CheckSquare,
  CalendarDays,
  Settings,
  Plus,
  Search,
  Bell,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  ListTodo,
  TrendingUp,
  Pencil,
  Trash2,
} from "lucide-react";

import sampleTasks from "./data/sampleTasks";
import TaskForm from "./components/TaskForm";
import "./index.css";

const notes = [
  {
    title: "Stay focused!",
    description: "Small steps every day lead to big achievements.",
  },
  {
    title: "Prioritize your work",
    description: "Focus on the most important task first.",
  },
  {
    title: "Take a short break",
    description: "Rest your mind and return with fresh energy.",
  },
];

function App() {
 const [tasks, setTasks] = useState(() => {
  try {
    const savedTasks = localStorage.getItem('focusboard-tasks')

    return savedTasks ? JSON.parse(savedTasks) : sampleTasks
  } catch (error) {
    console.error('Unable to load saved tasks:', error)
    return sampleTasks
  }
})

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [activeNote, setActiveNote] = useState(0);
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

 useEffect(() => {
  try {
    localStorage.setItem('focusboard-tasks', JSON.stringify(tasks))
  } catch (error) {
    console.error('Unable to save tasks:', error)
  }
}, [tasks])

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed",
  ).length;

  const progressTasks = tasks.filter(
    (task) => task.status === "In progress",
  ).length;

  const percentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesTab = activeTab === "All" || task.status === activeTab;

    const matchesPriority =
      priorityFilter === "All" || task.priority === priorityFilter;

    return matchesSearch && matchesTab && matchesPriority;
  });

  const changeStatus = (id, status) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === id ? { ...task, status } : task)),
    );
  };

  const saveTask = (task) => {
    if (editingTask) {
      setTasks((prevTasks) =>
        prevTasks.map((item) => (item.id === task.id ? task : item)),
      );
    } else {
      setTasks((prevTasks) => [...prevTasks, task]);
    }

    setShowForm(false);
    setEditingTask(null);
  };

  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const deleteTask = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (confirmed) {
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }
  };

  const openCreateForm = () => {
    setEditingTask(null);
    setShowForm(true);
  };

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-icon">F</div>
          <h2>FocusBoard</h2>
        </div>

        <p className="nav-heading">MENU</p>

        <nav className="navigation">
          <a className="nav-item active" href="#dashboard">
            <LayoutDashboard size={19} />
            Dashboard
          </a>
          <a className="nav-item" href="#tasks">
            <CheckSquare size={19} />
            My Tasks
          </a>
          <a className="nav-item" href="#tasks">
            <CalendarDays size={19} />
            Calendar
          </a>
        </nav>

        <div className="sidebar-bottom">
          <a className="nav-item" href="#settings">
            <Settings size={19} />
            Settings
          </a>
          <div className="profile">
            <div className="avatar">F</div>
            <div>
              <strong>My Workspace</strong>
              <small>Personal account</small>
            </div>
          </div>
        </div>
      </aside>

      <main className="main-content" id="dashboard">
        <header className="top-header">
          <div>
            <p className="welcome-text">WORKSPACE / DASHBOARD</p>
            <h1>My Dashboard</h1>
            <p className="subtitle">
              Welcome back! Here's your productivity overview.
            </p>
          </div>

          <div className="header-actions">
            <button className="icon-button" aria-label="Notifications">
              <Bell size={19} />
            </button>
            <div className="avatar">F</div>
          </div>
        </header>

        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-top">
              <span>Total Tasks</span>
              <ListTodo />
            </div>
            <h2>{totalTasks}</h2>
            <p>All your tasks</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>In Progress</span>
              <Clock />
            </div>
            <h2>{progressTasks}</h2>
            <p>Currently working</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Completed</span>
              <CheckCircle2 />
            </div>
            <h2>{completedTasks}</h2>
            <p>Tasks finished</p>
          </div>

          <div className="stat-card">
            <div className="stat-top">
              <span>Completion</span>
              <TrendingUp />
            </div>
            <h2>{percentage}%</h2>
            <div
              className="progress-track"
              role="progressbar"
              aria-label="Task completion"
              aria-valuenow={percentage}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="progress-fill"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </section>

        <section className="focus-section" aria-live="polite">
          <div>
            <span className="focus-label">FOCUS NOTES</span>
            <h2>{notes[activeNote].title}</h2>
            <p>{notes[activeNote].description}</p>
            <div className="note-dots">
              {notes.map((note, index) => (
                <button
                  key={note.title}
                  aria-label={`Go to note ${index + 1}`}
                  className={
                    activeNote === index ? "note-dot selected" : "note-dot"
                  }
                  onClick={() => setActiveNote(index)}
                />
              ))}
            </div>
          </div>
          <div className="carousel-controls">
            <button
              aria-label="Previous note"
              onClick={() =>
                setActiveNote((activeNote + notes.length - 1) % notes.length)
              }
            >
              <ChevronLeft size={19} />
            </button>
            <span>
              {activeNote + 1} / {notes.length}
            </span>
            <button
              aria-label="Next note"
              onClick={() => setActiveNote((activeNote + 1) % notes.length)}
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </section>

        <section className="tasks-section" id="tasks">
          <div className="section-heading">
            <div>
              <h2>My Tasks</h2>
              <p>Manage and track your daily activities.</p>
            </div>

            <button className="add-button" onClick={openCreateForm}>
              <Plus size={18} />
              Add Task
            </button>
          </div>

          <div className="task-toolbar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                aria-label="Search tasks by title"
                placeholder="Search tasks..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>

            <div className="filter-tabs">
              {["All", "To do", "In progress", "Completed"].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  aria-pressed={activeTab === tab}
                  className={activeTab === tab ? "tab active-tab" : "tab"}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="priority-filter">
            <label htmlFor="priority-filter">Priority:</label>
            <select
              id="priority-filter"
              value={priorityFilter}
              onChange={(event) => setPriorityFilter(event.target.value)}
            >
              <option>All</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>

          <div className="task-list">
            {filteredTasks.length === 0 ? (
              <p className="empty-message">No tasks found.</p>
            ) : (
              filteredTasks.map((task) => (
                <article className="task-row" key={task.id}>
                  <div className="task-info">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                    <span className="category">{task.category}</span>
                  </div>

                  <div className="task-details">
                    <span
                      className={`status ${task.status.toLowerCase().replace(" ", "-")}`}
                    >
                      {task.status}
                    </span>
                    <span className={`priority ${task.priority.toLowerCase()}`}>
                      {task.priority}
                    </span>
                    <span className="due-date">
                      {task.dueDate || "No due date"}
                    </span>

                    <select
                      aria-label={`Change status for ${task.title}`}
                      value={task.status}
                      onChange={(event) =>
                        changeStatus(task.id, event.target.value)
                      }
                    >
                      <option>To do</option>
                      <option>In progress</option>
                      <option>Completed</option>
                    </select>

                    <button
                      className="task-action"
                      aria-label={`Edit ${task.title}`}
                      onClick={() => openEditForm(task)}
                    >
                      <Pencil size={17} />
                    </button>

                    <button
                      className="task-action delete-action"
                      aria-label={`Delete ${task.title}`}
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash2 size={17} />
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>
      </main>

      {showForm && (
        <TaskForm
          task={editingTask}
          onSave={saveTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
