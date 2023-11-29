import { PostAdd } from "@mui/icons-material";


const PageTitle = ({ text, subHeading }) => {
    return (
        <div className="h-150 bg-transparent bg-gradient-to-bl from-red-50 to--900 ">
            <div className="text-center text-red-400 py-16">
                <h2 className="text-3xl font-bold" >{text}</h2>
                <PostAdd />
                <h5>{subHeading}</h5>
            </div>
        </div>
    );
};

export default PageTitle;