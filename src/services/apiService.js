import axios from '../utils/axiosCustomize';
const postCreateNewUser = (email, password, username, role, image) => {
    const form = new FormData();
    form.append('email', email);
    form.append('password', password);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.post('api/v1/participant', form);
}

const getAllUsers = () => {
    return axios.get("api/v1/participant/all");
}

const putUpdateUser = (id, username, role, image) => {
    const form = new FormData();
    form.append('id', id);
    form.append('username', username);
    form.append('role', role);
    form.append('userImage', image);
    return axios.put('api/v1/participant', form);
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', { data: { id: userId } });
}

const getUserWithPaginate = (page, limit) => {
    return axios.get(`api/v1/participant?page=${page}&limit=${limit}`);
}

const postLogin = (email, password) => {
    return axios.post('api/v1/login', { email, password, delay: 3000 })
}

const postRegister = (email, username, password) => {
    if (username) {
        return axios.post('api/v1/register', { email, username, password })
    } else {
        return axios.post('api/v1/register', { email, password })
    }

}

export {
    postCreateNewUser, getAllUsers,
    putUpdateUser, deleteUser,
    getUserWithPaginate, postLogin,
    postRegister
};