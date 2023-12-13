// Chat.js
import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import useAuth from '../../hooks/useAuth';
// import { firestore } from '../../Config/Firebase/firebase.config';
import SendMessage from './SendMessage';
import ChatBox from './ChatBox';

const Chat = ({ setMsg }) => {
    const { user } = useAuth()
    // const [newMessage, setNewMessage] = useState('');
    // const messagesRef = firestore.collection('messages');
    // const query = messagesRef.orderBy('timestamp');
    // const [messages] = useCollectionData(query, { idField: 'id' });

    // const handleSendMessage = async () => {
    //     if (newMessage.trim() === '') {
    //         return; // Don't send empty messages
    //     }

    //     await messagesRef.add({
    //         text: newMessage,
    //         timestamp: new Date(),
    //         userId: user.uid, // Assuming you have user information from Firebase Auth
    //         userName: user.displayName, // Replace with the actual user information you have
    //     });

    //     setNewMessage('');
    // };

    return (
        <div className='min-h-[600px] absolute right-20 bottom-0 items-end justify-end rounded-md mt-10 max-w-md'>
            {/* <div>
                {messages &&
                    messages.map((message) => (
                        <div key={message.id}>
                            <strong>{message.userName}: </strong>
                            {message.text}
                        </div>
                    ))}
            </div>
            <div>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage}>Send</button>
            </div> */}
            <div>
                <ChatBox setMsg={setMsg} />
                <SendMessage />
            </div>
        </div>
    );
};

export default Chat;
