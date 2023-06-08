import { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase-config";
export const Chat = (props) => {
    const { room } = props;
    const [newMessage, setNewMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const messageRef = collection(db, "messages");
    
    

    useEffect(() => {
        const queryMessages = query(messageRef, where("room", "==", room), orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessages, (snapShot) => {
            let messages = [];
            snapShot.forEach((doc) => {
                messages.push({ ...doc.data(), id: doc.id});
            });
            setMessages(messages);
            
        });

        return () => unsubscribe();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newMessage==="") return;

        await addDoc(messageRef, {
            text: newMessage,
            createdAt: serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room
        });

        setNewMessage("");
        console.log(messages);
    };
    return (
        <div className="chat-app">
            <div className="header">Welcome to {room}</div>
            <div className="messages">
                {messages.map((row) => (
                    // <h3 key={row.id}>{row.text}</h3> 
                    <div className="message" key={row.id}>
                        <span className="user">{row.user} wrote: </span> <br />
                        {row.text}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="new-message-form">
                <input 
                    className="new-message-input" 
                    placeholder="Type here..."
                    onChange={(e) => setNewMessage(e.target.value)} 
                    value={newMessage}>
                </input>
                <button type="submit" className="send-button"> Send </button>
            </form>
        </div>
    )
}