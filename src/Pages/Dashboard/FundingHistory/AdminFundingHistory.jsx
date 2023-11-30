

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,

} from "@material-tailwind/react";


import { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useStaticsReport from "../../../hooks/useStaticsReport";






const AdminFundingHistory = () => {

    const axiosSecure = useAxiosSecure()
    const { user, loading } = useAuth()
    const { totalFundAmount } = useStaticsReport()
    console.log(totalFundAmount?.totalAmount);



    const TABLE_HEAD = [
        "#",
        "Funding Company Name",
        "Company Logo",
        "Funding Date",
        "TransactionId",
        "Amount",
        "Status"

    ];




    const { data: displayData, isPending: isFundLoading, refetch } = useQuery({
        queryKey: ['userFund'],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure.get(`/fundHistory`)
            console.log(res.data);
            return res.data;
        }
    })





    console.log(displayData);
    return (
        <Card className="h-full  overflow-x-auto w-full">
            <CardHeader floated={false} shadow={false} className="rounded-none">
                <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                        <Typography variant="h5" color="blue-gray">
                            My Funding History
                        </Typography>
                        <Typography color="gray" className="mt-1 font-normal">
                            See information about all my funding history
                        </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                        <Button variant="outlined" size="sm">
                            view all
                        </Button>
                        {/* <Button className="flex items-center gap-3" size="sm">
                              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                          </Button> */}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between gap-4 md:flex-row">

                    <div className="w-full md:w-72">
                        <Input
                            label="Search"
                            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                        />
                    </div>
                    <div>

                        <h2 className="text-2xl mr-20">Total Fund Amount: <span className="text-red-600 font-extrabold">{totalFundAmount?.totalAmount}$</span></h2>

                    </div>
                </div>
            </CardHeader>
            <CardBody className="overflow-scroll px-0">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                        <tr>
                            {TABLE_HEAD.map((head, i) => (
                                <th
                                    key={i}
                                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                >
                                    <Typography
                                        variant="small"
                                        color="blue-gray"
                                        className="font-normal leading-none opacity-70"
                                    >
                                        {head}
                                    </Typography>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {/* {data?.slice(0, 3).map( */}
                        {displayData?.map(
                            (
                                {
                                    _id,
                                    funderName,

                                    funderEmail,
                                    funderCompany,
                                    funderLogo,
                                    transactionId,
                                    date,
                                    amount,
                                    status,

                                },
                                index
                            ) => {
                                const isLast = index === displayData?.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {index + 1}
                                                    </Typography>

                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {funderCompany}

                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal opacity-70"
                                                    >
                                                        {funderEmail}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex flex-col">
                                                <figure>
                                                    <img className="w-12 h-12" src={funderLogo} alt="" />
                                                </figure>
                                            </div>
                                        </td>
                                        <td className={classes}>
                                            <div className="w-max">
                                                {/* <Chip
                                                    variant="ghost"
                                                    size="md"
                                                    value={donateDate}
                                                    color={status === "Active" ? "green" : "blue-gray"}
                                                /> */}
                                                {date.slice(0, 10)} <br />

                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal opacity-70"
                                            >
                                                {transactionId.slice(transactionId.length - 6, transactionId.length)}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            {amount}
                                        </td>
                                        <td className={classes}>
                                            {status}
                                        </td>


                                    </tr>
                                );
                            }
                        )}
                    </tbody>
                </table>
            </CardBody>
            <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                <Typography variant="small" color="blue-gray" className="font-normal">
                    Page 1 of 10
                </Typography>
                <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                        Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                        Next
                    </Button>
                </div>
            </CardFooter>
        </Card>
    );
};

export default AdminFundingHistory;
