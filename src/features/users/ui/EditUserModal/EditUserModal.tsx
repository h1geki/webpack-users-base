import { Button, Modal } from 'antd'
import React, { useEffect, useState } from 'react'
import { Form } from 'antd'
import { UserInfoInput } from '../styles/styles'
import styled from 'styled-components'
import { User } from '../../types/User'

const BtnContainer = styled.div`
    display:flex;
    justify-content:space-between;

`

interface EditUserModalProps {
    isOpen:boolean,
    user:User | null,
    onCancel:() => void,
    onSaveUser:(data: { id: string; name: string; avatar: string }) => Promise<void>,
    onDeleteUser:(id:string) => Promise<void>
}

const EditUserModal:React.FC<EditUserModalProps> = ({user,isOpen,onCancel,onSaveUser,onDeleteUser}) => {
    const [form] = Form.useForm()
    const [isSubmit,setIsSubmit] = useState<boolean>(false)

    useEffect(() => {
        if(user && isOpen){
            form.setFieldsValue({
                id:user.id,
                userName:user.name,
                avatar:user.avatar
            })
        }
    },[isOpen])

    const onFormSubmit = async (values:{userName:string,avatar:string}) => {
        try {
            setIsSubmit(true)
            await onSaveUser({id:user.id,name:values.userName,avatar:values.avatar})
        } catch (error) {
            console.log(error)
        }finally{
            setIsSubmit(false)
        }
    }
    const handleDelele = async() => {
        try {
            setIsSubmit(true)
            await onDeleteUser(user.id)
            onCancel()
        } catch (error) {
            console.error(error)
        }finally{
            setIsSubmit(false)
        }
    }
    return (
        <Modal 
            title="Редактирование пользователя"
            width={400}
            open={isOpen}
            footer={null}
            onCancel={onCancel}
            closable={!isSubmit}
            
        >
            <Form 
                form={form}
                onFinish={onFormSubmit}
            >
                <Form.Item layout='vertical' label='id' name='id'> 
                    <UserInfoInput disabled={true}/>
                </Form.Item>
                <Form.Item layout="vertical" label="Имя" name='userName' rules={[{required:true, message:'Введите имя'}]}>
                    <UserInfoInput/>
                </Form.Item>
                <Form.Item layout="vertical" label="Ссылка на аватарку" name='avatar' rules={[{required:true, message:'Добавьте ссылку'},{type:'url',message:'Введите корректный URL'}]}>
                    <UserInfoInput/>
                </Form.Item>
                <BtnContainer>
                    <Button onClick={handleDelele} type='primary' disabled={isSubmit}>Удалить</Button>
                    <div>
                        <Button disabled={isSubmit} type='primary' htmlType='submit'>Сохранить</Button>
                        <Button disabled={isSubmit} onClick={onCancel} style={{marginLeft:8}} type='primary'>Отмена</Button>
                    </div>
                </BtnContainer>
            </Form>
        </Modal>
    )
}

export default EditUserModal