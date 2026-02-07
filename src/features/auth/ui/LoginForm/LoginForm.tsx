import React from 'react'
import { FormName, StyledInput, StyledInputPassword } from '../styles/styles'
import { Button, Form } from 'antd'
import { useAuth } from '../../model/useAuth'

const LoginForm = () => {

  const {login, isPending} = useAuth()

  const onFormSubmit = (userData:{userName:string,userPassword:string}) => {
    login(userData)
  }
  return (
    <Form
            name="basic"
            style={{width:'100%',maxWidth:350}}
            onFinish={onFormSubmit}
        >
            <FormName>Авторизация</FormName>
            <Form.Item name="userName" rules={[{required:true, message:'Введите логин'}]}>
                <StyledInput placeholder='Логин'/>
            </Form.Item>
            <Form.Item name="userPassword" rules={[{required:true,message:'Введите пароль'}]}>
                <StyledInputPassword placeholder='Пароль' />
            </Form.Item>
            <Form.Item style={{display:'flex', justifyContent:'flex-end'}}>
                <Button disabled={isPending} type='primary' htmlType='submit'>Войти</Button>
            </Form.Item>
        </Form>
  )
}

export default LoginForm