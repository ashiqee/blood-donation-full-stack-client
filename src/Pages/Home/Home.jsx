import Banner from "../../Components/Shared/Banner/Banner";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./Contactus/ContactUs";
import Featured from "./Featured/Featured";
import FundHomeBtn from "./FundButton/FundHomeBtn";
import JoinUs from "./JoinWithUs/JoinUs";
import OurStory from "./OurStory/OurStory";
import OurVolunteer from "./OurVolunteer/OurVolunteer";
import WorldDonor from "./WorldDonor/WorldDonor";


const Home = () => {
    return (
        <>
            <Banner />
            <FundHomeBtn />
            <AboutUs />
            <Featured />
            <OurStory />
            <JoinUs />
            <OurVolunteer />
            <WorldDonor />
            <ContactUs />

        </>


    );
};

export default Home;