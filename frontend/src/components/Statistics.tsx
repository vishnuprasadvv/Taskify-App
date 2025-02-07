
import React, { useState, useEffect } from "react"
import {  Pie } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale ,ArcElement, Title, Tooltip, Legend } from "chart.js"
import { getChartDataApi } from "@/api/api"

ChartJS.register(CategoryScale, LinearScale, Title,ArcElement, Tooltip, Legend)

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  assignedTo: string;
}

interface IStatistics{
  tasks: Task[]
}

const Statistics:React.FC<IStatistics> = ({tasks}) => {

  const [taskCountsByStatus, setTaskCountsByStatus] = useState<{[Key: string]: number} | null>(null)

  const possibleValues:string[] = ['completed', 'pending', 'due' ]
  useEffect(() => {
    console.log('refetch')
    const fetchStats = async () => {
      const response = await getChartDataApi()
      console.log(response)
      const stats = response.data || [];

      const taskCountsByStatus : {[Key: string] : number} = possibleValues.reduce((acc, status) => {
        acc[status] = 0;
        return acc
      }, {} as {[Key: string]: number})
    
      stats.forEach((item:{ _id: string; count: number }) => {
        taskCountsByStatus[item._id] = item.count;
      });

      setTaskCountsByStatus(taskCountsByStatus)
    }

    fetchStats()
  }, [tasks])
 

  const chartData = {
    labels: possibleValues,
    datasets: [
      {
        label: "Task Count",
        data: possibleValues.map(status => taskCountsByStatus?.[status] || 0),
        backgroundColor: ["rgba(40, 245, 168, 0.8)", "rgba(245, 235, 39, 0.8)", "rgba(245, 39, 39, 0.8)"],
        borderColor: ["rgba(40, 245, 168, 1)", "rgba(245, 235, 39, 1)", "rgba(245, 39, 39, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,  // Position of the legend
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem: any) => {
            const total = possibleValues.reduce((sum, status) => sum + (taskCountsByStatus?.[status] || 0), 0);
            const value = tooltipItem.raw || 0;
            const percentage = total ? ((value / total) * 100).toFixed(2) : "0.00";
            return `${tooltipItem.label}: ${tooltipItem.raw} (${percentage}%)`;  // Display count and percentage
          },
        },
      },
    },
  };

  return (
    <div className="space-y-6 flex flex-col items-center w-full">
      <h1 className="text-3xl font-bold">Task Statistics</h1>
      <div className="w-80">
        <Pie data={chartData} options={options} />
      </div>
      <div className="flex gap-5 max-w-max ">
      <div className="bg-emerald-300 text-white w-24 p-1 sm:w-40 h-20 rounded-xl flex flex-col items-center justify-center">
        Completed: 
        <span className="text-xl font-bold">{ taskCountsByStatus?.completed || 0}</span>
      </div>
      <div className="bg-yellow-300 text-white w-24 p-1 sm:w-40 h-20 rounded-xl flex flex-col items-center justify-center">
        Pending:
        <span className="text-xl font-bold">{taskCountsByStatus?.pending || 0}</span>
      </div>
      <div className="bg-red-500 text-white w-24 p-1 sm:w-40 h-20 rounded-xl flex flex-col items-center justify-center">
        Overdue:
        <span className="text-xl font-bold">{taskCountsByStatus?.due || 0}</span>
      </div>
      </div>
    </div>
  )
}

export default Statistics

