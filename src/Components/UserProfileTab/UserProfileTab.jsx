import React from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
// import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Bloodtype, LocalActivity } from "@mui/icons-material";

export function TabsWithIcon() {
  const data = [
    {
      label: "Address",
      value: "address",
      icon: LocalActivity,
      desc: (
        <>
          <div className="grid gap-5">
            <h2 className="text-2xl">Districts: </h2>
            <h2 className="text-2xl">Upuzila: </h2>
          </div>
        </>
      ),
    },
    {
      label: "Blood Group",
      value: "Blood",
      icon: Bloodtype,
      desc: (
        <>
          <div className="grid justify-center  gap-5">
            <img
              className="w-28"
              src="https://media3.giphy.com/media/jOPdiG2z1wkZbDeJG0/giphy.gif?cid=6c09b952y4bs9v663opvnaif6zlgit7tpykpsiipuytgs39t&ep=v1_stickers_related&rid=giphy.gif&ct=s"
              alt=""
            />
            <h2 className="text-4xl text-center">A+</h2>
          </div>
        </>
      ),
    },
    // {
    //   label: "Settings",
    //   value: "settings",
    //   icon: Cog6ToothIcon,
    //   desc: `We're not always in the position that we want to be at.
    //   We're constantly growing. We're constantly making mistakes. We're
    //   constantly trying to express ourselves and actualize our dreams.`,
    // },
  ];
  return (
    <Tabs value="address z-0">
      <TabsHeader>
        {data.map(({ label, value, icon }) => (
          <Tab className="z-0" key={value} value={value}>
            <div className="flex   items-center gap-2">
              {React.createElement(icon, { className: "w-5 h-5" })}
              {label}
            </div>
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
}
