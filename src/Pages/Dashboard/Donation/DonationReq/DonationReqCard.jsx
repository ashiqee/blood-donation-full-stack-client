import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const DonationReqCard = ({ data }) => {
  return (
    <Card className="mt-6 mb-6 w-full">
      <div className="mx-auto">
        <div className="grid  justify-around  my-10 grid-cols-1 md:grid-cols-3 ">
          <div className="col-span-2">
            <div className="text-right  md:hidden pl-2 p-2">
              <Button variant="outlined" color="red">
                {" "}
                {data?.donationStatus}
              </Button>
            </div>{" "}
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                Recipient Name: {data?.recipientName}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Recipient Location: {data?.upuzlia},{data?.districts}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Date: {data?.donateDate}
              </Typography>
              <Typography variant="h6" color="blue-gray" className="mb-2">
                Time: {data?.donateTime}
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to={`/donationDetails/${data._id}`}>
                <Button size="md" color="red">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </div>
          <div className="text-right hidden md:block pl-10 p-10">
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

export default DonationReqCard;
