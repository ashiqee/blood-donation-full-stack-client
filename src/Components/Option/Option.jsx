import { Autocomplete, TextField } from "@mui/material";



const Option = ({ data, label, name, handleDistricts }) => {


    return (
        <Autocomplete
            id={name}
            // sx={{ width: 300 }}
            options={data}

            autoHighlight
            getOptionLabel={(option) => option.name}
            onChange={(e, selectOption) => handleDistricts(selectOption?.id)}

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

export default Option;