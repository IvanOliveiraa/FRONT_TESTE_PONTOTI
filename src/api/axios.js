import axios from "axios";
import Config from "../config"

  
/*var accessToken = localStorage.getItem('token');
,
headers: {
  'Authorization': `Bearer ${accessToken}`
}*/
export default axios.create({
baseURL : `${Config.backend}`
});