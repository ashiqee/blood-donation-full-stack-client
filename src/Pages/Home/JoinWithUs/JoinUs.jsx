import { Button } from "@mui/material";
import Funding from "../../../Components/Funding/Funding";
import { Link } from "react-router-dom";

const JoinUs = () => {
    return (
        <div className="bg-fixed bg-cover h-[500] items-center "
            style={{ backgroundImage: 'url(https://hearmefolks.com/wp-content/uploads/2022/09/sell-your-eggs-960x480.jpg)' }}>
            <div className=" bg-gradient-to-bl from-red-100 bg-opacity-60">
                <div className="w-3/4 mx-auto  md:pl-56 py-20" >

                    {/* <h2 className="md:text-2xl text-xl font-semibold text-[#f34334]">WORLD</h2> */}

                    <Funding />
                    <div className="flex my-5">
                        <h2 className="md:text-6xl text-3xl font-semibold text-[#f34334]">Invest in Health: Blood Donation Fund</h2>


                    </div>

                    <Link to="/fundingPage">
                        <Button variant="contained">Donate Fund</Button>
                    </Link>
                </div>

            </div>


        </div>
    );
};

export default JoinUs;