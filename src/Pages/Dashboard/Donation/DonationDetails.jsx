import usePublicAxios from "../../../hooks/usePublicAxios";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import { useParams } from "react-router-dom";
import DonationDetailsCard from "./DonationDetailsCard";

const DonationDetails = () => {
  const { loading } = useAuth();
  const axiosPublic = usePublicAxios();

  const { id } = useParams();
  // console.log(id);

  const {
    data: donationDetail,

    refetch,
  } = useQuery({
    queryKey: ["donationDetails"],
    enabled: !loading,
    queryFn: async () => {
      const res = await axiosPublic.get(`/donationDetails/${id}`);
      // console.log(res.data);
      return res.data;
    },
  });

  return (
    <div>
      <DonationDetailsCard data={donationDetail} refetch={refetch} />
    </div>
  );
};

export default DonationDetails;
