import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8070",
}) // Set base url of backend

export const getAllMarkings = () => API.get('/marking-schemes')
export const createNewMarking = (data) => API.post('/marking-schemes/create', data)

export const getAllAdmins = () => API.get('/admins')
export const addNewAdmin = (data) => API.post('/admins/add', data)