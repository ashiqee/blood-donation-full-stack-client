
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

import HTMLReactParser from "html-react-parser";
const BlogCard = ({ data }) => {





    return (<Card className="mt-6 mb-6 w-full">
        <div className="container mx-auto">
            <div className="grid  justify-around  my-10 grid-cols-1  ">
                <div className="col-span-2">

                    <CardBody>
                        <Typography variant="h4" color="blue-gray" className="mb-10">
                            {data?.title}
                            {data?.date}
                        </Typography>

                        <figure>
                            <img
                                className="h-96 w-full rounded-lg object-cover object-center"
                                src={data?.blogImg}
                                alt="nature image"
                            />
                            <Typography as="caption" variant="small" className="mt-2 text-center font-normal">
                                Image
                            </Typography>
                        </figure>

                        <Typography >
                            {HTMLReactParser(data?.blogContent)}
                        </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                        <Link >
                            <Button size="md" color="red">
                                View Details
                            </Button>
                        </Link>
                    </CardFooter>
                </div>

            </div>
        </div>
    </Card>
    );
};

export default BlogCard;