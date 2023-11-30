import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

import Option from "../../../../Components/Option/Option";
import useDistricts from "../../../../hooks/useDistricts";
import OptionAll from "../../../../Components/Option/OptionAll";
import { Box, TextField } from "@mui/material";

import { Edit } from "@mui/icons-material";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting = import.meta.env.VITE_IMAGE_HOST;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const ProfileModal = ({ userData, isUserLoading, refetch }) => {
  const axiosSecure = useAxiosSecure()


  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const [districts, handleDistricts, upuzzila] = useDistricts();
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");



  if (isUserLoading) {
    return <>Loading..........</>
  }
  const { blood, _id, districts: district, upuzilla, name, profileImg, coverImg } = userData;

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

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const { display_url } = data.data;
          console.log("Image uploaded successfully:", display_url);
          setProfileImage(display_url);
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };
  const handleCoverUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(image_hosting_api, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const { display_url } = data.data;
          console.log("Cover Image uploaded successfully:", display_url);
          setCoverImage(display_url);
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);

    // TODO: SEND DB
    const userInfo = {
      name: data.get("name"),
      blood: data.get("blood"),
      districts: data.get("districts") || district,
      upuzilla: data.get("upuzlia") || upuzilla,
      profileImg: profileImage || profileImg,
      coverImg: coverImage || coverImg,
    };


    await axiosSecure.patch(`/user/updateProfile/${_id}`, userInfo)
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

          setOpen(false)
        }
      })



  };

  return (
    <>
      <button
        type="button"
        className="btn py-2 px-3 rounded-xl text-white bg-[#f34334]"
        onClick={() => setOpen(true)}
        ref={cancelButtonRef}
      >
        <Edit />
        {"Edit Profile"}
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
                <Box component="form" onSubmit={handleSubmit}>
                  <Dialog.Panel
                    className="relative z-9999 transform overflow-hidden
                   rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg"
                  >
                    <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                      <h2 className="text-3xl text-center">Update Profile</h2>
                      <div className="flex-col space-y-4 my-auto items-center justify-center  p-5 gap-5">
                        <div className="flex gap-5">
                          <div className="w-full">
                            <TextField
                              type="text"
                              id="name"
                              name="name"
                              label="name"
                              defaultValue={name}
                              autoComplete="name"
                            />
                          </div>
                          {/* Blood  */}
                          <div className="w-full">
                            <OptionAll
                              data={bloodGroup}
                              value={blood}
                              label={blood}
                              name={"blood"}
                            />
                          </div>
                        </div>

                        <div className="flex gap-5">
                          <div className="w-full">
                            <Option
                              data={districts}
                              label={district}
                              name={"districts"}
                              handleDistricts={handleDistricts}
                            ></Option>
                          </div>

                          {/* Upuzila  */}

                          <div className="w-full">
                            <Option
                              data={upuzzila}
                              label={upuzilla}
                              name={"upuzlia"}
                              handleDistricts={handleDistricts}
                            />
                          </div>
                        </div>
                        <div className="flex gap-5">
                          <div className="w-full">
                            <label>Profile Picture</label>
                            <TextField
                              onChange={handleProfileUpload}
                              type="file"
                              id="profilePic"
                              name="profilePic"
                            />
                          </div>

                          {/* Cover Upload  */}

                          <div className="w-full">
                            <label>Cover Picture</label>
                            <TextField
                              type="file"
                              id="CoverImg"
                              onChange={handleCoverUpload}
                              name="coverImg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                      <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      >
                        Update
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
                  </Dialog.Panel>
                </Box>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default ProfileModal;
