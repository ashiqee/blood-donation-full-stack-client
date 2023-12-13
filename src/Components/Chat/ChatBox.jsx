import React, { useEffect, useRef } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";

import Message from './Message';
import { db } from '../../Config/Firebase/firebase.config';
import useMsgData from './../../hooks/useMsgData';
import { Minimize } from '@mui/icons-material';




const ChatBox = ({ setMsg }) => {

    const { msgData, refetch } = useMsgData()



    // const messages = [
    //     {
    //         id: 1,
    //         username: "Ashiq",
    //         text: 'hellow World',
    //         photoUrl: "https://i.ibb.co/sRQDrTj/profile-pic.jpg"
    //     },
    //     {
    //         id: 2,
    //         username: "Ashiq",
    //         text: 'hi',
    //         photoUrl: "https://i.ibb.co/sRQDrTj/profile-pic.jpg"
    //     },
    //     {
    //         id: 3,
    //         username: "Ashiq",
    //         text: 'I do Thant!',
    //         photoUrl: "https://i.ibb.co/sRQDrTj/profile-pic.jpg"
    //     }
    // ]



    useEffect(() => {

        refetch()
    }, [msgData, refetch])

    // useEffect(() => {
    //     const q = query(collection(db, "messages"));
    //     const unsubscribe = onSnapshot(q, (querySnapshot) => {
    //         const messages = [];
    //         querySnapshot.forEach((doc) => {
    //             // messages.push(doc.data().name);
    //             console.log(doc.data());
    //         });

    //     });
    // })



    const messagesContainerRef = useRef();


    useEffect(() => {
        // Scroll to the bottom of the messages container when msgData changes
        messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }, [msgData]);


    return (
        <div>
            <div>

            </div>
            <div ref={messagesContainerRef} className='rounded-md pb-10 max-w-md max-h-[400px] pt-20  overflow-y-scroll bg-gray-200  mx-auto border p-5'>
                <button onClick={() => setMsg(false)}><h2 className='border p-1   absolute top-0 right-5' ><Minimize /></h2></button>
                {msgData?.map(message => (
                    <Message key={message._id} message={message} />
                ))}

            </div>
        </div>
    );
};

export default ChatBox;