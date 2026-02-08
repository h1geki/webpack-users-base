import React, { useEffect, useState } from 'react'
import { useAuth } from '../../features/auth/model/useAuth'
import styled from 'styled-components'
import { Button, Spin} from 'antd'
import UsersList from '../../features/users/ui/UsersList'
import { useUsers } from '../../features/users/model/useUsers'
import CreateUserModal from '../../features/users/ui/CreateUserModal'
import { User } from '../../features/users/types/User'
import EditUserModal from '../../features/users/ui/EditUserModal'

const UsersPageWrapper = styled.div`

`
const LogoutBtnContainer = styled.div`
    display:flex;
    justify-content:flex-end;
`

const UsersPage = () => {
  const {isAuthenticated,logOut} = useAuth()
  const {users,isLoading,error, createUser,updateUser,deleteUser} = useUsers()
  const [isModalCreate,setIsModalCreate] = useState<boolean>(false)
  const [isModalEdit,setIsModalEdit] = useState<boolean>(false)
  const [currUser, setCurrUser] = useState<User | null>(null)

  useEffect(() => {
    isAuthenticated()
  },[])

  

  if(error){
    return <div>Ошибка: {error.message}</div>
  }

  const onCreateUser = async (user:{userName:string,avatar:string}) => {
    try {
      await createUser(user)
      setIsModalCreate(false)
    } catch (error) {
      console.log(error)
    }
  }
  const handleEditClick = (user:User) => {
    setCurrUser(user)
    setIsModalEdit(true)
  }
  const onSaveUser = async (data: { id: string; name: string; avatar: string }) => {
    try {
      await updateUser({
        id:data.id,
        data:{
          name:data.name,
          avatar:data.avatar
        }
      })
      setIsModalEdit(false)
      setCurrUser(null)
    } catch (error) {
      
    }
  }

  const onDeleteUser = async (id:string) => {
    try {
      await deleteUser(id)
      setIsModalEdit(false)
      setCurrUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UsersPageWrapper>
      <CreateUserModal isOpen={isModalCreate} onCancel={() => setIsModalCreate(false)} onOk={onCreateUser}/>
      <EditUserModal 
        isOpen={isModalEdit} 
        onCancel = {() => {
          setIsModalEdit(false); 
          setCurrUser(null)}
        } 
        user={currUser} 
        onSaveUser={onSaveUser} 
        onDeleteUser={onDeleteUser}/>
        <LogoutBtnContainer>
            <Button type='primary' onClick={logOut}>Выход</Button>
        </LogoutBtnContainer>
        {isLoading ? 
          <div><Spin/></div>
          :
          <UsersList data = {users || []} onEditClick={handleEditClick}/>
        }
        <Button type='primary' onClick={() => setIsModalCreate(true)}>Создать пользователя</Button>
    </UsersPageWrapper>
  )
}

export default UsersPage