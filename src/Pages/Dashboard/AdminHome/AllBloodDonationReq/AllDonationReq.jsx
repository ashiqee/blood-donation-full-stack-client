import Swal from "sweetalert2";
import TableDonorReqs from "../../../../Components/Table/TableDonorReqs";
import useDataForAdmin from "../../../../hooks/useDataForAdmin";
import useAxiosSecure from "./../../../../hooks/useAxiosSecure";

const AllDonationReq = () => {
  const { donationsReqs, isDonationLoading, allDonationRefetch } =
    useDataForAdmin();
  const axiosSecure = useAxiosSecure();

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

  return (
    <TableDonorReqs
      data={donationsReqs}
      handleUpdateInProgress={handleUpdateInProgress}
      handleCancel={handleCancel}
      loading={isDonationLoading}
      handleDeleteMyReq={handleDeleteMyReq}
      refetch={allDonationRefetch}
    />
  );
};

export default AllDonationReq;
