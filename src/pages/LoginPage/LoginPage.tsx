import { useMutation } from '@tanstack/react-query'
import { Form, Button, Input, notification } from 'antd'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { loginUser } from '../../features/auth/api/loginUser'
import LoginForm from '../../features/auth/ui/LoginForm'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../features/auth/model/useAuth'

const LoginPageWrapper = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const LoginPage = () => {
  const {isAuthenticated} = useAuth()
  useEffect(() => {
    isAuthenticated()
  },[])
  return (
    <LoginPageWrapper>
        <LoginForm/>
    </LoginPageWrapper>
  )
}

export default LoginPage