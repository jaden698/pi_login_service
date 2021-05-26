import axios from "axios";

const API_URL = "http://localhost:5000/api/auth/";


    export const login=(username, password)=>{
        return axios
          .post(API_URL + "signin", {
            username,
            password
          })
          .then(response => {
            if (response.data.accessToken) {
              localStorage.setItem("user", JSON.stringify(response.data));
            }
    
            return response.data;
          });
      }
    
      export const logout=()=>{
        localStorage.removeItem("user");
      }
    
      export const getCurrentUser=()=>{
        return JSON.parse(localStorage.getItem('user'));;
      }
    