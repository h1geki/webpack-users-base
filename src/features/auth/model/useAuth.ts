import { useMutation } from "@tanstack/react-query"
import { loginUser } from "../api/loginUser"
import { notification } from "antd"
import { useNavigate } from "react-router-dom"

export const useAuth = () => {
    const naviagte = useNavigate() 

    const loginMutation = useMutation({
        mutationFn:loginUser,
        onSuccess: (token:string) => {
            localStorage.setItem("token",token)
            notification.success({
                title:'Вход выполнен',
                description:'Добро пожаловать',
                placement:'topRight'
            });
            naviagte('/users')
        },
        onError:(error:Error) => {
            notification.error({
                title:'Ошибка входа',
                description:error.message,
                placement:'topRight'
            }
            )
        }
    })


    const logOut = () => {
        localStorage.removeItem("token")
        naviagte('/login')
    }


    const isAuthenticated = () => {
        const token = localStorage.getItem("token")
        if(token === null){
            console.log('token is missing')
            naviagte('/login')
        }
    }


    return {
        login:loginMutation.mutate,
        logOut,
        isPending:loginMutation.isPending,
        error:loginMutation.error,
        isAuthenticated
    }
}