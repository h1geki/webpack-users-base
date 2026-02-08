import React, { useEffect } from 'react'
import styled from 'styled-components'
import LoginForm from '../../features/auth/ui/LoginForm'
import { useNavigate } from 'react-router-dom'

const LoginPageWrapper = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

const LoginPage = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem("token")
    if(token){
      navigate('/users')
    }
  })
  return (
    <LoginPageWrapper>
        <LoginForm/>
    </LoginPageWrapper>
  )
}

export default LoginPage