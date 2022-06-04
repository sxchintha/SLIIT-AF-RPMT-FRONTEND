import React from 'react'
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import axios from "axios";

import "../chat/chat.css";
import Sidebar from '../Sidebar';
import Footer from '../Footer';


function App() {
  
  const [room, setRoom] = useState("");
  
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [studentgroups, setStudentGroup] = useState([]);
  const [socketmessage, setSocketMessage] = useState("");
  
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
  
  const socket = io.connect("http://localhost:8070", {
    headers: { Authorization: `Bearer ${token}` },
  });
  
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  const sendMessage = async () => {
    socket.emit("send_message", { message, room });
    // console.log(message)
    const msg = {
      msg: message
    }
    //console.log(typeof msg);
    setSocketMessage(message)

    await axios.post(`http://localhost:8070/chat/add/${room}`, msg,  {
        headers: { Authorization: `Bearer ${token}` },
      }).then(() => {
      //console.log("MEssage SEnd Success")
    }).catch((err) => {
      console.log(err)
    })

    document.getElementById("message-send").value = "";

   
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setSocketMessage(data.message);
      console.log("socket: " + data.message);
      // setMessageReceived(data.message);
      // console.log(data.message)
      // console.log(data.room)
      // alert(data.message);
    })

  }, [socket])

  useEffect(() => {
      const getGroups = () => {
          axios.get("http://localhost:8070/studentGroups/", {
            headers: { Authorization: `Bearer ${token}` },
          }).then((res) => {
              console.log(res)
            //   setStudentGroup()
          }).catch((er) => {
              alert(er);
          })
      }
      getGroups();
  },[])

  useEffect(() => {
    const getMessages = () => {
      axios.get(`http://localhost:8070/chat/get/room`,  {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        // console.log(res)
        setMessageReceived(res.data.messages.message)
        // console.log(res.data.msg.message)
        // console.log(messageReceived)
      }).catch((er) => {
        alert(er);
      })
    }
    getMessages();
  }, [socketmessage])



  return (

        <div>
            <div className="container-fluid overflow-hidden">
                <div className="row vh-100 overflow-auto">
                    <Sidebar />

                    <div className="col d-flex flex-column h-sm-100">
                        <main className="row overflow-auto">
                            <div className="col pt-4 ps-4">
                                {/* Body */}
                                <h2>Admins</h2>

                                <div>
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

<div class="container">
<div class="row clearfix">
    <div class="col-lg-12">
        <div class="card chat-app">
            <div id="plist" class="people-list">
                <ul class="list-unstyled chat-list mt-2 mb-0">
                    <li class="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
                        <div class="about">
                            <div class="name">Vincent Porter</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
                        </div>
                    </li>
                    <li class="clearfix active">
                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                        <div class="about">
                            <div class="name">Aiden Chavez</div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                        <div class="about">
                            <div class="name">Mike Thomas</div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>                                    
                    <li class="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                        <div class="about">
                            <div class="name">Christian Kelly</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> left 10 hours ago </div>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" />
                        <div class="about">
                            <div class="name">Monica Ward</div>
                            <div class="status"> <i class="fa fa-circle online"></i> online </div>
                        </div>
                    </li>
                    <li class="clearfix">
                        <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
                        <div class="about">
                            <div class="name">Dean Henry</div>
                            <div class="status"> <i class="fa fa-circle offline"></i> offline since Oct 28 </div>
                        </div>
                    </li>
                </ul>
            </div>

            {/* <input 
                palaceholder ="Room number"
                onChange = {(e) =>{
                    setRoom(e.target.value)
                }}/>
                <button onClick ={joinRoom}>Join Room</button> */}

            <div class="chat">
                <div class="chat-header clearfix">
                    <div class="row">
                        <div class="col-lg-6">
                            <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                            </a>
                            <div class="chat-about">
                                <h6 class="m-b-0">Aiden Chavez</h6>
                                <small>Last seen: 2 hours ago</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chat-history">
                    <ul class="m-b-0">
                        {/* <li class="clearfix">
                            <div class="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
                        </li> */}

                          {
                            messageReceived.map((items, key) => (

                              <li class="clearfix" key={key}>
                                  <div class="message other-message float-right">{items}</div>
                              </li>

                            ))
                          }
                          <li class="clearfix" >
                            <div class="message other-message float-right">{socketmessage}</div>
                          </li>

                        {/* <li class="clearfix">
                            <div class="message-data">
                                <span class="message-data-time">10:12 AM, Today</span>
                            </div>
                            <div class="message my-message">Are we meeting today?</div>                                    
                        </li>                               
                        <li class="clearfix">
                            <div class="message-data">
                                <span class="message-data-time">10:15 AM, Today</span>
                            </div>
                            <div class="message my-message">Project has been already finished and I have results to show you.</div>
                        </li> */}
                    </ul>
                </div>
                <div class="chat-message clearfix">
                    <div class="input-group mb-0">
                        <div class="input-group-prepend">
                            <button onClick={sendMessage} class="input-group-text btn-send"><i class="fa fa-send"></i></button>
                        </div>
                        <input id="message-send" type="text" class="form-control" placeholder="Enter text here..." onChange = {(e) =>{setMessage(e.target.value)}} />                                    
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>
    </div>

                            </div>
                        </main>
                        <Footer />
                    </div>
                </div>
            </div>
        </div>

  );
}

export default App;


// <div>
//     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

// <div class="container">
// <div class="row clearfix">
//     <div class="col-lg-12">
//         <div class="card chat-app">
//             {/* <div id="plist" class="people-list">
//                 <ul class="list-unstyled chat-list mt-2 mb-0">
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar1.png" alt="avatar" />
//                         <div class="about">
//                             <div class="name">Vincent Porter</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 7 mins ago </div>                                            
//                         </div>
//                     </li>
//                     <li class="clearfix active">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
//                         <div class="about">
//                             <div class="name">Aiden Chavez</div>
//                             <div class="status"> <i class="fa fa-circle online"></i> online </div>
//                         </div>
//                     </li>
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
//                         <div class="about">
//                             <div class="name">Mike Thomas</div>
//                             <div class="status"> <i class="fa fa-circle online"></i> online </div>
//                         </div>
//                     </li>                                    
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
//                         <div class="about">
//                             <div class="name">Christian Kelly</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> left 10 hours ago </div>
//                         </div>
//                     </li>
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar8.png" alt="avatar" />
//                         <div class="about">
//                             <div class="name">Monica Ward</div>
//                             <div class="status"> <i class="fa fa-circle online"></i> online </div>
//                         </div>
//                     </li>
//                     <li class="clearfix">
//                         <img src="https://bootdey.com/img/Content/avatar/avatar3.png" alt="avatar" />
//                         <div class="about">
//                             <div class="name">Dean Henry</div>
//                             <div class="status"> <i class="fa fa-circle offline"></i> offline since Oct 28 </div>
//                         </div>
//                     </li>
//                 </ul>
//             </div> */}

//             <input 
//                 palaceholder ="Room number"
//                 onChange = {(e) =>{
//                     setRoom(e.target.value)
//                 }}/>
//                 <button onClick ={joinRoom}>Join Room</button>

//             <div class="chat">
//                 <div class="chat-header clearfix">
//                     <div class="row">
//                         <div class="col-lg-6">
//                             <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
//                                 <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
//                             </a>
//                             <div class="chat-about">
//                                 <h6 class="m-b-0">Aiden Chavez</h6>
//                                 <small>Last seen: 2 hours ago</small>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div class="chat-history">
//                     <ul class="m-b-0">
//                         {/* <li class="clearfix">
//                             <div class="message other-message float-right"> Hi Aiden, how are you? How is the project coming along? </div>
//                         </li> */}

//                           {
//                             messageReceived.map((items, key) => (

//                               <li class="clearfix" key={key}>
//                                   <div class="message other-message float-right">{items}</div>
//                               </li>

//                             ))
//                           }
//                           <li class="clearfix" >
//                             <div class="message other-message float-right">{socketmessage}</div>
//                           </li>

//                         {/* <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:12 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Are we meeting today?</div>                                    
//                         </li>                               
//                         <li class="clearfix">
//                             <div class="message-data">
//                                 <span class="message-data-time">10:15 AM, Today</span>
//                             </div>
//                             <div class="message my-message">Project has been already finished and I have results to show you.</div>
//                         </li> */}
//                     </ul>
//                 </div>
//                 <div class="chat-message clearfix">
//                     <div class="input-group mb-0">
//                         <div class="input-group-prepend">
//                             <button onClick={sendMessage} class="input-group-text btn-send"><i class="fa fa-send"></i></button>
//                         </div>
//                         <input id="message-send" type="text" class="form-control" placeholder="Enter text here..." onChange = {(e) =>{setMessage(e.target.value)}} />                                    
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// </div>
//     </div>