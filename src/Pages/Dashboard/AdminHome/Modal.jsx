import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";



import { Box, Divider, IconButton } from "@mui/material";
import { PencilIcon } from '@heroicons/react/24/solid';
import OptionAll from "../../../Components/Option/OptionAll";

import { RiUserForbidFill } from "react-icons/ri";
import useAxiosSecure from './../../../hooks/useAxiosSecure';
import Swal from "sweetalert2";
import { Delete } from "@mui/icons-material";

const Modal = ({ userStatus, userRole, id, refetch }) => {
    const axiosSecure = useAxiosSecure()

    // console.log(userStatus, id, userRole);

    const [open, setOpen] = useState(false);



    const cancelButtonRef = useRef(null);


    const roleData =
        [
            { id: 1, name: "Admin" },
            { id: 2, name: "Donor" },
            { id: 3, name: "Volunteer" },
            { id: 4, name: "Guest" },

        ];

    const handleUserRoleUpdate = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);

        const userNewRole = data.get('role')


        const userUpdateRoleData = {
            role: userNewRole,
        }
        console.log(userUpdateRoleData);

        const userRoleUpdate = await axiosSecure.patch(`/user/admin/${id}`, userUpdateRoleData)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    Swal.fire({
                        title: `You user role now ${userNewRole}`,
                        icon: 'success',
                        position: 'center',
                        timer: 1500
                    })
                    refetch()
                    setOpen(false)
                }
            })

        console.log(userRoleUpdate);




        console.log(userRole, id);
    }

    const handleChangeStatus = () => {
        if (userStatus === 'Active') {
            axiosSecure.patch(`/user/status/${id}`, { status: "Blocked" })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: `User status Blocked`,
                            icon: 'success',
                            position: 'center',
                            timer: 1500
                        })
                        refetch()
                        setOpen(false)
                    }
                })

        } else {
            axiosSecure.patch(`/user/status/${id}`, { status: "Active" })
                .then(res => {
                    console.log(res.data);
                    if (res.data.modifiedCount > 0) {
                        Swal.fire({
                            title: `User now Active`,
                            icon: 'success',
                            position: 'center',
                            timer: 1500
                        })
                        refetch()
                        setOpen(false)
                    }
                })
        }
    }


    return (
        <>
            {/* <Tooltip >
                <IconButton variant="text">
                    <PencilIcon className="h-4 w-4" />
                </IconButton>
            </Tooltip> */}
            <button
                type="button"
                content="Edit User" onClick={() => setOpen(true)}
                ref={cancelButtonRef}
                className="btn py-2 px-3 rounded-xl text-white bg-[#f34334]"

            > <IconButton variant="text">
                    <PencilIcon className="h-4 w-4 text-white" />
                </IconButton>


            </button>
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
                                        <h2 className="text-3xl text-center">Update User Status</h2>
                                        <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
                                            <div className=" flex justify-between text-center  gap-5">
                                                <div className="w-full ">

                                                    <button className="py-2 bg-[#B31312] text-white  px-4 rounded-lg"
                                                        onClick={handleChangeStatus}>

                                                        <Delete />Delete
                                                    </button>


                                                </div>
                                                <div className="w-full ">
                                                    {/* <h2>User status now</h2> */}
                                                    <button className="py-2 bg-[#B31312] text-white  px-4 rounded-lg"
                                                        onClick={handleChangeStatus}>

                                                        {userStatus}
                                                    </button>


                                                </div>
                                                <div>


                                                </div>
                                            </div>
                                            {/* Role  */}
                                            <div className="w-full space-y-4">
                                                <Divider />
                                                <Box component="form" onSubmit={handleUserRoleUpdate}>
                                                    <h2 className="text-3xl mt-10 text-center">Update User  Role </h2>
                                                    <div className="w-full flex gap-5 items-center space-y-4">
                                                        <div className="w-full mt-4">
                                                            <OptionAll
                                                                data={roleData}
                                                                defaultValue={userRole}
                                                                label={userRole}
                                                                name={"role"}
                                                            />
                                                        </div>
                                                        <button
                                                            type="submit"
                                                            className=" uppercase justify-end rounded-md bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-red-500 "
                                                        >
                                                            Update Role
                                                        </button>
                                                    </div>

                                                </Box>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">

                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
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

export default Modal;