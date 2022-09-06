import React, {useState,useEffect} from 'react';
import axios from "axios";
import {v4} from "uuid";

export const LongPulling = () => {
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const subscribe = async () => {
        try{
            const {data} = await axios.get('http://localhost:5000/get-messages')
            setMessages(prev => [data,...prev])
            await subscribe()
        } catch (e){
            setTimeout(()=> {subscribe()},100)
        }
    }

    useEffect(()=>{
        subscribe().then();
    },[])


    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            messages: value,
            id: v4()
        })
    }
    return (
        <div className="wrapper">
            <div>
                <div className="form">
                    <input value={value}
                           onChange={(e)=> setValue(e.currentTarget.value)}
                           type="text"/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="message">
                    {messages.map(mess =>
                        <div key={mess.id} className="messageItem">
                            {mess.messages}
                        </div>)}
                </div>
            </div>
        </div>
    );
};

