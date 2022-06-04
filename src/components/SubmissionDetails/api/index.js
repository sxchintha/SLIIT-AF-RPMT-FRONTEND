import axios from 'axios';
const url = "http://localhost:8070/fileupload/docup";

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  var token = getCookie("usertoken");


export const getItems = ()=>axios.get(url);
export const createItem = (item)=>axios.post((url),{
    headers: { Authorization: `Bearer ${token}` },
  },item)