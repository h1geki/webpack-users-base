import Modal from 'antd/es/modal/Modal'
import React, { useEffect, useState } from 'react'
import { Button, Form, Input } from 'antd'
import { UserInfoInput,CreateUserModalStyled } from '../styles/styles'

interface CreateUserModalProps {
    isOpen:boolean,
    onCancel:()=>void,
    onOk:(user:{userName:string,avatar:string}) => Promise<void>
}



const CreateUserModal:React.FC<CreateUserModalProps> = ({isOpen,onCancel,onOk}) => {

    const [isSubmit,setIsSubmit] = useState<boolean>(false)
    const [form] = Form.useForm()

    const handleFormSubmit = async (user:{userName:string,avatar:string}) => {
        setIsSubmit(true)
        try{
            await onOk(user)
            form.resetFields()
            onCancel()
        }catch (error){
            console.log(error)
        }finally{
            setIsSubmit(false)
        }
        
    }


    useEffect(() => {
        if(isOpen){
            form.resetFields()
        }
    },[isOpen])

    return (
        <Modal 
            title="Создание пользователя"
            open={isOpen}
            onCancel={onCancel}
            width={400}
            closable={!isSubmit}
            footer={null}
        >
            <Form 
                form={form}
                onFinish={handleFormSubmit}
            >
                <Form.Item layout="vertical" label="Имя" name='userName' rules={[{required:true, message:'Введите имя'}]}>
                    <UserInfoInput/>
                </Form.Item>
                <Form.Item layout="vertical" label="Ссылка на аватарку" name='avatar' rules={[{required:true, message:'Добавьте ссылку'},{type:'url',message:'Введите корректный URL'}]}>
                    <UserInfoInput/>
                </Form.Item>
                <Form.Item style={{textAlign:'right'}}>
                    <Button disabled={isSubmit} type='primary' htmlType='submit'>Создать</Button>
                    <Button disabled={isSubmit} style={{marginLeft:8}} type='primary' onClick={onCancel}>Отмена</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default CreateUserModal