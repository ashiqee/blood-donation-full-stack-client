import { Box, InputLabel, TextField } from "@mui/material";

import Option from "../../../Components/Option/Option";

import useAuth from "../../../hooks/useAuth";
import useDistricts from "../../../hooks/useDistricts";


import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useEffect } from "react";
import LoadingCom from '../../../Components/Loading/LoadingCom';
import { useQuery } from "@tanstack/react-query";
import useSingleUserData from "../../../hooks/useSingleUserData";
import { useParams } from "react-router-dom";

const EditDonationReq = () => {
    const { user, loading } = useAuth();
    const [districts, handleDistricts, upuzzila] = useDistricts();
    const [userInfo, isUserLoading] = useSingleUserData();
    const { id } = useParams()

    // console.log(id);

    const axiosSecure = useAxiosSecure();

    const bloodGroup = [
        { id: 1, name: "A+" },
        { id: 2, name: "A-" },
        { id: 3, name: "B+" },
        { id: 4, name: "B-" },
        { id: 5, name: "AB+" },
        { id: 6, name: "AB-" },
        { id: 7, name: "O+" },
        { id: 8, name: "O-" },
    ];

    if (loading) {
        return <LoadingCom />
    }

    const { data: donationReq, isPending: isdonationReqLoading, refetch } = useQuery({
        queryKey: ['donationReq'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/donationReq/${id}`, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            // console.log(res.data);
            return res.data;
        }
    })



    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);

        if (userInfo?.status === "Blocked") {
            return (
                <>
                    {Swal.fire({
                        title: `You Status Blocked!`,
                        text: "can not donation request",
                        icon: "error",
                        position: "center",
                        timer: 1500,
                    })}
                </>
            );
        }

        const donationReqData = {
            requesterName: user?.displayName,
            requesterEmail: user?.email,
            recipientName: data.get("recipientName") || donationReq?.recipientName,
            blood: userInfo?.blood,
            districts: data.get("districts") || donationReq?.districts,
            upuzlia: data.get("upuzlia") || donationReq?.upuzlia,
            hospitalInfo: data.get("hospitalInfo") || donationReq?.hospitalInfo,
            donorReqAddress: data.get("donorReqAddress") || donationReq?.donorReqAddress,
            donateDate: data.get("donateDate") || donationReq?.donateDate,
            donateTime: data.get("donateTime") || donationReq?.donateTime,
            reqMessage: data.get("reqMessage") || donationReq?.reqMessage,
            donationStatus: "pending",
        };

        await axiosSecure.patch(`/donationReqs/${id}`, donationReqData).then((res) => {
            // console.log(res.data);

            if (res.data > 0) {
                Swal.fire({
                    title: `Donation request Update Successfully!`,
                    icon: "success",
                    position: "center",
                    timer: 1500,
                });
            } else {
                Swal.fire({
                    title: `Donation request Update Successfully!`,
                    icon: "success",
                    position: "center",
                    timer: 1500,
                });
            }
        });
    };

    return (
        <div className="container mb-14 mx-auto">
            <Box component="form" onSubmit={handleSubmit}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <h2 className="text-3xl mb-5 text-center">Update Donation Request</h2>
                    {userInfo?.status === "Blocked" ? (
                        <>
                            {" "}
                            <h4 className="px-4 text-red-900">
                                {" "}
                                Your status now {userInfo?.status}{" "}
                            </h4>
                        </>
                    ) : (
                        <></>
                    )}
                    <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
                        <div className="md:flex gap-5">
                            <div className="w-full">
                                <InputLabel>Requester name</InputLabel>
                                <TextField
                                    type="text"
                                    id="requesterName"
                                    name="requesterName"
                                    value={userInfo?.name}
                                    defaultValue={userInfo?.name}
                                    disabled
                                    className="font-bold w-full text-black"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel>Requester Email</InputLabel>
                                <TextField
                                    type="email"
                                    id="requesterEmail"
                                    name="requesterEmail"
                                    value={userInfo?.email}
                                    defaultValue={userInfo?.name}
                                    disabled
                                    className="w-full"
                                />
                            </div>
                            <div className="w-full">
                                <InputLabel>Recipient name</InputLabel>
                                <TextField
                                    type="text"
                                    className="w-full"
                                    id="recipientName"
                                    name="recipientName"
                                    // value={donationReq?.recipientName}
                                    defaultValue={donationReq?.recipientName}
                                    placeholder={donationReq?.recipientName}
                                />
                            </div>
                            {/* Blood  */}
                            <div className="w-full">
                                <InputLabel>Blood Group</InputLabel>
                                <TextField
                                    type="text"
                                    id="blood"
                                    name="blood"
                                    value={donationReq?.blood}
                                    defaultValue={donationReq?.blood}
                                    autoComplete="name"
                                    className="w-full"
                                    disabled
                                />
                            </div>
                        </div>

                        <div className="flex gap-5">
                            <div className="w-full">
                                <InputLabel>Districts</InputLabel>
                                <Option
                                    data={districts}
                                    label={"Select Districts"}
                                    name={"districts"}
                                    // value={donationReq?.districts}
                                    defaultValue={donationReq?.districts}
                                    handleDistricts={handleDistricts}
                                ></Option>
                            </div>

                            {/* Upuzila  */}

                            <div className="w-full">
                                <InputLabel>Upuzilla</InputLabel>
                                <Option
                                    data={upuzzila}
                                    label={"Select Upuzila"}
                                    name={"upuzlia"}
                                    handleDistricts={handleDistricts}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-full ">
                                <InputLabel>Hospital Name</InputLabel>
                                <TextField
                                    className="w-full"
                                    type="text"
                                    id="hospitalInfo"
                                    name="hospitalInfo"
                                    // value={donationReq?.hospitalInfo}
                                    defaultValue={donationReq?.hospitalInfo}
                                    placeholder={donationReq?.hospitalInfo}
                                />
                            </div>

                            {/* Upuzila  */}

                            <div className="w-full">
                                <InputLabel>Full Address</InputLabel>
                                <TextField
                                    className="w-full"
                                    type="text"
                                    // value={donationReq?.donorReqAddress}
                                    defaultValue={donationReq?.donorReqAddress}
                                    id="donorReqAddress"
                                    name="donorReqAddress"
                                    placeholder={donationReq?.donorReqAddress}
                                />
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <div className="w-full ">
                                <InputLabel>Donation Date</InputLabel>
                                <TextField
                                    className="w-full"
                                    type="date"
                                    id="donateDate"
                                    // value={donationReq?.donateDate}
                                    defaultValue={donationReq?.donateDate}
                                    name="donateDate"
                                />
                            </div>

                            {/* Upuzila  */}

                            <div className="w-full">
                                <InputLabel>Donation Time</InputLabel>
                                <TextField
                                    className="w-full"
                                    type="time"
                                    id="donateTime"
                                    // value={donationReq?.donateTime}
                                    defaultValue={donationReq?.donateTime}
                                    name="donateTime"
                                />
                            </div>
                        </div>
                        <div className="w-full">
                            <InputLabel>Request message</InputLabel>
                            <TextField
                                className="w-full"
                                type="text"
                                id="reqMessage"
                                placeholder={donationReq?.reqMessage}
                                // value={donationReq?.reqMessage}
                                defaultValue={donationReq?.reqMessage}
                                name="reqMessage"
                            />
                        </div>
                    </div>
                </div>

                <div className=" sm:flex sm:flex-row-reverse sm:px-6">
                    {userInfo?.status === "Blocked" ? (
                        <>
                            <button
                                disabled
                                type="submit"
                                className="  inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
                            >
                                Update Donation Request
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                type="submit"
                                className="  inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                            >
                                Update Donation Request
                            </button>
                        </>
                    )}
                </div>
            </Box>
        </div>
    );
};

export default EditDonationReq;
