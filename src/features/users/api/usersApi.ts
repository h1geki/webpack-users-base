import { apiClient } from "../../../shared/api/client"
import { User } from "../types/User"

export const usersApi = {
    getUsers:() => {
        return apiClient.get<User[]>('/users')
    },
    addUser:(user:User) => {
        return apiClient.post<User>('/users', user)
    },
    editUser:(id: string, data: { name: string; avatar: string }) => {
        return apiClient.put<User>(`/users/${id}`, data);
    },
    deleteUser:(id:string) => {
        return apiClient.delete(`/users/${id}`)
    }
}