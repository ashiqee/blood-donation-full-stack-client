import { Autocomplete, TextField } from "@mui/material";


const Option = ({ data, label, name }) => {


    return (
        <Autocomplete
            id="country-select-demo"
            // sx={{ width: 300 }}
            options={data}
            autoHighlight
            getOptionLabel={(option) => option.name}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    inputProps={{
                        ...params.inputProps,
                        autoComplete: 'new-password', // disable autocomplete and autofill
                    }}
                />
            )}
        />
    );
};

export default Option;