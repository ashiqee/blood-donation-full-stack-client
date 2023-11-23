import { LockOutlined } from "@mui/icons-material";
import { Autocomplete, Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material"


import { Link } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
import useDistricts from "../../hooks/useDistricts";
import Option from "../../Components/Option/Option";


const SignUp = () => {
    const [districts] = useDistricts()


    const bloodGroup = [
        { "id": 1, "name": "A+" },
        { "id": 2, "name": "A-" },
        { "id": 3, "name": "B+" },
        { "id": 4, "name": "B-" },
        { "id": 5, "name": "AB+" },
        { "id": 6, "name": "AB-" },
        { "id": 7, "name": "O+" },
        { "id": 8, "name": "O-" }
    ]



    const handleSubmit = (e) => {

        e.preventDefault()
        const data = new FormData(e.currentTarget)

        console.log({
            name: data.get('name'),
            email: data.get('email'),
            blood: data.get('blood'),
            profileImg: data.get('profileImg'),
            districts: data.get('distrits'),
            upuzilla: data.get('upuzilla'),
            password: data.get('password')

        });

    }






    return (
        <Grid container component='main' sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} >

                        <LockOutlined />
                    </Avatar>
                    <Typography component='h1' variant="h5" >
                        Sign Up
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >

                        <Grid container spacing={2} >
                            {/* email */}
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="email"
                                    id='email'
                                    name="email"
                                    label='email'
                                    autoComplete="email"
                                    autoFocus

                                />
                            </Grid>
                            {/* name */}
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    type="text"
                                    id='name'
                                    name="name"
                                    label='full name'
                                    autoComplete="full Name"
                                    autoFocus

                                />
                            </Grid>
                            {/* profile Img */}
                            <Grid item xs={12} sm={6} >

                                <TextField
                                    margin="normal"
                                    type="text"
                                    required
                                    fullWidth
                                    id='profileImg'
                                    name="profileImg"
                                    label
                                    autoFocus

                                />
                            </Grid>
                            {/* Blood Group */}
                            <Grid item xs={12} sm={6} >
                                {/* option  */}
                                <Option
                                    data={bloodGroup}
                                    label={"Select Blood Group"}
                                    name={"blood"}

                                />
                            </Grid>
                            {/* Distric  */}
                            <Grid item xs={12} sm={6} >
                                {/* option  */}
                                <Option
                                    data={districts}
                                    label={"Choose your districts"}
                                    name={"distrits"}
                                />
                            </Grid>
                            {/* Upuzilla */}
                            <Grid item xs={12} sm={6} >
                                {/* option  */}

                                <Option
                                    data={districts}
                                    label={"Choose your upuzilla"}
                                    name={"upuzilla"}
                                />



                            </Grid>

                            {/* Password  */}
                            <Grid item xs={12} sm={6} >

                                <TextField
                                    margin="normal"
                                    type="password"
                                    required
                                    fullWidth
                                    id='password'
                                    label='passwrod'
                                    name="password"
                                    autoComplete="current-password"


                                />
                            </Grid>
                            {/* Confirm Password  */}
                            <Grid item xs={12} sm={6} >
                                <TextField
                                    margin="normal"
                                    type="password"
                                    required
                                    fullWidth
                                    id='conPassword'
                                    label='confirm passwrod'
                                    name="conPassword"
                                    autoComplete="confirm-password"


                                />
                            </Grid>

                        </Grid>











                        <FormControlLabel

                            control={<Checkbox value='remember' color="primary" />}
                            label='Remember me'
                        />
                        <Button type="submit"
                            fullWidth

                            variant="contained"
                            sx={{ mt: 3, mb: 2, color: "white" }} >Sign Up</Button>
                        <Grid container>

                            <Grid item>
                                <Link to='/login' variant="body2">
                                    {"Already have an account? Please Login"}
                                </Link>
                            </Grid>
                        </Grid>






                        <GoogleLogin />
                    </Box>







                </Box>



            </Grid>
        </Grid >
    );
};

export default SignUp;