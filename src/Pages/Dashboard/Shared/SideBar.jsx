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
  RiFundsBoxLine,
  RiMenuFoldFill,
  RiMenuUnfoldFill,
  RiUser2Fill,
  RiUserShared2Line,

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
import { Button, Divider, useMediaQuery } from "@mui/material";
import useDonor from "../../../hooks/useDonor";
import useAdmin from "../../../hooks/useAdmin";
import useVolunteer from "../../../hooks/useVolunteer";
import useAuth from "../../../hooks/useAuth";

const SideBar = () => {
  const { user, logOut } = useAuth()
  const [isDonor] = useDonor();
  const [isAdmin, isAdminLoading] = useAdmin();
  const [isVolunteer, isVolunteerLoading] = useVolunteer();

  const [isOpen, setIsOpen] = useState(true);
  const isSmallSecreen = useMediaQuery("(max-width:600px");

  useEffect(() => {
    if (isSmallSecreen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
    }
  }, [isSmallSecreen]);

  if (isAdminLoading) {
    return <> Loading....</>;
  }

  return (
    <div className="min-h-screen shadow-xl bg-gradient-to-r from-pink-50 to-orange-50 shadow-blue-gray-900/50">
      {isOpen ? (
        <>
          {" "}
          <Card
            className="  ease-in-out  bg-gradient-to-r from-pink-50 to-orange-50 
                     w-full max-w-[20rem] p-4 "
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
              <img className="w-20 h-20 p-2 rounded-full" src={user?.photoURL} alt="" />
              <h2>{user?.displayName}</h2>
              <Divider />
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
              {/* admin condition  */}
              {isAdmin && (
                <>
                  <NavLink to="/dashboard/all-users">
                    <ListItem>
                      <ListItemPrefix>
                        <RiUserShared2Line className="h-5 w-5" />
                      </ListItemPrefix>
                      User Manage
                    </ListItem>
                  </NavLink>
                  <NavLink to="/dashboard/admin/allFundHistory">
                    <ListItem>
                      <ListItemPrefix>
                        <RiFundsBoxLine className="h-5 w-5" />
                      </ListItemPrefix>
                      All Fund History
                    </ListItem>
                  </NavLink>
                </>
              )}
              {/* Volunteer menu  */}
              {(isAdmin || isVolunteer) && (
                <>
                  <NavLink to="/dashboard/all-donation-request">
                    <ListItem>
                      <ListItemPrefix>
                        <BloodtypeSharp className="h-5 w-5" />
                      </ListItemPrefix>
                      All Donation requests
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
                  </NavLink>
                  <NavLink to="/dashboard/content-management">
                    <ListItem>
                      <ListItemPrefix>
                        <Inbox className="h-5 w-5" />
                      </ListItemPrefix>
                      Content management
                    </ListItem>
                  </NavLink>
                </>
              )}
              {/* Donor menu  */}

              {isDonor && (
                <>
                  <NavLink to="/dashboard/my-donation-request">
                    <ListItem>
                      <ListItemPrefix>
                        <BloodtypeSharp className="h-5 w-5" />
                      </ListItemPrefix>
                      My Donation requests
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
                  </NavLink>
                  <NavLink to="/dashboard/create-donation-request">
                    <ListItem>
                      <ListItemPrefix>
                        <Inbox className="h-5 w-5" />
                      </ListItemPrefix>
                      Create Donation Request
                    </ListItem>
                  </NavLink>
                </>
              )}

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

              <NavLink to="/dashboard/myFundHistory">
                <ListItem>
                  <ListItemPrefix>
                    <RiFundsBoxLine className="h-5 w-5" />
                  </ListItemPrefix>
                  My Fund History
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
                  <Button
                    onClick={() => logOut()}
                    variant="outlined"
                    sx={{ fontSize: "16px", fontWeight: "200" }}
                  >
                    <PowerOff className="h-5 w-5" />  LogOut
                  </Button>
                </ListItemPrefix>

              </ListItem>
            </List>
          </Card>
        </>
      ) : (
        <>
          {/* Small Device  */}
          <div className="min-h-screen shadow-xl bg-gradient-to-r from-pink-50 to-orange-50 shadow-blue-gray-900/50">
            <div className=" px-3  grid gap-4 justify-center mx-auto pr-0  items-center">
              <button className=" text-2xl " onClick={() => setIsOpen(!isOpen)}>
                {" "}
                <RiMenuUnfoldFill />
              </button>

              <NavLink to="/dashboard">
                <ListItem>
                  <ListItemPrefix>
                    <DashboardCustomizeTwoTone className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>
              </NavLink>

              {/* admin condition  */}
              {isAdmin && (
                <>
                  <NavLink to="/dashboard/all-users">
                    <ListItem>
                      <ListItemPrefix>
                        <RiUserShared2Line className="h-5 w-5" />
                      </ListItemPrefix>
                    </ListItem>
                  </NavLink>
                  <NavLink to="/dashboard/admin/allFundHistory">
                    <ListItem>
                      <ListItemPrefix>
                        <RiFundsBoxLine className="h-5 w-5" />
                      </ListItemPrefix>

                    </ListItem>
                  </NavLink>
                </>
              )}
              {/* Volunteer menu  */}
              {(isAdmin || isVolunteer) && (
                <>
                  <NavLink to="/dashboard/all-donation-request">
                    <ListItem>
                      <ListItemPrefix>
                        <BloodtypeSharp className="h-5 w-5" />
                      </ListItemPrefix>

                      <ListItemSuffix>
                        <Chip
                          value="14"
                          size="sm"
                          variant="ghost"
                          color="blue-gray"
                          className="rounded-full hidden"
                        />
                      </ListItemSuffix>
                    </ListItem>
                  </NavLink>
                  <NavLink to="/dashboard/content-management">
                    <ListItem>
                      <ListItemPrefix>
                        <Inbox className="h-5 w-5" />
                      </ListItemPrefix>
                    </ListItem>
                  </NavLink>
                </>
              )}
              {/* Donor menu  */}

              {isDonor && (
                <>
                  <NavLink to="/dashboard/my-donation-request">
                    <ListItem>
                      <ListItemPrefix>
                        <BloodtypeSharp className="h-5 w-5" />
                      </ListItemPrefix>

                      <ListItemSuffix>
                        {/* <Chip
                          value="14"
                          size="sm"
                          variant="ghost"
                          color="blue-gray"
                          className="rounded-full"
                        /> */}
                      </ListItemSuffix>
                    </ListItem>
                  </NavLink>
                  <NavLink to="/dashboard/content-management">
                    <ListItem>
                      <ListItemPrefix>
                        <Inbox className="h-5 w-5" />
                      </ListItemPrefix>
                    </ListItem>
                  </NavLink>
                </>
              )}

              <Divider />
              {/* shared menu  */}
              <NavLink to="/dashboard/profile">
                <ListItem>
                  <ListItemPrefix>
                    <RiUser2Fill className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>
              </NavLink>
              <NavLink to="/dashboard/myFundHistory">
                <ListItem>
                  <ListItemPrefix>
                    <RiFundsBoxLine className="h-5 w-5" />
                  </ListItemPrefix>

                </ListItem>
              </NavLink>
              <NavLink to="/">
                <ListItem>
                  <ListItemPrefix>
                    <Home className="h-5 w-5" />
                  </ListItemPrefix>
                </ListItem>
              </NavLink>
              <ListItem>
                <ListItemPrefix>
                  <PowerOff onClick={() => logOut()} className="h-5 w-5" />

                </ListItemPrefix>
              </ListItem>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SideBar;
