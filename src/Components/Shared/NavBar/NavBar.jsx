import { Button } from "@mui/material";
import useAuth from "../../../hooks/useAuth";


const NavBar = () => {
    const { logOut } = useAuth()


    const handleLogOut = () => {
        logOut()
    }
    return (
        <div>
            Navar

            <Button onClick={handleLogOut} variant="contained">
                Logout
            </Button>

        </div>
    );
};

export default NavBar;