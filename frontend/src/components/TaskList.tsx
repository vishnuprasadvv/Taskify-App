"use client"

import { useState, useEffect } from "react"
import TaskForm from "../components/TaskForm"

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  completed: boolean
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    // Fetch tasks from the API
    // This is a placeholder for the actual API call
    const fetchTasks = async () => {
      // const response = await fetch('/api/tasks');
      // const data = await response.json();
      // setTasks(data);
    }

    fetchTasks()
  }, [])

  const addTask = async (task: { title: string; description: string; dueDate: string }) => {
    // Add task to the API
    // This is a placeholder for the actual API call
    // const response = await fetch('/api/tasks', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(task),
    // });
    // const newTask = await response.json();
    const newTask: Task = { ...task, id: Date.now().toString(), completed: false }
    setTasks([...tasks, newTask])
  }

  const toggleTaskCompletion = async (id: string) => {
    // Update task completion status in the API
    // This is a placeholder for the actual API call
    // await fetch(`/api/tasks/${id}`, {
    //   method: 'PATCH',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ completed: !task.completed }),
    // });
    setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = async (id: string) => {
    // Delete task from the API
    // This is a placeholder for the actual API call
    // await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
    setTasks(tasks.filter((task) => task.id !== id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Task List</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li key={task.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTaskCompletion(task.id)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className={`text-lg ${task.completed ? "line-through text-gray-500" : ""}`}>{task.title}</span>
              </div>
              <button onClick={() => deleteTask(task.id)} className="text-red-500 hover:text-red-700">
                Delete
              </button>
            </div>
            <p className="mt-2 text-gray-600">{task.description}</p>
            <p className="mt-1 text-sm text-gray-500">Due: {task.dueDate}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TaskList

