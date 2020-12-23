import axios from "axios";
import config from "../../public/config";

console.log(config.ip);
const api = axios.create({
    baseURL: config.ip,
    headers:{
        token:JSON.parse(sessionStorage.getItem('login-userinfo')).token
    }
});

api.interceptors.response.use(function (response) {
	console.log('拦截器正常', response);
	if (/^1/.test(response.data.status)){
		return response;
	}
	ElementUI.Message.error(response.data.data)
    return Promise.reject(response);
}, function (error) {
	console.log('拦截器抛错');
    return Promise.reject(error);
});


export default api;