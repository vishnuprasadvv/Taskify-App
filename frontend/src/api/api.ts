import api from "@/axios/authInterceptor"


export const loginApi = async(email : string, password: string) => {
    const response = await api.post(`auth/login` , {email, password })
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


export const createTask = async(data: {title:string, dueDate: string, description: string}) => {
    const response = await api.post('task/create', {title: data.title , dueDate: data.dueDate, description:data.description})
    return response.data;
}

export const updateTaskApi = async(id: string, data: {title:string, dueDate: string, description: string, status: string}) => {
    const response = await api.patch(`task/update/${id}`, {title: data.title , dueDate: data.dueDate, description:data.description, status: data.status})
    return response.data;
}
export const deleteTaskApi = async(id: string) => {
    const response = await api.delete(`task/delete/${id}`)
    return response.data;
}

export const getTasksApi = async() => {
    const response = await api.get('task')
    return response.data;
}
