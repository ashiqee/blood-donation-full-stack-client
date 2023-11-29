
import TableDonorReqs from "../../../../Components/Table/TableDonorReqs";
import useDataForAdmin from "../../../../hooks/useDataForAdmin";


const AllDonationReq = () => {

  const { donationsReqs, isDonationLoading, refetch } = useDataForAdmin()





  return <TableDonorReqs data={donationsReqs} loading={isDonationLoading} refetch={refetch} />


};

export default AllDonationReq;
