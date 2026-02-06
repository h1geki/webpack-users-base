import { useMutation } from '@tanstack/react-query'
import { Form, Button, Input, notification } from 'antd'
import React from 'react'
import styled from 'styled-components'
import { loginUser } from '../../features/auth/loginUser'

const LoginPageWrapper = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const FromName = styled.p`
    font-size:17px;
    font-weight:semi-bold;
`
const StyledInput = styled(Input)`
border:1px solid grey;
border-radius:3px;
`

const StyledInputPassword = styled(Input.Password)`
border:1px solid grey;
border-radius:3px;
`

const LoginPage = () => {
    const {mutate,error,isPending} = useMutation({
        mutationFn:loginUser,
        onSuccess:(token:string) => {
            localStorage.setItem("token",token);
            notification.success({
                title:'Вход выполнен',
                description:'Добро пожаловать'
            })
        },
        onError:(error:Error) => {
            notification.error({
                title:'Ошибка входа',
                description:error.message,
                placement:'topRight'
            })
        }
    })
    const onFormSubmit = (userData : {userName:string, userPassword:string}) => {
        mutate(userData)
    }    
  return (
    <LoginPageWrapper>
        <Form
            name="basic"
            style={{width:'100%',maxWidth:350}}
            onFinish={onFormSubmit}
        >
            <FromName>Авторизация</FromName>
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
    </LoginPageWrapper>
  )
}

export default LoginPage