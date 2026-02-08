import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { usersApi } from "../api/usersApi"

export const useUsers = () => {
    const queryClient = useQueryClient();

    const userQuery = useQuery({
        queryKey:['users'],
        queryFn:() => usersApi.getUsers().then(res => res.data)
    })

    const createUserMutation = useMutation({
        mutationFn:(user:{userName:string,avatar:string}) => 
            usersApi.addUser({
                id:'',
                name:user.userName,
                avatar:user.avatar,
                createdAt:new Date().toISOString()
            }),
        onSuccess:() =>{
            queryClient.invalidateQueries({queryKey:['users']})
        }
    })

    const updateUserMutation = useMutation({
        mutationFn:({ id, data }: 
            { 
                id: string; 
                data: { 
                    name: string; 
                    avatar: string 
                } 
            }) => {
            return usersApi.editUser(id,data)
        },
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });
    }
    })

    const deleteUser = useMutation({
        mutationFn:(id:string) => usersApi.deleteUser(id),
        onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['users'] });}
        
    })


    return {
        users:userQuery.data,
        isLoading:userQuery.isPending,
        error:userQuery.error,
        createUser:createUserMutation.mutateAsync,
        updateUser:updateUserMutation.mutateAsync,
        deleteUser:deleteUser.mutateAsync
    }

}