import SecTitle from "../../../Components/SectionTitle/SecTitle";

const OurStory = () => {
    return (
        <div className="container md:mx-auto  py-10">
            <SecTitle title={"Our story"} subHeading={"What To Know About Donating Blood"} />
            <p className="text-justify p-10" >Did you know that a blood donation of just one pint can save up to three lives? Donating blood doesn’t take very long and can help save the life of someone who has been in an accident, suffering from burns or other trauma, battling cancer or a severe blood disorder, or experiencing complications from childbirth.

                Donating blood is safe and easy, and there is always a need for donors. If you would like to donate blood, here is what you need to know: <br />

                Types of Blood Donations
                Whole Blood – Most people donate about a pint of blood, which is then separated into plasma, platelets, and red cells to be used as needed. This is the most common type of donation. Units of red blood cells are used in operating and emergency rooms.<br></br>

                Apheresis – During this type of donation, a donor is hooked to a machine that can collect the blood components, separate them, and return fluids back to the body. There are three types of apheresis donations: <br />

                Double red cell donation allows for the collection of twice the amount of red blood cells that occur during a whole blood donation. Recipients who need only red blood cells include people who have suffered severe blood loss or anemia.
                Plasma donation collects plasma, which is the liquid portion of blood that contains proteins and clotting factors. Plasma proteins can help treat a variety of conditions such as liver disease and cancer, burns, emphysema, bleeding disorders, and more.
                Platelet donation collects platelets, which are the cells that help form clogs in blood vessels to control bleeding. This is often given to people undergoing chemotherapy, radiation, surgeries, transplants, and patients with blood disorders. Platelets are only good for five days so donors are in high demand.
            </p>


        </div>
    );
};

export default OurStory;