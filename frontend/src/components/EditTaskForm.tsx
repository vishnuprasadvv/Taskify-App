"use client"

import { useState } from "react"
import type React from "react" // Added import for React

interface User {
  _id: string;
  name: string;
  email: string;
}

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string; dueDate: string, status: string ,assignedTo: string}) => void
  values : { title: string; description: string; dueDate: string , status: string, assignedTo: string},
  users: User[]
}

const EditTaskForm: React.FC<TaskFormProps> = ({ onSubmit,values, users }) => {


    const formatDate = (dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
      };


  const [title, setTitle] = useState(values.title)
  const [description, setDescription] = useState(values.description)
  const [dueDate, setDueDate] = useState(formatDate(values.dueDate))
  const [status, setStatus] = useState(values.status)
 const [assignedTo, setAssignedTo] = useState<string> (values.assignedTo)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({ title, description, dueDate , status, assignedTo})
  }

  const todayDate = new Date().toISOString().slice(0, 10);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        ></textarea>
      </div>
      <div>
        <label htmlFor="dueDate" className=" block text-sm font-medium text-gray-700">
          Due Date
        </label>
        <input
          type="date"
          id="dueDate"
          value={dueDate}
          min={todayDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
          className="input mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
        />
      </div>

      <div>
      <select className="select select-bordered w-full" value={status} onChange={(e) => setAssignedTo(e.target.value)}>
        {
          users.map((user) => (
            <option key={user._id} value={user._id} >{user.name}</option>
          ))
        }
  
</select>
</div>

<div>
      <select className="select select-bordered w-full" onChange={(e) => setStatus(e.target.value)}>
  <option value={'pending'} selected = {status === 'pending'}>Pending</option>
  <option value={'completed'} selected = {status === 'completed'}>Completed</option>
</select>
</div>

      <button
        type="submit"
        className="btn w-full bg-teal-400 text-white py-2 px-4 rounded hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save Changes
      </button>
    </form>
  )
}

export default EditTaskForm

