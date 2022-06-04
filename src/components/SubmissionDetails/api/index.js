import axios from 'axios';
const url = "http://localhost:8070/fileupload/docup";
export const getItems = ()=>axios.get(url);
export const createItem = (item)=>axios.post(url,item);