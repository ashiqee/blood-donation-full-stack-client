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

import useAuth from "./../../../../hooks/useAuth";
import { useState } from "react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import useBlogAdmin from "../../../../hooks/useBlogAdmin";
import useAdmin from "../../../../hooks/useAdmin";

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
  {
    label: "Unpublished",
    value: "unpublished",
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
  const [pageLimit, setPageLimit] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)
  const { blogData, isBlogDataLoading, refetch } = useBlogAdmin(currentPage, pageLimit);
  const [blogFilterData, setDisplayData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [isAdmin, isAdminLoading] = useAdmin();


  useEffect(() => {
    refetch()
    setDisplayData(blogData)
  }, [currentPage, blogData, pageLimit, refetch]);




  if (isBlogDataLoading) {
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
      refetch();
      return setDisplayData(blogData);
    }
    const draftData = blogData.filter((blog) => blog?.blogStatus === value);
    setDisplayData(draftData);
  };

  const handleUpdateBlogStatus = async (id) => {
    const res = await axiosSecure.patch(`/updateBlogStatus/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: "Published!",
        text: "Your blog post has been published.",
        icon: "success",
      });
      refetch();
    }
  };

  const handleUpdateBlogStatusUn = async (id) => {
    const res = await axiosSecure.patch(`/updateBlogStatusUnpublished/${id}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (res.data.modifiedCount > 0) {
      Swal.fire({
        title: "Unpublished!",
        text: "Your blog post has been unpublished.",
        icon: "success",
      });
      refetch();
    }
  };

  const handleDeleteBlog = async (id) => {


    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const res = axiosSecure.delete(`/blogDelete/${id}`, {
          headers: {
            authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (res.data.deletedCount > 0) {
          Swal.fire({
            title: "Deleted!",
            text: "Your blog post has been Deleted.",
            icon: "success",
          });
          refetch();
        }
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
  const totalPage = blogData?.length;


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
            {blogFilterData?.map(
              ({ _id, title, author, blogStatus }, index) => {
                const isLast = index === blogData?.length - 1;
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
                          {isAdmin ? (
                            <>
                              <div className="flex gap-5">
                                {" "}
                                <Button
                                  variant="text"
                                  color="red"
                                  className="mr-6"
                                  sx={{ bgcolor: "#B31312", color: "white" }}
                                >
                                  {" "}
                                  Draft
                                </Button>
                                <Button
                                  onClick={() => handleUpdateBlogStatus(_id)}
                                  variant="outlined"
                                  color="red"
                                  sx={{ bgcolor: "#B31312", color: "white" }}
                                >
                                  {" "}
                                  Published
                                </Button>
                              </div>
                            </>
                          ) : (
                            <>
                              <Button
                                variant="text"
                                color="red"
                                sx={{ bgcolor: "#B31312", color: "white" }}
                              >
                                {" "}
                                Draft
                              </Button>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          {blogStatus === "published" ? (
                            <>
                              <div className="flex gap-4">
                                <Button
                                  variant="text"
                                  color="red"
                                  sx={{ bgcolor: "#B31312", color: "white" }}
                                >
                                  {" "}
                                  Published
                                </Button>
                                {isAdmin && (
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleUpdateBlogStatusUn(_id)
                                    }
                                    variant="outlined"
                                  >
                                    {" "}
                                    Unpublished
                                  </Button>
                                )}
                              </div>
                            </>
                          ) : (
                            <>
                              {blogStatus === "unpublished" ? (
                                <>
                                  <Button
                                    variant="text"
                                    color="gray"
                                    sx={{ bgcolor: "#B31312", color: "white" }}
                                  >
                                    {" "}
                                    Unpublished
                                  </Button>
                                  {isAdmin && (
                                    <Button
                                      variant="outlined"
                                      onClick={() =>
                                        handleUpdateBlogStatus(_id)
                                      }
                                      color="red"
                                      sx={{
                                        bgcolor: "#B31312",
                                        color: "white",
                                      }}
                                    >
                                      {" "}
                                      Published
                                    </Button>
                                  )}
                                </>
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
                        {isAdmin && (
                          <Button
                            onClick={() => handleDeleteBlog(_id)}
                            variant="outlined"
                            color="red"
                            size="sm"
                          >
                            <Delete />
                          </Button>
                        )}
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

export default contentManage;
