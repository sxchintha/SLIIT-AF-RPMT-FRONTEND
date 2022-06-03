import axios from "axios";

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

var token = getCookie('usertoken');
// var token = ""

console.log(token);

const API = axios.create({
    baseURL: "http://localhost:8070",
    headers: { Authorization: `Bearer ${token}` }
}) // Set base url of backend

export const getAllMarkings = () => API.get('/marking-schemes')
export const createNewMarking = (data) => API.post('/marking-schemes/create', data)
export const updateMarking = (id, data) => API.put(`marking-schemes/update/${id}`, data)
export const deleteMarking = (id) => API.delete(`/marking-schemes/delete/${id}`)

export const creatSubmission = (data) => API.post('/submissions/create', data)
export const getAllSubmissions = () => API.get('/submissions')
export const getAvailableSubmissions = () => API.get('/submissions/availableSubmissions')
export const getSubmission = (id) => API.get(`/submissions/${id}`)
export const updateSubmission = (id, data) => API.put(`/submissions/update/${id}`, data)
export const deleteSubmission = (id) => API.delete(`submissions/delete/${id}`)

export const getAllPanels = () => API.get('/panels')
export const getPanelDetails = (id) => API.get(`/panels/${id}`)
export const createNewPanel = (data) => API.post('/panels/new', data)
export const deletePanel = (id) => API.delete(`panels/delete/${id}`)
export const updatePanel = (id, data) => API.put(`/panels/update/${id}`, data)

export const getAllGroups = () => API.get('/studentGroups')
export const randomAllocate = () => API.put('/studentGroups/rondomAllocatePanel')

export const getAllAdmins = () => API.get('/admins')
export const addNewAdmin = (data) => API.post('/admins/add', data)
export const getAdmin = (data) => API.post(`/admins/profile`, data)
export const getSummary = () => API.get('/admins/summary')
export const updateAdmin = (data) => API.put('/admins/update', data)

export const getAllStaff = () => API.get('/staff')
export const getStaffMember = (id) => API.get(`/staff/get/${id}`)
export const getAcceptedStaff = () => API.get('/staff/accepted')
export const getPendingStaff = () => API.get('/staff/pending')
export const staffStatus = (id, data) => API.put(`/staff/accept-reject/${id}`, data)

export const getAllStudents = () => API.get('/student')
// export const getStudent = (id) => API.get(`/student`)