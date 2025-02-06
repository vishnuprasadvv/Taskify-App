import { createTask, deleteTaskApi, getTasksApi, updateTaskApi } from "@/api/api";
import EditTaskForm from "@/components/EditTaskForm";
import TaskForm from "@/components/TaskForm";
import { PencilIcon, Plus, Trash2Icon } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


interface Task {
  _id: string
  title: string
  description: string
  dueDate: string
  status: 'pending' | 'completed'
}


const Dashboard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([])

  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const fetchTasks = async() => {
    try {
      const response = await getTasksApi();
      console.log(response)
      setTasks(response.data)
    } catch (error) {
      console.error('Error fetching tasks',error)
    }
  }

useEffect(() => {
  fetchTasks()
},[])

const handleEditClick = (task:Task) => {
  setSelectedTask(task)
}

  const addTask = async (task: { title: string; description: string; dueDate: string }) => {
    
    try {
      const response = await createTask({title : task.title, description: task.description, dueDate:task.dueDate})
      console.log(response)

     const newTaskData = response.data
     const newTask: Task = {title: newTaskData.title, description: newTaskData.description, dueDate: newTaskData.dueDate, status: "pending", _id: newTaskData._id }
     setTasks([...tasks, newTask])
      toast.success(response.message || 'Task added successfully')
    } catch (error) {
      console.error('Error creating task', error)
    }
  }

  const updateTask = async(task: {title: string, description: string, dueDate: string, status: string}) =>{ 
    try {
      if(!selectedTask) {
        return ;
      }
      const response = await updateTaskApi(selectedTask._id, task)
      console.log(response)
      toast.success(response.message)
    } catch (error) {
      console.error('Error editing task', error)
      toast.error('Edit task failed')
    }finally{
      setSelectedTask(null)
    }
  }

  const handleDelete = async(id: string) => {
    try {
      const response = await deleteTaskApi(id)
      toast.success(response.message)
    } catch (error:any) {
      console.error('Error deleting task', error)
      toast.error(error.response.data.message || 'Task deletion failed')
    }
  }

  return (
    <div>

<div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/tasks" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Manage Tasks</h2>
          <p className="text-gray-600">View, add, edit, and delete your tasks</p>
        </Link>
        <Link to="/statistics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Task Statistics</h2>
          <p className="text-gray-600">View charts and graphs of your task data</p>
        </Link>
      </div>
    </div>

      <div className="place-self-end px-4">
      <label htmlFor="my_modal_6" className="btn bg-teal-400 text-white hover:bg-teal-300 hover:scale-105 duration-300 transition-all"><Plus /> Create Task</label>
      </div>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold text-center mb-4">Create Task</h3>
   <TaskForm onSubmit={addTask}/>
    <div className="modal-action">
    <label htmlFor="my_modal_6" className="btn btn-sm btn-ghost absolute right-2 top-2">✕</label>
    </div>
  </div>
</div>



      <div className="bg-white card m-4 shadow-xl p-4">
        <h2 className="text-xl font-bold  mb-4">My Tasks</h2>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Task</th>
                  <th>Due Date</th>
                  <th>Stage</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {tasks.map((task, index) => (
                  <tr key={task._id}>
                    <th>{index + 1}</th>
                    <td>{task.title}</td>
                    <td>{task.dueDate}</td>
                    <td>{task.status}</td>
                    <td>
                    <label htmlFor="my_modal_edit" 
                    onClick={() => handleEditClick(task)}
                    className="btn btn-square bg-teal-400 text-white hover:bg-teal-300"><PencilIcon size={12} /></label> 
                      <button className="btn btn-square"
                      onClick={() => handleDelete(task._id)}
                      ><Trash2Icon size={12}/></button>
                    </td>



                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <input type="checkbox" id="my_modal_edit" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold text-center mb-4">Edit Task</h3>
    {
      selectedTask && (

        <EditTaskForm values={{status: selectedTask.status, title:selectedTask.title, description:selectedTask.description, dueDate:selectedTask.dueDate}} 
        onSubmit={updateTask}/>
      )
    }
    <div className="modal-action">
    <label htmlFor="my_modal_edit"
    onClick={() => setSelectedTask(null)}
    className="btn btn-sm btn-ghost absolute right-2 top-2">✕</label>
    </div>
  </div>
</div>

    </div>
  );
};

export default Dashboard;
