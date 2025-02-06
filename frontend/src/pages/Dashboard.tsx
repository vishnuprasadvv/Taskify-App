import { createTask, deleteTaskApi, getAllUsers, getTasksApi, updateTaskApi } from "@/api/api";
import EditTaskForm from "@/components/EditTaskForm";
import TaskForm from "@/components/TaskForm";
import socket from "@/utils/socket";
import { PencilIcon, Plus, Trash2Icon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


interface Task {
  _id: string
  title: string
  description: string
  dueDate: string
  status: string
  assignedTo: string
}
interface User {
  _id: string;
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {

  const [tasks, setTasks] = useState<Task[]>([])
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
   const [users, setUsers] = useState<User[]>([]);

   function findUser(id:string){ 
    let user =  users.find(user => user._id === id)
    return user?.name;
   }
  
    useEffect(() => {
      const fetchUsers = async() => {
        try {
          const response = await getAllUsers();
          setUsers(response.data)
        } catch (error) {
          console.error('error fetching all users', error)
        }
  
      }
      fetchUsers()
    },[])
  
  const formatDate = useCallback((dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
  },[tasks])


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

  socket.on('taskUpdated', (task) => {
    setTasks(prevTasks => {
      const taskIndex = prevTasks.findIndex(t => t._id === task._id);
      if (taskIndex > -1) {
        prevTasks[taskIndex] = task;
      } else {
        prevTasks.push(task);
      }
      return [...prevTasks];
    });
  });


  socket.on('taskDeleted', (taskId) => {
    setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
  });

  return () => {
    socket.off('taskUpdated');
    socket.off('taskDeleted');
  };

},[])

const handleEditClick = (task:Task) => {
  setSelectedTask(task)
}

  const addTask = async (task: { title: string; description: string; dueDate: string ,assignedTo: string}) => {
    try {
      const response = await createTask({title : task.title, description: task.description, dueDate:task.dueDate , assignedTo: task.assignedTo})
      console.log(response)

     const newTaskData = response.data
     const newTask: Task = {title: newTaskData.title, description: newTaskData.description, dueDate: newTaskData.dueDate, status: "pending", _id: newTaskData._id, assignedTo : newTaskData.assignedTo }
     
     socket.emit('taskAdded', newTaskData)
     setTasks(prev => [newTask, ...prev])

      toast.success(response.message || 'Task added successfully')
    } catch (error:any) {
      console.error('Error creating task', error)
      toast.error(error.response.data.message || 'Error creating task')
    }
  }

  const updateTask = async(task: {title: string, description: string, dueDate: string, status: string, assignedTo: string}) =>{ 
    try {
      if(!selectedTask) {
        return ;
      }

      let id = selectedTask._id;
      const response = await updateTaskApi(selectedTask._id, task)
      console.log(response)
      toast.success(response.message)
      socket.emit('taskUpdated', response.data)
      setTasks(tasks.map(task => task._id === id ? response.data : task))

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
      socket.emit('taskDeleted' ,id)
      setTasks(prev => prev.filter(task => task._id !== id))
    } catch (error:any) {
      console.error('Error deleting task', error)
      toast.error(error.response.data.message || 'Task deletion failed')
    }
  }

  return (
    <div>

<div className="space-y-6">
      <h1 className="text-3xl font-bold">Welcome to Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/statistics" className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <h2 className="text-xl font-semibold mb-2">Task Statistics</h2>
          <p className="text-gray-600">View charts and graphs of your task data</p>
        </Link>
      </div>
    </div>

      <div className="place-self-end px-4 mt-4">
      <label htmlFor="my_modal_6" className="btn bg-teal-400 text-white hover:bg-teal-300 hover:scale-105 duration-300 transition-all"><Plus /> Create Task</label>
      </div>

{/* Put this part before </body> tag */}
<input type="checkbox" id="my_modal_6" className="modal-toggle" />
<div className="modal" role="dialog">
  <div className="modal-box">
    <h3 className="text-lg font-bold text-center mb-4">Create Task</h3>
   <TaskForm onSubmit={addTask} users= {users}/>
    <div className="modal-action">
    <label htmlFor="my_modal_6" className="btn btn-sm btn-ghost absolute right-2 top-2">✕</label>
    </div>
  </div>
</div>

      <div className="bg-white card m-4 shadow-xl p-4">
        <h2 className="text-xl font-bold  mb-4">All Tasks</h2>
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
                  <th>Assigned to</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {tasks.map((task, index) => (
                  <tr key={task._id}>
                    <th>{index + 1}</th>
                    <td>{task.title}</td>
                    <td>{formatDate(task.dueDate)}</td>
                    <td className={`font-semibold uppercase text-xs ${task.status === 'completed' ? 'text-green-500' : 'text-yellow-400'}`}>{task.status}</td>
                    <td>{findUser(task.assignedTo)}</td>
                    <td className="flex gap-1">
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

        <EditTaskForm values={{status: selectedTask.status, title:selectedTask.title, description:selectedTask.description, dueDate:selectedTask.dueDate, assignedTo: selectedTask.assignedTo}} 
        users={users}
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
