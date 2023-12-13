import useAuth from "../../hooks/useAuth";


const Message = ({ message }) => {
    const { user } = useAuth()


    return (
        <>
            <div className={
                user?.email === message?.userEmail ? "flex flex-row-reverse gap-2  mb-5 items-center" : "flex gap-2  mb-5 items-center"
            }>
                <img className="w-8  rounded-full" src={message.photoUrl} />
                <span>
                    <h4 className="text-[10px]">{message.username}</h4>
                    <h2 className="text-sm bg-gray-300 px-3 p-1  rounded-lg">{message.text}</h2>
                </span>
            </div >

        </>
    );
};

export default Message;