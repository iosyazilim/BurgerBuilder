import axios from 'axios';

const instance = axios.create();

instance.interceptors.request.use(resolve => {
    console.log(resolve);
    return resolve;
});

export default instance;