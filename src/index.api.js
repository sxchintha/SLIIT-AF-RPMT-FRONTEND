import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:8070",
}) // Set base url of backend

export const getAllMarkings = () => API.get('/marking-schemes')
export const createNewMarking = (data) => API.post('/marking-schemes/create', data)

export const createNewPanel = (data) => API.post('/panels/new', data)

export const getAllAdmins = () => API.get('/admins')
export const addNewAdmin = (data) => API.post('/admins/add', data)

export const getAllStaff = () => API.get('/staff')

export const getAllStudents = () => API.get('/student')