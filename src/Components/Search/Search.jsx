// import { useForm } from "react-hook-form";

import { TextField } from '@mui/material';
import ButtonCom from '../Button/ButtonCom';
import Option from '../Option/Option';
import OptionAll from '../Option/OptionAll';
import useDistricts from './../../hooks/useDistricts';




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


    return (
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
                    name={"distrits"}
                    handleDistricts={handleDistricts}

                ></Option>
            </div>

            {/* Upuzila  */}

            {/* option  */}
            <div className='w-48'>
                <Option
                    data={upuzzila}
                    label={"Choose a upuzila"}
                    name={"upuzila"}
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



            <ButtonCom text={"Search"} />




        </div>


        // <form onSubmit={handleSubmit((data) => console.log(data))}>


        //     <input {..register} />
        // </form>
    );
};

export default Search;