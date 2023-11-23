import { Google } from "@mui/icons-material";
import { Box, Button, Divider, Typography } from "@mui/material";


const handleGoogleLogin = () => {
    alert('Hello Google')
}
const GoogleLogin = () => {
    return (
        <Box sx={{

            mt: 4,

        }}  >
            <Divider sx={{ my: 2 }}>
                <Typography fontSize={24} >
                    Or
                </Typography>
            </Divider>
            <Button variant="contained" fullWidth onClick={handleGoogleLogin}
                sx={{
                    mx: 'auto', color: "white",
                    borderRadius: 10,
                    display: 'flex',
                    gap: "10px", justifyContent: 'center'
                }} border={2} textAlign="center" >


                <Google fontSize="large"
                />
                <Typography
                    xs={"h6"}
                    variant="h6" sx={{ textTransform: 'uppercase' }}>
                    Sign in With Google
                </Typography>

            </Button>

        </Box>
    );
};

export default GoogleLogin;