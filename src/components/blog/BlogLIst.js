import BlogCard from "./BlogCard"
import SmallSetPagination from "../pagination/SmallSetPagination"


function BlogList({posts, get_blog_list_page, count}) {
  console.log('BLOGLIST:', posts)
  return(
        <div className="overflow-hidden px-8 bg-white">
          <ul  className="divide-y space-y-8 gap-8  divide-gray-200">
            {posts&&posts.map((post,index) => (
              <BlogCard key={index} post={post} index={index}/>
            ))}
          </ul>
          <SmallSetPagination list_page={get_blog_list_page} list={posts} count={count} />
        </div>
        )
}

export default BlogList