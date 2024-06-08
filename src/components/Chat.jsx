import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import io from 'socket.io-client'
import EmojiPicker from "emoji-picker-react";
import icon from "../images/emoji.svg";
import styles from "../styles/Chat.module.css";
import Messages from './Messages';

const socket = io.connect('http://localhost:5000');

export const Chat = () => {
    const {search} = useLocation();
    const navigate = useNavigate();
    const [params, setParams] = useState({
        room: '',
        username: ''
    });
    const [state, setState] = useState([]);
    const [message, setMessage] = useState("");
    const [isOpen, setOpen] = useState(false);
    const [users, setUsers] = useState(0);

    useEffect(() => {
        const searchParams = Object.fromEntries(new URLSearchParams(search));
        setParams(searchParams);
        socket.emit('join', searchParams)
    }, [search])

    useEffect(() => {
        socket.on("message", ({ data }) => {
      
          setState((_state) => rim([..._state, data]));
        });
      }, []);


      useEffect(() => {
        socket.on("joinRoom", ({ data: {users} }) => {
            setUsers(users.length);
        });
      }, []);

    const leftRoom = () => {
        socket.emit("leftRoom", {params})
        navigate("/")
    }

    const rim = (arr) => {
        
        if(arr.length == 10) {
            return arr.slice(1)
        } else {
            return arr
        }
    }

    const handleChange = ({target: {value}}) => setMessage(value)

    const onEmojiClick = ({emoji}) => setMessage(`${message} ${emoji}`);

    const handleSubmit = (e) => {
        
        e.preventDefault();

        if(!message) return;
      
        socket.emit("sendMessage", {message, params});
        setMessage("");
    }


  

  return (
    <div className={styles.wrap}>
 <div className={styles.header}>

 <div className={styles.title}>
    {params.room}
</div>
<div className={styles.users}>
    {users} users in this room
</div>
<button className={styles.left} onClick={leftRoom}>
    Left the room
</button>
</div>


<div className={styles.messages}>


{state.length > 0 && params.username.length > 0 && <Messages messages={state} username={params.username}/>}
</div>
<form className={styles.form}>
    <div className={styles.input}>
    <input 
                        type="text"
                        name="message"
                        value={message}
                        placeholder='What do you want to say?'
                        autoComplete='off'
                        required
                        onChange={handleChange}
                    />
    </div>

    <div className={styles.emoji}>
            <img src={icon} alt="" onClick={() => setOpen(!isOpen)}/>
            {isOpen && (
 <div className={styles.emojies}>
 <EmojiPicker onEmojiClick={onEmojiClick} />
</div>
            )}
           
    </div>
<div className={styles.button}>
            <input type="submit" onClick={handleSubmit} value="Send a message" />
</div>
</form>
    </div>
  )
}
