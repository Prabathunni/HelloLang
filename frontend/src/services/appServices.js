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

// get all friends API 
export const getAllFriendsAPI = async () => {
    try {
        const result = await axios.get(`${server_url}/api/friends/all`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}



// get all user API  
export const getAllUsersAPI = async () => {
    try {
        const result = await axios.get(`${server_url}/api/users`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// get all friends API 
export const getMyFriendReqAPI = async () => {
    try {
        const result = await axios.get(`${server_url}/api/friends`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

// get a user profile API
export const viewaUserProfileAPI = async (userID) => {
    try {
        const result = await axios.get(`${server_url}/api/user/${userID}`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// update my profile API
export const updateProfileAPI = async (userID,formData) => {
    try {
        const result = await axios.put(`${server_url}/api/user/${userID}`, formData, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

// send message api
export const sendMessageAPI = async (userID,formData) => {
    try {
        const result = await axios.post(`${server_url}/api/messages/${userID}/send`, formData, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}


// load messages api
export const loadMessageAPI = async (userID) => {
    try {
        const result = await axios.get(`${server_url}/api/messages/${userID}`, {withCredentials: true})
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}



// send req
export const sendFriendReqAPI = async (userID) => {
    try {
        const result = await axios.post(`${server_url}/api/friends/${userID}/request`, {}, { withCredentials: true })
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

// accept friend
export const acceptReqAPI = async (userID) => {
    try {
        const result = await axios.put(`${server_url}/api/friends/${userID}/accept`, {}, { withCredentials: true })
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}

// accept friend
export const rejectReqAPI = async (userID) => {
    try {
        const result = await axios.delete(`${server_url}/api/friends/${userID}/reject`, { withCredentials: true })
        return result
        
    } catch (error) {
        console.log(error);
        throw error
    }
}




