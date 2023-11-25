

const SecTitle = ({ title, subHeading }) => {
    return (
        <div className="text-center my-10">
            <h2 className="text-3xl border-b-4  w-80 mx-auto py-5 border-[#f34334] text-[#f34334]">{title}</h2>

            <p className="text-xm py-5 text-gray-700">{subHeading}</p>
        </div>
    );
};

export default SecTitle;