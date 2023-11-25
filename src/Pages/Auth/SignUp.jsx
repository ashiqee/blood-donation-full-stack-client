import { LockOutlined } from "@mui/icons-material";
import { Avatar, Box, Button, Checkbox, FormControlLabel, Grid, Paper, TextField, Typography } from "@mui/material"
const image_hosting = import.meta.env.VITE_IMAGE_HOST;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`


import { Link } from "react-router-dom";

import useDistricts from "../../hooks/useDistricts";
import Option from "../../Components/Option/Option";
import OptionAll from "../../Components/Option/OptionAll";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import usePublicAxios from "../../hooks/usePublicAxios";
import Swal from "sweetalert2";



const SignUp = () => {
    const [districts, handleDistricts, upuzzila] = useDistricts()
    const { createUser, updateUser } = useAuth()
    const [img, setImg] = useState('')
    const axiosPublic = usePublicAxios()



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




    const handleSubmit = async (e) => {
        e.preventDefault()

        const data = new FormData(e.currentTarget)
        const imageFile = data.get("profileImg")



        const reader = new FileReader();

        reader.onloadend = async () => {
            const imageUrl = reader.result;
            setImg(imageUrl)

            const formData = new FormData();
            formData.append('profileImg', imageFile)
            try {
                const res = await axiosPublic.post(img_hosting_api, formData, {
                    headers: {
                        'Content-Type': "multipart/form-data",
                    },
                });
                if (res.data.success) {
                    alert('Img Upload Success Full')
                    console.log(res.data.data.display_url);

                    // todo: send data here
                }
            } catch (error) {
                console.error(error);
                alert('Image Upload failed')
            }

        }
        console.log(imageFile);
        reader.readAsDataURL(imageFile)









        const email = data.get('email')
        const password = data.get('password')
        const name = data.get('name');
        const photo = "https://www.thedivorceangels.com/wp-content/themes/divorceangels/images/avatars/default-8.png";





        createUser(email, password)
            .then(result => {
                const newUser = result.user;
                console.log(newUser);


                updateUser(name, photo)
                    .then(() => {

                        console.log("update User Info   ");


                    })




            })


        // TODO: SEND DB
        const userInfo = ({
            name: data.get('name'),
            profileImg: photo,
            email: data.get('email'),
            blood: data.get('blood'),
            districts: data.get('distrits'),
            upuzilla: data.get('upuzilla'),
            status: "active"


        });

        const userRegInfo = await axiosPublic.post('/user', userInfo)
        if (userRegInfo.data.insertedId); {
            Swal.fire({
                position: "center",
                icon: "success",
                title: `Registration Successful`,
                showConfirmButton: false,
                timer: 1500,
            });
        }


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
                        <img src={img} alt="Preview" style={{ maxWidth: '100%' }} />
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
                                    type="file"
                                    required
                                    fullWidth
                                    id='profileImg'
                                    name="profileImg"
                                    variant="outlined"
                                    InputProps={{ shrink: true }}


                                />
                            </Grid>
                            {/* Blood Group */}
                            <Grid item xs={12} mt={2} sm={6} >
                                {/* option  */}
                                <OptionAll
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
                                    handleDistricts={handleDistricts}


                                />
                            </Grid>
                            {/* Upuzilla */}
                            <Grid item xs={12} sm={6} >
                                {/* option  */}


                                <OptionAll
                                    data={upuzzila}
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






                        {/* <GoogleLogin /> */}
                    </Box>







                </Box>



            </Grid>
        </Grid >
    );
};

export default SignUp;