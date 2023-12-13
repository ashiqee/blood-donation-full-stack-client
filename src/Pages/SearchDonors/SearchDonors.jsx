

import { Box, Button, TextField } from '@mui/material';


import { SearchSharp } from '@mui/icons-material';
import useDistricts from '../../hooks/useDistricts';
import OptionAll from '../../Components/Option/OptionAll';
import Option from '../../Components/Option/Option';
import { useState } from 'react';


import usePublicAxios from '../../hooks/usePublicAxios';
import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import DonorCards from './DonorCards';




const SearchDonors = () => {

    const [districts, handleDistricts, upuzzila, , refetch] = useDistricts()
    const [search, setSearch] = useState('')





    const axiosPublic = usePublicAxios()
















    const bloodGroup = [
        { "id": 1, "name": "A+" },
        { "id": 2, "name": "A-" },
        { "id": 3, "name": "B+" },
        { "id": 4, "name": "B-" },
        { "id": 5, "name": "AB+" },
        { "id": 6, "name": "AB-" },
        { "id": 7, "name": "O+" },
        { "id": 8, "name": "O-" }
    ]

    const handleSearch = (e) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)

        const searchData = {
            blood: data.get('blood'),
            districts: data.get('district'),
            upuzilla: data.get('upuzlia'),


        }



        setSearch(searchData)

    }

    const query = new URLSearchParams(search).toString();
    // console.log(query);
    //get districts data
    const { data: donorData, isLoading: donorDataLoading, refetch: donorRefetch } = useQuery({
        queryKey: ['donorData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/userDonor?${query}`, search)
            // console.log(res.data);
            return res.data
        }
    })

    useEffect(() => {
        donorRefetch()
    }, [search, donorRefetch])

    // console.log(donorData);

    return (
        <div>

            <Box component="form" onSubmit={handleSearch} >

                <div className='md:flex space-y-4 my-auto items-center justify-center  p-20 gap-5'>
                    {/* Distric  */}

                    {/* Blood  */}
                    <div className='md:w-48 mt-5'>
                        <OptionAll
                            data={bloodGroup}
                            label={"Select Blood Group"}
                            name={"blood"}

                        />

                    </div>
                    <div className='md:w-48'>
                        <Option
                            data={districts}
                            label={"Choose a districts"}
                            name={"district"}
                            handleDistricts={handleDistricts}

                        ></Option>
                    </div>

                    {/* Upuzila  */}

                    {/* option  */}
                    <div className='md:w-48'>
                        <Option
                            data={upuzzila}
                            label={"Choose a upuzila"}
                            name={"upuzlia"}
                            handleDistricts={handleDistricts}


                        />

                    </div>




                    <Button type="submit"


                        variant="contained"
                        sx={{ p: "15px", color: "white", width: '226px' }} >
                        <SearchSharp /> Search
                    </Button>




                </div>
            </Box>
            {
                donorData?.length > 0 ?
                    <>
                        <div className='grid gap-6 mb-10 lg:grid-cols-5 md:grid-cols-2 justify-around grid-cols-2  '>
                            {donorData?.map(data => <DonorCards key={data._id} data={data} />)}
                        </div>

                    </>
                    : <>
                        <h2 className='text-2xl py-0 text-red-500 text-center'>Sorry! No result found</h2>
                        <img className='w-96 mx-auto' src="https://i0.wp.com/www.printmag.com/wp-content/uploads/2017/11/2a34d8_3fd88c68341a49029c78c13f0206d464mv2.gif?fit=800%2C800&ssl=1" alt="" />
                    </>
            }

        </div>
    );
};

export default SearchDonors;