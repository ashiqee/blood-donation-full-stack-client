import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import SecTitle from "../../../Components/SectionTitle/SecTitle";
import DonationDetailsModal from "./DonationDetailsModal";

const DonationDetailsCard = ({ data }) => {
  return (
    <Card className="mt-6 w-full">
      <CardHeader color="" className="relative h-56">
        <SecTitle title={"Donation Details"} subHeading={data?.recipientName} />
      </CardHeader>
      <div className="container mx-auto">
        <div className="grid border justify-around shadow-2xl  my-20 grid-cols-2 ">
          <div className="pl-12">
            {" "}
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Recipient Name: {data?.recipientName}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Date: {data?.donateDate}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Time: {data?.donateTime}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Recipient Location: {data?.upuzlia},{data?.districts}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Hospital Name: {data?.hospitalInfo}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Full Address: {data?.donorReqAddress}
              </Typography>

              <Typography>Request Message: {data?.reqMessage}</Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <DonationDetailsModal
                id={data?._id}
                status={data?.donationStatus}
              />
            </CardFooter>
          </div>
          <div className="text-right pl-10 p-10">
            <Button variant="outlined" color="red">
              {" "}
              {data?.donationStatus}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DonationDetailsCard;
