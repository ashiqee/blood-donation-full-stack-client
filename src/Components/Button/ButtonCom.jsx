import { Button } from "@mui/material";


const ButtonCom = ({ text }) => {
    return (<>

        <Button variant="contained" sx={{ color: 'white' }} >{text} </Button>


    </>
    );
};

export default ButtonCom;