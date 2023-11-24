import { Autocomplete, TextField } from "@mui/material";



const OptionAll = ({ data, label, name }) => {


    const isOptionEqualToValue = (option, value) => {
        return option?.id === value?.id

    }
    return (
        <Autocomplete
            id={name}
            // sx={{ width: 300 }}
            options={data}

            autoHighlight
            getOptionLabel={(option) => option.name}

            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    name={name}
                    inputProps={{
                        ...params.inputProps,

                        // autoComplete: '', // disable autocomplete and autofill
                    }}

                />
            )}
        />
    );
};

export default OptionAll;