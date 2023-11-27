import useDataForAdmin from "../../../../hooks/useDataForAdmin";


const AllDonationReq = () => {

  const { donationsReqs, isDonationLoading, refetch } = useDataForAdmin()


  console.log(donationsReqs);


  return <div>Donation {donationsReqs?.length}

    {donationsReqs.map((data) => <li key={data._id}>{data.requesterEmail}</li>)}
  </div>;
};

export default AllDonationReq;
