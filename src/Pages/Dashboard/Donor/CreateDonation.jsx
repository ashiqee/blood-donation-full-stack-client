import { Box, Input, InputLabel, TextField } from "@mui/material";

import Option from "../../../Components/Option/Option";

import useAuth from "../../../hooks/useAuth";
import useDistricts from "../../../hooks/useDistricts";

import useSingleUserData from "../../../hooks/useSingleUserData";
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { useEffect } from "react";


const CreateDonation = () => {
  const { user } = useAuth();
  const [districts, handleDistricts, upuzzila] = useDistricts();

  const [userInfo, isUserLoading, refetch] = useSingleUserData();
  const axiosSecure = useAxiosSecure()

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





  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);


    if (userInfo?.status === "Blocked") {
      return <>
        {Swal.fire({
          title: `You Status Blocked!`,
          text: "can not donation request",
          icon: 'error',
          position: 'center',
          timer: 1500
        })}
      </>
    }


    const donationReqData = {
      requesterName: user?.displayName,
      requesterEmail: user?.email,
      recipientName: data.get("recipientName"),
      blood: userInfo?.blood,
      districts: data.get("districts"),
      upuzlia: data.get("upuzlia"),
      hospitalInfo: data.get("hospitalInfo"),
      donorReqAddress: data.get("donorReqAddress"),
      donateDate: data.get("donateDate"),
      donateTime: data.get("donateTime"),
      reqMessage: data.get("reqMessage"),
      donationStatus: "pending"
    };

    await axiosSecure.post(`/donationReqs`, donationReqData)
      .then(res => {
        console.log(res.data)

        if (res.data.modifiedCount > 0) {
          Swal.fire({
            title: `Donation request submit Successfully!`,
            icon: 'success',
            position: 'center',
            timer: 1500
          })


        } else {
          Swal.fire({
            title: `Donation request submit unsuccessfull!`,
            icon: 'error',
            position: 'center',
            timer: 1500
          })
        }

      })




  };

  return (
    <div className="container mb-14 mx-auto">
      <Box component="form" onSubmit={handleSubmit}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h2 className="text-3xl mb-5 text-center">Create Donation Request</h2>
          {userInfo?.status === 'Blocked' ? <> <h4 className="px-4 text-red-900"> Your status now {userInfo?.status} </h4></> : <></>}
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
                  placeholder="recipient name"
                />
              </div>
              {/* Blood  */}
              <div className="w-full">
                <InputLabel>Blood Group</InputLabel>
                <TextField
                  type="text"
                  id="blood"
                  name="blood"
                  defaultValue={userInfo?.blood}
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
                  placeholder="Like Dhaka Medical College Hospital"
                />
              </div>

              {/* Upuzila  */}

              <div className="w-full">
                <InputLabel>Full Address</InputLabel>
                <TextField
                  className="w-full"
                  type="text"
                  id="donorReqAddress"
                  name="donorReqAddress"
                  placeholder="Zahir Raihan Rd,Dhaka"
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
                name="reqMessage"
              />
            </div>
          </div>
        </div>

        <div className=" sm:flex sm:flex-row-reverse sm:px-6">
          {
            userInfo?.status === 'Blocked' ? <>
              <button
                disabled
                type="submit"
                className="  inline-flex w-full justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm  sm:ml-3 sm:w-auto"
              >
                Create Donation Request
              </button>
            </> : <>
              <button

                type="submit"
                className="  inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              >
                Create Donation Request
              </button></>
          }
        </div>
      </Box>
    </div>
  );
};

export default CreateDonation;
