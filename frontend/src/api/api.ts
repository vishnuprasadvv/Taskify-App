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

