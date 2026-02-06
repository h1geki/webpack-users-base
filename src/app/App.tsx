import React, { useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" replace/>}/>
          <Route element={<LoginPage/>} path='/login'/>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>  
  )
}

export default App