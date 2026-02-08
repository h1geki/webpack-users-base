import React from 'react'
import { UsersListStyled } from '../styles/styles'
import { Avatar, List } from 'antd'
import { User } from '../../types/User'
import dayjs from 'dayjs'

interface UsersList {
    data:User[],
    onEditClick:(user:User) => void
}


const UsersList:React.FC<UsersList> = ({data,onEditClick}) => {
  return (
    <UsersListStyled
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item:User) => (
                <List.Item>
                    <List.Item.Meta
                        avatar={<Avatar style={{cursor:"pointer"}} onClick={() => onEditClick(item)} src={item.avatar}/>}
                        title={<span style={{cursor:"pointer"}} onClick={() => onEditClick(item)}>{item.name}</span>}
                        description={`Зарегистрирован ${dayjs(item.createdAt).format("DD-MM-YYYY")}`}
                    />
                </List.Item>
            )}
        />
  )
}

export default UsersList