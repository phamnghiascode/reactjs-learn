import axios from "../utils/axiosCustomize"
const postCreateNewUser = async (email, password, username, role, image) => {
    // submit data
    const data = new FormData();
    data.append('email', email);
    data.append('password', password);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.post('api/v1/participant', data)
}


const getAllUsers = () => {
    return axios.get('api/v1/participant/all')
}

const putUpdateUser = async (id, username, role, image) => {
    // submit data
    const data = new FormData();
    data.append('id', id);
    data.append('username', username);
    data.append('role', role);
    data.append('userImage', image);
    return axios.put('api/v1/participant', data)
}

const deleteUser = (userId) => {
    return axios.delete('api/v1/participant', {data: {id: userId}})
}

const getUserWithPaginate = (page, limit) => {
    // console.log("api called: ",`/api/v1/participant?page=${page}&limit=${limit}`)
    return axios.get(`/api/v1/participant?page=${page}&limit=${limit}`)
}
export {
    postCreateNewUser,
    getAllUsers,
    putUpdateUser,
    deleteUser,
    getUserWithPaginate
}