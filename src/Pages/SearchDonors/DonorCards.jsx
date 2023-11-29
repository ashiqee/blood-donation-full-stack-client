
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Tooltip,
} from "@material-tailwind/react";

const DonorCards = ({ data }) => {

    return (
        <Card className="lg:w-64">
            <CardHeader floated={false} className="h-36 md:h-60">
                <img className="object-cover h-36 md:h-60 w-full" src={data?.profileImg} alt="profile-picture" />

            </CardHeader>
            <CardBody className="text-center">

                <Tooltip content="Like">
                    <Typography
                        as="a"

                        variant="lead"
                        color="red"


                        textGradient
                    >

                        {data?.blood}
                    </Typography>
                </Tooltip>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                    {data?.name}
                </Typography>
                <Typography color="blue-gray" className="font-medium" textGradient>
                    {data?.upuzilla},
                    {data?.districts}

                </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7 pt-0">
                {/* <Tooltip content="Like">
                    <Typography
                        as="a"

                        variant="lead"
                        color="red"


                        textGradient
                    >

                        {data?.blood}
                    </Typography>
                </Tooltip> */}


            </CardFooter>
        </Card>
    );
};

export default DonorCards;