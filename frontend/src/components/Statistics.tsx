"use client"

import { useState, useEffect } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface TaskStats {
  totalTasks: number
  completedTasks: number
  overdueTasks: number
}

const Statistics = () => {
  const [stats, setStats] = useState<TaskStats>({
    totalTasks: 0,
    completedTasks: 0,
    overdueTasks: 0,
  })

  useEffect(() => {
    // Fetch task statistics from the API
    // This is a placeholder for the actual API call
    const fetchStats = async () => {
      // const response = await fetch('/api/tasks/stats');
      // const data = await response.json();
      // setStats(data);
      setStats({
        totalTasks: 10,
        completedTasks: 5,
        overdueTasks: 2,
      })
    }

    fetchStats()
  }, [])

  const chartData = {
    labels: ["Total Tasks", "Completed Tasks", "Overdue Tasks"],
    datasets: [
      {
        label: "Task Statistics",
        data: [stats.totalTasks, stats.completedTasks, stats.overdueTasks],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(75, 192, 192, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Task Management Statistics",
      },
    },
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Task Statistics</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default Statistics

