

import React,{useEffect,useState} from 'react'
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import { updateUser, isAuth, getCookie, signout } from '../helpers/auth';
import { Link, Redirect } from 'react-router-dom';

function BoardStudent(props) {
    const history=useHistory()
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        textChange: 'Update',
        role: ''
      });

    useEffect(() => {
        loadProfile();
    }, []);
    const loadProfile = () => {
        const token = getCookie('token');
        console.log(token)
        // console.log(isAuth())
        axios
            .get(`http://localhost:5000/api/test/student/${isAuth().id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                
            })
            .then(res => {
                //console.log(isAuth().id)
                console.log(res)
                const { role, username, email } = res.data;
                setFormData({ ...formData, role, username, email });
                //console.log(formData)
            })
            .catch(err => {
                console.log(`Error To Your Information ${err.response.statusText}`);
                if (err.response.status === 401) {
                    signout(() => {
                        history.push('/login');
                    });
                }
            });
    };
    return (
        <div>
            <h1>Hello student {formData.username}</h1>

        </div>
    )
}

export default BoardStudent
