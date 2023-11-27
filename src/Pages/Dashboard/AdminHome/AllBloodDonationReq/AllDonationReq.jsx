
import TableDonorReqs from "../../../../Components/Table/TableDonorReqs";
import useDataForAdmin from "../../../../hooks/useDataForAdmin";


const AllDonationReq = () => {

  const { donationsReqs, isDonationLoading, refetch } = useDataForAdmin()


  console.log(donationsReqs);


  return <TableDonorReqs data={donationsReqs} />


};

export default AllDonationReq;
