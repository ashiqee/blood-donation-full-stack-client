import { Box, Input, InputLabel, TextField } from "@mui/material";


import Swal from "sweetalert2";
import { Elements } from "@stripe/react-stripe-js";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import FundPaymentModal from "./FundPaymentModal";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
const stripePromise = loadStripe(import.meta.env.VITE_Payment_GateWay)


const Fund = () => {
    const { user } = useAuth();
    const [fundData, setFunData] = useState()



    const axiosSecure = useAxiosSecure();

    // data = 2

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        const fundDataInfo = {
            funderName: user?.displayName,
            funderEmail: user?.email,
            funderCompany: data.get("companyName"),
            funderLogo: data.get("companyLogo"),
            amount: data.get('fundAmount')
        }
        setFunData(fundDataInfo);

    };


    return (
        <div className="w-[700px] mb-14 mx-auto">
            <Box component="form" onClick={handleSubmit}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <h2 className="text-3xl mb-5 text-center">Contribute to the Blood Donation Fund</h2>

                    <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
                        <div className="md:flex gap-5">
                            <div className="w-full">
                                <InputLabel>Funder name</InputLabel>
                                <TextField
                                    type="text"
                                    id="requesterName"
                                    name="requesterName"
                                    value={user?.displayName}
                                    defaultValue={user?.displayName}
                                    disabled
                                    className="font-bold w-full text-black"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel>Funder Email</InputLabel>
                                <TextField
                                    type="email"
                                    id="requesterEmail"
                                    name="requesterEmail"
                                    value={user?.email}
                                    defaultValue={user?.name}
                                    disabled
                                    className="w-full"
                                />
                            </div>


                        </div>


                        <div className="flex gap-5">
                            <div className="w-full ">
                                <InputLabel>Comapany Name</InputLabel>
                                <TextField
                                    className="w-full"
                                    type="text"
                                    id="companyName"
                                    name="companyName"
                                    placeholder="company"
                                />
                            </div>

                            {/* Upuzila  */}

                            <div className="w-full">
                                <InputLabel>Company Logo</InputLabel>
                                <TextField
                                    className="w-full"
                                    type="text"
                                    id="companyLogo"
                                    name="companyLogo"
                                    placeholder="paste your logo link"
                                />
                            </div>
                        </div>

                        <div className="w-full">
                            <InputLabel>Funding Amount</InputLabel>
                            <TextField
                                className="w-full"
                                type="number"
                                variant="outlined"
                                InputProps={{ inputProps: { min: 1 } }}

                                id="fundAmount"
                                name="fundAmount"
                            />
                        </div>
                    </div>
                </div>

                <div className=" sm:flex sm:flex-row-reverse sm:px-6">

                    <>
                        <Elements stripe={stripePromise}>

                            <FundPaymentModal fundData={fundData} />
                        </Elements>
                        {/* <button
                            type="submit"
                            className="  inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                        >
                            Fund Payment Now
                        </button> */}
                    </>
                    {/* <FundPaymentModal handlePaymentSubmit={handlePaymentSubmit} /> */}
                </div>
            </Box>
        </div>
    );
};

export default Fund;
