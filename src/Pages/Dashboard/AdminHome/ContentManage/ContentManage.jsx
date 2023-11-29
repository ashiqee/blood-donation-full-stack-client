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

import { useQuery } from "@tanstack/react-query";
import { data } from "autoprefixer";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import useBlogData from "../../../../hooks/useBlogData";
import useAuth from "./../../../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Draft",
    value: "draft",
  },
  {
    label: "Published",
    value: "published",
  },
];

const TABLE_HEAD = [
  "#",
  "Blog Title",
  "Author",
  "Blog Status",
  "Action",
  "Details",
];


const contentManage = () => {
  const { blogData, isBlogDataLoading, refetch } = useBlogData();
  const [blogFilterData, setDisplayData] = useState(blogData)


  const handleTabSort = (value) => {

    if (value === "all") {
      refetch()
      return setDisplayData(blogData)
    }
    const darftData = blogData.filter((blog) => blog?.blogStatus === value)
    setDisplayData(darftData)

  };



  return (
    <Card className="h-full  overflow-x-auto w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              Blog page
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about blog
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Link to="/dashboard/addBlog">
              <Button variant="outlined" size="sm">
                Add Blog
              </Button>
            </Link>

            {/* <Button className="flex items-center gap-3" size="sm">
                              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                          </Button> */}
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full z-0 md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value, i }) => (
                <Tab key={i} value={value} onClick={() => handleTabSort(value)}>
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
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
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
            {blogFilterData?.map(({ title, author, blogStatus }, index) => {
              const isLast = index === blogData?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={data._id}>
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
                          {title}
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
                        {author}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    {blogStatus === "draft" ? (
                      <>
                        <Button
                          // onClick={() => handleUpdateAsDonor(_id)}
                          variant="outlined"
                          color="red"
                          sx={{ bgcolor: "#B31312", color: "white" }}
                        >
                          {" "}
                          Draft
                        </Button>
                      </>
                    ) : (
                      <>
                        {blogStatus === "published" ? (
                          <>
                            <div className="flex gap-4">
                              <Button
                                // onClick={() => handleUpdateAsDonor(_id)}
                                variant="contained"
                                sx={{ bgcolor: "#B31312", color: "white" }}
                              >
                                {" "}
                                Published
                              </Button>
                              <Button
                                // onClick={() => handleUpdateAsDonor(_id)}
                                variant="contained"
                                sx={{ bgcolor: "#B31312", color: "white" }}
                              >
                                {" "}
                                Unpublished
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            {blogStatus === "unpublished" ? (
                              <>d</>
                            ) : (
                              <>
                                <h2 className="p-3 text-white w-24 rounded-md bg-[#B31312]">
                                  Unpublished
                                </h2>
                              </>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </td>

                  <td className={classes}>
                    <div className="flex gap-2">
                      <Button variant="outlined" color="red" size="sm">
                        <Delete />
                      </Button>
                      <Button variant="outlined" color="red" size="sm">
                        <Edit />
                      </Button>
                    </div>
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
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default contentManage;
