import SecTitle from "../../../Components/SectionTitle/SecTitle";


const AboutUs = () => {
    return (
        <div >
            <SecTitle title={"রক্তদানের ইতিহাস"} subHeading={"Save blood for Future"} />
            <div className="grid grid-cols-1 container mx-auto md:grid-cols-2 gap-2">
                <div>
                    <img src="https://i.ibb.co/DQv5y0Q/Blood.png" alt="" />

                </div>
                <div>
                    <h3 className="text-xl text-justify mx-5 my-5">গুহাবাসী এই মানুষদের রক্ত সম্পর্কে কোনো ধারণা ছিল না। তবে আঘাতে দেহের কোথাও থেকে রক্ত ঝরলে বা অতিরিক্ত রক্তক্ষরণে কাউকে মারা যেতে দেখলে তারা বুঝতো যে, রক্ত এমন এক জিনিস যার ওপর জীবন-মরণ নির্ভর করে!
                        প্রাচীন মিশরীয়দের বর্ণনা থেকে মনে হয়, হৃৎপিণ্ড এবং রক্ত সংবহন প্রক্রিয়া সম্পর্কে তাদের ধারণা ছিল। নাড়ির উল্লেখ সর্বপ্রথম তাদের কাছ থেকেই পাওয়া যায়।
                    </h3>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;