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
} from "@material-tailwind/react";
import { Delete, DetailsSharp, Edit } from "@mui/icons-material";
// import Modal from "./Modal";
// import { async } from "@firebase/util";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import Swal from "sweetalert2";
// import useSingleUserData from "./../../../hooks/useSingleUserData";
import { red } from "@mui/material/colors";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";

const TABS = [
  {
    id: 1,
    label: "All",
    value: "all",
  },
  {
    id: 2,
    label: "Pending",
    value: "pending",
  },
  {
    id: 3,
    label: "Inprogress",
    value: "inprogress",
  },
  {
    id: 4,
    label: "Done",
    value: "done",
  },
  {
    id: 5,
    label: "Cancel",
    value: "cancel",
  },
];

const TABLE_HEAD = [
  "#",
  "Recipient name",
  "Recipient Location",
  "Donation Date & time",
  "Donation Status",
  "Donor Information",
  "Action",
  "Details",
];

const MyDonationRequests = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [pageLimit, setPageLimit] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)

  const [displayData, setDisplayData] = useState();

  const pageLimitInt = parseInt(pageLimit)



  const {
    data: DonorData,
    isPending: isUserDonationLoading,
    refetch: donorDataRefetch,
  } = useQuery({
    queryKey: ["userDonations"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationsReqs/${user?.email}?page=${currentPage}&limit=${pageLimitInt}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      // console.log(res.data);
      return res.data;
    },
  });

  useEffect(() => {
    setDisplayData(DonorData);
    donorDataRefetch()
  }, [currentPage, pageLimit, donorDataRefetch, DonorData]);

  if (isUserDonationLoading) {
    return (
      <>
        <div className="h-screen container mx-auto flex justify-center items-center">
          <img
            className=""
            src="https://cdn.dribbble.com/users/251111/screenshots/2775428/dailyui-014.gif"
            alt=""
          />
        </div>
      </>
    );
  }

  const handleTabSort = (value) => {
    if (value === "all") {
      return setDisplayData(DonorData);
    }
    const filterData = DonorData.filter((req) => req?.donationStatus === value);
    setDisplayData(filterData);
  };

  const handleUpdateInProgress = async (id) => {
    console.log(id);
    await axiosSecure.patch(`/donationDone/${id}`).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `Donor request  inprogress!`,

          icon: "success",
          position: "center",
          timer: 1500,
        });
      }
    });
  };
  const handleCancel = async (id) => {
    console.log(id);
    await axiosSecure.patch(`/donationReqInCancel/${id}`).then((res) => {
      console.log(res.data);

      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `Donor request cancel!`,

          icon: "success",
          position: "center",
          timer: 1500,
        });
        donorDataRefetch();
      }
    });
  };

  const handleDeleteMyReq = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/donorReqDelete/${id}`).then((res) => {
          if (res.data.data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
          donorDataRefetch();
        });
      }
    });
  };

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
  const totalPage = DonorData?.length;


  const handleNextPage = () => {


    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1)
    }
  }


  return (
    <Card className="h-full  overflow-x-auto w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              My Blood Donation Requests page
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about my donations requests
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
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
              {TABS.map(({ id, label, value }) => (
                <Tab
                  onClick={() => handleTabSort(value)}
                  key={id}
                  value={value}
                >
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
            {displayData?.map(
              (
                {
                  requesterName,
                  requesterEmail,
                  recipientName,
                  blood,
                  donorName,
                  donorEmail,
                  districts,
                  _id,
                  upuzlia,
                  hospitalInfo,
                  donorReqAddress,
                  donateDate,
                  donateTime,
                  reqMessage,
                  donationStatus,
                },
                index
              ) => {
                const isLast = index === displayData?.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={_id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index + 1}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {recipientName}
                          </Typography>
                          {/* <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {email}
                                                    </Typography> */}
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {upuzlia},{districts}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        {/* <Chip
                                                    variant="ghost"
                                                    size="md"
                                                    value={donateDate}
                                                    color={status === "Active" ? "green" : "blue-gray"}
                                                /> */}
                        Date: {donateDate} <br />
                        Time: {donateTime}
                      </div>
                    </td>
                    <td className={classes}>
                      {donationStatus === "pending" ? (
                        <>
                          <Button
                            disabled
                            // onClick={() => handleUpdateAsDonor(_id)}
                            variant="outlined"
                            color="red"
                            sx={{ bgcolor: "#B31312", color: "white" }}
                          >
                            {" "}
                            Pending
                          </Button>
                        </>
                      ) : (
                        <>
                          {donationStatus === "inprogress" ? (
                            <>
                              <div className="flex gap-4">
                                <Button
                                  onClick={() => handleUpdateInProgress(_id)}
                                  variant="gradient"
                                >
                                  {" "}
                                  Inprogress
                                </Button>
                                <Button
                                  onClick={() => handleCancel(_id)}
                                  variant="gradient"
                                >
                                  {" "}
                                  Cencel
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              {donationStatus === "done" ? (
                                <>
                                  <h2 className="p-3 text-white w-28 text-center uppercase rounded-md bg-[#B31312]">
                                    Done
                                  </h2>
                                </>
                              ) : (
                                <>
                                  <h2 className="p-3 text-white uppercase w-28 text-center rounded-md bg-[#8f8686]">
                                    Cancel
                                  </h2>
                                </>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </td>
                    <td className={classes}>
                      {donationStatus !== "pending" ? (
                        <>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Name:{donorName}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            Email:{donorEmail}
                          </Typography>
                        </>
                      ) : (
                        <>-</>
                      )}
                    </td>
                    <td className={classes}>
                      {donationStatus !== "pending" ? (
                        <>
                          <div className="flex gap-2">
                            <Button
                              disabled
                              onClick={() => handleDeleteMyReq(_id)}
                              variant="outlined"
                              color="red"
                              size="sm"
                            >
                              <Delete />
                            </Button>
                            <Button
                              disabled
                              variant="outlined"
                              color="red"
                              size="sm"
                            >
                              <Edit />
                            </Button>
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleDeleteMyReq(_id)}
                              variant="outlined"
                              color="red"
                              size="sm"
                            >
                              <Delete />
                            </Button>
                            <Button variant="outlined" color="red" size="sm">
                              <Edit />
                            </Button>
                          </div>
                        </>
                      )}
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Button variant="outlined" color="red" size="sm">
                          <DetailsSharp />
                          Details
                        </Button>
                      </div>
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

export default MyDonationRequests;
