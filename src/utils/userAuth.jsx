import axios from 'axios';
import { API_BASE_URL } from './constants';
import { toast } from 'react-toastify';

export async function checkAuthToken() {
    try {
      const res = await axios.get(API_BASE_URL + "profile/view", { withCredentials: true });
      if (res.data && res.data.data) {
        return {isAuthorized:true, userData: res.data.data};
      } else {
        return {isAuthorized:false, userData: null};
      }
    } catch (err) {
      if(err.status === 403){
        toast.error(err.response && err.response.data && err.response.data.message ? err.response.data.message : "Unauthorized access. Please login again.");
      }
      return {isAuthorized:false, userData: null};
    }
}