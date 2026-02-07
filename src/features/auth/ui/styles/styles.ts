import { Input } from "antd"
import styled from "styled-components"

export const LoginPageWrapper = styled.div`
    width:100%;
    min-height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`

export const FormName = styled.p`
    font-size:17px;
    font-weight:semi-bold;
`
export const StyledInput = styled(Input)`
border:1px solid grey;
border-radius:3px;
`

export const StyledInputPassword = styled(Input.Password)`
border:1px solid grey;
border-radius:3px;
`