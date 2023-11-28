import { useQuery } from "@tanstack/react-query";
import DonationDetailsCard from "../DonationDetailsCard";

import useAuth from "./../../../../hooks/useAuth";
import usePublicAxios from "./../../../../hooks/usePublicAxios";
import DonationReqCard from "./DonationReqCard";
const DonationRequest = () => {
  const { loading } = useAuth();
  const axiosPublic = usePublicAxios();

  const {
    data: donationReqPending,

    refetch,
  } = useQuery({
    queryKey: ["donationsReqPending"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/donationReqPending`);
      console.log(res.data);
      return res.data;
    },
  });

  console.log(donationReqPending?.length);

  return (
    <div className="container mx-auto">
      <div className="my-10">
        <h2 className="text-center text-red-800 text-2xl font-bold">
          Donation Request
        </h2>
      </div>
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