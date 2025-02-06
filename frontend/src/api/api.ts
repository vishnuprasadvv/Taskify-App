import adminapi from "@/axios/adminInterceptor";
import api from "@/axios/authInterceptor"


export const loginApi = async(email : string, password: string) => {
    const response = await api.post(`auth/login` , {email, password })
    return response.data;
}
export const adminLoginApi = async(email : string, password: string) => {
    const response = await adminapi.post(`auth/admin/login` , {email, password })
    return response.data;
}
export const adminSignUpApi = async(props:{name:string, email:string, password: string}) => {
    const response = await adminapi.post(`auth/admin/register` , {email:props.email, password:props.password , name : props.name })
    return response.data;
}
export const signupApi = async(props:{name:string, email:string, password: string}) => {
    const response = await api.post(`auth/register` , {email:props.email, password:props.password , name : props.name })
    return response.data;
}
export const logoutApi = async() => {
    const response = await api.post(`auth/logout` )
    return response.data;
}
export const adminLogoutApi = async() => {
    const response = await api.post(`auth/admin/logout` )
    return response.data;
}


export const createTask = async(data: {title:string, dueDate: string, description: string , assignedTo : string}) => {
    const response = await api.post('task/create', {title: data.title , dueDate: data.dueDate, description:data.description, assignedTo: data.assignedTo})
    return response.data;
}

export const updateTaskApi = async(id: string, data: {title:string, dueDate: string, description: string, status: string, assignedTo: string}) => {
    const response = await api.patch(`task/update/${id}`, {title: data.title , dueDate: data.dueDate, description:data.description, status: data.status, assignedTo: data.assignedTo})
    return response.data;
}
export const deleteTaskApi = async(id: string) => {
    const response = await api.delete(`task/delete/${id}`)
    return response.data;
}

export const getTasksApi = async() => {
    const response = await api.get('task/user')
    return response.data;
}
export const getAllTasksApi = async() => {
    const response = await api.get('task/all')
    return response.data;
}

export const getAllUsers = async() => {
    const response = await api.get('task/users')
    return response.data;
}

export const getAllTasksForUserApi = async() => {
    const response = await api.get('user')
    return response.data;
}


export const updateTaskStatusApi = async(id: string, data:{status:string}) => {
    const response = await api.patch(`user/edit/${id}`, {status: data.status})
    return response.data;
}


