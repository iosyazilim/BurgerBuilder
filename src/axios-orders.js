import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burgerbuilder-ea082.firebaseio.com/' //You can write your firebase link
});

instance.interceptors.request.use(resolve => {
    console.log(resolve);
    return resolve;
});

instance.interceptors.response.use(response => {
    console.log(response)
    return response;
})

export default instance;