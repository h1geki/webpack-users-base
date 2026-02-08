import { Button, Result } from 'antd'
import React from 'react'
import { useAuth } from '../../features/auth/model/useAuth'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
  const {isAuthenticated} = useAuth()
  const navigate = useNavigate()
  const handleBack = () => {
    if(isAuthenticated){
        navigate('/users')
    }else{
        navigate('/login')
    }
  }
  return (
    <Result
        status="404"
        title="404"
        subTitle="Данная страница не найдена"
        extra={<Button type='primary' onClick={handleBack}>Вернуться назад</Button>}
    >

    </Result>
  )
}

export default ErrorPage