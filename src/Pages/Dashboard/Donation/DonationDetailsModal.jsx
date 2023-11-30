import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { Box, Divider, InputLabel, TextField } from "@mui/material";

import useAuth from "./../../../hooks/useAuth";
import usePublicAxios from "../../../hooks/usePublicAxios";
import Swal from "sweetalert2";

const DonationDetailsModal = ({ id, status, refetch }) => {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const axiosPublic = usePublicAxios();

  const cancelButtonRef = useRef(null);

  const handleDonateAdd = async (e) => {
    e.preventDefault();

    const donorData = {
      donorName: user?.displayName,
      donorEmail: user?.email,
    };
    const res = await axiosPublic.patch(
      `/donorDataInDonation/${id}`,
      donorData
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: `Donation Confirm submit Successfully!`,
        icon: "success",
        position: "center",
        timer: 1500,
      });
      setOpen(false);
      refetch()
    }
  };
  return (
    <>
      {status === "inprogress" ? (
        <>
          {" "}
          <button
            disabled
            type="button"
            content="Donate"
            onClick={() => setOpen(true)}
            ref={cancelButtonRef}
            className="btn py-2 px-3 rounded-xl text-white bg-gray-400"
          >
            Donate
          </button>
        </>
      ) : (
        <>
          {" "}
          <button
            type="button"
            content="Donate"
            onClick={() => setOpen(true)}
            ref={cancelButtonRef}
            className="btn py-2 px-3 rounded-xl text-white bg-[#f34334]"
          >
            Donate
          </button>
        </>
      )}

      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-9999 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel
                  className="relative z-9999 transform overflow-hidden
                                              rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                >
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <h2 className="text-3xl text-center">Donation Confirm</h2>
                    <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
                      {/* Donation form  */}
                      <div className="w-full space-y-4">
                        <Divider />
                        <Box component="form" onSubmit={handleDonateAdd}>
                          <div className="w-full flex gap-5 items-center space-y-4">
                            <div className="w-full mt-4">
                              {/* dattttt */}

                              <div className="md:flex gap-5">
                                <div className="w-full">
                                  <InputLabel>Donor name</InputLabel>
                                  <TextField
                                    type="text"
                                    id="donorName"
                                    name="donorName"
                                    value={user?.displayName}
                                    defaultValue={user?.displayName}
                                    disabled
                                    className="font-bold w-full text-black"
                                  />
                                </div>
                                <div className="w-full">
                                  <InputLabel>Donor Email</InputLabel>
                                  <TextField
                                    type="email"
                                    id="donorEmail"
                                    name="donorEmail"
                                    value={user?.email}
                                    defaultValue={user?.email}
                                    disabled
                                    className="w-full"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="gap-5 mt-10 text-center px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                            <button
                              type="submit"
                              className=" uppercase justify-center rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 "
                            >
                              confirm donate
                            </button>
                            <button
                              type="button"
                              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              onClick={() => setOpen(false)}
                              ref={cancelButtonRef}
                            >
                              Cancel
                            </button>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default DonationDetailsModal;
