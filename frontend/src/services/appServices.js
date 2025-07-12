import axios from 'axios'

const server_url='http://localhost:3000';

// Register API
export const RegisterUserApi = async (registerData) => {
    try {
        const result = await axios.post(`${server_url}/api/auth/register`, registerData)
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

// Login API
export const loginUserAPI = async (loginData) => {
    try {
        const result = await axios.post(`${server_url}/api/auth/login`, loginData, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// verify login API 
export const verifyloginAPI = async () => {
    try {
        const result = await axios.get(`${server_url}/api/verifylogin`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// logoutUser API 
export const LogoutUserAPI = async () => {
    try {
        const result = await axios.get(`${server_url}/api/auth/logout`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}