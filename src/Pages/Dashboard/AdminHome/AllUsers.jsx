import useUser from "../../../hooks/useUser";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
} from "@material-tailwind/react";
import Modal from "./Modal";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

import { useState } from "react";
import { useEffect } from "react";
import LoadingCom from "../../../Components/Loading/LoadingCom";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Admin",
    value: "Admin",
  },
  {
    label: "Volunteer",
    value: "Volunteer",
  },
  {
    label: "Donor",
    value: "Donor",
  },
  {
    label: "Guest",
    value: "Guest",
  },
];

const TABLE_HEAD = [
  "User Details",
  "Blood Group",
  "Active Status",
  "Role",
  "User Request",
  "Action",
];

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [pageLimit, setPageLimit] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const [users, isUserLoading, refetch] = useUser(currentPage, pageLimit);
  const [displayUser, setDisplayData] = useState(users)




  useEffect(() => {
    refetch()
    setDisplayData(users)
  }, [users, refetch, pageLimit])



  if (isUserLoading) {
    return <LoadingCom />
  }




  const handleUpdateAsDonor = async (id) => {


    await axiosSecure.patch(`/user/admin/donorReq/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {


      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `You user req as a donor pending!`,
          text: " Approved ",
          icon: "success",
          position: "center",
          timer: 1500,
        });
        refetch();
      }
    });
  };
  const handleUpdateAsVolunteer = async (id) => {
    console.log("Approved");

    await axiosSecure.patch(`/user/admin/volunteerReq/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `You user req as a donor pending!`,
          text: " Approved ",
          icon: "success",
          position: "center",
          timer: 1500,
        });
        refetch();
      }
    });
  };

  //pagination start

  const handlePagination = (e) => {
    e.preventDefault()

    const pageLimitValue = e.target.value;
    setPageLimit(pageLimitValue)

  }



  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
    }
  }
  const totalPage = users?.length;


  const handleNextPage = () => {


    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }


  // pagination end 

  const handleTabSort = (value) => {

    if (value === "all") {
      refetch();
      setPageLimit(20)

      return setDisplayData(users);
    }
    const filterData = users.filter((req) => req?.role === value);
    setDisplayData(filterData);
  };


  return (
    <Card className="h-full  overflow-x-auto w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Users list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all users
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button onClick={() => setPageLimit(20)} variant="outlined" size="sm">
              view all
            </Button>
            {/* <Button className="flex items-center gap-3" size="sm">
                            <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                        </Button> */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full z-0 md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value, i }) => (
                <Tab onClick={() => handleTabSort(value)} key={i} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, i) => (
                <th
                  key={i}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayUser?.map(
              (
                {
                  profileImg,
                  name,
                  email,
                  blood,
                  // districts,
                  // upuzilla,
                  roleStatus,
                  _id,
                  status,
                  role,
                },
                index
              ) => {
                const isLast = index === displayUser.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar src={profileImg} alt={name} size="lg" />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {name}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {email}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        ></Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {blood}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="md"
                          value={status}
                          color={status === "Active" ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {role}
                      </Typography>
                    </td>
                    <td className={classes}>
                      {roleStatus === "no request" ? (
                        <>No Request</>
                      ) : (
                        <>
                          {roleStatus === "pending request for donor" ? (
                            <>
                              <Button
                                onClick={() => handleUpdateAsDonor(_id)}
                                variant="contained"
                                sx={{ bgcolor: "#B31312", color: "white" }}
                              >
                                {" "}
                                Request as a donor
                              </Button>
                            </>
                          ) : (
                            <>
                              {roleStatus ===
                                "pending request for volunteer" ? (
                                <></>
                              ) : (
                                <>
                                  <h2 className="p-3 text-white w-24 rounded-md bg-[#B31312]">
                                    Approved
                                  </h2>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}

                      {role === "Donor" && (
                        <>
                          {roleStatus === "pending request for volunteer" ? (
                            <>
                              <Button
                                onClick={() => handleUpdateAsVolunteer(_id)}
                                variant="contained"
                                sx={{ bgcolor: "#B31312", color: "white" }}
                              >
                                {" "}
                                Request as a Volunteer
                              </Button>
                            </>
                          ) : (
                            <>
                              {roleStatus === "Approved" &&
                                role === "Volunteer" ? (
                                <>
                                  <h2 className="p-3 text-white w-24 rounded-md bg-[#B31312]">
                                    Approved
                                  </h2>
                                </>
                              ) : (
                                <></>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </td>
                    <td className={classes}>
                      <Modal
                        userStatus={status}
                        refetch={refetch}
                        userRole={role}
                        id={_id}
                      />
                      {/* <Tooltip content="Edit User">
                                                <IconButton variant="text">
                                                    <PencilIcon className="h-4 w-4" />
                                                </IconButton>
                                            </Tooltip> */}
                    </td>
                  </tr>
                );
              }
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage}
        </Typography>
        <div className="flex gap-2">
          <select onChange={handlePagination} value={pageLimit} className="p-2 border-2 bg-blue-gray-50" name="limit" id="">

            <option value={3}>
              3
            </option>
            <option value={5}>
              5
            </option>
            <option value={10}>
              10
            </option>
            <option value={20}>
              20
            </option>
          </select>

          <Button onClick={handlePreviousPage} variant="outlined" size="sm">
            Previous
          </Button>

          <Button onClick={handleNextPage} variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AllUsers;
