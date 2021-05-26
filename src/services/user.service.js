const API_URL = 'http://localhost:5000/api/test/';


  export const getPublicContent=()=>{
    return axios.get(API_URL + 'all');
  }

  export const getUserBoard=()=>{
    return axios.get(API_URL + 'student', { headers: authHeader() });
  }

  export const getModeratorBoard=()=>{
    return axios.get(API_URL + 'teacher', { headers: authHeader() });
  }

  export const getAdminBoard=()=>{
    return axios.get(API_URL + 'admin', { headers: authHeader() });
  }