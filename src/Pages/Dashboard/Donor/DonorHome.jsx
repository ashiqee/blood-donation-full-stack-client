import TableComponents from "../../../Components/Table/TableComponet";

const DonorHome = () => {
  // TODO: NEED DATA FETCH
  const donationReq = 1;

  return (
    <div>
      {donationReq > 0 ? (
        <>
          {" "}
          <div className="p-10">
            <h2 className="text-xl mb-2 ">Recent Donation Request</h2>
            <TableComponents />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DonorHome;
