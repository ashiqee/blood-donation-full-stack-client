import { Autocomplete, TextField } from "@mui/material";



const OptionAll = ({ data, label, name }) => {


    return (
        <Autocomplete
            id={name}
            // sx={{ width: 300 }}
            options={data}

            autoHighlight
            getOptionLabel={(option) => option.name}


            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    const inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}

                />
            )}
        />
    );
};

export default OptionAll;