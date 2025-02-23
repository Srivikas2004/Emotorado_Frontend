import axios from 'axios';

const api=axios.create({
    baseURL:'https://emotorado-backend.onrender.com'
})

export const googleAuth=(code)=>{
   return api.get(`/auth/google?code=${code}`)
}
