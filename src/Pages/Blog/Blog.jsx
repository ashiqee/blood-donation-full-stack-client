import useBlogData from "../../hooks/useBlogData";

const Blog = () => {
  const { blogData, isBlogDataLoading, refetch } = useBlogData(null);

  return (
    <div>
      {blogData?.length}
      Blog Post
    </div>
  );
};

export default Blog;
