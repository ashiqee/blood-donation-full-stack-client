import { Link } from "react-router-dom";
import useSingleUserData from "../../hooks/useSingleUserData";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";


const JoinAsDonor = () => {
    const axiosSecure = useAxiosSecure()
    const [userInfo, isUserLoading, refetch] = useSingleUserData()



    console.log(userInfo?.role);
    const userRequest = {
        roleStatus: "pending request for donor"
    }

    const handleSubmitAsDonor = async () => {

        await axiosSecure.patch(`/user/donorReq/${userInfo?._id}`, userRequest)
            .then(res => {
                console.log(res.data)
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `You user profile Updated Successfully!`,
                        icon: 'success',
                        position: 'center',
                        timer: 1500
                    })


                }
            })
    }

    const donorRequest = {
        roleStatus: "pending request for Volunteer"
    }

    const handleSubmitAsVolunteer = async () => {

        await axiosSecure.patch(`/user/volunteerReq/${userInfo?._id}`, donorRequest)
            .then(res => {
                console.log(res.data)
                refetch()
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `You user profile Updated Successfully!`,
                        icon: 'success',
                        position: 'center',
                        timer: 1500
                    })


                }
            })
    }


    return (
        <>
            <div>{userInfo?.role === "Guest" && userInfo?.roleStatus === "pending request for donor" ? <Link to='#'> <Button disabled onClick={handleSubmitAsDonor} variant='contained'
                sx={{ bgcolor: "secondary.main", color: "white" }}> Join as a donor
            </Button></Link> : <></>}

                {userInfo?.role === "donor" ? <Link to='#'> <Button onClick={handleSubmitAsVolunteer} variant='contained'
                    sx={{ bgcolor: "secondary.main", color: "white" }}> Join as a Volunteer
                </Button></Link> : <></>}

            </div >

        </>
    );
};

export default JoinAsDonor;