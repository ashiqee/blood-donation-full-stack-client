import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";

import {
  RiMenuFoldFill,
  RiMenuUnfoldFill,
  RiUser2Fill,
  RiUserStarFill,
} from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  BloodtypeSharp,
  DashboardCustomizeTwoTone,
  Home,
  Inbox,
  PowerOff,
} from "@mui/icons-material";
import { Divider, useMediaQuery } from "@mui/material";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const isSmallSecreen = useMediaQuery("(max-width:600px");

  useEffect(() => {
    if (isSmallSecreen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isSmallSecreen]);
  return (
    <div>
      {isOpen ? (
        <>
          {" "}
          <Card
            className=" h-[calc(100vh-2rem)] ease-in-out 
                     w-full max-w-[20rem] p-4 shadow-xl bg-gradient-to-r from-pink-50 to-orange-50 shadow-blue-gray-900/50"
          >
            <div className="mb-2 p-4">
              <Typography variant="h5">
                <div className="flex gap-4">
                  <h2 className="text-2xl text-pink-400 ">Blood Donation</h2>
                  <button onClick={() => setIsOpen(!isOpen)}>
                    {" "}
                    <RiMenuFoldFill className="h-5 w-5" />
                  </button>
                </div>
              </Typography>
            </div>
            <List>
              <NavLink to="/dashboard">
                <ListItem>
                  <ListItemPrefix>
                    <DashboardCustomizeTwoTone className="h-5 w-5" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </NavLink>
              <NavLink to="/users">
                <ListItem>
                  <ListItemPrefix>
                    <RiUserStarFill className="h-5 w-5" />
                  </ListItemPrefix>
                  User Manage
                </ListItem>
              </NavLink>
              <ListItem>
                <ListItemPrefix>
                  <BloodtypeSharp className="h-5 w-5" />
                </ListItemPrefix>
                Donation requests
                <ListItemSuffix>
                  <Chip
                    value="14"
                    size="sm"
                    variant="ghost"
                    color="blue-gray"
                    className="rounded-full"
                  />
                </ListItemSuffix>
              </ListItem>
              <ListItem>
                <ListItemPrefix>
                  <Inbox className="h-5 w-5" />
                </ListItemPrefix>
                Content management
              </ListItem>

              <Divider />
              {/* shared menu  */}
              <NavLink to="/dashboard/profile">
                <ListItem>
                  <ListItemPrefix>
                    <RiUser2Fill className="h-5 w-5" />
                  </ListItemPrefix>
                  Profile
                </ListItem>
              </NavLink>
              <NavLink to="/">
                <ListItem>
                  <ListItemPrefix>
                    <Home className="h-5 w-5" />
                  </ListItemPrefix>
                  Home
                </ListItem>
              </NavLink>
              <ListItem>
                <ListItemPrefix>
                  <PowerOff className="h-5 w-5" />
                </ListItemPrefix>
                Log Out
              </ListItem>
            </List>
          </Card>
        </>
      ) : (
        <>
          <div className="flex items-center">
            <button
              className="p-5 text-2xl "
              onClick={() => setIsOpen(!isOpen)}
            >
              {" "}
              <RiMenuUnfoldFill />
            </button>
            <h2 className="text-2xl">Blood Donation</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
