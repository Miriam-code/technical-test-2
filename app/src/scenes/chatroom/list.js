import { Formik, Field, Form } from "formik";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Loader from "../../components/loader";
import api from "../../services/api";

function ChatroomList() {
  const [chatroomList, setChatroomList] = useState(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const fetchChatrooms = async () => {
      try {
        const { chatrooms } = await api.get("/chatroom");
        setChatroomList(chatrooms);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching chatrooms");
      }
    };
    fetchChatrooms();
  }, []);

  const createChatroom = async () => {
    try {
      const res = await api.post("/chatroom", { name });
      if (!res.ok) throw res;
      toast.success(res.message);
      //history.push(`/chatroom/${res.id}`);
    } catch (e) {
      console.error(e);
      toast.error("Error creating chatroom");
    }
  };

  if (!chatroomList) return <Loader />;

  return (
    <div className="card shadow">
      <div className="button">CHATROOMS</div>
      <div className="cardBody">
        <Formik initialValues={{ name: "" }} onSubmit={createChatroom}>
          <Form>
            <div className="inputGroup">
              <label htmlFor="chatroomName">Chatroom Name</label>
              <Field type="text" name="name" id="chatroomName" placeholder="Enter chatroom name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <button className="button-chat button" type="submit">
              Create Chatroom
            </button>
          </Form>
        </Formik>
      </div>

      <div className="chatrooms">
        {chatroomList.map((chatroom) => (
          <div key={chatroom._id} className="chatroom">
            <div>{chatroom.name}</div>
            <Link to={`/chatroom/${chatroom._id}`} className="button">
              JOIN &#x2192;
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChatroomList;
