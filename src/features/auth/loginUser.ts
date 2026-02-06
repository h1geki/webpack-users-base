
export const loginUser = (userData:{userName:string, userPassword:string}) => {
    return new Promise((resolve,reject) => {

        console.log(userData)
        setTimeout(() => {
            if(userData.userName === 'admin' && userData.userPassword === 'admin'){
                resolve('jwt-token')
            }
            else{
                reject(new Error('Невернные логин или пароль'))
            }
        },2000)
    })
}