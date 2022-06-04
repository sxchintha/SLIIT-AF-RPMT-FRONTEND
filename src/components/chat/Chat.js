import React from 'react'
import io from 'socket.io-client';
import { useEffect, useState } from "react";
import axios from "axios";

import "../chat/chat.css";
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import { getStaffMember, getStudent } from '../../index.api';


function App() {

  const [room, setRoom] = useState("room");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState([]);
  const [studentgroups, setStudentGroup] = useState([]);
  const [socketmessage, setSocketMessage] = useState("");
  const [socketuser, setSocketUser] = useState("");
  // const [cuname, setCuname] = useState("")
  const [student, setStudent] = useState([])
  const localToken = JSON.parse(localStorage.getItem('localToken'))

  useEffect(() => {
    if (localToken.role == 5150) {
      axios.get("http://localhost:8070/studentGroups/", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((res) => {
        // console.log(res)
        setStudentGroup(res.data.groups)
      }).catch((er) => {
        alert(er);
      })

    } else {
      getStudent(localToken.userId)
        .then(user => {
          console.log(user);
          setRoom(user.data.student.groupId)
          setStudent(user.data.student)
        })
    }
    console.log(localToken.role);
  }, [])

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
  // console.log(token);

  const socket = io.connect("http://localhost:3001");

  const joinRoom = (e) => {
    socket.emit("join_room", e);
    // if (room !== "") {
    //   socket.emit("join_room", room);
    // }
  };

  const sendMessage = async () => {
    cuname = localToken.fname
    socket.emit("send_message", { message, room, cuname });
    // console.log(message)
    var msg = {
      msg: message,
      user: cuname
    }
    //console.log(typeof msg);
    setSocketMessage(message)
    setSocketUser(cuname)

    await axios.post(`http://localhost:3001/chat/add/${room}`, msg).then(() => {
      //console.log("MEssage SEnd Success")
    }).catch((err) => {
      console.log(err)
    })

    document.getElementById("message-send").value = "";

  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setSocketMessage(data.message);
      setSocketUser(data.cuname)
      // console.log("socket: " + data.message);
    })
  }, [socket])


  useEffect(() => {
    const getMessages = () => {
      axios.get(`http://localhost:3001/chat/get/${room}`)
        .then((res) => {
          // console.log(res)
          setMessageReceived(res.data.messages.message)
          // console.log(res.data.msg.message)
          // console.log(messageReceived)
        }).catch((er) => {
          alert(er);
        })
    }
    getMessages();
  }, [socketmessage, room])


  handleChat = (e) => {
    setSocketMessage('')
    setRoom(e)
    joinRoom(e)
  }



  return (

    <div>
      <div className="container-fluid overflow-hidden">
        <div className="row vh-100 overflow-auto">
          <Sidebar />

          <div className="col d-flex flex-column h-sm-100">
            <main className="row overflow-auto">
              <div className="col pt-4 ps-4">
                {/* Body */}
                <h2>{localToken.role}</h2>

                <div>
                  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />

                  <div className="container">
                    <div className="row clearfix">
                      <div className="col-lg-12">
                        <div className="card chat-app">
                          <div id="plist" className="people-list">
                            <ul className="list-unstyled chat-list mt-2 mb-0">
                              {
                                localToken.role == 5150 ?
                                  studentgroups.map((group, key) => {
                                    return (
                                      <li className="clearfix" onClick={() => { handleChat(group._id) }} key={key}>
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                        <div className="about">
                                          <div className="name">{group.groupName}</div>
                                          {/* <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div> */}
                                        </div>
                                      </li>
                                    )
                                  })
                                  : <li className="clearfix">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="avatar" />
                                    <div className="about">
                                      <div className="name">Chat group</div>
                                      {/* <div className="status"> <i className="fa fa-circle offline"></i> left 7 mins ago </div> */}
                                    </div>
                                  </li>
                              }

                            </ul>
                          </div>

                          <div className="chat">
                            <div className="chat-header clearfix">
                              <div className="row">
                                <div className="col-lg-6">
                                  <a href="javascript:void(0);" data-toggle="modal" data-target="#view_info">
                                    <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="avatar" />
                                  </a>
                                  <div className="chat-about">
                                    {/* <h6 className="m-b-0">Aiden Chavez</h6>
                                    <small>Last seen: 2 hours ago</small> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="chat-history">
                              <ul className="m-b-0">


                                {
                                  messageReceived.map((items, key) => (

                                    <li className="clearfix" key={key}>
                                      <div className="message-data">
                                        <span className="message-data-time float-left">{items.user}</span>
                                      </div>
                                      <div className="message other-message float-left">{items.msg}</div>
                                    </li>

                                  ))
                                }

                                {
                                  socketmessage == '' ? ''
                                    :
                                    <li className="clearfix" >
                                      <div className="message-data">
                                        <span className="message-data-time float-left">{socketuser}</span>
                                      </div>
                                      <div className="message other-message float-left">{socketmessage}</div>
                                    </li>
                                }

                              </ul>
                            </div>
                            <div className="chat-message clearfix">
                              <div className="input-group mb-0">
                                <div className="input-group-prepend">
                                  <button onClick={sendMessage} className="input-group-text btn-send"><i className="fa fa-send"></i></button>
                                </div>
                                <input id="message-send" type="text" className="form-control" placeholder="Enter text here..." onChange={(e) => { setMessage(e.target.value) }} />
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
