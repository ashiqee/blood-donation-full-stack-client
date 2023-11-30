import { useQuery } from "@tanstack/react-query";
import DonationDetailsCard from "../DonationDetailsCard";

import useAuth from "./../../../../hooks/useAuth";
import usePublicAxios from "./../../../../hooks/usePublicAxios";
import DonationReqCard from "./DonationReqCard";
import PageTitle from "../../../../Components/PageTitle/PageTitle";
import LoadingCom from "../../../../Components/Loading/LoadingCom";
const DonationRequest = () => {
  const { loading } = useAuth();
  const axiosPublic = usePublicAxios();

  const {
    data: donationReqPending,
    isLoading,

    refetch,
  } = useQuery({
    queryKey: ["donationsReqPending"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/donationReqPending`);
      // console.log(res.data);
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadingCom />
  }

  return (
    <div className="container mx-auto">
      <PageTitle text={'Donation Request'} subHeading={"Donate blood save life"} />

      {donationReqPending?.length < 0 ? (
        <>
          <div className="min-h-[50vh] items-center origin-center place-content-center">
            {" "}
            <h2 className="md:text-9xl text-3xl text-red-700 text-center">
              {" "}
              Not Available <br /> Pending Request
            </h2>
          </div>
        </>
      ) : (
        <>
          <div className="grid gap-5 lg:grid-cols-2">
            {donationReqPending?.map((data) => (
              <DonationReqCard key={data._id} data={data} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DonationRequest;
