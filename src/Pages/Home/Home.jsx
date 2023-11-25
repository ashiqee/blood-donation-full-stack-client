import Banner from "../../Components/Shared/Banner/Banner";
import AboutUs from "./AboutUs/AboutUs";
import ContactUs from "./Contactus/ContactUs";
import Featured from "./Featured/Featured";
import OurStory from "./OurStory/OurStory";
import WorldDonor from "./WorldDonor/WorldDonor";


const Home = () => {
    return (
        <>
            <Banner />
            <AboutUs />
            <Featured />
            <OurStory />
            <WorldDonor />
            <ContactUs />

        </>


    );
};

export default Home;