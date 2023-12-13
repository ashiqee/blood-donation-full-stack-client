
import LoadingCom from "../../Components/Loading/LoadingCom";
import PageTitle from "../../Components/PageTitle/PageTitle";
import useBlogData from "../../hooks/useBlogData";
import BlogCard from "./BlogCard";


const Blog = () => {
  const { blogData, isBlogDataLoading, refetch } = useBlogData(null);

  if (isBlogDataLoading) {
    return <LoadingCom />
  }
  return (
    <div>

      <PageTitle text={"Blog"} subHeading={'Donate blood save life'} />

      {blogData?.map(data => <BlogCard key={data._id} data={data} />)}

    </div>
  );
};

export default Blog;
