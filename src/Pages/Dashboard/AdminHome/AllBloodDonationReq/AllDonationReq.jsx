import Swal from "sweetalert2";
import TableDonorReqs from "../../../../Components/Table/TableDonorReqs";
import useDataForAdmin from "../../../../hooks/useDataForAdmin";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";
import { useState } from "react";

const AllDonationReq = () => {
  const [pageLimit, setPageLimit] = useState(3)
  const [currentPage, setCurrentPage] = useState(1)

  const { donationsReqs, isDonationLoading, allDonationRefetch } =
    useDataForAdmin(currentPage, pageLimit);
  const axiosSecure = useAxiosSecure();

  console.log(donationsReqs);
  if (isDonationLoading) {
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
        allDonationRefetch();
      }
    });
  };

  //donation cancel req

  const handleCancel = async (id) => {
    console.log(id);
    await axiosSecure.patch(`/donationReqInCancel/${id}`).then((res) => {
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          title: `Donor request cancel!`,

          icon: "success",
          position: "center",
          timer: 1500,
        });
        allDonationRefetch();
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
            allDonationRefetch();
          }
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
  const totalPage = donationsReqs?.length;


  const handleNextPage = () => {


    if (currentPage < totalPage) {
      console.log(currentPage, totalPage);
      setCurrentPage(currentPage + 1)
    }
  }






  return (
    <TableDonorReqs
      data={donationsReqs}
      handleUpdateInProgress={handleUpdateInProgress}
      handleCancel={handleCancel}
      loading={isDonationLoading}
      handleDeleteMyReq={handleDeleteMyReq}
      refetch={allDonationRefetch}
      handlePagination={handlePagination}
      handleNextPage={handleNextPage}
      handlePreviousPage={handlePreviousPage}
      currentPage={currentPage}
      pageLimit={pageLimit}
      setPageLimit={setPageLimit}
    />
  );
};

export default AllDonationReq;
