import SecTitle from "../../../Components/SectionTitle/SecTitle";

import FeaturedCard from "./FeaturedCard";

const Featured = () => {
  return (
    <div
      className="bg-fixed bg-cover h-[400] "
      style={{
        backgroundImage:
          "url(https://hearmefolks.com/wp-content/uploads/2022/09/sell-your-eggs-960x480.jpg)",
      }}
    >
      <SecTitle title={"Featured"} />

      <div className="container mx-auto  items-center ">
        <div className="grid grid-cols-1 gap-10  md:grid-cols-3 justify-around ">
          <FeaturedCard></FeaturedCard>
          <FeaturedCard></FeaturedCard>
          <FeaturedCard></FeaturedCard>
        </div>
      </div>
    </div>
  );
};

export default Featured;
