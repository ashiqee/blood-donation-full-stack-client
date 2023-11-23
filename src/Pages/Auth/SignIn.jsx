import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material"

import { Link } from "react-router-dom";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";


const Login = () => {


    const handleSubmit = (e) => {

        e.preventDefault()
        const data = new FormData(e.currentTarget)

        console.log({
            email: data.get('email'),
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
                        Sign In
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 1 }} >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='email'
                            name="email"
                            label='email'
                            autoComplete="email"
                            autoFocus

                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id='password'
                            label='passwrod'
                            name="password"
                            autoComplete="current-password"


                        />

                        <FormControlLabel

                            control={<Checkbox value='remember' color="primary" />}
                            label='Remember me'
                        />
                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }} >Sign In</Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link to='/signUp' variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        <GoogleLogin />

                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;