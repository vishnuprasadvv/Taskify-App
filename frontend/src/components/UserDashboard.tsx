import { getAllTasksForUserApi, updateTaskStatusApi } from '@/api/api'
import { RootState } from '@/app/store'
import socket from '@/utils/socket'
import React, { useCallback, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'


interface Task {
    _id: string
    title: string
    description: string
    dueDate: string
    status: string
    assignedTo: string;
    userId: string
    adminName: string
  }


const UserDashboard:React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([])
    const [selectedTask, setSelectedTask] = useState<Task | null>(null)
    const [newStatus, setNewStatus] = useState<string>('')
    const {user}  = useSelector((state:RootState) => state.user)
   
    useEffect(()=> {
      if(!user) {
        return ;
      }
      socket.emit('join-room', user._id);

      socket.on('taskAssigned', (task:Task) => {
        toast.success(`New task assigned: ${task.title}`);
        setTasks((prev) => [...prev, task])
      })

      socket.on('taskUpdated', (task) => {
        toast(`Task updated: ${task.title}`, {icon:'ℹ️'});
        setTasks((prev) => prev.map(t=> t._id === task._id ? task : t))
      });

      socket.on('taskRemoved', (taskId)=> {
        toast(`Task removed`, {icon:'🗑️'});
        setTasks((prev) => prev.filter(t => t._id !== taskId))
      })

      return() => {
        socket.off('taskAssigned')
        socket.off('taskUpdated')
        socket.off('taskRemoved')
      }
    },[])
    useEffect(() => {
        const fetchTasks = async() =>{
            try {
                const response = await getAllTasksForUserApi()
                setTasks(response.data)
                console.log(response.data)
            } catch (error:any) {
                toast.error(error.response.data.message || 'Error fetching tasks')
                console.error('Error fetching tasks', error)
            }
        }

        fetchTasks()
    },[])

      const formatDate = useCallback((dateString: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toISOString().slice(0, 10); // Format as 'YYYY-MM-DD'
      },[tasks])
    
      const openModal = (task: Task) => {
        setSelectedTask(task)
        setNewStatus(task.status) // Set the current task status
      }

      const handleStatusUpdate = async () => {
        if (!selectedTask) return
        try {
          await updateTaskStatusApi(selectedTask._id, { status: newStatus })
          setTasks((prevTasks) =>
            prevTasks.map((task) =>
              task._id === selectedTask._id ? { ...task, status: newStatus } : task
            )
          )
          let updatedTask = {
            _id: selectedTask._id,
            status: newStatus,
            title: selectedTask.title
          }
          socket.emit('taskStatusUpdated', {
            task: updatedTask, 
            adminId: selectedTask.userId,
            userId: user?._id
          })
          toast.success('Task status updated successfully')
          setSelectedTask(null) // Close the modal
        } catch (error: any) {
          toast.error('Failed to update task status')
          console.error(error)
        }
      }

  return (
    <div className=''>
          <div className="bg-white card m-4 shadow-xl p-4">
        <h2 className="text-xl font-bold  mb-4">All Tasks</h2>
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-flow-col-dense w-full overflow-x-hidden">
                {tasks.map((task) => (
                  <div key={task._id} className={`cursor-pointer gap-2 flex flex-col m-2 rounded-xl p-3 text-white ${task.status === 'completed' ? 'bg-emerald-400' : 'bg-slate-400'}`}
                  onClick={() => openModal(task)}
                  >
                    <h4 className='font-semibold text-lg'>{task.title}</h4>
                    <span>{task.description}</span>
                    <div className='flex flex-col gap-1'>
                    <span className='text-sm'>Due Date : {formatDate(task.dueDate)}</span>
                    <span className={`rounded w-max font-semibold py-1 px-2 uppercase text-xs  bg-gray-500 ${task.status === 'completed' ? 'text-teal-400' : 'text-yellow-400'}`}>{task.status}</span>
                    </div>
                    <span className='text-sm'>Admin : {task.adminName}</span>
                  </div>
                ))}
          </div>
          


          {/* Modal */}
          {selectedTask && (
            <div className="modal modal-open">
              <div className="modal-box">
                <h3 className="text-lg font-bold text-center mb-4">Edit Task Status</h3>

                <div className="my-4">
                  <label className="block text-sm font-medium mb-2">Title:</label>
                  <p>{selectedTask.title}</p>

                  <label className="block text-sm font-medium mt-4 mb-2">Description:</label>
                  <p>{selectedTask.description}</p>

                  <label className="block text-sm font-medium mt-4 mb-2">Assigned by:</label>
                  <p>{selectedTask.adminName}</p>

                  <label className="block text-sm font-medium mt-4 mb-2">Status:</label>
                  <select
                    className="select select-bordered w-full"
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="modal-action">
                  <button
                    className="btn bg-teal-400 text-white hover:bg-teal-300 hover:scale-105 duration-300 transition-all"
                    onClick={handleStatusUpdate}
                  >
                    Save Changes
                  </button>
                  <button
                    className="btn btn-ghost"
                    onClick={() => setSelectedTask(null)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default UserDashboard