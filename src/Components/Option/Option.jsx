import { Autocomplete, TextField } from "@mui/material";



const Option = ({ data, label, name, handleDistricts, }) => {

    const isOptionEqualToValue = (option, value) => {
        return option?.id === value?.id

    }
    return (
        <Autocomplete
            id={name}
            // sx={{ width: 300 }}
            options={data}
            isOptionEqualToValue={isOptionEqualToValue}

            getOptionLabel={(option) => option.name}
            onChange={(e, value) => handleDistricts(e, value)}

            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    const inputProps={{
                        ...params.inputProps,
                        // autoComplete: 'new-password', // disable autocomplete and autofill
                    }}

                />
            )}
        />
    );
};

export default Option;