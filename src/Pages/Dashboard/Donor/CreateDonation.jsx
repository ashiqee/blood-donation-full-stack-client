import { Box, Input, InputLabel, TextField } from "@mui/material";

import Option from "../../../Components/Option/Option";

import useAuth from "../../../hooks/useAuth";
import useDistricts from "../../../hooks/useDistricts";

import useSingleUserData from "../../../hooks/useSingleUserData";

const CreateDonation = () => {
  const { user } = useAuth();
  const [districts, handleDistricts, upuzzila] = useDistricts();

  const [userInfo, isUserLoading, refetch] = useSingleUserData();

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
  };

  return (
    <div className="container mx-auto">
      <Box component="form" onSubmit={handleSubmit}>
        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
          <h2 className="text-3xl mb-5 text-center">Create Donation Request</h2>
          <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
            <div className="md:flex gap-5">
              <div className="w-full">
                <InputLabel>Requester name</InputLabel>
                <TextField
                  type="text"
                  id="name"
                  name="name"
                  value={userInfo?.name}
                  defaultValue={userInfo?.name}
                  disabled
                  autoComplete="name"
                  className="font-bold w-full text-black"
                />
              </div>
              <div className="w-full">
                <InputLabel>Requester Email</InputLabel>
                <TextField
                  type="text"
                  id="email"
                  name="email"
                  value={userInfo?.email}
                  defaultValue={userInfo?.name}
                  disabled
                  className="w-full"
                  autoComplete="name"
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
              {/* <div className="w-full">
                <TextField
                  type="text"
                  id="blood"
                  name="blood"
                  label="Blood Group"
                  defaultValue={userInfo?.blood}
                  autoComplete="name"
                  disabled
                />
              </div> */}
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
                  id="address"
                  name="address"
                  placeholder="Like Dhaka Medical College Hospital"
                />
              </div>

              {/* Upuzila  */}

              <div className="w-full">
                <InputLabel>Full Address</InputLabel>
                <TextField
                  className="w-full"
                  type="text"
                  id="address"
                  name="address"
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
          <button
            type="submit"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
          >
            Create Donation Request
          </button>
        </div>
      </Box>
    </div>
  );
};

export default CreateDonation;
