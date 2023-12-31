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

import { useState } from "react";
import { Link } from "react-router-dom";
import useAdmin from "./../../hooks/useAdmin";
import { useEffect } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Pending",
    value: "pending",
  },
  {
    label: "Inprogress",
    value: "inprogress",
  },
  {
    label: "Done",
    value: "done",
  },
  {
    label: "Cancel",
    value: "cancel",
  },
];

const TableDonorReqs = ({
  data,
  handleUpdateInProgress,
  handleCancel,
  handleDeleteMyReq,
  loading,
  refetch,
  handlePreviousPage,
  handlePagination,
  handleNextPage,
  currentPage,
  pageLimit,
  setPageLimit,
}) => {
  const [displayData, setDisplayData] = useState(data);

  const [isAdmin, isAdminLoading] = useAdmin();

  if (isAdminLoading) {
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


  useEffect(() => {
    refetch()
    setDisplayData(data)
  }, [data, refetch])


  const TABLE_HEAD = [
    "#",
    "Recipient name",
    "Recipient Location",
    "Donation Date & time",
    "Donation Status",
    "Donor Information",
    isAdmin ? "Action" : "",
    "Details",
  ];

  const handleTabSort = (value) => {
    if (value === "all") {
      refetch();

      return setDisplayData(data);
    }
    const filterData = data.filter((req) => req?.donationStatus === value);
    setDisplayData(filterData);
  };

  return (
    <Card className="h-full  overflow-x-auto w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Blood Donation Requests page
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all donations requests
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
            {/* {data?.slice(0, 3).map( */}
            {displayData?.map(
              (
                {
                  _id,
                  requesterName,
                  requesterEmail,
                  recipientName,
                  blood,
                  districts,
                  upuzlia,
                  hospitalInfo,
                  donorReqAddress,
                  donateDate,
                  donateTime,
                  donorEmail,
                  donorName,
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
                  <tr key={index}>
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
                          className="font-normal"
                        ></Typography>
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
                      {/* isAdmin verify  */}
                      {isAdmin && (
                        <div className="flex gap-2">
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
                        </div>
                      )}
                    </td>
                    <td className={classes}>
                      <div className="flex gap-2">
                        <Link to={`/donationDetails/${_id}`}>
                          <Button variant="outlined" color="red" size="sm">
                            <DetailsSharp />
                            Details
                          </Button>
                        </Link>
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

export default TableDonorReqs;
