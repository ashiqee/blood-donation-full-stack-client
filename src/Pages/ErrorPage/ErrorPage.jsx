import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <div className="min-h-screen  mx-auto flex flex-col items-center">

                <h2 className="text-4xl absolute top-16 text-red-600 font-bold">404 Not Found</h2>
                <img
                    className=""
                    src="https://i.ibb.co/7Kspm5n/sad-face-bag-blood-cartoon-raised-up-404-boards-vector-34106742-removebg-preview.png"
                    alt=""
                />

                <Link to='/'>
                    <button className="bg-red-400 p-4 absolute bottom-28 rounded-lg" >Go Back</button>
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;