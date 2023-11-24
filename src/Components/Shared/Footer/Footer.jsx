import { BloodtypeTwoTone, Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { blueGrey } from "@mui/material/colors";

const Footer = () => {
    return (
        <>
            <Box display={"md:flex"} color={'primary.main'} justifyContent={"space-between"}
                sx={{ textAlign: "center", bgcolor: blueGrey[800], color: 'primary.main', p: 3 }}>

                <BloodtypeTwoTone sx={{
                    fontSize: "60px",
                    color: "red",
                    animation: 'ease-in',

                }} />
                <Box>
                    <Typography variant="body1">

                        BLood Donation
                    </Typography>
                </Box>

                <Box sx={{
                    my: 3, "& svg": {
                        fontSize: '40px',
                        cursor: 'pointer',
                        mr: 2,
                    },
                    "& svg:hover": {
                        color: "secondary.main",
                        transform: 'translateY(10px)',
                        transition: "all 400ms",
                    }
                }} >

                    <Instagram />
                    <Twitter />
                    <Facebook />
                    <YouTube />
                </Box>


                <Typography variant="body1">

                    All Rights Reserved &copy; BLOOD DAW
                </Typography>


            </Box>

        </>
    );
};

export default Footer;