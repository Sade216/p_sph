import axios from "axios";

export const setAuthToken = (token: string) => {
    if(token){
        localStorage.setItem("jwtToken", `Bearer ${token}`);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    else{
        delete axios.defaults.headers.common['Authorization']
    }
}

export const getAuthToken = () => {
    const token = localStorage.getItem('jwtToken')
    axios.defaults.headers.common['Authorization'] = token
    return token
}