import { Button } from "@mui/material";
import { Link } from "react-router-dom";


const FundButton = () => {
    return (
        <Link to="/fundingPage">
            <Button variant="contained">Donate Fund</Button>
        </Link>
    );
};

export default FundButton;