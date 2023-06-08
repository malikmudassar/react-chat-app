import React, { useState, useRef } from 'react';
import "./App.css";
import { Auth } from './components/Auth';
import Cookies from "universal-cookie";
import { Chat } from './components/Chat';
import { signOut } from "firebase/auth";
import { auth } from './firebase-config';
const cookies = new Cookies();

function App() {
    const [isAuth, setIsAuth ] = useState(cookies.get('auth-token'));
    const [room, setRoom ] = useState(null);
    const roomInputRef = useRef(null);
    const signUserOut = async () => {
        await signOut(auth);
        cookies.remove("auth-token");
        setIsAuth("false");
        setRoom(null);
    }
    if(!isAuth)
    {
        return (<div>
            <Auth setIsAuth={setIsAuth}/>
            </div>)
    }

    return <div>
        { room ? 
            (<Chat room={room} />) : 
            <div className='room'>
                <h3>Enter Room Name</h3>
                <div className='input'>
                <input type="text" name="room" ref={roomInputRef} />
            </div>
            <button onClick={() => setRoom(roomInputRef.current.value)}>Enter Chat</button>
        </div>}
        <div className='center-align'><button className='signout' onClick={signUserOut}>Signout</button></div>
        </div>
    
}

export default App;