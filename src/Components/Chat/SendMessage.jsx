import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from './../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import useMsgData from "../../hooks/useMsgData";


const SendMessage = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()

    const [value, setValue] = useState('')
    const { msgData, refetch } = useMsgData()


    const handleSendMessage = async (e) => {
        e.preventDefault()


        const msgData = {
            text: value,
            username: user.displayName,
            userEmail: user.email,
            photoUrl: user.photoURL,
        }

        await axiosSecure
            .post(`/msg`, msgData)
            .then((res) => {
                // console.log(res.data);

                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `You msg send Successfully!`,
                        text: "",
                        icon: "success",
                        position: "center",
                        timer: 1500,
                    });

                }
            });



        // console.log(msgData);
        setValue('')
        refetch()



    }
    return (
        <div className="bg-gray-200    py-10 shadow-md">

            <form onSubmit={handleSendMessage} className="max-w-screen-sm px-10 mx-auto flex">
                <input value={value} onChange={e => setValue(e.target.value)}
                    className="input p-5 w-full focus:outline-none bg-gray-100" type="text" />
                <button type="submit" className="btn w-auto bg-red-600 px-4 text-white rounded-r-md">SEND</button>
            </form>
        </div>
    );
};

export default SendMessage;