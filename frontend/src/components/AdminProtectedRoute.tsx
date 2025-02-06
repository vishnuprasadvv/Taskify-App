import { RootState } from '@/app/store'
import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoute:React.FC = () => {
const {isAdminAuthenticated} = useSelector((state: RootState) => state.admin)
if(!isAdminAuthenticated) {
    return <Navigate to='/admin/login' />
}
  return (
    <Outlet />
  )
}

export default AdminProtectedRoute;