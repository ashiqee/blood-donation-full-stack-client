import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import useAuth from "../../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import { BloodtypeSharp } from "@mui/icons-material";

const pages = [
  { name: "Home", path: "/" },
  { name: "Donation Request", path: "/donationRequest" },
  { name: "Blog", path: "/blog" },
];

const settings = [
  { name: "Profile", path: "/dashboard/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" },
];

function NavBar() {
  const { user, logOut } = useAuth();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogOut = () => {
    logOut();
  };

  const menu = (
    <>
      <ul className="flex gap-5 text-white">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "border-b-4 p-2 pb-5 border-white font-bold text-white hover:text-white"
                : "pb-5 p-2 hover:border-b-4 font-bold border-white hover:text-white"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/donationRequest"
            className={({ isActive }) =>
              isActive
                ? "border-b-4 p-2 pb-5 border-white font-bold text-white hover:text-white"
                : "pb-5 p-2 hover:border-b-4 font-bold border-white hover:text-white"
            }
          >
            Donation request
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive
                ? "border-b-4 p-2 pb-5 border-white font-bold text-white hover:text-white"
                : "pb-5 p-2 hover:border-b-4 font-bold border-white hover:text-white"
            }
          >
            Blog
          </NavLink>
        </li>
      </ul>
    </>
  );

  return (
    <AppBar
      position="static"
      sx={{
        background: "transparent",
        bgcolor: "#f34334",
        opacity: "50px",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <BloodtypeSharp
            sx={{
              display: {
                color: "white",
                fontSize: 80,
                textShadow: "-ms-grid",
                xs: "none",
                md: "flex",
              },
              my: 2,
              mr: 1,
            }}
          />
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },

                fontWeight: 700,
                fontSize: "40px",
                letterSpacing: ".1rem",
                color: "white",
                textDecoration: "none",
              }}
            >
              Blood <br />
              <span className="text-sm ml-2 relative -top-1 right-5">
                {" "}
                Donation
              </span>
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, i) => (
                <NavLink key={i} to={page?.path}>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page?.name}</Typography>
                  </MenuItem>
                </NavLink>
              ))}
            </Menu>
          </Box>
          <BloodtypeSharp sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              py: 4,
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Blood <br />
            <span className="text-sm ml-2 relative -top-1 right-3">
              {" "}
              Donation
            </span>
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex", gap: "10px" },
            }}
          >
            {menu}
            {/* {pages.map((page, i) => (
              <NavLink
                to={page?.path}
                key={i}
                onClick={handleCloseNavMenu}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                {page?.name}
              </NavLink>
            ))} */}
          </Box>

          {!user ? (
            <>
              <NavLink to="/login">
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "16px",
                    bgcolor: "white",
                    color: "primary.main",
                    fontWeight: "600",
                    mr: "20px",
                  }}
                >
                  Login
                </Button>{" "}
              </NavLink>
              <NavLink to="/signUp">
                <Button
                  variant="contained"
                  sx={{
                    fontSize: "16px",
                    bgcolor: "white",
                    color: "primary.main",
                    fontWeight: "600",
                  }}
                >
                  Registration
                </Button>{" "}
              </NavLink>
            </>
          ) : (
            <>
              <Box sx={{ flexGrow: 0 }}>
                {/* <Button
                  variant="outlined"
                  sx={{ xs: "none", md: "flex", mr: "20px" }}
                >
                  {user ? <>admin</> : <>donor</>}
                </Button> */}
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user?.name} src={user?.photoURL} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting, i) => (
                    <MenuItem key={i} onClick={handleCloseUserMenu}>
                      <NavLink
                        to={setting?.path}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <Typography textAlign="center">
                          {setting?.name}
                        </Typography>
                      </NavLink>
                    </MenuItem>
                  ))}
                  <MenuItem>
                    {user ? (
                      <>
                        {" "}
                        <Button
                          onClick={handleLogOut}
                          variant="outlined"
                          sx={{ fontSize: "16px", fontWeight: "200" }}
                        >
                          LogOut
                        </Button>
                      </>
                    ) : (
                      <></>
                    )}
                  </MenuItem>
                </Menu>
              </Box>
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
