import { useQuery } from "@tanstack/react-query";
import TableComponents from "../../../Components/Table/TableComponet";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingCom from "../../../Components/Loading/LoadingCom";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const DonorHome = () => {
  const { user, loading } = useAuth()
  const axiosSecure = useAxiosSecure()
  // TODO: NEED DATA FETCH
  const donationReq = 1;

  const {
    data: myDonorReq,
    isPending: ismyDonorReqLoading,
    refetch: myDonorReqRefetch,
  } = useQuery({
    queryKey: ["myDonorReqss"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/donationsReqHome/${user?.email}`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      return res.data;
    },
  });

  if (ismyDonorReqLoading) {
    return <LoadingCom />
  }

  return (
    <div >
      {donationReq > 0 ? (
        <>
          {" "}
          <div className="p-10">
            <h2 className="text-xl mb-2 ">Recent Donation Request</h2>
            {myDonorReq?.length < 0 ? <> Not Available recent donation request </> : <>  <TableComponents myDonorReq={myDonorReq} />

              <div className="flex shrink-0 flex-col gap-2 mt-10 justify-end sm:flex-row">
                <Link to="/dashboard/my-donation-request">

                  <Button variant="outlined" size="sm">
                    view all
                  </Button></Link>

              </div>



            </>}


          </div>

        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DonorHome;
