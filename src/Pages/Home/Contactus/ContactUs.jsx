import ContactUsForm from "../../../Components/ContactUsForm/ContactUsForm";
import SecTitle from "../../../Components/SectionTitle/SecTitle";

const ContactUs = () => {
    return (
        <div className="container mx-auto my-10">
            <SecTitle title={"Contact Us"} subHeading={"Empowering Communication: Contact Us Now"} />
            <div className="md:flex justify-around  place-items-center ">
                <div className="">
                    <img src="https://ashokascales.com/wp-content/uploads/2023/02/contact_us.gif" alt="" />
                </div>
                <div>
                    <ContactUsForm />
                </div>
            </div>
        </div>
    );
};

export default ContactUs;