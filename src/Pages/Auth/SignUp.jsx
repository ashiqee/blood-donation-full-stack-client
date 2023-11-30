import { LockOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { Link, useLocation, useNavigate } from "react-router-dom";

import useDistricts from "../../hooks/useDistricts";
import Option from "../../Components/Option/Option";
import OptionAll from "../../Components/Option/OptionAll";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import usePublicAxios from "../../hooks/usePublicAxios";
import Swal from "sweetalert2";

const image_hosting = import.meta.env.VITE_IMAGE_HOST;
const img_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting}`;

const SignUp = () => {
  const [districts, handleDistricts, upuzzila] = useDistricts();
  const { createUser, updateUser, logOut } = useAuth();
  const [profileImage, setProfileImage] = useState(
    "https://www.thedivorceangels.com/wp-content/themes/divorceangels/images/avatars/default-8.png"
  );
  const axiosPublic = usePublicAxios();

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const bloodGroup = [
    { id: 1, name: "A+" },
    { id: 2, name: "A-" },
    { id: 3, name: "B+" },
    { id: 4, name: "B-" },
    { id: 5, name: "AB+" },
    { id: 6, name: "AB-" },
    { id: 7, name: "O+" },
    { id: 8, name: "O-" },
  ];

  const handleProfileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await fetch(img_hosting_api, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const { display_url } = data.data;
          // console.log("Image uploaded successfully:", display_url);
          setProfileImage(display_url);
        } else {
          console.error("Image upload failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error uploading image:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);

    const photo = profileImage;
    const email = data.get("email");
    const password = data.get("password");
    const name = data.get("name");
    const blood = data.get("blood");
    const districts = data.get("distrits");
    const upuzilla = data.get("upuzilla");
    if (email === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Please Provide Email ID`,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }
    if (name === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Please Provide Name`,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    } else if (password === "" || password.length < 6) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Password must be six digit`,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    } else if (blood === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Please Select blood group`,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    } else if (districts === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Please Select your district`,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    } else if (upuzilla === "") {
      Swal.fire({
        position: "center",
        icon: "error",
        title: `Please select your upuzila`,
        showConfirmButton: false,
        timer: 1500,
      });

      return;
    }

    const defaultCoverImg =
      "https://images.pexels.com/photos/12227661/pexels-photo-12227661.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

    const userInfo = {
      name: name,
      profileImg: photo,
      coverImg: defaultCoverImg,
      email: email,
      blood: blood,
      districts: districts,
      upuzilla: upuzilla,
      role: "Guest",

      status: "Active",
    };

    // Test code
    // if (userInfo) {
    //   console.log(userInfo);
    //   return;
    // }

    createUser(email, password).then((result) => {
      const newUser = result.user;
      // console.log(newUser);

      updateUser(name, photo).then(() => {
        // console.log("update User Info   ");
      });
    });

    //  SEND DB

    await axiosPublic
      .post("/user", userInfo)
      .then((res) => {
        if (res?.data.insertedId) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Registration Successful`,
            showConfirmButton: false,
            timer: 1500,
          });
        }


        navigate("/");
        {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        Swal.fire({
          position: "center",
          icon: "error",
          title: `Registration failed`,
          text: `${error.message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>

          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              {/* email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="email"
                  id="email"
                  name="email"
                  label="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              {/* name */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type="text"
                  id="name"
                  name="name"
                  label="full name"
                  autoComplete="full Name"
                  autoFocus
                />
              </Grid>

              {/* profile Img */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  onChange={handleProfileUpload}
                  type="file"
                  required
                  fullWidth
                  id="profileImg"
                  name="profileImg"
                  variant="outlined"
                  InputProps={{ shrink: true }}
                />
              </Grid>
              {/* Blood Group */}
              <Grid item xs={12} mt={2} sm={6}>
                {/* option  */}
                <OptionAll
                  data={bloodGroup}
                  label={"Select Blood Group"}
                  name={"blood"}
                />
              </Grid>
              {/* Distric  */}
              <Grid item xs={12} sm={6}>
                {/* option  */}
                <Option
                  data={districts}
                  label={"Choose your districts"}
                  name={"distrits"}
                  handleDistricts={handleDistricts}
                />
              </Grid>
              {/* Upuzilla */}
              <Grid item xs={12} sm={6}>
                {/* option  */}

                <OptionAll
                  data={upuzzila}
                  label={"Choose your upuzilla"}
                  name={"upuzilla"}
                />
              </Grid>

              {/* Password  */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  type="password"
                  required
                  fullWidth
                  id="password"
                  label="passwrod"
                  name="password"
                  autoComplete="current-password"
                />
              </Grid>
              {/* Confirm Password  */}
              <Grid item xs={12} sm={6}>
                <TextField
                  margin="normal"
                  type="password"
                  required
                  fullWidth
                  id="conPassword"
                  label="confirm passwrod"
                  name="conPassword"
                  autoComplete="confirm-password"
                />
              </Grid>
            </Grid>

            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, color: "white" }}
            >
              Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" variant="body2">
                  {"Already have an account? Please Login"}
                </Link>
              </Grid>
            </Grid>

            {/* <GoogleLogin /> */}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default SignUp;
