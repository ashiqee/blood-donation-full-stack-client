// import { useForm } from "react-hook-form";

import { Box, Button, TextField } from '@mui/material';

import Option from '../Option/Option';
import OptionAll from '../Option/OptionAll';
import useDistricts from './../../hooks/useDistricts';
import { SearchSharp } from '@mui/icons-material';




const Search = () => {

    const [districts, handleDistricts, upuzzila, , refetch] = useDistricts()
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    // } = useForm();

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
            district: data.get('district'),
            upizila: data.get('upuzlia'),
            email: data.get('email')
        }

        console.log(searchData);
    }
    return (
        <Box component="form" onSubmit={handleSearch} >

            <div className='flex my-auto items-center justify-center  p-32 gap-5'>
                {/* Distric  */}

                {/* Blood  */}
                <div className='w-48'>
                    <OptionAll
                        data={bloodGroup}
                        label={"Select Blood Group"}
                        name={"blood"}

                    />

                </div>
                <div className='w-48'>
                    <Option
                        data={districts}
                        label={"Choose a districts"}
                        name={"district"}
                        handleDistricts={handleDistricts}

                    ></Option>
                </div>

                {/* Upuzila  */}

                {/* option  */}
                <div className='w-48'>
                    <Option
                        data={upuzzila}
                        label={"Choose a upuzila"}
                        name={"upuzlia"}
                        handleDistricts={handleDistricts}


                    />

                </div>
                <div className='w-48'>
                    <TextField
                        type="email"
                        id='email'
                        name="email"
                        label='email'
                        autoComplete="email"


                    />
                </div>



                <Button type="submit"


                    variant="contained"
                    sx={{ p: "15px", color: "white" }} >
                    <SearchSharp /> Search
                </Button>




            </div>
        </Box>



        // <form onSubmit={handleSubmit((data) => console.log(data))}>


        //     <input {..register} />
        // </form>
    );
};

export default Search;