import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import io from "socket.io-client";
import toast from "react-hot-toast";

export default function Chat() {
  const user = useSelector((state) => state.Auth.user);
  // id chatroom
  const { id } = useParams();

  const [chatroom, setChatroom] = useState("");
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState("");

  const userId = user._id;
  const messageRef = React.useRef();

  const sendMessage = () => {
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId: id,
        user: userId,
        message: messageRef.current.value,
      });
      messageRef.current.value = "le message n'est pas passé";
    }
  };

  useEffect(() => {
    (async () => {
      const { data } = await api.get(`/chatroom/${id}`);
      setChatroom(data);
    })();

    const fetchMessages = async () => {
      try {
        const { msg } = await api.get(`/message/${id}`);
        setMessages(msg);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching messages db ");
      }
    };

    fetchMessages();
  }, []);

  useEffect(() => {
    const setupSocket = () => {
      if (user) {
        const newSocket = io.connect("http://localhost:8080", {
          query: {
            userId: user._id,
          },
        });

        newSocket.on("disconnect", () => {
          setSocket(null);
          setTimeout(setupSocket, 3000);
          toast.error("error", "Socket Disconnected!");
          console.log("decooooo");
        });

        newSocket.on("connect", () => {
          toast.success("Socket Connected!");
        });

        setSocket(newSocket);

        console.log("connecteeey", newSocket);
      }
    };
    setupSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("newMessage", (message) => {
        const newMessages = [...messages, message];
        setMessages(newMessages);
      });
      console.log("new messages");
      socket.emit("joinRoom", {
        chatroomId: id,
      });
      console.log("join room");
      return () => {
        if (socket) {
          socket.emit("leaveRoom", {
            chatroomId: id,
          });
          console.log("leave room");
        }
      };
    }
  }, [socket, messages, id]);

  return (
    <div className="chatroomPage">
      <div className="chatroomSection">
        <div className="button">Chatroom {chatroom.name} </div>
        <div className="chatroomContent">
          {messages.map((message, i) => (
            <div key={i} className="message">
              <span className={userId === message.userId ? "ownMessage" : "otherMessage"}>{message.name}:</span> {message.message}
            </div>
          ))}
        </div>
        <div className="chatroomActions">
          <div>
            <input type="text" name="message" placeholder={`Say something ${user.name} !`} ref={messageRef} />
          </div>
          <div>
            <button className="button" onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
