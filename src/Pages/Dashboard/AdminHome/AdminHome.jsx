
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import useStaticsReport from "../../../hooks/useStaticsReport";
import { RiFundsFill, RiUserAddFill } from "react-icons/ri";
import { VolunteerActivismTwoTone } from "@mui/icons-material";
import LoadingCom from "../../../Components/Loading/LoadingCom";

const AdminHome = () => {
  const { statictisData, isstatictisDataLoading } = useStaticsReport()

  if (isstatictisDataLoading) {
    return <LoadingCom />
  }


  const { donationTotalReq, totalFundAmount, totalUsers } = statictisData;
  return (
    <div className="grid md:ml-10 justify-around gap-5 mx-auto md:grid-cols-3">
      <Card className="lg:w-72">

        <CardBody className="text-center">

          <RiUserAddFill className="text-5xl text-blue-600 text-center mx-auto mb-2" />
          <Typography
            variant="lead"
            color="deep-orange"
            textGradient
          >

            Total Users
          </Typography>

        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-0">
          <Tooltip content="Total Users">
            <Typography as="a" className="text-3xl font-bold" variant="lead" color="red"
              textGradient
            >

              {totalUsers}
            </Typography>
          </Tooltip>

        </CardFooter>
      </Card>
      <Card className="lg:w-72">

        <CardBody className="text-center">

          <RiFundsFill className="text-5xl text-red-600 text-center mx-auto mb-2" />
          <Typography
            variant="lead"
            color="deep-orange"
            textGradient
          >

            Total Fund  Amount
          </Typography>


        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-0">
          <Tooltip content="Total Fund">
            <Typography className="text-3xl font-bold" variant="lead" color="red"
              textGradient
            >

              {totalFundAmount}$
            </Typography>
          </Tooltip>


        </CardFooter>
      </Card>
      <Card className="lg:w-72">

        <CardBody className="text-center">


          <VolunteerActivismTwoTone fontSize="lg" className="text-6xl  text-green-600 text-center mx-auto mb-2" />
          <Typography
            variant="lead"
            color="deep-orange"
            textGradient
          >

            Total Donation Request
          </Typography>



        </CardBody>
        <CardFooter className="flex justify-center gap-7 pt-0">
          <Tooltip content="Total Donation Request">
            <Typography
              className="text-3xl font-bold"

              variant="lead"
              color="red"


              textGradient
            >

              {donationTotalReq}
            </Typography>
          </Tooltip>

        </CardFooter>
      </Card>
    </div>
  );
};


export default AdminHome;
